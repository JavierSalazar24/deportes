<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\CajaPago;
use App\Models\Banco;
use App\Services\BancoService;
use App\Models\AbonoDeudaJugador;
use App\Models\DeudaJugador;
use App\Models\PagoJugador;
use Illuminate\Http\Request;
use DB;

class AbonoDeudaJugadorController extends Controller
{
    public function index()
    {
        $sub = DB::table('abonos_deudas_jugadores as a')
            ->join('deudas_jugadores as d', 'd.id', '=', 'a.deuda_jugador_id')
            ->join('costos_categorias as cc', 'cc.id', '=', 'd.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Activa')
            ->selectRaw('d.jugador_id, MAX(a.fecha) as ultimo_abono')
            ->groupBy('d.jugador_id');

        $registros = AbonoDeudaJugador::query()
            ->with([
                'deuda_jugador.jugador',
                'deuda_jugador.costo_categoria.concepto_cobro',
                'deuda_jugador.costo_categoria.categoria.temporada',
                'banco',
            ])
            ->join('deudas_jugadores as d', 'd.id', '=', 'abonos_deudas_jugadores.deuda_jugador_id')
            ->join('costos_categorias as cc', 'cc.id', '=', 'd.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Activa')
            ->joinSub($sub, 'u', fn ($join) =>
                $join->on('u.jugador_id', '=', 'd.jugador_id')
            )
            ->select('abonos_deudas_jugadores.*')
            ->latest()
            ->get();

        return response()->json($registros);
    }

