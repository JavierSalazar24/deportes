<?php

namespace App\Http\Controllers;

use App\Models\Modulo;
use Illuminate\Http\Request;

class ModuloController extends Controller
{
    // * Mostrar todos los registros.
    public function index()
    {
        $modulos = Modulo::all();
        return response()->json($modulos);
    }

    // * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string',
            'ruta' => 'required|string|max:100|unique:modulos,ruta',
        ]);

        Modulo::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    // * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $modulo = Modulo::find($id);

        if (!$modulo) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($modulo);
    }

    // * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $modulo = Modulo::find($id);

        if (!$modulo) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre' => 'sometimes|string',
            'ruta' => 'sometimes|string|max:100|unique:modulos,ruta,' . $id,
        ]);

        $modulo->update($data);
        return response()->json(['message' => 'Registro actualizado'], 200);
    }

    // * Eliminar un registro.
    public function destroy($id)
    {
        $modulo = Modulo::find($id);

        if (!$modulo) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $modulo->delete();
        return response()->json(['message' => 'Registro eliminado']);
    }
}