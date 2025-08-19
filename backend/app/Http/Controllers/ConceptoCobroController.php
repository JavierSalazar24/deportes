<?php

namespace App\Http\Controllers;

use App\Models\ConceptoCobro;
use Illuminate\Http\Request;

class ConceptoCobroController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = ConceptoCobro::latest()->get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre'        => 'required|string',
            'periodicidad'  => 'required|in:Diario,Semanal,Quincenal,Mensual,Bimestral,Trimestral,Cuatrimestral,Semestral,Anual,Temporada',
        ]);

        ConceptoCobro::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un registro por ID.
    public function show($id)
    {
        $registro = ConceptoCobro::find($id);
        if (!$registro) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = ConceptoCobro::find($id);
        if (!$registro) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre'        => 'sometimes|string',
            'periodicidad'  => 'sometimes|in:Diario,Semanal,Quincenal,Mensual,Bimestral,Trimestral,Cuatrimestral,Semestral,Anual,Temporada',
        ]);

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = ConceptoCobro::find($id);
        if (!$registro) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
        $registro->delete();
        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
