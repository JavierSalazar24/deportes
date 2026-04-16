<?php

namespace App\Http\Controllers;

use App\Models\Banco;
use App\Services\BancoService;
use App\Models\PagoJugador;
use App\Models\Jugador;
use App\Services\CashDeskService;
use Illuminate\Http\Request;
use DB;

class PagoJugadorController extends Controller
{
    //  * Mostrar todos los pagos.
    public function index()
    {
        $sub = DB::table('pagos_jugadores as p')
            ->join('deudas_jugadores as d', 'd.id', '=', 'p.deuda_jugador_id')
            ->join('costos_categorias as cc', 'cc.id', '=', 'd.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Activa')
            ->selectRaw('d.jugador_id, MAX(p.created_at) as ultimo_pago')
            ->groupBy('d.jugador_id');

        $registros = PagoJugador::query()
            ->with([
                'deuda_jugador.jugador',
                'deuda_jugador.abonos_deudas',
                'deuda_jugador.costo_categoria.categoria.temporada',
                'deuda_jugador.costo_categoria.concepto_cobro',
                'banco',
            ])
            ->join('deudas_jugadores as d', 'd.id', '=', 'pagos_jugadores.deuda_jugador_id')
            ->join('costos_categorias as cc', 'cc.id', '=', 'd.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Activa')
            ->joinSub($sub, 'u', fn ($join) =>
                $join->on('u.jugador_id', '=', 'd.jugador_id')
            )
            ->orderByDesc('u.ultimo_pago')
            ->orderBy('d.jugador_id')
            ->orderByDesc('pagos_jugadores.created_at')
            ->select('pagos_jugadores.*')
            ->get();

        return response()->json($registros);
    }

    //  * Mostrar todos los pagos.
    public function historialPagos()
    {
        $registros = PagoJugador::query()
            ->with([
                'deuda_jugador.jugador',
                'deuda_jugador.abonos_deudas',
                'deuda_jugador.costo_categoria.categoria.temporada',
                'deuda_jugador.costo_categoria.concepto_cobro',
                'banco',
            ])
            ->join('deudas_jugadores as d', 'd.id', '=', 'pagos_jugadores.deuda_jugador_id')
            ->join('costos_categorias as cc', 'cc.id', '=', 'd.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->select('pagos_jugadores.*')
            ->orderBy('t.fecha_inicio', 'desc')
            ->orderBy('d.jugador_id', 'asc')
            ->orderBy('pagos_jugadores.created_at', 'desc')
            ->get();

        return response()->json($registros);
    }

    public function historialPagosFinalizadas()
    {
        $registros = PagoJugador::query()
            ->with([
                'deuda_jugador.jugador',
                'deuda_jugador.abonos_deudas',
                'deuda_jugador.costo_categoria.categoria.temporada',
                'deuda_jugador.costo_categoria.concepto_cobro',
                'banco',
            ])
            ->join('deudas_jugadores as d', 'd.id', '=', 'pagos_jugadores.deuda_jugador_id')
            ->join('costos_categorias as cc', 'cc.id', '=', 'd.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Finalizada')
            ->select('pagos_jugadores.*')
            ->orderBy('t.fecha_inicio', 'desc')
            ->orderBy('d.jugador_id', 'asc')
            ->orderBy('pagos_jugadores.created_at', 'desc')
            ->get();

        return response()->json($registros);
    }

    //  * Mostrar un pago por ID (ticket).
    public function show($id)
    {
        $registro = PagoJugador::with(['jugador','detalles.deudaJugador'])->find($id);
        if (!$registro) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
        return response()->json($registro);
    }

    public function destroy($id)
    {
        $registro = PagoJugador::with(['deuda_jugador.jugador', 'deuda_jugador.costo_categoria.categoria.temporada', 'deuda_jugador.costo_categoria.concepto_cobro', 'banco'])->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        // Verificar si la temporada es "Activa"
        if ($registro->deuda_jugador->costo_categoria->categoria->temporada->estatus === 'Activa') {
            return response()->json(['message' => 'La temporada está activa, no se puede eliminar el registro'], 400);
        }

        DB::beginTransaction();
        try {

            $registro->movimientosBancarios()->delete();

            foreach ($registro->deuda_jugador->abonos_deudas as $abono) {
                $abono->movimientosBancarios()->delete();
                $abono->delete();
            }

            $deuda = $registro->deuda_jugador;
            $deuda->estatus = "Pendiente";
            $deuda->save();

            $registro->delete();

            DB::commit();
            return response()->json(['message' => 'Registro eliminado con éxito']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al eliminar el abono', 'error' => $e->getMessage()], 500);
        }
    }
}
