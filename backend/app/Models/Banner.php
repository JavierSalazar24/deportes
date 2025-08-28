<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Banner extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'banners';

    protected $fillable = ['nombre', 'foto'];

    public function getFotoUrlAttribute()
    {
        if (!$this->foto) {
            return;
        }

        return asset("storage/banners/{$this->foto}");
    }
}
