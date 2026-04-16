<?php

namespace Database\Factories;

use App\Models\AbonoDeudaJugador;        // modelo → tabla abonos_deudas_jugadores
use App\Models\DeudaJugador;
use App\Models\Banco;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Carbon\Carbon;

class AbonoDeudaJugadorFactory extends Factory
{
    protected $model = AbonoDeudaJugador::class;

    public function definition(): array
    {
        $metodo = Arr::random([
            'Transferencia bancaria',
            'Tarjeta de crédito/débito',
            'Efectivo',
            'Cheques',
            'Descuento nómina',
            'Otro',
        ]);

        return [
            'banco_id'         => Banco::inRandomOrder()->value('id') ?? Banco::factory(),
            'deuda_jugador_id' => DeudaJugador::factory(),
            'monto'            => $this->faker->randomFloat(2, 50, 2_000),
            'fecha'            => Carbon::now()->subDays($this->faker->numberBetween(1, 30))->toDateString(),
            'metodo_pago'      => $metodo,
            'referencia'       => in_array($metodo, ['Transferencia bancaria','Tarjeta de crédito/débito'])
                                  ? $this->faker->bothify('ABN########')
                                  : null,
            'observaciones'    => $this->faker->optional()->sentence(),
        ];
    }
}