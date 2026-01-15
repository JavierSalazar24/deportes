<?php

namespace App\Http\Controllers;

use App\Models\{
    Jugador,
    Categoria,
    DeudaJugador,
    Banco,
    CostoCategoria
};
use App\Helpers\ArchivosHelper;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JugadorController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $registros = Jugador::with(['categoria.temporada', 'usuario'])->latest()->get();

        return response()->json($registros->append(['curp_jugador_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'foto_url', 'firma_url']));
    }

    public function calendarioJugadores()
    {
        $deudas = DeudaJugador::query()
            ->join('costos_categorias as cc', 'cc.id', '=', 'deudas_jugadores.costo_categoria_id')
            ->join('categorias as c', 'c.id', '=', 'cc.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->where('t.estatus', 'Activa')
            ->orderBy('deudas_jugadores.fecha_pago', 'asc')
            ->orderBy('deudas_jugadores.jugador_id', 'asc')
            ->select('deudas_jugadores.*')
            ->with([
                'jugador:id,nombre,apellido_p,apellido_m,categoria_id',
                'jugador.categoria:id,nombre',
                'costo_categoria.concepto_cobro:id,nombre,periodicidad',
                'costo_categoria.categoria.temporada:id,nombre,estatus,fecha_inicio,fecha_fin',
                'pagos_jugadores.banco:id,nombre',
                'abonos_deudas.banco:id,nombre',
            ])
            ->get();

        $resultado = $deudas
            ->groupBy(fn ($d) => (string) $d->fecha_pago)
            ->flatMap(function ($itemsDeLaFecha, $fecha) {
                return $itemsDeLaFecha
                    ->groupBy('jugador_id')
                    ->map(function ($deudasDeEseJugadorEseDia) use ($fecha) {
                        $primera = $deudasDeEseJugadorEseDia->first();

                        return [
                            'fecha'   => $fecha,
                            'jugador' => [
                                'id'         => $primera->jugador_id,
                                'nombre'     => $primera->jugador->nombre,
                                'apellido_p' => $primera->jugador->apellido_p,
                                'apellido_m' => $primera->jugador->apellido_m,
                                'categoria'  => optional($primera->jugador->categoria)->nombre,
                            ],
                            'deudas'  => $deudasDeEseJugadorEseDia->values(),
                        ];
                    })
                    ->values();
            })
            ->values();

        return response()->json($resultado);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
            'temporada_id' => 'required|exists:temporadas,id',
            'usuario_id' => 'required|exists:usuarios,id',
            'foto' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'nombre' => 'required|string|max:100',
            'apellido_p' => 'required|string|max:100',
            'apellido_m' => 'required|string|max:100',
            'genero' => 'required|in:Hombre,Mujer',
            'direccion' => 'required|string',
            'telefono' => 'required|string|max:15',
            'fecha_nacimiento' => 'required|date',
            'curp' => 'required|string|max:18|min:17',
            'padecimientos' => 'required|string|max:100',
            'alergias' => 'required|string|max:100',
            'curp_jugador' => 'nullable|file|mimes:pdf|max:2048',
            'ine' => 'nullable|file|mimes:pdf|max:2048',
            'acta_nacimiento' => 'nullable|file|mimes:pdf|max:2048',
            'comprobante_domicilio' => 'nullable|file|mimes:pdf|max:2048',
            'firma' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }
        if ($request->hasFile('curp_jugador')) {
            $data['curp_jugador'] = $this->subirDocumento($request->file('curp_jugador'));
        }
        if ($request->hasFile('ine')) {
            $data['ine'] = $this->subirDocumento($request->file('ine'));
        }
        if ($request->hasFile('acta_nacimiento')) {
            $data['acta_nacimiento'] = $this->subirDocumento($request->file('acta_nacimiento'));
        }
        if ($request->hasFile('comprobante_domicilio')) {
            $data['comprobante_domicilio'] = $this->subirDocumento($request->file('comprobante_domicilio'));
        }
        if ($request->hasFile('firma')) {
            $data['firma'] = $this->subirDocumento($request->file('firma'));
        }

        $categoria = Categoria::where('temporada_id', $request->temporada_id)->where('genero', $request->genero)
            ->whereDate('fecha_inicio', '<=', $request->fecha_nacimiento)
            ->whereDate('fecha_fin', '>=', $request->fecha_nacimiento)
            ->first();

        if(!$categoria){
            return response()->json(['message' => 'Sus datos no entran en ninguna categoría disponible, por favor verifíquelos (Temporada, nacimiento y/o genéro)'], 422);
        }

        $data['categoria_id'] = $categoria->id;

        DB::transaction(function () use (&$data, $categoria) {

            $jugador = Jugador::create($data);

            $hoy       = CarbonImmutable::today();
            $finTemp   = CarbonImmutable::parse($categoria->temporada->fecha_fin);

            $saltos = [
                'Diario'        => fn ($d) => $d->addDay(),
                'Semanal'       => fn ($d) => $d->addWeek(),
                'Quincenal'     => fn ($d) => $d->addDays(15),
                'Mensual'       => fn ($d) => $d->addMonth(),
                'Bimestral'     => fn ($d) => $d->addMonths(2),
                'Trimestral'    => fn ($d) => $d->addMonths(3),
                'Cuatrimestral' => fn ($d) => $d->addMonths(4),
                'Semestral'     => fn ($d) => $d->addMonths(6),
                'Anual'         => fn ($d) => $d->addYear(),
                'Temporada'     => fn ($d) => $finTemp->addDay(),
            ];

            $categoria->costosCategoria()->with('concepto_cobro')->get()->each(function ($costo) use ($jugador, $hoy, $finTemp, $saltos) {
                $cursor = $hoy->clone();

                while ($cursor->lte($finTemp)) {

                    $pagoTentativo = $cursor->addWeek();
                    $fechaPago     = $pagoTentativo->month === $cursor->month
                                        ? $pagoTentativo
                                        : $cursor->endOfMonth();

                    $fechaLimite = $fechaPago->addWeek();

                    DeudaJugador::firstOrCreate(
                        [
                            'jugador_id'         => $jugador->id,
                            'costo_categoria_id' => $costo->id,
                            'fecha_pago'         => $fechaPago,
                        ],
                        [
                            'monto_base'      => $costo->monto_base,
                            'monto_final'     => $costo->monto_base,
                            'saldo_restante'  => $costo->monto_base,
                            'estatus'         => 'Pendiente',
                            'fecha_limite'    => $fechaLimite,
                        ]
                    );

                    $cursor = $saltos[$costo->concepto_cobro->periodicidad]($cursor);
                }
            });
        });

        return response()->json(['message' => 'Registro guardado'], 201);
    }

    //  * Mostrar un solo registro por su ID.
    public function show($id)
    {
        $registro = Jugador::with(['categoria.temporada', 'usuario'])->find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        return response()->json($registro->append(['curp_jugador_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'foto_url', 'firma_url']));
    }

    //  * Actualizar un registro.
    public function update(Request $request, $id)
    {
        $jugador = Jugador::with('categoria.temporada')->find($id);
        if (!$jugador) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $data = $request->validate([
            'temporada_id' => 'sometimes|exists:temporadas,id',
            'usuario_id' => 'sometimes|exists:usuarios,id',
            'foto' => 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
            'nombre' => 'sometimes|string|max:100',
            'apellido_p' => 'sometimes|string|max:100',
            'apellido_m' => 'sometimes|string|max:100',
            'genero' => 'sometimes|in:Hombre,Mujer',
            'direccion' => 'sometimes|string',
            'telefono' => 'sometimes|string|max:15',
            'fecha_nacimiento' => 'sometimes|date',
            'curp' => 'sometimes|string|max:18|min:17',
            'padecimientos' => 'sometimes|string|max:100',
            'alergias' => 'sometimes|string|max:100',
            'curp_jugador' => 'sometimes|file|mimes:pdf|max:2048',
            'ine' => 'sometimes|file|mimes:pdf|max:2048',
            'acta_nacimiento' => 'sometimes|file|mimes:pdf|max:2048',
            'comprobante_domicilio' => 'sometimes|file|mimes:pdf|max:2048',
            'firma' => 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            if ($jugador->foto) {
                $this->eliminarFoto($jugador->foto);
            }
            $data['foto'] = $this->subirFoto($request->file('foto'));
        }
        if ($request->hasFile('curp_jugador')) {
            if ($jugador->curp_jugador) {
                $this->eliminarDocumento($jugador->curp_jugador);
            }
            $data['curp_jugador'] = $this->subirDocumento($request->file('curp_jugador'));
        }
        if ($request->hasFile('ine')) {
            if ($jugador->ine) {
                $this->eliminarDocumento($jugador->ine);
            }
            $data['ine'] = $this->subirDocumento($request->file('ine'));
        }
        if ($request->hasFile('acta_nacimiento')) {
            if ($jugador->acta_nacimiento) {
                $this->eliminarDocumento($jugador->acta_nacimiento);
            }
            $data['acta_nacimiento'] = $this->subirDocumento($request->file('acta_nacimiento'));
        }
        if ($request->hasFile('comprobante_domicilio')) {
            if ($jugador->comprobante_domicilio) {
                $this->eliminarDocumento($jugador->comprobante_domicilio);
            }
            $data['comprobante_domicilio'] = $this->subirDocumento($request->file('comprobante_domicilio'));
        }
        if ($request->hasFile('firma')) {
            if ($jugador->firma) {
                $this->eliminarDocumento($jugador->firma);
            }
            $data['firma'] = $this->subirDocumento($request->file('firma'));
        }

        $categoriaNueva = Categoria::where('temporada_id', $request->temporada_id)
            ->where('genero', $request->genero)
            ->whereDate('fecha_inicio', '<=', $request->fecha_nacimiento)
            ->whereDate('fecha_fin',   '>=', $request->fecha_nacimiento)
            ->first();

        if(!$categoriaNueva){
            return response()->json(['message' => 'Sus datos no entran en ninguna categoría disponible, por favor verifíquelos (Temporada, nacimiento y/o genéro)'], 422);
        }

        $categoriaAnt    = $jugador->categoria;
        $tempAntId       = $categoriaAnt->temporada_id;
        $tempNuevaId     = $categoriaNueva->temporada_id;
        $cambioCategoria = $categoriaAnt->id !== $categoriaNueva->id;
        $cambioTemporada = $tempAntId     !== $tempNuevaId;

        DB::transaction(function () use (&$data, $jugador, $categoriaAnt, $categoriaNueva, $cambioCategoria, $cambioTemporada) {
            $data['categoria_id'] = $categoriaNueva->id;
            $jugador->update($data);

            // CASO A · Cambia categoría dentro de misma temporada
            if ($cambioCategoria && !$cambioTemporada) {
                $mapNuevos = $categoriaNueva->costosCategoria()->pluck('id', 'concepto_cobro_id');

                $jugador->deudas()
                    ->whereHas('costo_categoria.categoria', fn ($q) =>
                        $q->where('temporada_id', $categoriaNueva->temporada_id)
                    )
                    ->get()
                    ->each(function ($deuda) use ($mapNuevos) {
                        $nuevoCostoId = $mapNuevos[$deuda->costo_categoria->concepto_cobro_id] ?? null;
                        if (!$nuevoCostoId) return;

                        $nuevoCosto = CostoCategoria::find($nuevoCostoId);
                        if ($nuevoCosto->monto_base !== $deuda->monto_base) {
                            $diferencia = $nuevoCosto->monto_base - $deuda->monto_base;
                            $deuda->monto_base   = $nuevoCosto->monto_base;
                            $deuda->monto_final += $diferencia;
                            $deuda->saldo_restante += $diferencia;
                        }

                        $deuda->costo_categoria_id = $nuevoCostoId;
                        $deuda->save();
                    });

                return;
            }

            // CASO B · Pasa a temporada distinta
            if ($cambioTemporada) {

                // 1. NO tocar deudas de la temporada anterior (histórico)
                // 2. Generar deudas nuevas (Pendiente) como en alta
                $hoy       = CarbonImmutable::today();
                $finTemp   = CarbonImmutable::parse($categoriaNueva->temporada->fecha_fin);

                $saltos = [
                    'Diario'        => fn ($d) => $d->addDay(),
                    'Semanal'       => fn ($d) => $d->addWeek(),
                    'Quincenal'     => fn ($d) => $d->addDays(15),
                    'Mensual'       => fn ($d) => $d->addMonth(),
                    'Bimestral'     => fn ($d) => $d->addMonths(2),
                    'Trimestral'    => fn ($d) => $d->addMonths(3),
                    'Cuatrimestral' => fn ($d) => $d->addMonths(4),
                    'Semestral'     => fn ($d) => $d->addMonths(6),
                    'Anual'         => fn ($d) => $d->addYear(),
                    'Temporada'     => fn ($d) => $finTemp->addDay(),
                ];

                $categoriaNueva->costosCategoria()
                    ->with('concepto_cobro')
                    ->get()
                    ->each(function ($costo) use ($jugador, $hoy, $finTemp, $saltos) {

                        $cursor       = $hoy->clone();
                        $periodicidad = $costo->concepto_cobro->periodicidad;

                        do {
                            $pagoTent   = $cursor->addWeek();
                            $fechaPago  = $pagoTent->month === $cursor->month
                                        ? $pagoTent
                                        : $cursor->endOfMonth();
                            $fechaLimit = $fechaPago->addWeek();

                            DeudaJugador::firstOrCreate(
                                [
                                    'jugador_id'         => $jugador->id,
                                    'costo_categoria_id' => $costo->id,
                                    'fecha_pago'         => $fechaPago,
                                ],
                                [
                                    'monto_base'      => $costo->monto_base,
                                    'monto_final'     => $costo->monto_base,
                                    'saldo_restante'  => $costo->monto_base,
                                    'estatus'         => 'Pendiente',
                                    'fecha_limite'    => $fechaLimit,
                                ]
                            );

                            if ($periodicidad === 'Temporada') break;
                            $cursor = ($saltos[$periodicidad])($cursor);
                        } while ($cursor->lte($finTemp));
                    });
            }
        });

        return response()->json(['message' => 'Registro actualizado'], 201);
    }

    //  * Eliminar un registro.
    public function destroy($id)
    {
        $registro = Jugador::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }

        $registro->delete();

        if ($registro->foto) {
            $this->eliminarFoto($registro->foto);
        }
        if ($registro->curp_jugador) {
            $this->eliminarDocumento($registro->curp_jugador);
        }
        if ($registro->ine) {
            $this->eliminarDocumento($registro->ine);
        }
        if ($registro->acta_nacimiento) {
            $this->eliminarDocumento($registro->acta_nacimiento);
        }
        if ($registro->comprobante_domicilio) {
            $this->eliminarDocumento($registro->comprobante_domicilio);
        }
        if ($registro->firma) {
            $this->eliminarDocumento($registro->firma);
        }

        return response()->json(['message' => 'Registro eliminado con éxito']);
    }

    // * Función para subir una foto
    private function subirFoto($archivo)
    {
        return ArchivosHelper::subirArchivoConPermisos($archivo, 'public/fotos_jugadores');
    }

    // * Función para eliminar una foto
    private function eliminarFoto($nombreArchivo)
    {
        ArchivosHelper::eliminarArchivo('public/fotos_jugadores', $nombreArchivo);
    }

    // * Función para subir un documento
    private function subirDocumento($archivo)
    {
        return ArchivosHelper::subirArchivoConPermisos($archivo, 'public/documentos_jugadores');
    }

    // * Función para eliminar un documento
    private function eliminarDocumento($nombreArchivo)
    {
        ArchivosHelper::eliminarArchivo('public/documentos_jugadores', $nombreArchivo);
    }
}
