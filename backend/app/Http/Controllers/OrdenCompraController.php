<?php

namespace App\Http\Controllers;

use App\Models\Banco;
use App\Services\BancoService;
use App\Services\ValidadorSaldoBanco;
use App\Models\Almacen;
use App\Models\AlmacenEntrada;
use App\Models\Compra;
use App\Models\MovimientoBancario;
use App\Models\OrdenCompra;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class OrdenCompraController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = OrdenCompra::with(['proveedor', 'banco', 'articulo'])->whereNot('estatus', 'Pagada')->get();
        return response()->json($registros);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'proveedor_id' => 'required|exists:proveedores,id',
            'banco_id' => 'required|exists:bancos,id',
            'articulo_id' => 'required|exists:articulos,id',
            'numero_oc' => 'required|string|unique:ordenes_compra,numero_oc',
            'cantidad_articulo' => 'required|integer',
            'precio_articulo' => 'required|numeric|min:1',
            'descuento_monto' => 'required|numeric',
            'impuesto' => 'required|numeric',
            'subtotal' => 'required|numeric|min:1',
            'total' => 'required|numeric|min:1',
        ]);

        $registro = OrdenCompra::create($data);
        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = OrdenCompra::with(['proveedor', 'banco', 'articulo'])->whereNot('estatus', 'Pagada')->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = OrdenCompra::find($id);

        if (!$registro) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'proveedor_id' => 'sometimes|exists:proveedores,id',
            'banco_id' => 'sometimes|exists:bancos,id',
            'articulo_id' => 'sometimes|exists:articulos,id',
            'numero_oc' => 'sometimes|string|unique:ordenes_compra,numero_oc,' . $id,
            'cantidad_articulo' => 'sometimes|integer',
            'precio_articulo' => 'sometimes|numeric|min:1',
            'descuento_monto' => 'sometimes|numeric',
            'impuesto' => 'sometimes|numeric',
            'subtotal' => 'sometimes|numeric|min:1',
            'total' => 'sometimes|numeric|min:1',
            'estatus' => 'sometimes|in:Pagada,Pendiente,Cancelada',
        ]);

        DB::beginTransaction();
        try {
            if($request->estatus === 'Pagada'){
                $compra = $request->validate([
                    'metodo_pago' => 'required|in:Transferencia bancaria,Tarjeta de crédito/débito,Efectivo,Cheques',
                    'referencia' => 'nullable|string',
                ]);

                $banco = Banco::findOrFail($data['banco_id'] ?? $registro->banco_id);
                $resultado = ValidadorSaldoBanco::validar($banco, $data['total'] ?? $registro->total);
                if (!$resultado['ok']) {
                    return response()->json(['message' => $resultado['error']], 422);
                }

                Compra::create([
                    'orden_compra_id' => $id,
                    'metodo_pago'     => $compra['metodo_pago'],
                    'referencia'      => $compra['referencia'] ?? null,
                ]);

                $bancoService = new BancoService();
                $movimiento = $bancoService->registrarEgreso(
                    $banco,
                    $data['total'] ?? $registro->total,
                    "Compra: {$data['numero_oc']}",
                    $compra['metodo_pago'],
                    $registro
                );

                if (($compra['referencia'] ?? null) &&
                    ($compra['metodo_pago'] === 'Transferencia bancaria' || $compra['metodo_pago'] === 'Tarjeta de crédito/débito')) {
                    $movimiento->referencia = $compra['referencia'];
                    $movimiento->save();
                }

                for ($i = 0; $i < $request->cantidad_articulo; $i++) {
                    AlmacenEntrada::create([
                        'articulo_id'     => $data['articulo_id'] ?? $registro->articulo_id,
                        'numero_serie'    => 'Sin asignar',
                        'fecha_entrada'   =>  Carbon::now()->format('Y-m-d'),
                        'tipo_entrada'    => 'Compra',
                        'orden_compra'    => $data['numero_oc'] ?? $registro->numero_oc,
                    ]);
                }
            }

            $registro->update($data);

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
        $registro = OrdenCompra::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }
}
