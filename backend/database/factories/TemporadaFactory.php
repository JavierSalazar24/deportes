<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Temporada>
 */
class TemporadaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = \App\Models\Temporada::class;

    public function definition()
    {
        return [
            'nombre'       => $this->faker->sentence(2),
            'fecha_inicio' => $this->faker->date(),
            'fecha_fin'    => $this->faker->date(),
            'estatus'      => 'Finalizada',
        ];
    }
}