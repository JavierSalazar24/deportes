<?php

namespace Database\Seeders;

use App\Models\Gasto;
use App\Models\Banco;
use App\Models\Concepto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GastosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $conceptos = Concepto::all();

        Banco::all()->each(function ($banco) use ($conceptos) {
            Gasto::factory()->count(1)->create([
                'banco_id' => $banco->id,
                'concepto_id' => $conceptos->random()->id,
            ]);
        });
    }
}