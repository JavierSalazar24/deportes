<?php

namespace App\Http\Controllers;

use App\Models\Almacen;
use App\Models\AlmacenEntrada;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class AlmacenEntradaController extends Controller
{
    public function index()
    {
        return AlmacenEntrada::with(['articulo', 'jugador'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'jugador_id' => 'nullable|exists:jugadores,id',
            'articulo_id' => 'required|exists:articulos,id',
            'numero_serie' => 'required|string',
            'fecha_entrada' => 'required|date',
            'tipo_entrada' => 'required|in:Compra,Devolución de jugador,Cambio de equipo,Reparación terminada,Otro',
            'otros_conceptos' => 'nullable|string',
            'orden_compra' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $registro = AlmacenEntrada::create($data);

            $almacen  = Almacen::where('articulo_id', $registro->articulo_id)->where('numero_serie', $registro->numero_serie)->first();
            if (!$almacen) {
                Almacen::create([
                    'articulo_id'       => $registro->articulo_id,
                    'numero_serie'      => $registro->numero_serie,
                    'fecha_entrada'     => $registro->fecha_entrada,
                    'fecha_salida'      => null,
                    'estado'            => "Disponible",
                ]);
            }else{
                $almacen->update([
                    'fecha_entrada'     => $registro->fecha_entrada,
                    'fecha_salida'      => null,
                    'estado'            => "Disponible",
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Registro guardado'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }

    }

    public function update(Request $request, $id)
    {
        $registro = AlmacenEntrada::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'jugador_id' => 'nullable|exists:jugadores,id',
            'articulo_id' => 'sometimes|exists:articulos,id',
            'numero_serie' => 'sometimes|string',
            'fecha_entrada' => 'sometimes|date',
            'tipo_entrada' => 'sometimes|in:Compra,Devolución de jugador,Cambio de equipo,Reparación terminada,Otro',
            'otros_conceptos' => 'nullable|string',
            'orden_compra' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            // Valores anteriores por si cambian
            $original_articulo_id = $registro->articulo_id;
            $original_numero_serie = $registro->numero_serie;

            // Actualizamos el registro
            $registro->update($data);

            // 1. Si el número de serie era "Sin asignar", creamos nuevo registro en almacén al actualizar el dato
            if($original_numero_serie === 'Sin asignar' && $registro->numero_serie !== 'Sin asignar'){
                Almacen::create([
                    'articulo_id'       => $data['articulo_id'],
                    'numero_serie'      => $data['numero_serie'],
                    'fecha_entrada'     => $data['fecha_entrada'],
                    'estado'            => "Disponible",
                ]);
            }else{
                // 2. Si ya tenía un número de serie, actualizamos el registro correspondiente en Almacén
                $registro_almacen = Almacen::where('articulo_id', $original_articulo_id)->where('numero_serie', $original_numero_serie)->first();

                if ($registro_almacen) {
                    $registro_almacen->update([
                        'articulo_id' => $data['articulo_id'] ?? $registro->articulo_id,
                        'numero_serie' => $data['numero_serie'] ?? $registro->numero_serie,
                        'fecha_entrada' => $data['fecha_entrada'] ?? $registro->fecha_entrada,
                    ]);
                }
            }


            DB::commit();
            return response()->json(['message' => 'Registro actualizado'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }

    }
}
