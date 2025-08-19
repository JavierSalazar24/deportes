<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerificarPermisosModulo
{
    public function handle(Request $request, Closure $next, $modulo, $permiso)
    {
        $usuario = Auth::user();

        if (!$usuario || !$usuario->rol) {
            return response()->json(['message' => 'Acceso no autorizado.'], 403);
        }

        $tienePermiso = $usuario->rol->permisos()
            ->whereHas('modulo', function ($query) use ($modulo) {
                $query->where('nombre', $modulo);
            })
            ->where($permiso, true)
            ->exists();

        if (!$tienePermiso) {
            return response()->json(['message' => 'Permiso denegado para el módulo ' . $modulo . '.'], 403);
        }

        return $next($request);
    }
}
