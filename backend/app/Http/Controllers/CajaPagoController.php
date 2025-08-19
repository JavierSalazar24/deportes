<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CajaPago;

class CajaPagoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = CajaPago::with(['jugador', 'banco', 'usuario'])->latest()->get();
        return response()->json($registros);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = CajaPago::with(['pago_jugador.deuda_jugador.jugador', 'pago_jugador.deuda_jugador.costo_categoria.concepto_cobro', 'pago_jugador.deuda_jugador.costo_categoria.categoria', 'usuario'])->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = CajaPago::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();
        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
