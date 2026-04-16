<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Categoria, ConceptoCobro, CostoCategoria};

class CostosCategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'Inscripción'   => ['monto' => 1200],
            'Uniforme'      => ['monto' => 2000],
            'Entrenamiento' => ['monto' =>  500],
            'Viaje'         => ['monto' => 1000],
        ];

        $conceptos = ConceptoCobro::all();

        Categoria::with('temporada')->chunkById(500, function ($categorias) use ($conceptos, $defaults) {
            foreach ($categorias as $cat) {
                foreach ($conceptos as $con) {
                    CostoCategoria::firstOrCreate(
                        [
                            'categoria_id'      => $cat->id,
                            'concepto_cobro_id' => $con->id,
                        ],
                        [
                            'monto_base' => $defaults[$con->nombre]['monto'] ?? 1000,
                        ]
                    );
                }
            }
        });
    }
}
