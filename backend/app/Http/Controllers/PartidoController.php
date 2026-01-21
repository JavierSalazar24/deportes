<?php

namespace App\Http\Controllers;

use App\Helpers\ArchivosHelper;
use App\Models\Partido;
use Illuminate\Http\Request;

class PartidoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Partido::with('categoria')->get();

        return response()->json($registros->append('foto_url'));
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'rival' => 'required|string',
            'lugar' => 'required|string',
            'fecha_hora' => 'required|date',
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }

        $registro = Partido::create($data);

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Partido::with('categoria')->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro->append('foto_url'));
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Partido::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'categoria_id' => 'sometimes|exists:categorias,id',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'rival' => 'sometimes|string',
            'lugar' => 'sometimes|string',
            'fecha_hora' => 'sometimes|date',
        ]);

        if ($request->hasFile('foto')) {
            if ($registro->foto) {
                $this->eliminarFoto($registro->foto);
            }
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Partido::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        if ($registro->foto) {
            $this->eliminarFoto($registro->foto);
        }

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }

    // * Función para subir una foto
    private function subirFoto($archivo)
    {
        return ArchivosHelper::subirArchivoConPermisos($archivo, 'public/fotos_partidos');
    }

    // * Función para eliminar una foto
    private function eliminarFoto($nombreArchivo)
    {
        ArchivosHelper::eliminarArchivo('public/fotos_partidos', $nombreArchivo);
    }
}