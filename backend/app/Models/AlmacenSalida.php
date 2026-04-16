<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class AlmacenSalida extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'almacen_salidas';

    protected $fillable = [
        'jugador_id',
        'articulo_id',
        'numero_serie',
        'fecha_salida',
        'motivo_salida',
        'motivo_salida_otro',
    ];

    public function articulo()
    {
        return $this->belongsTo(Articulo::class);
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }
}