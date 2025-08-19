<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class PagoJugador extends Model {
    use HasFactory, HasLogs;

    protected $table = 'pagos_jugadores';

    protected $fillable = ['deuda_jugador_id', 'banco_id', 'metodo_pago','referencia','fecha_pagado'];

    public function banco()
    {
        return $this->belongsTo(Banco::class);
    }

    public function deuda_jugador()
    {
        return $this->belongsTo(DeudaJugador::class);
    }

    public function movimientosBancarios()
    {
        return $this->morphMany(MovimientoBancario::class, 'origen');
    }
}
