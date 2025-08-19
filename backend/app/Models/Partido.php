<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Partido extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'partidos';

    protected $fillable = ['categoria_id', 'foto', 'rival', 'lugar', 'fecha_hora'];

    protected $hidden = ['categoria_id', 'foto'];

    public function getFotoUrlAttribute()
    {
        if (!$this->foto) {
            return;
        }

        return asset("storage/fotos_partidos/{$this->foto}");
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}