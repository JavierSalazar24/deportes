<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Permiso extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'permisos';

    protected $fillable = ['rol_id', 'modulo_id', 'crear', 'consultar', 'actualizar', 'eliminar'];

    protected $hidden = ['rol_id', 'modulo_id'];


    public function rol() {
        return $this->belongsTo(Rol::class);
    }

    public function modulo()
    {
        return $this->belongsTo(Modulo::class, 'modulo_id');
    }
}
