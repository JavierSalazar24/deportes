<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Banco extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'bancos';

    protected $fillable = ['nombre', 'cuenta', 'clabe', 'saldo_inicial', 'saldo'];

    public function gasto()
    {
        return $this->hasMany(Gasto::class, 'banco_id');
    }

    public function orden_compra()
    {
        return $this->hasMany(OrdenCompra::class, 'banco_id');
    }

    public function reporte_banco()
    {
        return $this->hasMany(ReporteBanco::class, 'banco_id');
    }

    public function movimientos()
    {
        return $this->hasMany(MovimientoBancario::class, 'banco_id');
    }
}
