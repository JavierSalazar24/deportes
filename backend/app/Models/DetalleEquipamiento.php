<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class DetalleEquipamiento extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'detalles_equipamiento';

    protected $fillable = [
        'equipamiento_id',
        'articulo_id',
        'numero_serie',
    ];

    public function equipamiento()
    {
        return $this->belongsTo(Equipamiento::class);
    }

    public function articulo()
    {
        return $this->belongsTo(Articulo::class);
    }
}
