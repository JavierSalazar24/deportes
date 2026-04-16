<?php

namespace Database\Factories;

use App\Models\ConceptoCobro;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConceptoCobroFactory extends Factory
{
    protected $model = ConceptoCobro::class;

    public function definition(): array
    {
        return [
            'nombre'        => $this->faker->unique()->randomElement(['Inscripción','Uniforme','Entrenamiento','Viaje']),
            'periodicidad'  => $this->faker->randomElement(['Diario', 'Semanal', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Cuatrimestral', 'Semestral', 'Anual', 'Temporada']),
        ];
    }
}
