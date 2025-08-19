<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Banco;

class RecalcularSaldosBancarios extends Command
{
    protected $signature = 'banco:recalcular';
    protected $description = 'Recalcula el saldo de todos los bancos a partir de los movimientos bancarios.';

    public function handle()
    {
        $this->info("Recalculando saldos...");

        Banco::with('movimientos')->chunk(50, function ($bancos) {
            foreach ($bancos as $banco) {
                $saldo = $banco->movimientos->sum(function ($mov) {
                    return $mov->tipo_movimiento === 'Ingreso' ? $mov->monto : -$mov->monto;
                });

                $banco->update(['saldo' => $saldo]);
                $this->line("Banco #{$banco->id} actualizado: nuevo saldo = $saldo");
            }
        });

        $this->info("Recalculo completo.");
    }
}
