<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categoria>
 */
class CategoriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = \App\Models\Categoria::class;

    public function definition()
    {
        return [
            'temporada_id' => 1, // lo sobrescribimos en el seeder
            'nombre'       => $this->faker->word(),
            'genero'       => $this->faker->randomElement(['Hombre', 'Mujer']),
            'fecha_inicio' => $this->faker->date(),
            'fecha_fin'    => $this->faker->date(),
        ];
    }
}