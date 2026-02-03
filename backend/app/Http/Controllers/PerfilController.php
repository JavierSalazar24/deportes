<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class PerfilController extends Controller
{
    public function index(Request $request)
    {
        $usuario = $request->user()->load([
            'rol.permisos.modulo'
        ]);

        return response()->json($usuario);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $request->validate([
            'nombre_completo' => 'sometimes|string|max:100',
            'telefono' => 'sometimes|string|max:15',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->only('nombre_completo', 'telefono', 'foto');

        if ($request->hasFile('foto')) {
            if ($usuario->foto) {
                $this->eliminarFoto($usuario->foto);
            }
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }

        $usuario->update($data);

        return response()->json($usuario->load(['rol.permisos.modulo']));
    }

    // * Función para subir una foto
    private function subirFoto($archivo)
    {
        $nombre = time() . '_' . uniqid() . '.' . $archivo->extension();
        $archivo->storeAs("public/fotos_usuarios", $nombre);

        return $nombre;
    }

    // * Función para eliminar una foto
    private function eliminarFoto($nombreArchivo)
    {
        if($nombreArchivo !== 'default.png'){
            $ruta = storage_path("app/public/fotos_usuarios/{$nombreArchivo}");

            if (file_exists($ruta)) {
                unlink($ruta);
            }
        }
    }
}
