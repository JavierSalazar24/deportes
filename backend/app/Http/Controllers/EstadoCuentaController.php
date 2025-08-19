<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Proveedor;
use App\Models\OrdenCompra;
use App\Models\Banco;
use App\Models\MovimientoBancario;
use App\Models\Gasto;
use App\Models\Jugador;
use App\Models\PagoJugador;
use App\Models\AbonoDeudaJugador;
use Carbon\Carbon;

class EstadoCuentaController extends Controller
{
    public function generarPdfEstadoCuentaProveedor(Request $request)
    {
        $data = $this->generarEstadoCuentaProveedor($request)->getData(true);
        $pdf = Pdf::loadView('pdf.estado_cuenta_proveedor', ['data' => $data]);
        return $pdf->stream('estado_cuenta_proveedor_' . $data['proveedor']['nombre_empresa'] . '.pdf');
    }

    public function generarEstadoCuentaProveedor(Request $request)
    {
        $request->validate([
            'proveedor_id' => 'required|exists:proveedores,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        ]);

        $proveedor = Proveedor::findOrFail($request->proveedor_id);

        $ordenes = OrdenCompra::with(['articulo', 'banco', 'compra'])
            ->where('proveedor_id', $proveedor->id)
            ->whereBetween('created_at', [$request->fecha_inicio, $request->fecha_fin])
            ->get();

        $resumen = [
            'total' => 0,
            'pagadas' => 0,
            'pendientes' => 0,
            'vencidas' => 0,
            'canceladas' => 0,
            'por_pagar' => 0,
        ];

        $estatusMap = [
            'Pagada' => 'pagadas',
            'Pendiente' => 'pendientes',
            'Vencida' => 'vencidas',
            'Cancelada' => 'canceladas'
        ];

        $ordenes_formateadas = $ordenes->map(function ($orden) use (&$resumen, $proveedor, $estatusMap) {
            $resumen['total'] += $orden->total;

            $claveResumen = $estatusMap[$orden->estatus] ?? null;
            if ($claveResumen) {
                $resumen[$claveResumen] += $orden->total;
            }

            $fecha_vencimiento = null;
            if ($proveedor->credito_dias) {
                $fecha_vencimiento = Carbon::parse($orden->created_at)->addDays($proveedor->credito_dias);

                if (now()->greaterThan($fecha_vencimiento)) {
                    $resumen['vencidas'] += $orden->total;
                }
            }

            return [
                'numero_oc' => $orden->numero_oc,
                'fecha' => Carbon::parse($orden->created_at)->format('d/m/Y'),
                'articulo' => $orden->articulo->nombre ?? '-',
                'cantidad' => $orden->cantidad_articulo,
                'precio' => $orden->precio_articulo,
                'subtotal' => $orden->subtotal,
                'total' => $orden->total,
                'impuesto' => $orden->impuesto,
                'metodo_pago' => optional($orden->compra)->metodo_pago,
                'banco' => $orden->banco->nombre ?? '-',
                'estatus' => $orden->estatus,
                'fecha_vencimiento' => $fecha_vencimiento ? $fecha_vencimiento->format('d/m/Y') : 'N/A'
            ];
        });

        $resumen['por_pagar'] = $resumen['pendientes'] + $resumen['vencidas'];

        return response()->json([
            'proveedor' => $proveedor,
            'periodo' => [
                'inicio' => $request->fecha_inicio,
                'fin' => $request->fecha_fin
            ],
            'ordenes' => $ordenes_formateadas,
            'resumen' => $resumen,
        ]);
    }

    public function generarPdfEstadoCuentaBanco(Request $request)
    {
        $data = $this->generarEstadoCuentaBanco($request)->getData(true);
        $pdf = Pdf::loadView('pdf.estado_cuenta_banco', ['data' => $data]);
        return $pdf->stream('estado_cuenta_banco_' . $data['banco']['nombre'] . '.pdf');
    }

    public function generarEstadoCuentaBanco(Request $request)
    {
        $request->validate([
            'banco_id' => 'required|exists:bancos,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        ]);

        $banco = Banco::findOrFail($request->banco_id);
        $inicio = Carbon::parse($request->fecha_inicio);
        $fin = Carbon::parse($request->fecha_fin);

        // Movimientos bancarios
        $movimientos_bancarios = MovimientoBancario::where('banco_id', $banco->id)
            ->whereBetween('fecha', [$inicio, $fin])
            ->orderBy('fecha')
            ->get();

        $movimientos = $movimientos_bancarios->map(function ($mov) {
            $modulo = match($mov->origen_type) {
                'gasto', 'App\\Models\\Gasto' => 'Gasto',
                'compra', 'App\\Models\\Compra' => 'Compra',
                'pago_jugador', 'App\\Models\\PagoJugador' => 'Pago de jugador',
                'abonos_deudas_jugadores', 'App\\Models\\AbonoDeudaJugador' => 'Abonos de jugador',
                default => 'Sin origen',
            };

            return [
                'id' => $mov->id,
                'fecha' => $mov->fecha,
                'tipo_movimiento' => $mov->tipo_movimiento,
                'concepto' => $mov->concepto,
                'referencia' => $mov->referencia,
                'monto' => $mov->monto,
                'metodo_pago' => $mov->metodo_pago,
                'banco' => $mov->banco,
                'modulo' => $modulo,
            ];
        });

        // Gastos
        $gastos = Gasto::with(['concepto'])
            ->where('banco_id', $banco->id)
            ->whereBetween('created_at', [$inicio, $fin])
            ->get();

        // Órdenes de compra pagadas
        $ordenes = OrdenCompra::with(['proveedor', 'banco', 'articulo'])
            ->where('banco_id', $banco->id)
            ->where('estatus', 'Pagada')
            ->whereBetween('created_at', [$inicio, $fin])
            ->get();

        // pagos a jugador
        $pagos_jugadores = PagoJugador::with(['deuda_jugador.jugador', 'deuda_jugador.abonos_deudas', 'deuda_jugador.costo_categoria.categoria.temporada', 'deuda_jugador.costo_categoria.concepto_cobro', 'banco'])
            ->where('banco_id', $banco->id)
            ->whereBetween('created_at', [$inicio, $fin])
            ->get();

        // Abonos a pagos de jugadores
        $abonos = AbonoDeudaJugador::with(['deuda_jugador.jugador', 'deuda_jugador.costo_categoria.concepto_cobro', 'deuda_jugador.costo_categoria.categoria.temporada', 'banco'])
            ->where('banco_id', $banco->id)
            ->whereBetween('created_at', [$inicio, $fin])
            ->get();

        // Calcular totales
        $totalIngresos = $movimientos->where('tipo_movimiento', 'Ingreso')->sum('monto');
        $totalEgresos = $movimientos->where('tipo_movimiento', 'Egreso')->sum('monto');

        $balance = $totalIngresos - $totalEgresos;

        return response()->json([
            'banco' => $banco,
            'periodo' => [
                'inicio' => $inicio->toDateString(),
                'fin' => $fin->toDateString(),
            ],
            'movimientos' => $movimientos,
            'gastos' => $gastos,
            'ordenes_compra' => $ordenes,
            'pagos_jugadores' => $pagos_jugadores,
            'abonos' => $abonos,
            'resumen' => [
                'ingresos' => $totalIngresos,
                'egresos' => $totalEgresos,
                'balance' => $balance,
            ]
        ]);
    }
}
