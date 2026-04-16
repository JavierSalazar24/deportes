<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;
use DB;

class RolController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $roles = Rol::with('permisos.modulo')->get();
        return response()->json($roles);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100|unique:roles,nombre',
            'descripcion' => 'nullable|string',
            'permisos' => 'required|array',
        ]);

        DB::beginTransaction();

        try {
            $rol = Rol::create([
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
            ]);

            foreach ($request->permisos as $permiso) {
                $rol->permisos()->create($permiso);
            }

            DB::commit();
            return response()->json(['message' => 'Registro guardado'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $rol = Rol::find($id);

        if (!$rol) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($rol);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'sometimes|string|max:100|unique:roles,nombre,' . $id,
            'descripcion' => 'nullable|string',
            'permisos' => 'sometimes|array',
        ]);

        DB::beginTransaction();

        try {
            $rol = Rol::find($id);
            if (!$rol) {
                return response()->json(['error' => 'Registro no encontrado'], 404);
            }

            $rol->update([
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
            ]);

            $rol->permisos()->delete();

            foreach ($request->permisos as $permiso) {
                $rol->permisos()->create($permiso);
            }

            DB::commit();
            return response()->json(['message' => 'Registro actualizado'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al actualizar los datos', 'error' => $e->getMessage()], 500);
        }
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $rol = Rol::find($id);

        if (!$rol) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        if($rol->id === 2){
            return response()->json(['message' => 'No se puede eliminar el rol de "Tutor"'], 403);
        }

        $rol->delete();

        return response()->json(['message' => 'Registro eliminado']);
    }
}