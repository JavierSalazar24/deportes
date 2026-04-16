<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Jugador;
use App\Models\Usuario;
use App\Models\Categoria;

class JugadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $tutores = Usuario::whereHas('rol', function($q) {
            $q->where('nombre', 'Tutor');
        })->take(20)->get();

        $activas   = Categoria::whereHas('temporada', fn ($q) => $q->where('estatus', 'Activa'))->inRandomOrder()->take(10)->pluck('id');
        $inactivas = Categoria::whereHas('temporada', fn ($q) => $q->where('estatus', 'Inactiva'))->inRandomOrder()->take(10)->pluck('id');

        $faltan = 10 - $activas->count();
        if ($faltan > 0) {
            $activas = $activas->merge(
                Categoria::whereHas('temporada', fn ($q) => $q->where('estatus', 'Activa'))
                         ->whereNotIn('id', $activas)
                         ->inRandomOrder()
                         ->take($faltan)
                         ->pluck('id')
            );
        }

        $faltan = 10 - $inactivas->count();
        if ($faltan > 0) {
            $inactivas = $inactivas->merge(
                Categoria::whereHas('temporada', fn ($q) => $q->where('estatus', '!=', 'Activa'))
                         ->whereNotIn('id', $inactivas)
                         ->inRandomOrder()
                         ->take($faltan)
                         ->pluck('id')
            );
        }

        foreach ($tutores as $index => $tutor) {

            $categoriaId = $index < 10
                           ? $activas[$index % $activas->count()]
                           : $inactivas[($index-10) % $inactivas->count()];

            Jugador::factory()->create([
                'usuario_id'   => $tutor->id,
                'categoria_id' => $categoriaId,
            ]);
        }
    }
}