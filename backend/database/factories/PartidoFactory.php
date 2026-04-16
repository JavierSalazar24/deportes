<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Categoria;
use App\Models\Partido;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PartidoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Partido::class;

    public function definition()
    {
        $categoria = Categoria::whereHas('temporada', function($q) {
            $q->where('estatus', 'Activa');
        })->inRandomOrder()->first();

        $fecha_inicio = $categoria->temporada->fecha_inicio;
        $fecha_fin = $categoria->temporada->fecha_fin;
        $fecha = $this->faker->dateTimeBetween($fecha_inicio, $fecha_fin);

        // Relación rival-foto y rival-lugar
        $equipos = [
            'Chivas'     => ['foto' => 'chivas.png',     'lugar' => 'Estadio Akron'],
            'America'    => ['foto' => 'america.png',    'lugar' => 'Estadio Azteca'],
            'Cruz Azul'  => ['foto' => 'cruz_azul.png',  'lugar' => 'Estadio Azul'],
            'Pumas'      => ['foto' => 'pumas.png',      'lugar' => 'Estadio Olimpico Universitario'],
            'Toluca'     => ['foto' => 'toluca.png',     'lugar' => 'Estadio Nemesio Diez'],
            'Pachuca'    => ['foto' => 'pachuca.png',    'lugar' => 'Estadio Hidalgo'],
        ];

        $rival = $this->faker->randomElement(array_keys($equipos));

        return [
            'categoria_id' => $categoria->id,
            'foto'         => $equipos[$rival]['foto'],
            'rival'        => $rival,
            'lugar'        => $equipos[$rival]['lugar'],
            'fecha_hora'   => $fecha->format('Y-m-d H:i:s'),
        ];
    }
}
