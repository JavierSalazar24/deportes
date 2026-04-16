<?php

namespace Database\Seeders;

use App\Models\Concepto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConceptoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $conceptos = [
            [
                'nombre' => 'Pago de luz',
                'descripcion' => 'Pago del consumo eléctrico mensual o bimestral correspondiente a las instalaciones de la empresa.',
            ],
            [
                'nombre' => 'Pago de agua',
                'descripcion' => 'Pago de la factura por el suministro de agua potable y servicios relacionados.',
            ],
            [
                'nombre' => 'Renta de oficina',
                'descripcion' => 'Pago mensual por el arrendamiento del local, oficina o espacio de trabajo.',
            ],
            [
                'nombre' => 'Compra de papelería',
                'descripcion' => 'Gasto realizado en artículos de papelería y material de oficina.',
            ],
            [
                'nombre' => 'Mantenimiento de vehículos',
                'descripcion' => 'Servicio y refacciones para conservar en buen estado los vehículos de la empresa.',
            ],
            [
                'nombre' => 'Servicio de internet',
                'descripcion' => 'Pago por el acceso a servicios de internet para uso administrativo y operativo.',
            ],
        ];

        foreach ($conceptos as $c) {
            Concepto::firstOrCreate(['nombre' => $c['nombre']], $c);
        }
    }
}