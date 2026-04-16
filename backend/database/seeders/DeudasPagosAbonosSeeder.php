<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;
use App\Models\{
    Temporada,
    Jugador,
    CostoCategoria,
    DeudaJugador,
    PagoJugador,
    AbonoDeudaJugador,
    CajaPago,
    Banco
};
use Carbon\CarbonImmutable;
use Faker\Factory as Faker;
use Illuminate\Support\Arr;

class DeudasPagosAbonosSeeder extends Seeder
{
    /** Mapa de saltos por periodicidad */
    private array $saltos;

    public function __construct()
    {
        $this->saltos = [
            'Diario'        => fn (CarbonImmutable $d) => $d->addDay(),
            'Semanal'       => fn (CarbonImmutable $d) => $d->addWeek(),
            'Quincenal'     => fn (CarbonImmutable $d) => $d->addDays(15),
            'Mensual'       => fn (CarbonImmutable $d) => $d->addMonth(),
            'Bimestral'     => fn (CarbonImmutable $d) => $d->addMonths(2),
            'Trimestral'    => fn (CarbonImmutable $d) => $d->addMonths(3),
            'Cuatrimestral' => fn (CarbonImmutable $d) => $d->addMonths(4),
            'Semestral'     => fn (CarbonImmutable $d) => $d->addMonths(6),
            'Anual'         => fn (CarbonImmutable $d) => $d->addYear(),
            'Temporada'     => null, // se maneja aparte (una sola deuda)
        ];
    }

    public function run(): void
    {
        $faker = Faker::create();

        /* ─────────────────────────────────────────────
         * 1) TEMPORADA ACTIVA → TODOS los jugadores
         * ───────────────────────────────────────────── */
        $activa = Temporada::where('estatus', 'Activa')->first();
        if ($activa) {
            $jugadoresActiva = Jugador::whereHas('categoria', fn ($q) =>
                $q->where('temporada_id', $activa->id)
            )
            ->with('categoria.temporada')
            ->get();

            foreach ($jugadoresActiva as $jugador) {
                $inicio = CarbonImmutable::today(); // inicia hoy para la activa
                $fin    = CarbonImmutable::parse($jugador->categoria->temporada->fecha_fin);
                $this->procesarJugador($jugador, $inicio, $fin, $faker);
            }
        } else {
            $this->command->warn('No existe temporada Activa.');
        }

        /* ─────────────────────────────────────────────
         * 2) TODAS LAS TEMPORADAS FINALIZADAS
         *    → TODOS los jugadores de esas temporadas
         * ───────────────────────────────────────────── */
        $jugadoresFinalizadas = Jugador::whereHas('categoria.temporada', fn ($q) =>
                $q->where('estatus', 'Finalizada')
            )
            ->with('categoria.temporada')
            ->get();

        foreach ($jugadoresFinalizadas as $jugador) {
            // desde el inicio de su temporada hasta el fin (histórico completo)
            $inicio = CarbonImmutable::parse($jugador->categoria->temporada->fecha_inicio);
            $fin    = CarbonImmutable::parse($jugador->categoria->temporada->fecha_fin);
            $this->procesarJugador($jugador, $inicio, $fin, $faker);
        }
    }

    /**
     * Genera deudas (y pagos/abonos) para un jugador en el rango [inicio, fin].
     */
    private function procesarJugador(Jugador $jugador, CarbonImmutable $inicio, CarbonImmutable $fin, $faker): void
    {
        $costos = CostoCategoria::with('concepto_cobro')
                  ->where('categoria_id', $jugador->categoria_id)
                  ->get();

        foreach ($costos as $costo) {
            $cursor       = $inicio->clone();
            $periodicidad = $costo->concepto_cobro->periodicidad;

            do {
                // fecha_pago = cursor + 7d (o último día del mes si cruza de mes)
                $pagoTent  = $cursor->addWeek();
                $fechaPago = $pagoTent->month === $cursor->month
                           ? $pagoTent
                           : $cursor->endOfMonth();

                $fechaLimite = $fechaPago->addWeek();

                // Montos y estatus con distribución variada
                $extra     = $faker->boolean(25) ? $faker->randomFloat(2, 30, 250) : 0;
                $descuento = $faker->boolean(15) ? $faker->randomFloat(2, 30, 250) : 0;
                $montoFin  = max(($costo->monto_base + $extra) - $descuento, 1);

                $estatus = Arr::random(['Pendiente','Parcial','Pagado','Cancelado']);
                $saldo   = match ($estatus) {
                    'Pendiente','Cancelado' => $montoFin,
                    'Pagado'                => 0,
                    'Parcial'               => $faker->randomFloat(2, 1, max($montoFin - 1, 1)),
                };

                // Evitar duplicados por unique(jugador_id, costo_categoria_id, fecha_pago)
                $deuda = DeudaJugador::firstOrCreate(
                    [
                        'jugador_id'         => $jugador->id,
                        'costo_categoria_id' => $costo->id,
                        'fecha_pago'         => $fechaPago,
                    ],
                    [
                        'monto_base'      => $costo->monto_base,
                        'extra'           => $extra,
                        'descuento'       => $descuento,
                        'monto_final'     => $montoFin,
                        'saldo_restante'  => $saldo,
                        'estatus'         => $estatus,
                        'fecha_limite'    => $fechaLimite,
                    ]
                );

                // Generar pagos/abonos coherentes con el estatus
                $this->generarPagosAbonos($deuda, $faker);

                // Avanzar cursor según periodicidad
                if ($periodicidad === 'Temporada') {
                    break; // solo una deuda por temporada
                }
                $cursor = ($this->saltos[$periodicidad])($cursor);

            } while ($cursor->lte($fin));
        }
    }

