<?php

namespace Database\Factories;

use App\Models\AlmacenSalida;
use App\Models\Articulo;
use App\Models\Jugador;
use App\Models\Almacen;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlmacenSalidaFactory extends Factory
{
    protected $model = AlmacenSalida::class;

    public function definition(): array
    {
        $motivo = $this->faker->randomElement([
            'Asignado', 'Devolución a proveedor', 'Venta', 'Destrucción', 'Mantenimiento', 'Robo', 'Pérdida', 'Otro'
        ]);

        // Solo tomamos artículos disponibles
        $almacen = Almacen::where('estado', 'Disponible')->inRandomOrder()->first();

        return [
            'jugador_id' => $motivo === 'Asignado' ? Jugador::inRandomOrder()->first()?->id : null,
            'articulo_id' => $almacen?->articulo_id,
            'numero_serie' => $almacen?->numero_serie,
            'fecha_salida' => $this->faker->date(),
            'motivo_salida' => $motivo,
            'motivo_salida_otro' => $motivo === 'Otro' ? $this->faker->sentence() : null,
        ];
    }
}