<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Modulo extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'modulos';

    protected $fillable = ['nombre', 'ruta'];

    public function permisos() {
        return $this->hasMany(Permiso::class);
    }
}