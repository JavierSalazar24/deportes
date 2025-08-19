<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\ConceptoCobro;
use App\Models\CategoriaConceptoCobro;
use Illuminate\Database\Eloquent\Factories\Factory;

class CostoCategoria extends Factory
{
    protected $model = CategoriaConceptoCobro::class;

    public function definition(): array
    {
        return [
            'categoria_id'      => Categoria::factory(),
            'concepto_cobro_id' => ConceptoCobro::factory(),
            'monto_base'        => $this->faker->randomFloat(2, 500, 2500),
        ];
    }
}