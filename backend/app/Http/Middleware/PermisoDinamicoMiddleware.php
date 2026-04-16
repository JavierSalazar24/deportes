<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermisoDinamicoMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        $rol = $user->rol;

        if (!$rol) {
            return response()->json(['error' => 'Sin rol asignado'], 403);
        }

        // Mapa de rutas auxiliares a módulos reales
        $mapAliasModulo = [
            'generar-estadocuenta-banco'       => 'estadocuenta-bancos',
            'generar-estadocuenta-jugador'     => 'estadocuenta-jugadores',
            'generar-estadocuenta-proveedor'   => 'estadocuenta-proveedores',
            'articulos-asignar'                => 'articulos',
            'almacen-disponibles'              => 'almacen',
            'equipo-disponible'                => 'almacen',
            'generador-reportes'               => 'generador-reportes',
            'temporadas-activas'               => 'temporadas',
            'filtro-categorias'                => 'categorias',
            'categoria-costo-jugador'          => 'costos-categoria',
            'deudas-periodo'                   => 'deudas-jugadores',
            'deudas-pendientes'                => 'deudas-jugadores',
            'historial-deudas-jugadores'       => 'deudas-jugadores',
            'historial-abonos-jugadores'       => 'abonos-jugadores',
            'historial-pagos-jugadores'        => 'pagos-jugadores',
            'todos-deudas-jugadores'           => 'deudas-jugadores',
            'todos-abonos-jugadores'           => 'abonos-jugadores',
            'todos-pagos-jugadores'            => 'pagos-jugadores',
        ];

        $path = $request->path();
        $uri = explode('/', $path);

        // Ignora el prefijo "api" si existe
        $moduloBase = $uri[0] === 'api' ? $uri[1] ?? null : $uri[0];

        // Aplica alias si existe
        $modulo = $mapAliasModulo[$moduloBase] ?? $moduloBase;

        $metodo = $request->method();
        $accion = match ($metodo) {
            'GET'    => 'consultar',
            'POST'   => 'crear',
            'PUT', 'PATCH' => 'actualizar',
            'DELETE' => 'eliminar',
            default  => 'consultar'
        };

        $permiso = $rol->permisos()->whereHas('modulo', function ($q) use ($modulo) {
            $q->where('ruta', $modulo);
        })->first();

        if (!$permiso || !$permiso->$accion) {
            return response()->json(['message' => 'No tienes permiso para acceder a este módulo'], 403);
        }

        return $next($request);
    }
}
