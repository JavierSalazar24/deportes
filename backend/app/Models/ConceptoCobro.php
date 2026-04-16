<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class ConceptoCobro extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'conceptos_cobro';

    protected $fillable = ['nombre','periodicidad'];

    public function costos_categorias()
    {
        return $this->hasMany(CostoCategoria::class);
    }
}
