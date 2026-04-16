<?php

namespace Database\Factories;

use App\Models\Equipamiento;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquipamientoFactory extends Factory
{
    public function definition()
    {
        return [
            'fecha_entrega' => $this->faker->dateTimeBetween('-2 months', 'now')->format('Y-m-d'),
            'fecha_devuelto' => null,
            'devuelto' => 'NO',
        ];
    }
}
