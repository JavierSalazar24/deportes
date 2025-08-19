<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class DeudaJugador extends Model {

    use HasFactory, HasLogs;

    protected $table = 'deudas_jugadores';

    protected $fillable = ['jugador_id', 'costo_categoria_id', 'monto_base', 'extra', 'descuento', 'monto_final', 'saldo_restante', 'estatus', 'notas', 'fecha_pago', 'fecha_limite'];

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }

    public function costo_categoria()
    {
        return $this->belongsTo(CostoCategoria::class);
    }

    public function abonos_deudas()
    {
        return $this->hasMany(AbonoDeudaJugador::class);
    }

    public function pagos_jugadores()
    {
        return $this->hasMany(PagoJugador::class);
    }
}
