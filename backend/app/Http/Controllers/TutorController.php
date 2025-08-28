<?php

namespace App\Http\Controllers;

use App\Models\{
    Temporada,
    Jugador,
    DeudaJugador,
    PagoJugador,
    AbonoDeudaJugador,
    Partido,
    Categoria,
    Banner
};
use App\Helpers\ArchivosHelper;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TutorController extends Controller
{
    //  * Mostrar todos los registros.
    public function index()
    {
        $userId = auth()->id();

        // 1) Jugadores del usuario autenticado
        $jugadores = Jugador::with(['categoria.temporada', 'usuario'])->where('usuario_id', $userId)->get();
        $jugadorIds = $jugadores->pluck('id');
        $categoriaIds = $jugadores->pluck('categoria_id')->filter()->unique()->values();

        // 2) Temporada activa
        $temporada = Temporada::where('estatus', 'Activa')->first();

        // 3) Deudas de esos jugadores (opcional: filtrar por temporada activa)
        $deudas = DeudaJugador::with([
                'jugador',
                'costo_categoria.concepto_cobro',
                'costo_categoria.categoria.temporada',
                'pagos_jugadores.banco'
            ])
            ->whereIn('jugador_id', $jugadorIds)
            ->whereIn('estatus', ['Pendiente', 'Parcial'])
            ->when($temporada, fn($q) =>
                $q->whereHas('costo_categoria.categoria.temporada', fn($t) =>
                    $t->where('id', $temporada->id)
                )
            )
            ->orderBy('fecha_pago','asc')
            ->get();

        // 4) Pagos relacionados a deudas de esos jugadores (y temporada activa si aplica)
        $pagos = DeudaJugador::with([
                'jugador',
                'costo_categoria.concepto_cobro',
                'costo_categoria.categoria.temporada',
                'pagos_jugadores.banco'
            ])
            ->whereIn('jugador_id', $jugadorIds)
            ->where('estatus', 'Pagado')
            ->when($temporada, fn($q) =>
                $q->whereHas('costo_categoria.categoria.temporada', fn($t) =>
                    $t->where('id', $temporada->id)
                )
            )
            ->orderBy('fecha_pago','asc')
            ->get();

        // 5) Abonos relacionados a deudas de esos jugadores (y temporada activa si aplica)
        $abonos = AbonoDeudaJugador::with([
                'deuda_jugador.jugador',
                'deuda_jugador.costo_categoria.concepto_cobro',
                'deuda_jugador.costo_categoria.categoria.temporada',
                'banco'
            ])
            ->whereHas('deuda_jugador', function ($q) use ($jugadorIds, $temporada) {
                $q->whereIn('jugador_id', $jugadorIds)
                ->when($temporada, fn($qq) =>
                    $qq->whereHas('costo_categoria.categoria.temporada', fn($t) =>
                        $t->where('id', $temporada->id)
                    )
                );
            })
            ->get();

        // 6) Partidos de las categorías de esos jugadores (si quieres además limitar a temporada activa, deja el ->when)
        $partidos = Partido::query()
            ->with(['categoria:id,nombre,temporada_id'])
            ->whereIn('categoria_id', $categoriaIds)
            ->when(
                $temporada,
                fn($q) => $q->whereHas('categoria.temporada', fn($qq) => $qq->where('estatus','Activa'))
            )
            ->orderBy('fecha_hora','asc')
            ->get();

        // 7) Banners
        $banners = Banner::all();

        return response()->json([
            'banners'     => $banners->append('foto_url'),
            'jugadores'   => $jugadores->append(['curp_jugador_url', 'ine_url', 'acta_nacimiento_url', 'comprobante_domicilio_url', 'foto_url', 'firma_url']),
            'temporada'   => $temporada,
            'deudas'      => $deudas,
            'pagos'       => $pagos,
            'abonos'      => $abonos,
            'partidos'    => $partidos->append('foto_url'),
            'totalDeudas' => $deudas->sum('saldo_restante'),
            'totalAbonos' => $abonos->sum('monto'),
            'totalPagos'  => $pagos->sum('monto_final'),
        ]);
    }

    //  * Crear un nuevo registro.
    public function store(Request $request)
    {
        $data = $request->validate([
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

        $temporada = Temporada::where('estatus', 'Activa')->first();
        $data['temporada_id'] = $temporada->id;
        $data['usuario_id'] = auth()->id();

         $categoria = Categoria::where('temporada_id', $temporada->id)->where('genero', $request->genero)
            ->whereDate('fecha_inicio', '<=', $request->fecha_nacimiento)
            ->whereDate('fecha_fin', '>=', $request->fecha_nacimiento)
            ->first();

        $data['categoria_id'] = $categoria->id;

        DB::beginTransaction();
        try {
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

            DB::commit();
            return response()->json(['message' => 'Registro guardado'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar los datos', 'error' => $e->getMessage()], 500);
        }
    }

    // * Función para subir una foto
    private function subirFoto($archivo)
    {
        return ArchivosHelper::subirArchivoConPermisos($archivo, 'public/fotos_jugadores');
    }

    // * Función para subir un documento
    private function subirDocumento($archivo)
    {
        return ArchivosHelper::subirArchivoConPermisos($archivo, 'public/documentos_jugadores');
    }
}
