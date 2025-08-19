<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class AlmacenEntrada extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'almacen_entradas';

    protected $fillable = [
        'jugador_id',
        'articulo_id',
        'numero_serie',
        'fecha_entrada',
        'tipo_entrada',
        'otros_conceptos',
        'orden_compra',
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