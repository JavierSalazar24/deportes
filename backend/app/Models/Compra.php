<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Compra extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'compras';

    protected $fillable = ['orden_compra_id', 'metodo_pago', 'referencia'];

    protected $hidden = ['orden_compra_id'];

    public function orden_compra()
    {
        return $this->belongsTo(OrdenCompra::class, 'orden_compra_id');
    }

    public function movimientosBancarios()
    {
        return $this->morphMany(MovimientoBancario::class, 'origen');
    }
}