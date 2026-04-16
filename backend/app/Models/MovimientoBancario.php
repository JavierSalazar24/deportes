<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class MovimientoBancario extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'movimientos_bancarios';

    protected $fillable = ['banco_id', 'tipo_movimiento', 'concepto', 'fecha', 'referencia', 'monto', 'metodo_pago', 'origen_id', 'origen_type'];

    protected $hidden = ['banco_id'];

    public function banco()
    {
        return $this->belongsTo(Banco::class, 'banco_id')->select(['id', 'nombre']);
    }

    public function origen()
    {
        return $this->morphTo();
    }
}