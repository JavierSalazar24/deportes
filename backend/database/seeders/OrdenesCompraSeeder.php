<?php

namespace Database\Seeders;

use App\Models\OrdenCompra;
use App\Models\Proveedor;
use App\Models\Banco;
use App\Models\Articulo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrdenesCompraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrdenCompra::factory()->count(6)->create(['articulo_id' => Articulo::inRandomOrder()->first()->id]);
    }
}
