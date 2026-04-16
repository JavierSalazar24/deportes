<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Articulo extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'articulos';

    protected $fillable = ['nombre', 'precio_compra', 'precio_venta', 'precio_reposicion', 'articulo_equipar'];

    public function gasto()
    {
        return $this->hasMany(Gasto::class, 'articulo_id');
    }

    public function orden_compra()
    {
        return $this->hasMany(OrdenCompra::class, 'articulo_id');
    }

    public function almacenes() {
        return $this->hasMany(Almacen::class);
    }

    public function entradas() {
        return $this->hasMany(AlmacenEntrada::class);
    }

    public function salidas() {
        return $this->hasMany(AlmacenSalida::class);
    }
}
