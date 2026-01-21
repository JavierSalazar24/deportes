<?php

namespace App\Console\Commands;

use App\Models\Partido;
use Illuminate\Console\Command;

class EnviarAvisosPartidos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'avisos:partidos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notifica los partidos del día (07:00 a 23:59) una sola vez';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {

            $now = now();
            $inicio = $now->copy()->startOfDay()->setTime(7, 0, 0);
            $fin    = $now->copy()->startOfDay()->setTime(23, 59, 59);

            $this->info("Buscando partidos de hoy entre {$inicio} y {$fin}...");

            Partido::query()
                ->with(['categoria.jugadores.usuario'])
                ->whereNull('notificado_dia_at')
                ->whereBetween('fecha_hora', [$inicio, $fin])
                ->chunkById(50, function ($partidos) use ($now) {

                    $this->info("Se encontraron {$partidos->count()} partidos en este bloque.");

                    foreach ($partidos as $partido) {

                        $claimed = Partido::whereKey($partido->id)
                            ->whereNull('notificado_dia_at')
                            ->update(['notificado_dia_at' => $now]);

                        if ($claimed !== 1) {
                            continue;
                        }

                        if (!$partido->categoria) {
                            $this->error("El partido ID {$partido->id} no tiene categoría asignada.");
                            continue;
                        }

                        foreach ($partido->categoria->jugadores as $jugador) {
                            $usuario = $jugador->usuario;

                            if ($usuario && $usuario->email) {
                                $this->info("Notificando a: {$usuario->email} (Partido {$partido->id})");
                                $usuario->notify(new \App\Notifications\AvisoPartido($partido, $jugador));
                            } else {
                                $this->warn("Jugador ID {$jugador->id} no tiene usuario o email.");
                            }
                        }
                    }
                });

            $this->info("Avisos enviados.");
            return 0;
        } catch (\Throwable $e) {
            $this->error("Error en el comando: " . $e->getMessage());
            $this->error($e->getTraceAsString());
            return 1;
        }
    }
}