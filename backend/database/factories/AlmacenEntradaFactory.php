<?php

namespace Database\Factories;

use App\Models\AlmacenEntrada;
use App\Models\Articulo;
use App\Models\Jugador;
use App\Models\OrdenCompra;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlmacenEntradaFactory extends Factory
{
    protected $model = AlmacenEntrada::class;

    public function definition(): array
    {
        $tipoEntrada = $this->faker->randomElement([
            'Compra', 'Devolución de jugador', 'Cambio de equipo', 'Reparación terminada', 'Otro'
        ]);

        $isCompra = $tipoEntrada === 'Compra';
        $isOtro = $tipoEntrada === 'Otro';
        $isDevolucion = $tipoEntrada === 'Devolución de jugador';

        return [
            'jugador_id' => $isDevolucion ? Jugador::inRandomOrder()->first()?->id : null,
            'articulo_id' => Articulo::inRandomOrder()->first()?->id,
            'numero_serie' => strtoupper($this->faker->bothify('SERIE-####')),
            'fecha_entrada' => $this->faker->date(),
            'tipo_entrada' => $tipoEntrada,
            'otros_conceptos' => $isOtro ? $this->faker->sentence() : null,
            'orden_compra' => $isCompra ? OrdenCompra::inRandomOrder()->first()?->numero_oc : null,
        ];
    }
}