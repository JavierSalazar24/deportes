<?php

namespace App\Http\Controllers;

use App\Models\Banco;
use App\Models\MovimientoBancario;
use Illuminate\Http\Request;
use DB;

class BancoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Banco::get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:50',
            'cuenta' => 'required|string|max:50',
            'clabe' => 'required|string|max:50',
            'saldo_inicial' => 'required|numeric|min:0'
        ]);

        $data['saldo'] = $data['saldo_inicial'];

        DB::beginTransaction();
        try {
            $registro = Banco::create($data);

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
        $registro = Banco::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Banco::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre' => 'sometimes|string|max:50',
            'cuenta' => 'sometimes|string|max:50',
            'clabe' => 'sometimes|string|max:50',
        ]);

        $registro->update($data);
        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Banco::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        if ($registro->movimientos()->exists()) {
            return response()->json(['message' => 'No puedes eliminar un banco con movimientos registrados.'], 403);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
