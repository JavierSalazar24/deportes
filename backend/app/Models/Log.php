<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $table = 'logs';

    protected $fillable = [
        'modulo',
        'modulo_id',
        'accion',
        'datos_anteriores',
        'datos_nuevos',
        'usuario_id',
        'ip',
    ];

    protected $casts = [
        'datos_anteriores' => 'array',
        'datos_nuevos' => 'array',
    ];

    public function usuario() {
        return $this->belongsTo(Usuario::class);
    }
}
