<?php

namespace Database\Factories;

use App\Models\Articulo;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticuloFactory extends Factory
{
    protected $model = Articulo::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->unique()->word,
            'precio_compra' => $this->faker->randomFloat(2, 100, 1000),
            'precio_venta' => $this->faker->randomFloat(2, 120, 1200),
            'precio_reposicion' => $this->faker->randomFloat(2, 80, 900),
        ];
    }
}
