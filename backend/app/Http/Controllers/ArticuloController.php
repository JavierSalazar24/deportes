<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use Illuminate\Http\Request;

class ArticuloController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Articulo::get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:100',
            'precio_compra' => 'required|numeric|min:1',
            'precio_venta' => 'required|numeric|min:1',
            'precio_reposicion' => 'required|numeric|min:1',
            'articulo_equipar' => 'required|in:SI,NO',
        ]);

        $registro = Articulo::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Articulo::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Mostrar todos los registros.
    public function articulosAsignar()
    {
        $registros = Articulo::where('articulo_equipar', 'SI')->get();
        return response()->json($registros);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Articulo::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre' => 'sometimes|string|max:100',
            'precio_compra' => 'sometimes|numeric|min:1',
            'precio_venta' => 'sometimes|numeric|min:1',
            'precio_reposicion' => 'sometimes|numeric|min:1',
            'articulo_equipar' => 'sometimes|in:SI,NO',
        ]);

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Articulo::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();
        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
