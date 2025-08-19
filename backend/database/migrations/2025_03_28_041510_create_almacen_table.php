<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('almacen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')->constrained('articulos')->onDelete('restrict');
            $table->string('numero_serie')->unique();
            $table->date('fecha_entrada');
            $table->date('fecha_salida')->nullable();
            $table->enum('estado', ['Disponible', 'Asignado', 'Devolución a proveedor', 'Venta', 'Destrucción', 'Mantenimiento', 'Robo', 'Pérdida', 'Otro']);
            $table->text('otra_informacion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('almacen');
    }
};
