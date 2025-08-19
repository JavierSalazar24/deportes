<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class CajaPago extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'caja_pagos';

    protected $fillable = ['banco_id', 'usuario_id', 'jugador_id', 'motivo', 'concepto', 'monto', 'metodo_pago', 'referencia'];

    public function banco()
    {
        return $this->belongsTo(Banco::class);
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }
}
