<?php

namespace App\Http\Controllers;

use App\Models\DeudaJugador;
use App\Models\AbonoDeudaJugador;
use Illuminate\Support\Facades\Auth;
use App\Models\PagoJugador;
use App\Models\Banco;
use App\Models\Jugador;
use App\Models\CostoCategoria;
use App\Models\CajaPago;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use App\Services\BancoService;
use Carbon\Carbon;
use DB;

class DeudaJugadorController extends Controller
{
    //  * Mostrar TODAS las deudas
    public function index()
    {
        $registros = DeudaJugador::query()
            ->with([
                'jugador',
                'costo_categoria.concepto_cobro',
                'costo_categoria.categoria.temporada',
                'pagos_jugadores.banco',
            ])
            ->join('costos_categorias as cc', 'cc.id', '=', 'deudas_jugadores.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Activa')
            ->where('deudas_jugadores.estatus', '!=', 'Pagado')
            ->select('deudas_jugadores.*')
            ->orderBy('deudas_jugadores.fecha_pago', 'asc')
            ->get();

        return response()->json($registros);
    }

    public function deudaPeriodo($periodo)
    {
        $validos = ['Diario','Semanal','Quincenal','Mensual','Bimestral','Trimestral','Cuatrimestral','Semestral','Anual','Temporada','todos'];
        if (!in_array($periodo, $validos, true)) {
            return response()->json(['message' => 'Periodicidad inválida'], 422);
        }

        $registros = DeudaJugador::query()
            ->with([
                'jugador',
                'costo_categoria.concepto_cobro',
                'costo_categoria.categoria.temporada',
                'pagos_jugadores.banco',
            ])
            ->join('costos_categorias as cc', 'cc.id', '=', 'deudas_jugadores.costo_categoria_id')
            ->join('conceptos_cobro as con', 'con.id', '=', 'cc.concepto_cobro_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Activa')
            ->where('deudas_jugadores.estatus', '!=', 'Pagado')
            ->when($periodo !== 'todos', fn($q) =>
                $q->where('con.periodicidad', $periodo)
            )
            ->select('deudas_jugadores.*')
            ->orderBy('deudas_jugadores.fecha_pago', 'asc')
            ->get();

            return response()->json($registros);
    }

    //  * Mostrar TODAS las deudas
    public function historialDeudas()
    {
        $registros = DeudaJugador::query()
            ->with([
                'jugador',
                'costo_categoria.concepto_cobro',
                'costo_categoria.categoria.temporada',
                'pagos_jugadores.banco',
            ])
            ->join('costos_categorias as cc', 'cc.id', '=', 'deudas_jugadores.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('deudas_jugadores.estatus', '!=', 'Pagado')
            ->select('deudas_jugadores.*')
            ->orderBy('t.fecha_inicio', 'desc')
            ->orderBy('deudas_jugadores.jugador_id', 'asc')
            ->orderBy('deudas_jugadores.fecha_pago', 'desc')
            ->get();

        return response()->json($registros);
    }

    public function historialDeudasFinalizadas()
    {
        $registros = DeudaJugador::query()
            ->with([
                'jugador',
                'costo_categoria.concepto_cobro',
                'costo_categoria.categoria.temporada',
                'pagos_jugadores.banco',
            ])
            ->join('costos_categorias as cc', 'cc.id', '=', 'deudas_jugadores.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Finalizada')
            ->where('deudas_jugadores.estatus', '!=', 'Pagado')
            ->select('deudas_jugadores.*')
            ->orderBy('t.fecha_inicio', 'desc')
            ->orderBy('deudas_jugadores.jugador_id', 'asc')
            ->orderBy('deudas_jugadores.fecha_pago', 'desc')
            ->get();

        return response()->json($registros);
    }

    //  * Mostrar DEUDAS PENDIENTES
    public function deudasPendientes(Request $request)
    {
        $registros = DeudaJugador::with(['jugador', 'costo_categoria.concepto_cobro', 'costo_categoria.categoria.temporada', 'pagos_jugadores.banco'])
            ->where(function ($query) {
                $query->where('estatus', 'Pendiente')
                    ->orWhere('estatus', 'Parcial');
            })
            ->whereHas('costo_categoria.categoria.temporada', function ($query) {
                $query->where('estatus', 'Activa');
            })
            ->orderBy('fecha_pago', 'asc')
            ->get();

        return response()->json($registros);
    }

    //  * Mostrar una deuda por ID.
    public function show($id)
    {
        $registro = DeudaJugador::with(['jugador', 'costo_categoria.concepto_cobro', 'costo_categoria.categoria.temporada', 'pagos_jugadores.banco'])->find($id);
        if (!$registro) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
        return response()->json($registro);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'jugador_id' => 'required|exists:jugadores,id',
            'costo_categoria_id' => 'required|exists:costos_categorias,id',
            'monto_base'     => 'required|numeric|min:1',
            'extra' => 'required|numeric|min:0',
            'descuento' => 'required|numeric|min:0',
            'monto_final' => 'required|numeric|min:1',
            'fecha_pago' => 'required|date',
        ]);

        $jugador       = Jugador::with('categoria.temporada')->findOrFail($data['jugador_id']);
        $costoCategoria= CostoCategoria::with('concepto_cobro')->findOrFail($data['costo_categoria_id']);
        $periodicidad  = $costoCategoria->concepto_cobro->periodicidad;

