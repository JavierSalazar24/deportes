<?php

namespace Database\Factories;

use App\Models\DeudaJugador;
use App\Models\Jugador;
use App\Models\CostoCategoria;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Carbon\Carbon;

class DeudaJugadorFactory extends Factory
{
    protected $model = DeudaJugador::class;

    public function definition(): array
    {
        $montoBase  = $this->faker->randomFloat(2, 800, 5_000);
        $extra      = $this->faker->boolean(30) ? $this->faker->randomFloat(2, 50, 500) : 0;
        $descuento  = $this->faker->boolean(20) ? $this->faker->randomFloat(2, 50, 500) : 0;
        $montoFinal = ($montoBase + $extra) - $descuento;

        $estatus = Arr::random(['Pendiente', 'Parcial', 'Pagado', 'Cancelado']);
        $saldo   = match ($estatus) {
            'Pendiente', 'Cancelado' => $montoFinal,
            'Pagado'                 => 0,
            'Parcial'                => $this->faker->randomFloat(2, 1, $montoFinal - 1),
        };

        return [
            'jugador_id'         => Jugador::inRandomOrder()->value('id')        ?? Jugador::factory(),
            'costo_categoria_id' => CostoCategoria::inRandomOrder()->value('id') ?? CostoCategoria::factory(),
            'monto_base'         => $montoBase,
            'extra'              => $extra,
            'descuento'          => $descuento,
            'monto_final'        => $montoFinal,
            'saldo_restante'     => $saldo,
            'estatus'            => $estatus,
            'notas'              => $this->faker->optional()->sentence(),
            'fecha_pago'         => Carbon::now()->add(1, 'week'),
            'fecha_limite'       => Carbon::now()->add(2, 'week'),
        ];
    }

    public function pagado()    { return $this->state(fn() => ['estatus'=>'Pagado',  'saldo_restante'=>0]); }
    public function pendiente() { return $this->state(fn() => ['estatus'=>'Pendiente']); }
    public function parcial()   { return $this->state(fn() => ['estatus'=>'Parcial']); }
}