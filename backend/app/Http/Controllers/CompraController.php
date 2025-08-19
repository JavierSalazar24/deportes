<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Illuminate\Http\Request;

class CompraController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Compra::with(['orden_compra.proveedor', 'orden_compra.banco', 'orden_compra.articulo'])->get();
        return response()->json($registros);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Compra::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }
}
