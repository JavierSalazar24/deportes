<?php

namespace App\Http\Controllers;

use App\Models\Banco;
use App\Models\Proveedor;
use App\Models\Jugador;
use App\Models\Articulo;
use Illuminate\Http\Request;

class CountPageController extends Controller
{
    //  * Mostrar todos los registros.
    public function getCount()
    {
        $bancos = Banco::count();
        $proveedores = Proveedor::count();
        $jugadores = Jugador::count();
        $articulos = Articulo::count();
        return response()->json(['bancos' => $bancos, 'proveedores' => $proveedores, 'jugadores' => $jugadores, 'articulos' => $articulos]);
    }

}