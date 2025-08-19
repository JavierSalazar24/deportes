<?php

namespace Database\Factories;

use App\Models\MovimientoBancario;
use App\Models\Banco;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Carbon\Carbon;

class MovimientoBancarioFactory extends Factory
{
    protected $model = MovimientoBancario::class;

    public function definition(): array
    {
        $tipo      = Arr::random(['Ingreso', 'Egreso']);
        $metodo    = Arr::random([
            'Transferencia bancaria',
            'Tarjeta de crédito/débito',
            'Efectivo',
            'Cheques',
            'Descuento nómina',
            'Otro'
        ]);

        return [
            'banco_id'        => Banco::inRandomOrder()->value('id') ?? Banco::factory(),
            'tipo_movimiento' => $tipo,
            'concepto'        => $this->faker->sentence(),
            'fecha'           => Carbon::now()->subDays($this->faker->numberBetween(1, 120))->toDateString(),
            'referencia'      => in_array($metodo, ['Transferencia bancaria','Tarjeta de crédito/débito'])
                                ? $this->faker->bothify('REF########')
                                : null,
            'monto'           => $this->faker->randomFloat(2, 100, 10_000),
            'metodo_pago'     => $metodo,
            'origen_id'       => null,
            'origen_type'     => null,
        ];
    }
}