<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\{
    Banco,
    MovimientoBancario,
    PagoJugador,
    AbonoDeudaJugador,
    Gasto,
    Compra
};
use Carbon\Carbon;

class MovimientosBancariosSeeder extends Seeder
{
    public function boot()
    {
        Relation::enforceMorphMap([
            'pago_jugador'              => PagoJugador::class,
            'abonos_deudas_jugadores'   => AbonoDeudaJugador::class,
            'gasto'                     => Gasto::class,
            'compra'                    => Compra::class,
        ]);
    }

    public function run(): void
    {
        /*───────────────────────────────────────────────────────────────────
         | 1. INGRESOS  →  PAGOS DE JUGADORES  (estatus Pagado)
         ───────────────────────────────────────────────────────────────────*/
        PagoJugador::with(['banco', 'deuda_jugador'])
            ->chunk(200, function ($pagos) {
                foreach ($pagos as $pago) {
                    $jugador = $pago->deuda_jugador->jugador->nombre.' '.$pago->deuda_jugador->jugador->apellido_p.' '.$pago->deuda_jugador->jugador->apellido_m;

                    MovimientoBancario::updateOrCreate(
                        [
                            'origen_type' => $pago->getMorphClass(), // respeta morph map
                            'origen_id'   => $pago->id,
                        ],
                        [
                            'banco_id'        => $pago->banco_id,
                            'tipo_movimiento' => 'Ingreso',
                            'concepto'        => 'Pago del jugador: '.$jugador,
                            'fecha'           => $pago->fecha_pagado ?? $pago->created_at->toDateString(),
                            'referencia'      => $pago->referencia,
                            'monto'           => $pago->deuda_jugador->monto_final,
                            'metodo_pago'     => $pago->metodo_pago ?? 'Efectivo',
                        ]
                    );
                }
        });

        /** ------------------------------------------------------------------
         * 2. INGRESOS  →  ABONOS DE PAGOS (parciales)
         * ----------------------------------------------------------------- */
        AbonoDeudaJugador::with(['banco', 'deuda_jugador'])->chunk(200, function ($abonos) {
            foreach ($abonos as $abono) {
                $jugador = $abono->deuda_jugador->jugador->nombre.' '.$abono->deuda_jugador->jugador->apellido_p.' '.$abono->deuda_jugador->jugador->apellido_m;

                MovimientoBancario::updateOrCreate(
                    [
                        'origen_type' => $abono->getMorphClass(),
                        'origen_id'   => $abono->id,
                    ],
                    [
                        'banco_id'        => $abono->banco_id,
                        'tipo_movimiento' => 'Ingreso',
                        'concepto'        => 'Abono del jugador: '.$jugador,
                        'fecha'           => $abono->fecha,
                        'referencia'      => $abono->referencia,
                        'monto'           => $abono->monto,
                        'metodo_pago'     => $abono->metodo_pago,
                    ]
                );
            }
        });

        /** ------------------------------------------------------------------
         * 3. EGRESOS → GASTOS
         * ----------------------------------------------------------------- */
        Gasto::with('banco')->chunk(200, function ($gastos) {
            foreach ($gastos as $gasto) {
                MovimientoBancario::updateOrCreate(
                    [
                        'origen_type' => $gasto->getMorphClass(),
                        'origen_id'   => $gasto->id,
                    ],
                    [
                        'banco_id'        => $gasto->banco_id,
                        'tipo_movimiento' => 'Egreso',
                        'concepto'        => 'Gasto: '.$gasto->concepto?->nombre,
                        'fecha'           => $gasto->created_at->toDateString(),
                        'referencia'      => $gasto->referencia,
                        'monto'           => $gasto->total,
                        'metodo_pago'     => $gasto->metodo_pago,
                    ]
                );
            }
        });

        /** ------------------------------------------------------------------
         * 3. EGRESOS  →  COMPRAS  (ligadas a OC pagada)
         * ----------------------------------------------------------------- */
        Compra::with('orden_compra.banco')
            ->chunk(200, function ($compras) {
                foreach ($compras as $compra) {
                    $oc    = $compra->orden_compra;
                    $banco = $oc->banco;

                    MovimientoBancario::updateOrCreate(
                        [
                            'origen_type' => $compra->getMorphClass(),
                            'origen_id'   => $compra->id,
                        ],
                        [
                            'banco_id'        => $banco->id,
                            'tipo_movimiento' => 'Egreso',
                            'concepto'        => 'Compra: '.$oc->numero_oc,
                            'fecha'           => $compra->created_at->toDateString(),
                            'referencia'      => $compra->referencia,
                            'monto'           => $oc->total,
                            'metodo_pago'     => $compra->metodo_pago,
                        ]
                    );
                }
        });
    }
}
