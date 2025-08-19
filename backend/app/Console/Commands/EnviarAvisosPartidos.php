<?php

namespace App\Console\Commands;

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
    protected $description = 'Comando para avisar un día anterior sobre partidos';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            $manana = \Carbon\Carbon::tomorrow()->format('Y-m-d');
            $partidos = \App\Models\Partido::whereDate('fecha_hora', $manana)->get();

            $this->info("Buscando partidos para la fecha: $manana");
            $this->info("Se encontraron " . $partidos->count() . " partidos.");

            foreach ($partidos as $partido) {
                $this->info("Partido ID: {$partido->id}");
                if (!$partido->categoria) {
                    $this->error("El partido ID {$partido->id} no tiene categoría asignada.");
                    continue;
                }
                $jugadores = $partido->categoria->jugadores;

                foreach ($jugadores as $jugador) {
                    $usuario = $jugador->usuario;
                    if ($usuario && $usuario->email) {
                        $this->info("Notificando a usuario: {$usuario->email}");
                        $usuario->notify(new \App\Notifications\AvisoPartido($partido, $jugador));
                    } else {
                        $this->warn("Jugador ID {$jugador->id} no tiene usuario o email.");
                    }
                }
            }

            $this->info("Avisos enviados.");
            return 0;
        } catch (\Throwable $e) {
            $this->error("Error en el comando: " . $e->getMessage());
            $this->error($e->getTraceAsString());
            return 1;
        }
    }
}