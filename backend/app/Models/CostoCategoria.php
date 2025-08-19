<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class CostoCategoria extends Model {
    use HasFactory, HasLogs;

    protected $table = 'costos_categorias';

    protected $fillable = ['categoria_id','concepto_cobro_id', 'monto_base'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function concepto_cobro()
    {
        return $this->belongsTo(ConceptoCobro::class);
    }

    public function deudas_jugadores()
    {
        return $this->hasMany(DeudaJugador::class);
    }
}
