<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Temporada extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'temporadas';

    protected $fillable = ['temporada_id', 'nombre', 'fecha_inicio', 'fecha_fin', 'estatus'];

    public function categorias() {
        return $this->hasMany(Categoria::class);
    }
}