<?php

namespace Database\Seeders;

use App\Models\Compra;
use App\Models\OrdenCompra;
use Illuminate\Database\Seeder;

class ComprasSeeder extends Seeder
{
    public function run(): void
    {
        $ordenesPagadas = OrdenCompra::where('estatus', 'Pagada')->get();

        foreach ($ordenesPagadas as $orden) {
            Compra::create(['orden_compra_id' => $orden->id]);
        }

    }
}
