<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Almacen extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'almacen';

    protected $fillable = ['articulo_id', 'numero_serie', 'fecha_entrada', 'fecha_salida', 'estado', 'otra_informacion'];

    public function articulo()
    {
        return $this->belongsTo(Articulo::class);
    }

}
