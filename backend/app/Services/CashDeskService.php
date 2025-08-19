<?php

namespace App\Services;

use App\Models\Jugador;
use App\Models\Pago;
use App\Models\DetallePago;
use App\Models\DeudaJugador;
use Illuminate\Support\Facades\DB;

class CashDeskService
{
    public function registrarPago(Jugador $jugador, array $deudaIds, float $importe, string $metodo='efectivo'): Pago {
        return DB::transaction(function () use ($jugador,$deudaIds,$importe,$metodo) {
            $pago = Pago::create([
                'jugador_id'   => $jugador->id,
                'total_pagado' => $importe,
                'pagado_el'    => now(),
                'metodo'       => $metodo,
            ]);

            $orden = implode(',',$deudaIds);
            $deudas = DeudaJugador::whereIn('id',$deudaIds)
                     ->where('jugador_id',$jugador->id)
                     ->orderByRaw("FIELD(id,$orden)")
                     ->lockForUpdate()->get();

            foreach ($deudas as $deuda) {
                if ($importe<=0) break;
                $aplica = min($deuda->saldo_restante,$importe);
                DetallePago::create([
                    'pago_id'=>$pago->id,
                    'deuda_jugador_id'=>$deuda->id,
                    'monto_aplicado'=>$aplica,
                ]);
                $deuda->saldo_restante -= $aplica;
                $deuda->estado = $deuda->saldo_restante==0 ? 'pagado'
                               : ($deuda->saldo_restante<$deuda->monto_final ? 'parcial':'pendiente');
                $deuda->save();
                $importe -= $aplica;
            }
            if ($importe>0) throw new \LogicException('Importe excede saldo seleccionado');
            return $pago->load('detalles.deudaJugador');
        });
    }
}
