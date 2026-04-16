<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ConceptoCobro;

class ConceptosCobroSeeder extends Seeder
{
    public function run(): void
    {
        ConceptoCobro::factory()->count(4)->sequence(
            ['nombre'=>'Inscripción','periodicidad'=>'Temporada'],
            ['nombre'=>'Uniforme','periodicidad'=>'Temporada'],
            ['nombre'=>'Entrenamiento','periodicidad'=>'Mensual'],
            ['nombre'=>'Viaje','periodicidad'=>'Quincenal'],
        )->create();
    }
}