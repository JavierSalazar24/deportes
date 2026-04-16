<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index()
    {
        $registros = Log::with('usuario')->latest()->get()->map(function ($log) {
            $log->datos_anteriores = json_decode($log->datos_anteriores, true);
            $log->datos_nuevos = json_decode($log->datos_nuevos, true);
            return $log;
        });

        return response()->json($registros);
    }
}