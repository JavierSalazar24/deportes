<?php

namespace Database\Factories;

use App\Models\Gasto;
use App\Models\Banco;
use App\Models\Concepto;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class GastoFactory extends Factory
{
    protected $model = Gasto::class;

    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 100, 1000);
        $impuesto = $this->faker->boolean;
        $total = $impuesto ? $subtotal * 0.16 : $subtotal;

        $metodo = Arr::random([
            'Transferencia bancaria',
            'Tarjeta de crédito/débito',
            'Efectivo',
            'Cheques',
        ]);

        return [
            'metodo_pago' => $metodo,
            'referencia' => in_array($metodo, ['Transferencia bancaria','Tarjeta de crédito/débito']) ? $this->faker->bothify('REF########') : null,
            'impuesto' => $impuesto,
            'subtotal' => $subtotal,
            'total' => $total,
        ];
    }
}