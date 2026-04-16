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

    public function pagoJugador()
    {
        return $this->hasOne(PagoJugador::class, 'deuda_jugador_id');
    }

    /* --- Scopes útiles --- */
    public function scopeDeJugador($q, $jugadorId)
    {
        return $q->where('jugador_id', $jugadorId);
    }

    public function scopeEntreFechasPago($q, $inicio, $fin)
    {
        // Puedes ajustar a fecha_pago o fecha_limite según tu uso
        return $q->whereBetween('fecha_pago', [$inicio, $fin]);
    }

    /* --- Atributos calculados (opcional) --- */
    protected $appends = ['total_abonado'];

    public function getTotalAbonadoAttribute()
    {
        // Si usas withSum, Laravel lo poblará; si no, calculamos al vuelo.
        if (array_key_exists('abonos_deudas_sum_monto', $this->attributes)) {
            return (float) $this->attributes['abonos_deudas_sum_monto'];
        }
        return (float) $this->abonos_deudas()->sum('monto');
    }
}
