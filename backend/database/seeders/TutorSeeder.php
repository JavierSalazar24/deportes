<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Modulo;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class TutorSeeder extends Seeder
{
    public function run()
    {
        $tutorRol = Rol::firstOrCreate([
            'nombre' => 'Tutor',
        ], [
            'descripcion' => 'Rol para tutores, pueden crear y consultar jugadores, ver partidos. deudas, abonos y pagos'
        ]);

        $permisosPorModulo = [
            'jugadores' => [
                'crear'     => true,
                'consultar' => true,
                'actualizar'=> false,
                'eliminar'  => false,
            ],
            'temporadas' => [
                'crear'     => false,
                'consultar' => true,
                'actualizar'=> false,
                'eliminar'  => false,
            ],
            'partidos' => [
                'crear'     => false,
                'consultar' => true,
                'actualizar'=> false,
                'eliminar'  => false,
            ],
            'deudas-jugadores' => [
                'crear'     => false,
                'consultar' => true,
                'actualizar'=> false,
                'eliminar'  => false,
            ],
            'abonos-jugadores' => [
                'crear'     => false,
                'consultar' => true,
                'actualizar'=> false,
                'eliminar'  => false,
            ],
            'pagos-jugadores' => [
                'crear'     => false,
                'consultar' => true,
                'actualizar'=> false,
                'eliminar'  => false,
            ],
            'documentos' => [
                'crear'     => false,
                'consultar' => true,
                'actualizar'=> false,
                'eliminar'  => false,
            ],
            'banners' => [
                'crear'     => false,
                'consultar' => true,
                'actualizar'=> false,
                'eliminar'  => false,
            ],
        ];

        foreach ($permisosPorModulo as $ruta => $permisos) {
            $modulo = Modulo::firstOrCreate(
                ['ruta' => $ruta],
                ['nombre' => Str::title(str_replace('-', ' ', $ruta))]
            );
            $tutorRol->permisos()->firstOrCreate(
                ['modulo_id' => $modulo->id],
                $permisos
            );
        }

        $faker = Faker::create();

        for ($i = 1; $i <= 20; $i++) {
            Usuario::create([
                'nombre_completo' => $faker->name,
                'email'           => "tutor{$i}@mail.com",
                'password'        => 'tutor1234',
                'telefono'        => $faker->numerify('618#######'),
                'rol_id'          => $tutorRol->id,
                'foto'            => 'default.png',
            ]);
        }
    }
}
