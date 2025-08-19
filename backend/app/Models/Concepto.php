<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLogs;

class Concepto extends Model
{
    use HasFactory, HasLogs;
    protected $table = 'conceptos';

    protected $fillable = ['nombre', 'descripcion'];
}