        $inicio = CarbonImmutable::parse($data['fecha_pago']);
        $fin    = CarbonImmutable::parse($jugador->categoria->temporada->fecha_fin);

        $saltos = [
            'Diario'        => fn ($d) => $d->addDay(),
            'Semanal'       => fn ($d) => $d->addWeek(),
            'Quincenal'     => fn ($d) => $d->addDays(15),
            'Mensual'       => fn ($d) => $d->addMonth(),
            'Bimestral'     => fn ($d) => $d->addMonths(2),
            'Trimestral'    => fn ($d) => $d->addMonths(3),
            'Cuatrimestral' => fn ($d) => $d->addMonths(4),
            'Semestral'     => fn ($d) => $d->addMonths(6),
            'Anual'         => fn ($d) => $d->addYear(),
            'Temporada'     => fn ($d) => $fin->addDay(),
        ];

        DB::beginTransaction();
        try {

            $cursor = $inicio->clone();

            while ($cursor->lte($fin)) {

                $fechaPago   = $cursor;
                $fechaLimite = $cursor->addWeek();

                DeudaJugador::firstOrCreate(
                    [
                        'jugador_id'         => $jugador->id,
                        'costo_categoria_id' => $costoCategoria->id,
                        'fecha_pago'         => $fechaPago,
                    ],
                    [
                        'monto_base'      => $data['monto_base'],
                        'extra'           => $data['extra'],
                        'descuento'       => $data['descuento'],
                        'monto_final'     => $data['monto_final'],
                        'saldo_restante'  => $data['monto_final'],
                        'estatus'         => 'Pendiente',
                        'notas'           => $data['notas'] ?? null,
                        'fecha_limite'    => $fechaLimite,
                    ]
                );

                $cursor = $saltos[$periodicidad]($cursor);
            }

            DB::commit();
            return response()->json(['message' => 'Deudas generadas correctamente'], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al generar las deudas',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $registro = DeudaJugador::find($id);
        if (!$registro) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'estatus' => 'sometimes|in:Pendiente,Parcial,Pagado,Cancelado',
            'extra' => 'sometimes|numeric|min:0',
            'descuento' => 'sometimes|numeric|min:0',
            'monto_final' => 'sometimes|numeric|min:1',
            'notas' => 'nullable|string',
            'fecha_pago' => 'sometimes|date',
            'fecha_limite' => 'sometimes|date',
        ]);

        DB::beginTransaction();
        try {
            $pagos = PagoJugador::where('deuda_jugador_id', $registro->id)->get();

            if($request->estatus === 'Pagado' && count($pagos) === 0){
                $data['saldo_restante'] = 0;
            }else{
                $data['saldo_restante'] = $data['monto_final'];
            }

            $registro->update($data);

            if(count($pagos) > 0){
                return response()->json(['message' => 'No se puede modificar una deuda pagada'], 422);
            }

            if($request->estatus === 'Pagado' && count($pagos) === 0){
                $data_pagado = $request->validate([
                    'estatus' => 'required|in:Pagado',
                    'banco_id' => 'required|exists:bancos,id',
                    'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
                    'referencia' => 'nullable|string',
                    'fecha_pagado' => 'required|date',
                ]);

                $data_pagado['deuda_jugador_id'] = $registro->id;

                $registro_pago = PagoJugador::create($data_pagado);

                $jugador = $registro->jugador->nombre.' '.$registro->jugador->apellido_p.' '.$registro->jugador->apellido_m;
                $concepto = $registro->costo_categoria->concepto_cobro->nombre;
                $banco = Banco::findOrFail($data_pagado['banco_id']);
                $bancoService = new BancoService();
                $movimiento = $bancoService->registrarIngreso(
                    $banco,
                    $data['monto_final'],
                    "Pago del jugador ($concepto): $jugador",
                    $data_pagado['metodo_pago'],
                    $registro_pago
                );

                if($data_pagado['metodo_pago'] === 'Transferencia bancaria' || $data_pagado['metodo_pago'] === 'Tarjeta de crédito/débito') {
                    $movimiento->referencia = $data_pagado['referencia'];
                    $movimiento->save();
                }

                $registro_caja = CajaPago::create([
                    'banco_id'         => $data_pagado['banco_id'],
                    'usuario_id'       => Auth::id(),
                    'jugador_id'       => $registro->jugador->id,
                    'motivo'           => $concepto . " ({$registro->costo_categoria->categoria->nombre})",
                    'concepto'         => "Pago completo",
                    'monto'            => $data['monto_final'],
                    'metodo_pago'      => $data_pagado['metodo_pago'],
                    'referencia'       => $data_pagado['referencia'],
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Registro actualizado'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al actualizar la deuda', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $registro = DeudaJugador::with(['jugador', 'costo_categoria.concepto_cobro', 'costo_categoria.categoria.temporada', 'pagos_jugadores.banco'])->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        // Verificar si la temporada es "Activa"
        if ($registro->costo_categoria->categoria->temporada->estatus === 'Activa') {
            return response()->json(['message' => 'La temporada está activa, no se puede eliminar el registro'], 400);
        }

        DB::beginTransaction();
        try {
            foreach ($registro->abonos_deudas as $abono) {
                $abono->movimientosBancarios()->delete();
                $abono->delete();
            }

            $registro->delete();

            DB::commit();
            return response()->json(['message' => 'Registro eliminado con éxito']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al eliminar el abono', 'error' => $e->getMessage()], 500);
        }
    }
}
