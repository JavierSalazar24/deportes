<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Modulo;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Support\Str;

class FullSistemaSeeder extends Seeder
{
    public function run(): void
    {
        $rutas = [
            'roles', 'usuarios', 'modulos', 'jugadores', 'conceptos','bancos', 'movimientos-bancarios', 'proveedores',
            'articulos', 'ordenes-compra', 'compras', 'gastos', 'almacen', 'almacen-entradas', 'almacen-salidas',
            'equipo', 'logs','temporadas', 'categorias', 'partidos', 'calendario-partidos', 'conceptos-cobros',
            'costos-categoria', 'deudas-jugadores', 'pagos-jugadores', 'abonos-jugadores', 'historial-deudas-jugadores',
            'historial-pagos-jugadores', 'historial-abonos-jugadores', 'calendario-pagos', 'caja-pagos',
            'generador-reportes', 'estadocuenta-proveedores', 'estadocuenta-bancos', 'estadocuenta-jugadores',
        ];

        DB::beginTransaction();

        try {
            foreach ($rutas as $ruta) {
                Modulo::firstOrCreate([
                    'nombre' => Str::title(str_replace('-', ' ', $ruta)),
                    'ruta'   => $ruta,
                ]);
            }

            $adminRol = Rol::create([
                'nombre' => 'Super admin',
                'descripcion' => 'Todos los permisos'
            ]);

            $todosLosModulos = Modulo::all();
            foreach ($todosLosModulos as $modulo) {
                $adminRol->permisos()->create([
                    'modulo_id' => $modulo->id,
                    'crear' => true,
                    'consultar' => true,
                    'actualizar' => true,
                    'eliminar' => true,
                ]);
            }


            Usuario::create([
                'nombre_completo' => 'Administrador Arcanix',
                'email' => 'deportes@arcanix.com.mx',
                'password' => 'arcanix',
                'telefono' => '6181234567',
                'rol_id' => $adminRol->id,
                'foto' => 'default.png',
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
