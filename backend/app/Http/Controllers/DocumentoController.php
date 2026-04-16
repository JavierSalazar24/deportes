<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Documento;
use App\Helpers\ArchivosHelper;

class DocumentoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Documento::get();
        return response()->json($registros->append('documento_url'));
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string',
            'documento' => 'required|file|mimes:pdf',
        ]);

        if ($request->hasFile('documento')) {
            $data['documento'] = $this->subirDocumento($request->file('documento'));
        }

        Documento::create($data);

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Documento::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro->append('documento_url'));
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Documento::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre' => 'sometimes|string|max:50',
            'documento' => 'sometimes|file|mimes:pdf',
        ]);

        if ($request->hasFile('documento')) {
            if ($registro->documento) {
                $this->eliminarDocumento($registro->documento);
            }
            $data['documento'] = $this->subirDocumento($request->file('documento'));
        }

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Documento::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        if ($registro->documento) {
            $this->eliminarDocumento($registro->documento);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }

    // * Función para subir un documento
    private function subirDocumento($archivo)
    {
        return ArchivosHelper::subirArchivoConPermisos($archivo, 'public/documentos');
    }

    // * Función para eliminar un documento
    private function eliminarDocumento($nombreArchivo)
    {
        ArchivosHelper::eliminarArchivo('public/documentos', $nombreArchivo);
    }
}
