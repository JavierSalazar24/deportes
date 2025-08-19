<?php

namespace App\Services;

use App\Models\Jugador;
use App\Models\DeudaJugador;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class FeeAssignmentService
{
    public function asignarDeudas(Jugador $jugador, Carbon $inicioTemporada): void {
        DB::transaction(function () use ($jugador,$inicioTemporada) {
            $categoria = $jugador->categoria()->with('conceptosCobro')->first();
            foreach ($categoria->conceptosCobro as $concepto) {
                $pivot = $concepto->pivot;
                if (DeudaJugador::where('jugador_id',$jugador->id)
                        ->where('categoria_concepto_cobro_id',$pivot->id)->exists()) continue;

                $vence = $pivot->dia_vencimiento
                         ? $inicioTemporada->copy()->day($pivot->dia_vencimiento)
                         : null;

                DeudaJugador::create([
                    'jugador_id'                  => $jugador->id,
                    'categoria_concepto_cobro_id' => $pivot->id,
                    'monto_base'                  => $pivot->monto_base,
                    'monto_final'                 => $pivot->monto_base,
                    'saldo_restante'              => $pivot->monto_base,
                    'vence_el'                    => $vence,
                ]);
            }
        });
    }
}
