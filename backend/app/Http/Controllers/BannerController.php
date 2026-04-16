<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use App\Helpers\ArchivosHelper;

class BannerController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Banner::get();
        return response()->json($registros->append('foto_url'));
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:50',
            'foto' => 'required|image|mimes:jpg,jpeg,png,avif,webp',
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }

        Banner::create($data);

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Banner::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro->append('foto_url'));
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Banner::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre' => 'sometimes|string|max:50',
            'foto' => 'sometimes|image|mimes:jpg,jpeg,png,avif,webp',
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
        $registro = Banner::find($id);

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
        return ArchivosHelper::subirArchivoConPermisos($archivo, 'public/banners');
    }

    // * Función para eliminar una foto
    private function eliminarFoto($nombreArchivo)
    {
        ArchivosHelper::eliminarArchivo('public/banners', $nombreArchivo);
    }
}
