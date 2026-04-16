<?php

namespace App\Services;

use App\Models\Banco;

class ValidadorSaldoBanco
{
    /**
     * Verifica si el banco tiene saldo suficiente para un egreso.
     * @return array [ok: bool, advertencia: string|null, error: string|null]
     */
    public static function validar(Banco $banco, float $monto)
    {
        if ($monto > $banco->saldo) {
            return [
                'ok' => false,
                'advertencia' => null,
                'error' => 'Saldo insuficiente en el banco seleccionado.'
            ];
        }
        if ($monto == $banco->saldo) {
            return [
                'ok' => true,
                'advertencia' => '¡Atención! Este egreso dejará el saldo en cero.',
                'error' => null
            ];
        }
        return [
            'ok' => true,
            'advertencia' => null,
            'error' => null
        ];
    }
}
