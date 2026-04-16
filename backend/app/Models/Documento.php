<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Documento extends Model
{
    use HasFactory, HasLogs;

    protected $table = 'documentos';

    protected $fillable = ['nombre', 'documento'];

    public function getDocumentoUrlAttribute()
    {
        if (!$this->documento) {
            return;
        }

        return asset("storage/documentos/{$this->documento}");
    }

}