    /**
     * Genera pagos y/o abonos según el estatus de la deuda.
     * - Pagado   → crea PagoJugador + un abono que cubre todo (mismo método y referencia)
     * - Parcial  → crea 1–3 abonos que suman lo abonado. Cada abono puede tener su método
     *              (si es Transferencia/Tarjeta, se genera referencia).
     * - Pendiente/Cancelado → no crea movimientos
     */
    private function generarPagosAbonos(DeudaJugador $deuda, $faker): void
    {
        if ($deuda->estatus === 'Pagado') {
            $bancoId = Banco::inRandomOrder()->value('id') ?? Banco::factory()->create()->id;

            // Método de pago aleatorio y referencia si aplica
            $metodoPago = Arr::random([
                'Transferencia bancaria',
                'Tarjeta de crédito/débito',
                'Efectivo',
                'Cheques',
            ]);
            $referencia = in_array($metodoPago, ['Transferencia bancaria','Tarjeta de crédito/débito'])
                        ? $faker->bothify('REF########')
                        : null;

            // Ticket de pago (uno por deuda)
            $pago = PagoJugador::firstOrCreate(
                ['deuda_jugador_id' => $deuda->id],
                [
                    'banco_id'     => $bancoId,
                    'metodo_pago'  => $metodoPago,
                    'referencia'   => $referencia,
                    'fecha_pagado' => $deuda->fecha_pago,
                ]
            );

            // CajaPago::create([
            //     'banco_id'         => $bancoId,
            //     'usuario_id'       => Auth::id(),
            //     'jugador_id'       => $deuda->jugador->id,
            //     'motivo'           => $deuda->costo_categoria->concepto_cobro->nombre . " ({$deuda->costo_categoria->categoria->nombre})",
            //     'concepto'         => "Pago completo",
            //     'monto'            => $deuda->monto_final,
            //     'metodo_pago'      => $metodoPago,
            //     'referencia'       => $referencia,
            // ]);

            // Abono total idempotente (usa mismo método y referencia)
            $deuda->abonos_deudas()->delete();
            AbonoDeudaJugador::create([
                'deuda_jugador_id' => $deuda->id,
                'banco_id'         => $bancoId,
                'monto'            => $deuda->monto_final,
                'fecha'            => $pago->fecha_pagado,
                'metodo_pago'      => $metodoPago,
                'referencia'       => $referencia,
            ]);

        } elseif ($deuda->estatus === 'Parcial') {
            $bancoId  = Banco::inRandomOrder()->value('id') ?? Banco::factory()->create()->id;
            $abonado  = max($deuda->monto_final - $deuda->saldo_restante, 1);
            $nAbonos  = $faker->numberBetween(1, 3);
            $restante = $abonado;

            // Limpieza para idempotencia
            $deuda->abonos_deudas()->delete();

            for ($i = 1; $i <= $nAbonos; $i++) {
                $monto = ($i === $nAbonos)
                       ? $restante
                       : round($faker->randomFloat(2, 1, max($restante - ($nAbonos - $i), 1)), 2);

                // Método aleatorio por abono + referencia si aplica
                $metodo = Arr::random([
                    'Transferencia bancaria',
                    'Tarjeta de crédito/débito',
                    'Efectivo',
                    'Cheques',
                ]);
                $ref = in_array($metodo, ['Transferencia bancaria','Tarjeta de crédito/débito'])
                     ? $faker->bothify('ABN########')
                     : null;

                AbonoDeudaJugador::create([
                    'deuda_jugador_id' => $deuda->id,
                    'banco_id'         => $bancoId,
                    'monto'            => $monto,
                    'fecha'            => $deuda->fecha_pago,
                    'metodo_pago'      => $metodo,
                    'referencia'       => $ref,
                ]);

                // CajaPago::create([
                //     'banco_id'         => $bancoId,
                //     'usuario_id'       => Auth::id(),
                //     'jugador_id'       => $deuda->jugador->id,
                //     'motivo'           => $deuda->costo_categoria->concepto_cobro->nombre . " ({$deuda->costo_categoria->categoria->nombre})",
                //     'concepto'         => "Abono de pago",
                //     'monto'            => $monto,
                //     'metodo_pago'      => $metodo,
                //     'referencia'       => $ref,
                // ]);

                $restante -= $monto;
            }
        }
    }
}
