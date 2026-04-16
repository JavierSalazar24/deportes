<?php

namespace App\Http\Controllers;

use App\Models\Almacen;
use App\Models\AlmacenSalida;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class AlmacenSalidaController extends Controller
{
    public function index()
    {
        return AlmacenSalida::with(['articulo', 'jugador'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'jugador_id' => 'nullable|exists:jugadores,id',
            'articulo_id' => 'required|exists:articulos,id',
            'numero_serie' => 'required|string',
            'fecha_salida' => 'required|date',
            'motivo_salida' => 'required|in:Asignado,Devolución a proveedor,Venta,Destrucción,Mantenimiento,Robo,Pérdida,Otro',
            'motivo_salida_otro' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $almacen = Almacen::where('articulo_id', $data['articulo_id'])->where('numero_serie', $data['numero_serie'])->first();

            // Validaciones para datos manipulados
            if (!$almacen) return response()->json(['error' => 'El artículo no existe en almacén.'], 404);
            if ($almacen->estado !== 'Disponible') return response()->json(['error' => 'El artículo no está disponible para salir.'], 400);

            $registro = AlmacenSalida::create($data);

            $otra_informacion = $registro->motivo_salida === 'Otro' ? $registro->motivo_salida_otro : null;

            $almacen->update([
                'fecha_salida'     => $registro->fecha_salida,
                'estado'           => $registro->motivo_salida,
                'otra_informacion' => $otra_informacion,
            ]);

            DB::commit();
            return response()->json(['message' => 'Registro guardado'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }

    }

    public function update(Request $request, $id)
    {
        $registro = AlmacenSalida::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'jugador_id' => 'nullable|exists:jugadores,id',
            'articulo_id' => 'sometimes|exists:articulos,id',
            'numero_serie' => 'sometimes|string',
            'fecha_salida' => 'sometimes|date',
            'motivo_salida' => 'sometimes|in:Asignado,Devolución a proveedor,Venta,Destrucción,Mantenimiento,Robo,Pérdida,Otro',
            'motivo_salida_otro' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            // Guardar los datos originales antes del cambio y después actualizar el registro
            $original_articulo_id = $registro->articulo_id;
            $original_numero_serie = $registro->numero_serie;
            $registro->update($data);

            // Si el articulo o número de serie cambiaron, buscar el registro anterior en almacén y actualizar sus datos
            $registro_almacen = Almacen::where('articulo_id', $original_articulo_id)->where('numero_serie', $original_numero_serie)->first();
            if ($registro_almacen) {
                $otra_informacion = $data['motivo_salida'] ?? $registro->motivo_salida === 'Otro' ? $data['motivo_salida_otro'] ?? $registro->motivo_salida_otro : null;
                $motivo_final = $registro->motivo_salida === 'Otro' ? $registro->motivo_salida_otro : $registro->motivo_salida;

                $registro_almacen->update([
                    'articulo_id' => $data['articulo_id'] ?? $registro->articulo_id,
                    'numero_serie' => $data['numero_serie'] ?? $registro->numero_serie,
                    'fecha_salida' => $data['fecha_salida'] ?? $registro->fecha_salida,
                    'estado' => $data['motivo_salida'] ?? $registro->motivo_salida,
                    'otra_informacion'  => $otra_informacion,
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Registro actualizado'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }

    }
}
