<?php

namespace App\Http\Controllers;

use App\Helpers\ArchivosHelper;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Almacen;
use App\Models\AlmacenEntrada;
use App\Models\AlmacenSalida;
use App\Models\DetalleEquipamiento;
use App\Models\Equipamiento;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;
use Luecano\NumeroALetras\NumeroALetras;

class EquipamientoController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Equipamiento::with(['jugador', 'detalles.articulo'])->get();
        return response()->json($registros);
    }

    public function equipamientoPDF($id)
    {
        $formatter = new NumeroALetras();
        $equipamiento = Equipamiento::with(['jugador', 'detalles.articulo'])->findOrFail($id);

        $jugador = $equipamiento->jugador;
        $responsable = $jugador->usuario;
        $detalles = $equipamiento->detalles;
        $nombre_completo = "{$jugador->nombre} {$jugador->apellido_p} {$jugador->apellido_m}";

        $cantidad = $detalles->sum(function($detalle) {
            return $detalle->articulo->precio_reposicion ?? 0;
        });

        $entero = floor($cantidad);
        $centavos = round(($cantidad - $entero) * 100);
        $letras = strtolower($formatter->toWords($entero)) . ' pesos';
        $cantidadLetras = ucfirst($letras) . " " . str_pad($centavos, 2, '0', STR_PAD_LEFT) . '/100 M.N.';

        return Pdf::loadView('pdf.equipamiento', compact('equipamiento', 'jugador', 'responsable', 'detalles', 'cantidad', 'cantidadLetras'))->stream('equipamiento_'.$nombre_completo.'.pdf');
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'jugador_id' => 'required|exists:jugadores,id',
            'fecha_entrega' => 'required|date',

            // Validación para los seleccionados
            'seleccionados' => 'required|array',
            'seleccionados.*.numero_serie' => 'required|string',
            'seleccionados.*.id' => 'required|integer|exists:articulos,id'
        ]);

        DB::beginTransaction();
        try {
            // No dejar asignar equipo a un jugador que ya se le asignó
            $jugadores = Equipamiento::where('jugador_id', $request->jugador_id)->get();
            if(count($jugadores) > 0){
                return response()->json(['message' => 'El jugador ya tiene un equipo asignado'], 400);
            }

            // Guardar equipamiento
            $registro = Equipamiento::create($data);

            foreach ($request->seleccionados as $seleccionado) {
                // Guardar los detalles de los artículos entregados
                DetalleEquipamiento::create([
                    'equipamiento_id' => $registro->id,
                    'articulo_id' => $seleccionado['id'],
                    'numero_serie' => $seleccionado['numero_serie'],
                ]);

                // Guardar salida de almacén
                AlmacenSalida::create([
                    'jugador_id'        => $registro->jugador_id,
                    'articulo_id'       => $seleccionado['id'],
                    'numero_serie'      => $seleccionado['numero_serie'],
                    'fecha_salida'      => $registro->fecha_entrega,
                    'motivo_salida'     => "Asignado",
                ]);

                // Actualizar almacén
                Almacen::where('articulo_id', $seleccionado['id'])
                    ->where('numero_serie', $seleccionado['numero_serie'])
                    ->update([
                        'fecha_salida' => $registro->fecha_entrega,
                        'estado'       => 'Asignado',
                    ]);
            }

            DB::commit();

            return response()->json(['message' => 'Registros guardados correctamente'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar la entrega', 'error' => $e->getMessage()], 500);
        }
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Equipamiento::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro);
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $registro = Equipamiento::with(['jugador', 'detalles.articulo'])->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'fecha_entrega' => 'sometimes|date',
            'fecha_devuelto' => 'required_if:devuelto,SI|date|nullable',
            'devuelto' => 'required|in:SI,NO',

            // Validación para los seleccionados
            'seleccionados' => 'sometimes|array',
            'seleccionados.*.numero_serie' => 'sometimes|string',
            'seleccionados.*.id' => 'sometimes|integer|exists:articulos,id'
        ]);


        DB::beginTransaction();
        try {
            if ($request->devuelto === 'SI') {
                // Procesar devolución de todos los artículos
                foreach ($registro->detalles as $detalle) {
                    // Devolver al almacén
                    Almacen::where('articulo_id', $detalle->articulo_id)
                        ->where('numero_serie', $detalle->numero_serie)
                        ->update([
                            'fecha_salida' => null,
                            'estado' => 'Disponible'
                        ]);

                    // Registrar entrada en almacén
                    AlmacenEntrada::create([
                        'jugador_id' => $registro->jugador_id,
                        'articulo_id' => $detalle->articulo_id,
                        'numero_serie' => $detalle->numero_serie,
                        'fecha_entrada' => $data['fecha_devuelto'],
                        'tipo_entrada' => 'Devolución de jugador',
                    ]);
                }

                // 3. Actualizar registro principal
                $registro->update([
                    'fecha_devuelto' => $data['fecha_devuelto'],
                    'devuelto' => 'SI'
                ]);

                DB::commit();

                return response()->json(['message' => 'Devolución registrada correctamente'], 200);
            } else {
                // Artículos anteriores (para devolución)
                $detallesAnteriores = $registro->detalles;
                $nuevosSeleccionados = collect($request->seleccionados);

                foreach ($detallesAnteriores as $detalle) {
                    // Buscar si este artículo sigue en los nuevos seleccionados pero con diferente número de serie
                    $nuevoSeleccionado = $nuevosSeleccionados->firstWhere('id', $detalle->articulo_id);

                    if ($nuevoSeleccionado && $nuevoSeleccionado['numero_serie'] != $detalle->numero_serie) {
                        // Devolver al almacén el número de serie anterior
                        Almacen::where('articulo_id', $detalle->articulo_id)
                            ->where('numero_serie', $detalle->numero_serie)
                            ->update([
                                'fecha_salida' => null,
                                'estado' => 'Disponible'
                            ]);

                        // Eliminar salida de almacén correspondiente al número de serie anterior
                        AlmacenSalida::where('articulo_id', $detalle->articulo_id)
                            ->where('numero_serie', $detalle->numero_serie)
                            ->where('jugador_id', $registro->jugador_id)
                            ->delete();
                    }
                }

                // Procesar artículos que fueron completamente removidos
                foreach ($detallesAnteriores as $detalle) {
                    if (!$nuevosSeleccionados->contains('id', $detalle->articulo_id)) {
                        // Devolver al almacén
                        Almacen::where('articulo_id', $detalle->articulo_id)
                            ->where('numero_serie', $detalle->numero_serie)
                            ->update([
                                'fecha_salida' => null,
                                'estado' => 'Disponible'
                            ]);

                        // Eliminar salida de almacén correspondiente
                        AlmacenSalida::where('articulo_id', $detalle->articulo_id)
                            ->where('numero_serie', $detalle->numero_serie)
                            ->where('jugador_id', $registro->jugador_id)
                            ->delete();
                    }
                }

                // Eliminar todos los detalles anteriores
                $registro->detalles()->delete();

                // Guardar en sus respectivas tablas los nuevos datos
                foreach ($request->seleccionados as $seleccionado) {
                    // Crear nuevo detalle
                    DetalleEquipamiento::create([
                        'equipamiento_id' => $registro->id,
                        'articulo_id' => $seleccionado['id'],
                        'numero_serie' => $seleccionado['numero_serie'],
                    ]);

                    // Eliminar cualquier salida existente para este artículo (por si cambió de número de serie)
                    AlmacenSalida::where('articulo_id', $seleccionado['id'])
                    ->where('jugador_id', $registro->jugador_id)
                    ->delete();

                    // Crear nueva salida de almacén
                    AlmacenSalida::create([
                        'jugador_id' => $registro->jugador_id,
                        'articulo_id' => $seleccionado['id'],
                        'numero_serie' => $seleccionado['numero_serie'],
                        'fecha_salida' => $data['fecha_entrega'] ?? $registro->fecha_entrega,
                        'motivo_salida' => "Asignado",
                    ]);

                    // Actualizar estado en almacén
                    Almacen::where('articulo_id', $seleccionado['id'])
                        ->where('numero_serie', $seleccionado['numero_serie'])
                        ->update([
                            'fecha_salida' => $data['fecha_entrega'] ?? $registro->fecha_entrega,
                            'estado' => 'Asignado'
                        ]);
                }

                // Actualizar equipamiento
                $registro->update($data);

                DB::commit();

                return response()->json(['message' => 'Registros guardados correctamente']);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar la entrega', 'error' => $e->getMessage()], 500);
        }
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Equipamiento::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        DB::beginTransaction();
        try {
            // Procesar devolución de todos los artículos
            foreach ($registro->detalles as $detalle) {
                // Devolver al almacén
                Almacen::where('articulo_id', $detalle->articulo_id)
                    ->where('numero_serie', $detalle->numero_serie)
                    ->update([
                        'fecha_salida' => null,
                        'estado' => 'Disponible'
                    ]);

                // Registrar entrada en almacén
                AlmacenEntrada::create([
                    'jugador_id' => $registro->jugador_id,
                    'articulo_id' => $detalle->articulo_id,
                    'numero_serie' => $detalle->numero_serie,
                    'fecha_entrada' => Carbon::now()->format('Y-m-d'),
                    'tipo_entrada' => 'Devolución de jugador',
                ]);
            }

            // 3. Actualizar registro principal
            $registro->update([
                'fecha_devuelto' => Carbon::now()->format('Y-m-d'),
                'devuelto'       => 'SI',
            ]);

            $registro->delete();

            DB::commit();

            return response()->json(['message' => 'Registro eliminado con éxito']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al eliminar el registro', 'error' => $e->getMessage()], 500);
        }
    }
}
