<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Equipamiento extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'equipamiento';

    protected $fillable = ['jugador_id', 'fecha_entrega', 'fecha_devuelto', 'devuelto'];

    protected $hidden = ['jugador_id'];

    public function jugador()
    {
        return $this->belongsTo(Jugador::class, 'jugador_id');
    }

    public function detalles()
    {
        return $this->hasMany(DetalleEquipamiento::class);
    }
}
