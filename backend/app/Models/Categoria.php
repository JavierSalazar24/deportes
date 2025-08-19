<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Categoria extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'categorias';

    protected $fillable = ['temporada_id', 'nombre', 'genero', 'fecha_inicio', 'fecha_fin'];

    protected $hidden = ['temporada_id'];

    public function temporada()
    {
        return $this->belongsTo(Temporada::class);
    }

    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }

    public function costosCategoria()
    {
        return $this->hasMany(CostoCategoria::class);
    }
}
