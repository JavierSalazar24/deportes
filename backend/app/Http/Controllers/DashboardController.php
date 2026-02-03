<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Retorna TODOS los datos en una sola petición (Opcional)
     */
    public function dataDashboard()
    {
        return response()->json([
            'ingresosEgresos' => $this->getIngresosEgresosData(),
            'movimientosBancariosDia' => $this->getMovimientosBancariosDia(),
            'distribucionGastos' => $this->getDistribucionGastosData(),
            'pagosCategoriaFemenil' => $this->getPagosCategoriasFemenilData(),
            'pagosCategoriaVaronil' => $this->getPagosCategoriasVaronilData(),
            'pagosPendientes' => $this->getPagosPendientesData(),
            'proximosPartidos' => $this->getPartidosSemanaData(),
        ]);
    }

    private function getIngresosEgresosData()
    {
        $year = Carbon::now()->year;

        // Obtener datos agrupados por mes
        $raw = DB::table('movimientos_bancarios')
            ->select(
                DB::raw('MONTH(fecha) as month_num'),
                'tipo_movimiento',
                DB::raw('SUM(monto) as total')
            )
            ->whereYear('fecha', $year)
            ->groupBy('month_num', 'tipo_movimiento')
            ->get();

        // Formatear respuesta mes a mes (Ene - Dic)
        $result = [];
        $months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        for ($i = 1; $i <= 12; $i++) {
            $ingreso = $raw->where('month_num', $i)->where('tipo_movimiento', 'Ingreso')->first()->total ?? 0;
            $gasto = $raw->where('month_num', $i)->where('tipo_movimiento', 'Egreso')->first()->total ?? 0;

            $result[] = [
                'month' => $months[$i - 1],
                'ingresos' => (float)$ingreso,
                'gastos' => (float)$gasto,
            ];
        }

        return $result;
    }

    private function getMovimientosBancariosDia()
    {
        $rawMovimientos = DB::table('movimientos_bancarios')
            ->join('bancos', 'movimientos_bancarios.banco_id', '=', 'bancos.id')
            ->whereDate('movimientos_bancarios.fecha', Carbon::today())
            ->select(
                'movimientos_bancarios.id',
                'movimientos_bancarios.tipo_movimiento',
                'bancos.nombre as banco',
                'movimientos_bancarios.monto',
                'movimientos_bancarios.created_at'
            )
            ->orderBy('movimientos_bancarios.created_at', 'desc')
            ->get();

        $totalIngresos = $rawMovimientos->where('tipo_movimiento', 'Ingreso')->sum('monto');
        $totalEgresos  = $rawMovimientos->where('tipo_movimiento', 'Egreso')->sum('monto');
        $balanceFinal  = $totalIngresos - $totalEgresos;

        $listado = $rawMovimientos->map(function ($mov) {
            return [
                'id'    => $mov->id,
                'tipo'  => $mov->tipo_movimiento,
                'banco' => $mov->banco,
                'monto' => (float) $mov->monto,
                'fecha' => $mov->created_at
            ];
        });

        return [
            'movimientos' => $listado,
            'resumen' => [
                'ingresos' => (float) $totalIngresos,
                'egresos'  => (float) $totalEgresos,
                'balance'  => (float) $balanceFinal
            ]
        ];
    }

    private function getPagosCategoriasFemenilData()
    {
        return DB::table('deudas_jugadores')
            ->join('jugadores', 'deudas_jugadores.jugador_id', '=', 'jugadores.id')
            ->join('categorias', 'jugadores.categoria_id', '=', 'categorias.id')
            ->where('categorias.genero', 'Mujer')
            ->select(
                'categorias.nombre as categoria',
                DB::raw("SUM(CASE WHEN deudas_jugadores.estatus = 'Pagado' THEN 1 ELSE 0 END) as pagados"),
                DB::raw("SUM(CASE WHEN deudas_jugadores.estatus != 'Pagado' THEN 1 ELSE 0 END) as pendientes")
            )
            ->groupBy('categorias.nombre')
            ->get();
    }

    private function getPagosCategoriasVaronilData()
    {
        return DB::table('deudas_jugadores')
            ->join('jugadores', 'deudas_jugadores.jugador_id', '=', 'jugadores.id')
            ->join('categorias', 'jugadores.categoria_id', '=', 'categorias.id')
            ->where('categorias.genero', 'Hombre')
            ->select(
                'categorias.nombre as categoria',
                DB::raw("SUM(CASE WHEN deudas_jugadores.estatus = 'Pagado' THEN 1 ELSE 0 END) as pagados"),
                DB::raw("SUM(CASE WHEN deudas_jugadores.estatus != 'Pagado' THEN 1 ELSE 0 END) as pendientes")
            )
            ->groupBy('categorias.nombre')
            ->get();
    }

    private function getPagosPendientesData()
    {
        Carbon::setLocale('es');

        $pendientes = DB::table('deudas_jugadores')
            ->join('jugadores', 'deudas_jugadores.jugador_id', '=', 'jugadores.id')
            ->join('categorias', 'jugadores.categoria_id', '=', 'categorias.id')
            ->join('temporadas', 'categorias.temporada_id', '=', 'temporadas.id')
            ->where('temporadas.estatus', 'Activa')
            ->whereIn('deudas_jugadores.estatus', ['Pendiente', 'Parcial'])
            ->select(
                'deudas_jugadores.id',
                DB::raw("CONCAT(jugadores.nombre, ' ', jugadores.apellido_p) as jugador"),
                'categorias.nombre as categoria',
                'deudas_jugadores.saldo_restante as monto',
                'deudas_jugadores.fecha_limite as vencimiento',
                'jugadores.foto'
            )
            ->orderBy('deudas_jugadores.fecha_limite', 'asc')
            ->limit(10)
            ->get();

        return $pendientes->map(function ($item) {
            $fechaLimite = Carbon::parse($item->vencimiento);
            $diff = Carbon::now()->diffInDays($fechaLimite, false);
            $diasVencido = $diff * -1;

            $item->diasVencido = $diasVencido > 0 ? (int)$diasVencido : 0;
            $item->monto = (float)$item->monto;

            if ($item->foto) {
                $item->foto = asset('storage/fotos_jugadores/' . $item->foto);
            } else {
                $item->foto = null;
            }

            return $item;
        });
    }

    private function getPartidosSemanaData()
    {
        Carbon::setLocale('es');

        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        $partidos = DB::table('partidos')
            ->join('categorias', 'partidos.categoria_id', '=', 'categorias.id')
            ->whereBetween('fecha_hora', [$startOfWeek, $endOfWeek])
            ->select(
                'partidos.id',
                'categorias.nombre as nombre_categoria',
                'partidos.rival',
                'partidos.fecha_hora',
                'partidos.lugar'
            )
            ->orderBy('fecha_hora', 'asc')
            ->get();

        return $partidos->map(function ($partido) {
            $fechaObj = Carbon::parse($partido->fecha_hora);
            return [
                'id' => $partido->id,
                'categoria' => $partido->nombre_categoria,
                'rival' => $partido->rival,
                'fecha' => $fechaObj->format('d M'),
                'hora' => $fechaObj->format('h:i A'),
                'lugar' => $partido->lugar
            ];
        });
    }

     private function getDistribucionGastosData()
    {
        // Obtener Top 5 gastos agrupados por concepto
        $gastos = DB::table('gastos')
            ->join('conceptos', 'gastos.concepto_id', '=', 'conceptos.id')
            ->select('conceptos.nombre as name', DB::raw('SUM(gastos.total) as value'))
            ->groupBy('conceptos.nombre')
            ->orderByDesc('value')
            ->limit(5)
            ->get();

        $colors = [
            '#ef4444',
            '#f59e0b',
            '#8b5cf6',
            '#3b82f6',
            '#10b981'
        ];

        // Formatear respuesta para el Frontend
        return $gastos->map(function ($item, $key) use ($colors) {
            return [
                'name'  => $item->name,
                'value' => (float) $item->value,
                'color' => $colors[$key] ?? '#9ca3af'
            ];
        });
    }
}
