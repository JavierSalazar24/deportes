<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class LimpiarLogsAntiguos extends Command
{
    protected $signature = 'limpiar:logs';
    protected $description = 'Elimina registros de logs con antigüedad de un año o más.';

    public function handle()
    {
        $fechaLimite = now()->subYear();
        $total = DB::table('logs')->where('created_at', '<', $fechaLimite)->count();

        if ($total === 0) {
            $this->info("No hay logs para eliminar.");
            return 0;
        }

        try {
            $eliminados = DB::table('logs')
                ->where('created_at', '<', $fechaLimite)
                ->delete();

            $this->info("Se eliminaron {$eliminados} logs antiguos.");
        } catch (\Exception $e) {
            $this->error("Error al eliminar logs: " . $e->getMessage());
        }

        return 0;
    }
}
