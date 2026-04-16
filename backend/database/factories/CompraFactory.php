<?php

namespace Database\Factories;

use App\Models\OrdenCompra;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class CompraFactory extends Factory
{
    public function definition(): array
    {
        $metodo = Arr::random([
            'Transferencia bancaria',
            'Tarjeta de crédito/débito',
            'Efectivo',
            'Cheques',
        ]);

        return [
            'orden_compra_id' => OrdenCompra::where('estatus', 'Pagada')->inRandomOrder()->first()->id ?? OrdenCompra::factory()->create(['estatus' => 'Pagada'])->id,
            'metodo_pago' => $metodo,
            'referencia' => in_array($metodo, ['Transferencia bancaria','Tarjeta de crédito/débito']) ? $this->faker->bothify('REF########') : null,
        ];
    }
}
