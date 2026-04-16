<?php

namespace App\Http\Controllers;

use App\Models\Banco;
use App\Services\BancoService;
use App\Services\ValidadorSaldoBanco;
use App\Models\Gasto;
use App\Models\Concepto;
use App\Models\MovimientoBancario;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class GastoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Gasto::with(['banco', 'concepto'])->get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'banco_id' => 'required|exists:bancos,id',
            'concepto_id' => 'required|exists:conceptos,id',
            'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'referencia' => 'nullable|string',
            'descuento_monto' => 'required|numeric',
            'impuesto' => 'required|numeric',
            'subtotal' => 'required|numeric|min:1',
            'total' => 'required|numeric|min:1',
        ]);

        DB::beginTransaction();
        try {
            $banco = Banco::findOrFail($data['banco_id']);
            $resultado = ValidadorSaldoBanco::validar($banco, $data['total']);
            if (!$resultado['ok']) {
                return response()->json(['message' => $resultado['error']], 422);
            }

            $registro = Gasto::create($data);

            $concepto = Concepto::find($request->concepto_id);

            $bancoService = new BancoService();
            $movimiento = $bancoService->registrarEgreso(
                $banco,
                $data['total'],
                'Gasto: ' . $concepto->nombre,
                $data['metodo_pago'],
                $registro
            );

            if($data['metodo_pago'] === 'Transferencia bancaria' || $data['metodo_pago'] === 'Tarjeta de crédito/débito') {
                $movimiento->referencia = $data['referencia'];
                $movimiento->save();
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
        $registro = Gasto::with(['banco', 'concepto'])->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Gasto::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'concepto_id' => 'sometimes|exists:conceptos,id',
            'metodo_pago' => 'sometimes|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
            'referencia' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $metodoPago = $data['metodo_pago'] ?? $registro->metodo_pago;
            if ($metodoPago !== 'Transferencia bancaria' && $metodoPago !== 'Tarjeta de crédito/débito') {
                $data['referencia'] = null;
            }

            $registro->update($data);

            $movimiento = $registro->movimientosBancarios()->first();
            if ($movimiento) {
                $concepto = Concepto::find($data['concepto_id'] ?? $registro->concepto_id);

                $movimiento->update([
                    'concepto'    => 'Gasto: ' . $concepto->nombre,
                    'metodo_pago'  => $metodoPago,
                    'referencia'   => $data['referencia'] ?? null,
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Registro actualizado'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }

    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Gasto::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        DB::beginTransaction();
        try {
            $registro->movimientosBancarios()->delete();
            $registro->delete();

            DB::commit();
            return response()->json(['message' => 'Registro eliminado con éxito']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }

    }
}
