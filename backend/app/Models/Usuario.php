<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\HasLogs;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasLogs;

    protected $table = 'usuarios';

    protected $fillable = ['nombre_completo', 'email', 'password', 'rol_id', 'foto', 'telefono'];

    protected $hidden = ['rol_id', 'password'];

    protected $appends = ['foto_url'];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'rol_id');
    }

    public function getFotoUrlAttribute()
    {
        if (!$this->foto) {
            return;
        }

        return asset("storage/fotos_usuarios/{$this->foto}");
    }

    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }
}