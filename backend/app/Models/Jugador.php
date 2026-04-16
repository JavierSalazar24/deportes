<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Jugador extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'jugadores';

    protected $fillable = ['categoria_id', 'usuario_id', 'nombre', 'apellido_p', 'apellido_m', 'genero', 'direccion', 'telefono', 'fecha_nacimiento', 'curp', 'padecimientos', 'alergias', 'foto', 'curp_jugador', 'ine', 'acta_nacimiento', 'comprobante_domicilio', 'firma'];

    protected $hidden = ['categoria_id', 'usuario_id', 'foto', 'curp_jugador', 'ine', 'acta_nacimiento', 'comprobante_domicilio', 'firma'];

    public function getFotoUrlAttribute()
    {
        if (!$this->foto) {
            return;
        }

        return asset("storage/fotos_jugadores/{$this->foto}");
    }

    public function getCurpJugadorUrlAttribute()
    {
        if (!$this->curp_jugador) {
            return;
        }

        return asset("storage/documentos_jugadores/{$this->curp_jugador}");
    }
    public function getIneUrlAttribute()
    {
        if (!$this->ine) {
            return;
        }

        return asset("storage/documentos_jugadores/{$this->ine}");
    }
    public function getActaNacimientoUrlAttribute()
    {
        if (!$this->acta_nacimiento) {
            return;
        }

        return asset("storage/documentos_jugadores/{$this->acta_nacimiento}");
    }
    public function getComprobanteDomicilioUrlAttribute()
    {
        if (!$this->comprobante_domicilio) {
            return;
        }

        return asset("storage/documentos_jugadores/{$this->comprobante_domicilio}");
    }
    public function getFirmaUrlAttribute()
    {
        if (!$this->firma) {
            return;
        }

        return asset("storage/documentos_jugadores/{$this->firma}");
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function deudas()
    {
        return $this->hasMany(DeudaJugador::class);
    }
}
