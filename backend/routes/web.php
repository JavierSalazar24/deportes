<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\EstadoCuentaController;
use App\Http\Controllers\EquipamientoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/api/pdf/estado-cuenta-jugadores', [EstadoCuentaController::class, 'generarPdfEstadoCuentaJugador']);
Route::get('/api/pdf/estado-cuenta-proveedores', [EstadoCuentaController::class, 'generarPdfEstadoCuentaProveedor']);
Route::get('/api/pdf/estado-cuenta-bancos', [EstadoCuentaController::class, 'generarPdfEstadoCuentaBanco']);
Route::get('/api/pdf/equipamiento/{id}', [EquipamientoController::class, 'equipamientoPDF']);

Route::get('/cmd/{command}', function($command){
    Artisan::call($command);
    dd(Artisan::output());
});

Route::get('/{any}', function () {
    return File::get(public_path('index.html'));
})->where('any', '.*');
