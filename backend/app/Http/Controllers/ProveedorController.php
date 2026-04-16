<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Proveedor::get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre_empresa' => 'required|string|max:100',
            'nombre_contacto' => 'required|string|max:100',
            'calle' => 'required|string|max:100',
            'numero' => 'required|string|max:20',
            'colonia' => 'required|string|max:50',
            'cp' => 'required|digits:5',
            'municipio' => 'required|string|max:100',
            'estado' => 'required|string|max:100',
            'pais' => 'required|string|max:100',
            'telefono_empresa' => 'required|string|max:15',
            'extension_empresa' => 'nullable|string|max:10',
            'telefono_contacto' => 'required|string|max:15',
            'correo_contacto' => 'required|email',
            'credito_dias' => 'required|numeric|min:0',
            'rfc' => 'required|string|max:13',
            'razon_social' => 'required|string',
            'uso_cfdi' => 'required|string',
            'regimen_fiscal' => 'required|string',
        ]);

        $registro = Proveedor::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Proveedor::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Proveedor::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre_empresa' => 'sometimes|string|max:100',
            'nombre_contacto' => 'sometimes|string|max:100',
            'calle' => 'sometimes|string|max:100',
            'numero' => 'sometimes|string|max:20',
            'colonia' => 'sometimes|string|max:50',
            'cp' => 'sometimes|digits:5',
            'municipio' => 'sometimes|string|max:100',
            'estado' => 'sometimes|string|max:100',
            'pais' => 'sometimes|string|max:100',
            'telefono_empresa' => 'sometimes|string|max:15',
            'extension_empresa' => 'nullable|string|max:10',
            'telefono_contacto' => 'sometimes|string|max:15',
            'correo_contacto' => 'sometimes|email',
            'credito_dias' => 'sometimes|numeric|min:0',
            'rfc' => 'sometimes|string|max:13',
            'razon_social' => 'sometimes|string',
            'uso_cfdi' => 'sometimes|string',
            'regimen_fiscal' => 'sometimes|string',
        ]);

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Proveedor::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
