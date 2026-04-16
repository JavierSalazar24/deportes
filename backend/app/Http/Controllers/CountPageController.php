<?php

namespace App\Http\Controllers;

use App\Models\Banco;
use App\Models\Usuario;
use App\Models\Jugador;
use App\Models\Articulo;
use Illuminate\Http\Request;

class CountPageController extends Controller
{
    //  * Mostrar todos los registros.
    public function getCount()
    {
        $bancos = Banco::count();
        $usuarios = Usuario::count();
        $jugadores = Jugador::count();
        $articulos = Articulo::count();
        return response()->json(['bancos' => $bancos, 'usuarios' => $usuarios, 'jugadores' => $jugadores, 'articulos' => $articulos]);
    }

}
