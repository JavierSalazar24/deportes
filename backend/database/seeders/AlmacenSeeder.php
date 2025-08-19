<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AlmacenEntrada;
use App\Models\AlmacenSalida;
use App\Models\Almacen;

class AlmacenSeeder extends Seeder
{
    public function run(): void
    {
        // Entradas
        AlmacenEntrada::factory(15)->create()->each(function ($entrada) {
            Almacen::updateOrCreate(
                [
                    'articulo_id' => $entrada->articulo_id,
                    'numero_serie' => $entrada->numero_serie
                ],
                [
                    'fecha_entrada' => $entrada->fecha_entrada,
                    'fecha_salida' => null,
                    'estado' => 'Disponible',
                    'otra_informacion' => null,
                ]
            );
        });

        // Salidas (solo para artículos disponibles)
        AlmacenSalida::factory(2)->create()->each(function ($salida) {
            $almacen = Almacen::where('numero_serie', $salida->numero_serie)
                ->where('estado', 'Disponible')
                ->first();

            if ($almacen) {
                $almacen->update([
                    'fecha_salida' => $salida->fecha_salida,
                    'estado' => $salida->motivo_salida,
                    'otra_informacion' => $salida->motivo_salida === 'Otro' ? $salida->motivo_salida_otro : null,
                ]);
            }
        });
    }
}
