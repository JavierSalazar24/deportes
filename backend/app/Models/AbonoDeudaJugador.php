<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class AbonoDeudaJugador extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'abonos_deudas_jugadores';

    protected $fillable = ['banco_id','deuda_jugador_id','monto', 'fecha', 'metodo_pago', 'referencia', 'observaciones'];

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
