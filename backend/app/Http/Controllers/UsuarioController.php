<?php

namespace App\Http\Controllers;

use App\Helpers\ArchivosHelper;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Mail\RegistroMailable;
use Illuminate\Support\Facades\Mail;

class UsuarioController extends Controller
{
    //  * Mostrar todos los usuarios con sus roles.
    public function index()
    {
        $usuarios = Usuario::with('rol')->get();
        return response()->json($usuarios);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre_completo' => 'required|string|max:100',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:6',
            'telefono' => 'required|string|max:15',
            'rol_id' => 'required|exists:roles,id',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }

        $registro = Usuario::create($data);

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $usuario = Usuario::with('rol')->find($id);

        if (!$usuario) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($usuario);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $request->validate([
            'nombre_completo' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:usuarios,email,' . $id,
            'password' => 'sometimes|string|min:6',
            'telefono' => 'sometimes|string|max:15',
            'rol_id' => 'sometimes|exists:roles,id',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->only('nombre_completo', 'email', 'rol_id', 'foto');
        if ($request->filled('password')) {
            $data['password'] = $request->password;
        }

        if ($request->hasFile('foto')) {
            if ($usuario->foto) {
                $this->eliminarFoto($usuario->foto);
            }
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }

        $usuario->update($data);

        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        if ($usuario->foto) {
            $this->eliminarFoto($usuario->foto);
        }

        if($usuario->rol_id === 2){
            return response()->json(['message' => 'No se puede eliminar un usuario con rol de "Tutor"'], 403);
        }
        $usuario->delete();

        // Si la carpeta está vacía, la eliminamos para evitar directorios innecesarios
        $carpeta = 'public/fotos_usuarios/';
        if (empty(Storage::files($carpeta))) {
            Storage::deleteDirectory($carpeta);
        }

        return response()->json(['message' => 'Registro eliminado']);
    }

    // * Función para subir una foto
    private function subirFoto($archivo)
    {
        return ArchivosHelper::subirArchivoConPermisos($archivo, 'public/fotos_usuarios');
    }

    // * Función para eliminar una foto
    private function eliminarFoto($nombreArchivo)
    {
        if($nombreArchivo === 'default.png'){
            return;
        }
        ArchivosHelper::eliminarArchivo('public/fotos_usuarios', $nombreArchivo);
    }

}
