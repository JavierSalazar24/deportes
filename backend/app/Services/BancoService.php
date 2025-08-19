<?php

namespace App\Services;

use App\Models\Banco;
use App\Models\MovimientoBancario;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class BancoService
{
    /**
     * Registrar un ingreso bancario (suma al saldo).
     */
    public function registrarIngreso(Banco $banco, float $monto, string $concepto, string $metodoPago, ?Model $origen = null): MovimientoBancario
    {
        return $this->registrarMovimiento($banco, 'Ingreso', $monto, $concepto, $metodoPago, $origen);
    }

    /**
     * Registrar un egreso bancario (resta al saldo).
     */
    public function registrarEgreso(Banco $banco, float $monto, string $concepto, string $metodoPago, ?Model $origen = null): MovimientoBancario
    {
        return $this->registrarMovimiento($banco, 'Egreso', $monto, $concepto, $metodoPago, $origen);
    }

    /**
     * Método base para registrar el movimiento.
     */
    protected function registrarMovimiento(Banco $banco, string $tipo, float $monto, string $concepto, string $metodoPago, ?Model $origen): MovimientoBancario
    {
        return DB::transaction(function () use ($banco, $tipo, $monto, $concepto, $metodoPago, $origen) {
            $movimiento = new MovimientoBancario();
            $movimiento->banco_id = $banco->id;
            $movimiento->tipo_movimiento = $tipo;
            $movimiento->concepto = $concepto;
            $movimiento->fecha = now();
            $movimiento->referencia = null;
            $movimiento->monto = $monto;
            $movimiento->metodo_pago = $metodoPago;

            if ($origen) {
                $movimiento->origen_id = $origen->getKey();
                $movimiento->origen_type = get_class($origen);
            }

            $movimiento->save();

            return $movimiento;
        });
    }

    public function revertirMovimiento(MovimientoBancario $movimiento): void
    {
        DB::transaction(function () use ($movimiento) {
            $movimiento->delete();
        });
    }

}
