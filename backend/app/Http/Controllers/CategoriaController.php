<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Categoria::with('temporada')
            ->whereHas('temporada', function($query) {
                $query->where('estatus', 'Activa');
            })->get();

        return response()->json($registros);
    }

    //  * Obtener un nuevo registro.
    public function filtroCategoria(Request $request)
    {
        $request->validate([
            'temporada_id' => 'required|exists:temporadas,id',
            'genero' => 'required|in:Hombre,Mujer',
            'fecha_nacimiento' => 'required|date',
        ]);

        $categorias = Categoria::where('temporada_id', $request->temporada_id)->where('genero', $request->genero)
            ->whereDate('fecha_inicio', '<=', $request->fecha_nacimiento)
            ->whereDate('fecha_fin', '>=', $request->fecha_nacimiento)
            ->get();

        return response()->json($categorias);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'temporada_id' => 'required|exists:temporadas,id',
            'nombre' => 'required|string',
            'genero' => 'required|in:Hombre,Mujer',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
        ]);

        if(Categoria::where('temporada_id',$data['temporada_id'])->where('nombre',$data['nombre'])->exists()){
            return response()->json(['message' => 'Registro duplicado'],422);
        }

        $registro = Categoria::create($data);

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Categoria::with('temporada')
            ->whereHas('temporada', function($query) {
                $query->where('estatus', 'Activa');
            })->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Categoria::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'temporada_id' => 'sometimes|exists:temporadas,id',
            'nombre' => 'sometimes|string',
            'genero' => 'sometimes|in:Hombre,Mujer',
            'fecha_inicio' => 'sometimes|date',
            'fecha_fin' => 'sometimes|date',
        ]);

        $temporadaId = $data['temporada_id'] ?? $registro->temporada_id;
        $nombre      = $data['nombre']       ?? $registro->nombre;

        $duplicado = Categoria::where('temporada_id', $temporadaId)
        ->where('nombre', $nombre)
        ->where('id', '!=', $registro->id)
        ->exists();

        if ($duplicado) {
            return response()->json(['message' => 'Registro duplicado'], 422);
        }

        try {
            $registro->update($data);
        } catch (QueryException $e) {
            // 23000 = violación de restricción (índice único)
            if ($e->getCode() === '23000') {
                return response()->json(['message' => 'Registro duplicado'], 422);
            }
            return response()->json(['message' => 'Ha ocurrido un error'], 422);
        }

        return response()->json(['message' => 'Registro actualizado'], 200);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Categoria::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
