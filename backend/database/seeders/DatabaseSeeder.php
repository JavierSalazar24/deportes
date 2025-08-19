<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            FullSistemaSeeder::class,
            BancosSeeder::class,
            TemporadaSeeder::class,
            PartidoSeeder::class,
            TutorSeeder::class,
            ConceptosCobroSeeder::class,
            CostosCategoriaSeeder::class,
            JugadorSeeder::class,
            DeudasPagosAbonosSeeder::class,
            EquipamientoSeeder::class,
            ProveedoresSeeder::class,
            ArticulosSeeder::class,
            AlmacenSeeder::class,
            OrdenesCompraSeeder::class,
            ComprasSeeder::class,
            ConceptoSeeder::class,
            GastosSeeder::class,
            MovimientosBancariosSeeder::class,
        ]);
    }
}