    public function historialAbonos()
    {
        $registros = AbonoDeudaJugador::query()
            ->with([
                'deuda_jugador.jugador',
                'deuda_jugador.costo_categoria.concepto_cobro',
                'deuda_jugador.costo_categoria.categoria.temporada',
                'banco',
            ])
            ->join('deudas_jugadores as d', 'd.id', '=', 'abonos_deudas_jugadores.deuda_jugador_id')
            ->join('costos_categorias as cc', 'cc.id', '=', 'd.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->select('abonos_deudas_jugadores.*')
            ->orderBy('t.fecha_inicio', 'desc')
            ->orderBy('d.jugador_id', 'asc')
            ->orderBy('abonos_deudas_jugadores.fecha', 'desc')
            ->get();

        return response()->json($registros);
    }

    public function historialAbonosFinalizadas()
    {
        $registros = AbonoDeudaJugador::query()
            ->with([
                'deuda_jugador.jugador',
                'deuda_jugador.costo_categoria.concepto_cobro',
                'deuda_jugador.costo_categoria.categoria.temporada',
                'banco',
            ])
            ->join('deudas_jugadores as d', 'd.id', '=', 'abonos_deudas_jugadores.deuda_jugador_id')
            ->join('costos_categorias as cc', 'cc.id', '=', 'd.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Finalizada')
            ->select('abonos_deudas_jugadores.*')
            ->orderBy('t.fecha_inicio', 'desc')
            ->orderBy('d.jugador_id', 'asc')
            ->orderBy('abonos_deudas_jugadores.fecha', 'desc')
            ->get();

        return response()->json($registros);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'banco_id' => 'required|exists:bancos,id',
            'deuda_jugador_id' => 'required|exists:deudas_jugadores,id',
            'monto' => 'required|numeric|min:1',
            'fecha' => 'required|date',
            'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'referencia' => 'nullable|string',
            'observaciones' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $deuda = DeudaJugador::find($request->deuda_jugador_id);

            if (!$deuda) {
                return response()->json(['message' => 'Registro no encontrado'], 404);
            }

            if ($data['monto'] > $deuda->saldo_restante) {
                return response()->json(['message' => 'El abono excede el saldo pendiente.'], 422);
            }

            $concepto = $deuda->costo_categoria->concepto_cobro->nombre;

            $abono = AbonoDeudaJugador::create($data);

            // actualizar saldo de la deuda
            $deuda->saldo_restante -= $data['monto'];
            if ($deuda->saldo_restante <= 0) {
                $deuda->saldo_restante = 0;
                $deuda->estatus = "Pagado";

                $registro_pago = PagoJugador::create([
                    'banco_id' => $data['banco_id'],
                    'deuda_jugador_id' => $deuda->id,
                    'metodo_pago' => $data['metodo_pago'],
                    'referencia' => $data['referencia'] ?? null,
                    'fecha_pagado' => $data['fecha'],
                ]);

                CajaPago::create([
                    'banco_id'         => $data['banco_id'],
                    'usuario_id'       => Auth::id(),
                    'jugador_id'       => $deuda->jugador->id,
                    'motivo'           => $concepto . " ({$deuda->costo_categoria->categoria->nombre})",
                    'concepto'         => "Pago completado por abono(s)",
                    'monto'            => $data['monto'],
                    'metodo_pago'      => $data['metodo_pago'],
                    'referencia'       => $data['referencia'] ?? null,
                ]);
            }else{
                $deuda->estatus = "Parcial";

                CajaPago::create([
                    'banco_id'         => $data['banco_id'],
                    'usuario_id'       => Auth::id(),
                    'jugador_id'       => $deuda->jugador->id,
                    'motivo'           => $concepto . " ({$deuda->costo_categoria->categoria->nombre})",
                    'concepto'         => "Abono de pago",
                    'monto'            => $data['monto'],
                    'metodo_pago'      => $data['metodo_pago'],
                    'referencia'       => $data['referencia'] ?? null,
                ]);
            }
            $deuda->save();

            $jugador = $deuda->jugador->nombre.' '.$deuda->jugador->apellido_p.' '.$deuda->jugador->apellido_m;
            $concepto = $deuda->costo_categoria->concepto_cobro->nombre;

            // Crea el movimiento bancario (ingreso)
            $banco = Banco::findOrFail($data['banco_id']);
            $bancoService = new BancoService();
            $movimiento = $bancoService->registrarIngreso(
                $banco,
                $data['monto'],
                "Abono del jugador ($concepto): $jugador",
                $data['metodo_pago'],
                $abono
            );

            if($data['metodo_pago'] === 'Transferencia bancaria' || $data['metodo_pago'] === 'Tarjeta de crédito/débito') {
                $movimiento->referencia = $data['referencia'];
                $movimiento->save();
            }

            DB::commit();

            return $abono;

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar el abono', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return AbonoDeudaJugador::with(['deuda_jugador.jugador', 'deuda_jugador.costo_categoria.concepto_cobro', 'deuda_jugador.costo_categoria.categoria.temporada', 'banco'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $registro = AbonoDeudaJugador::find($id);
        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'metodo_pago' => 'sometimes|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'referencia' => 'nullable|string',
            'observaciones' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $metodoPago = $data['metodo_pago'] ?? $registro->metodo_pago;
            if ($metodoPago !== 'Transferencia bancaria' && $metodoPago !== 'Tarjeta de crédito/débito') {
                $data['referencia'] = null;
            }

            $registro->update($data);

            $deuda = DeudaJugador::find($request->deuda_jugador_id);
            $jugador = $deuda->jugador->nombre.' '.$deuda->jugador->apellido_p.' '.$deuda->jugador->apellido_m;
            $concepto = $deuda->costo_categoria->concepto_cobro->nombre;

            $movimiento = $registro->movimientosBancarios()->first();
            if ($movimiento) {
                $movimiento->update([
                    'concepto'    => "Abono del jugador ($concepto): $jugador",
                    'metodo_pago'  => $metodoPago,
                    'referencia'   => $data['referencia'] ?? null,
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Registro actualizado'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al actualizar el abono', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $registro = AbonoDeudaJugador::with(['deuda_jugador.jugador', 'deuda_jugador.costo_categoria.concepto_cobro', 'deuda_jugador.costo_categoria.categoria.temporada', 'banco'])->find($id);

        if (!$registro) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        // Verificar si la temporada es "Activa"
        if ($registro->deuda_jugador->costo_categoria->categoria->temporada->estatus === 'Activa') {
            return response()->json(['message' => 'La temporada está activa, no se puede eliminar el registro'], 400);
        }

        DB::beginTransaction();
        try {
            $deuda = $registro->deuda_jugador;

            // Revertir saldo si se elimina abono
            $deuda->saldo_restante += $registro->monto;

            // Eliminar el pago
            $pago = PagoJugador::where('deuda_jugador_id', $deuda->id)->first();
            if ($pago) {
                $pago->movimientosBancarios()->delete();
                $pago->delete();
            }

            // Eliminar el movimiento
            $registro->movimientosBancarios()->delete();
            $registro->delete();

            $abonos = AbonoDeudaJugador::where('deuda_jugador_id', $registro->deuda_jugador->id)->get();
            if(count($abonos) === 0){
                $deuda->estatus = "Pendiente";
            }
            $deuda->save();

            DB::commit();
            return response()->json(['message' => 'Registro eliminado con éxito']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al eliminar el abono', 'error' => $e->getMessage()], 500);
        }
    }
}
