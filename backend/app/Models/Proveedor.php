<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Proveedor extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'proveedores';

    protected $fillable = ['nombre_empresa', 'nombre_contacto', 'calle', 'numero', 'colonia', 'cp',
        'municipio', 'estado', 'pais', 'telefono_empresa', 'extension_empresa', 'telefono_contacto', 'correo_contacto', 'credito_dias', 'rfc', 'razon_social', 'uso_cfdi', 'regimen_fiscal', 'situacion_fiscal'];

    public function gasto()
    {
        return $this->hasMany(Gasto::class, 'proveedor_id');
    }

    public function orden_compra()
    {
        return $this->hasMany(OrdenCompra::class, 'proveedor_id');
    }
}
