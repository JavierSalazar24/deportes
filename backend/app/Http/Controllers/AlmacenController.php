<?php

namespace App\Http\Controllers;

use App\Models\Almacen;
use Illuminate\Http\Request;

class AlmacenController extends Controller
{
    public function index()
    {
        $registros = Almacen::with(['articulo'])->get();
        return response()->json($registros);
    }

    public function disponibles()
    {
        $articulos = Almacen::with(['articulo'])->where('estado', 'Disponible')->get();
        return response()->json($articulos);
    }

    public function obtenerEquipoDisponible($articulo_id)
    {
        $articulos = Almacen::with(['articulo'])->where('articulo_id', $articulo_id)->where('estado', 'Disponible')->get();
        return response()->json($articulos);
    }
}
