<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Temporada;
use App\Models\Categoria;
use Carbon\Carbon;

class TemporadaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categoriasBase = [
            ['nombre' => 'Infantil', 'edad_min' => 3,  'edad_max' => 5],
            ['nombre' => 'Juvenil',  'edad_min' => 6,  'edad_max' => 12],
            ['nombre' => 'Libre',    'edad_min' => 13, 'edad_max' => 19],
            ['nombre' => 'Master',   'edad_min' => 20, 'edad_max' => 99],
        ];

        $fecha_inicio = Carbon::create(2026, 1, 1);
        $num_temporadas = 5;

        for ($i = 0; $i < $num_temporadas; $i++) {
            $fecha_fin = $fecha_inicio->copy()->addMonths(6)->subDay();

            $nombreTemporada = 'Temporada ' . $fecha_inicio->format('M-Y') . ' / ' . $fecha_fin->format('M-Y');
            $estatus = ($i == 0) ? 'Activa' : 'Finalizada';

            $temporada = Temporada::create([
                'nombre'       => $nombreTemporada,
                'fecha_inicio' => $fecha_inicio->format('Y-m-d'),
                'fecha_fin'    => $fecha_fin->format('Y-m-d'),
                'estatus'      => $estatus,
            ]);

            foreach ($categoriasBase as $categoriaBase) {
                foreach (['Hombre', 'Mujer'] as $genero) {
                    // Para cada temporada, la fecha de nacimiento min/max de la categoría:
                    $anio_inicio = $fecha_inicio->year - $categoriaBase['edad_max'];
                    $anio_fin    = $fecha_inicio->year - $categoriaBase['edad_min'];

                    $fecha_nac_min = Carbon::create($anio_inicio, 1, 1)->format('Y-m-d');
                    $fecha_nac_max = Carbon::create($anio_fin, 12, 31)->format('Y-m-d');

                    $nombre_genero = $genero === 'Hombre' ? 'Varonil' : 'Femenil';

                    $categoria = Categoria::create([
                        'temporada_id' => $temporada->id,
                        'nombre'       => $categoriaBase['nombre'] . ' - ' . $nombre_genero,
                        'genero'       => $genero,
                        'fecha_inicio' => $fecha_nac_min,
                        'fecha_fin'    => $fecha_nac_max,
                    ]);
                }
            }

            // Retrocede 6 meses para la siguiente temporada
            $fecha_inicio = $fecha_inicio->copy()->subMonths(6);
        }
    }
}
