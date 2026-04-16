<?php

namespace App\Observers;

use App\Models\MovimientoBancario;

class MovimientoBancarioObserver
{
    /**
     * Se ejecuta justo después de guardar un nuevo movimiento.
     */
    public function created(MovimientoBancario $movimiento): void
    {
        $banco  = $movimiento->banco;
        $monto  = $movimiento->monto;

        if ($movimiento->tipo_movimiento === 'Ingreso') {
            $banco->increment('saldo', $monto);
        } else {
            $banco->decrement('saldo', $monto);
        }
    }

    /**
     * Se ejecuta justo después de eliminar un movimiento.
     */
    public function deleted(MovimientoBancario $movimiento): void
    {
        $banco  = $movimiento->banco;
        $monto  = $movimiento->monto;

        if ($movimiento->tipo_movimiento === 'Ingreso') {
            $banco->decrement('saldo', $monto);
        } else { // Egreso
            $banco->increment('saldo', $monto);
        }
    }

    public function updated(MovimientoBancario $movimiento): void
    {
        // Detectar cambios
        $original = $movimiento->getOriginal();

        // Si cambió el banco_id, revertir en el viejo y aplicar en el nuevo
        if ($original['banco_id'] !== $movimiento->banco_id) {
            $bancoAnterior = \App\Models\Banco::find($original['banco_id']);
            $bancoNuevo = $movimiento->banco;

            $this->ajustarSaldo($bancoAnterior, $original['tipo_movimiento'], -$original['monto']);
            $this->ajustarSaldo($bancoNuevo, $movimiento->tipo_movimiento, $movimiento->monto);

            return;
        }

        // Si cambió tipo o monto
        if (
            $original['monto'] != $movimiento->monto ||
            $original['tipo_movimiento'] != $movimiento->tipo_movimiento
        ) {
            $banco = $movimiento->banco;

            // Revertir el movimiento original
            $this->ajustarSaldo($banco, $original['tipo_movimiento'], -$original['monto']);

            // Aplicar el nuevo
            $this->ajustarSaldo($banco, $movimiento->tipo_movimiento, $movimiento->monto);
        }
    }

    protected function ajustarSaldo($banco, $tipo, $monto)
    {
        if ($tipo === 'Ingreso') {
            $banco->increment('saldo', $monto);
        } else {
            $banco->decrement('saldo', $monto);
        }
    }

}