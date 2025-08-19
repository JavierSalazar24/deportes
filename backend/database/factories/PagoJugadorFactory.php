<?php

namespace Database\Factories;

use App\Models\PagoJugador;
use App\Models\DeudaJugador;
use App\Models\Banco;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Carbon\Carbon;

class PagoJugadorFactory extends Factory
{
    protected $model = PagoJugador::class;

    public function definition(): array
    {
        $metodo = Arr::random([
            'Transferencia bancaria',
            'Tarjeta de crédito/débito',
            'Efectivo',
            'Cheques',
        ]);

        return [
            'deuda_jugador_id' => DeudaJugador::factory(),
            'banco_id'         => Banco::inRandomOrder()->value('id') ?? Banco::factory(),
            'metodo_pago'      => $metodo,
            'referencia'       => in_array($metodo, ['Transferencia bancaria','Tarjeta de crédito/débito'])
                                 ? $this->faker->bothify('REF########')
                                 : null,
            'fecha_pagado'     => Carbon::now()->subDays($this->faker->numberBetween(0, 30))->toDateString(),
        ];
    }
}
