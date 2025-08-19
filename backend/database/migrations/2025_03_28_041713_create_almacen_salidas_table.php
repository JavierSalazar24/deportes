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
        Schema::create('almacen_salidas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jugador_id')->nullable()->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('articulo_id')->constrained('articulos')->onDelete('restrict');
            $table->string('numero_serie');
            $table->date('fecha_salida');
            $table->enum('motivo_salida', ['Asignado', 'Devolución a proveedor', 'Venta', 'Destrucción', 'Mantenimiento', 'Robo', 'Pérdida', 'Otro']);
            $table->text('motivo_salida_otro')->nullable();
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
        Schema::dropIfExists('almacen_salidas');
    }
};