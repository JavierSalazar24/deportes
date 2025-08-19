<?php

namespace Database\Seeders;

use App\Models\Equipamiento;
use App\Models\DetalleEquipamiento;
use App\Models\Almacen;
use App\Models\Jugador;
use App\Models\AlmacenSalida;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipamientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $jugadores = Jugador::all();

         $articulosDisponibles = Almacen::where('estado', 'Disponible')->get();

        if ($articulosDisponibles->count() < 1) {
            $this->command->warn("No hay artículos disponibles en almacén para asignar.");
            return;
        }

        for ($i = 0; $i < 3; $i++) {
            $jugador = $jugadores->random();

            // 1. Crear el equipamiento
            $equipamiento = Equipamiento::factory()->create([
                'jugador_id' => $jugador->id,
            ]);

            // 2. Selecciona de 1 a 5 artículos disponibles únicos para esta entrega
            $articulosAsignar = $articulosDisponibles->where('estado', 'Disponible')->shuffle()->take(rand(1, min(5, $articulosDisponibles->count())));

            foreach ($articulosAsignar as $almacen) {
                // 3. Crea el detalle de equipamiento con el número de serie real
                DetalleEquipamiento::factory()->create([
                    'equipamiento_id' => $equipamiento->id,
                    'articulo_id' => $almacen->articulo_id,
                    'numero_serie' => $almacen->numero_serie,
                ]);

                // 4. Actualiza el estado en almacén a "Asignado"
                $almacen->update(['estado' => 'Asignado']);

                // 5. Registra la salida en almacén_salidas
                AlmacenSalida::create([
                    'jugador_id' => $jugador->id,
                    'articulo_id' => $almacen->articulo_id,
                    'numero_serie' => $almacen->numero_serie,
                    'fecha_salida' => Carbon::now()->format('Y-m-d'),
                    'motivo_salida' => 'Asignado',
                    'motivo_salida_otro' => null,
                ]);
            }

            // Importante: Elimina los artículos ya asignados para no volverlos a usar en el mismo ciclo
            $articulosDisponibles = Almacen::where('estado', 'Disponible')->get();
            if ($articulosDisponibles->count() < 1) {
                $this->command->warn("Se acabaron los artículos disponibles.");
                break;
            }
        }
    }
}