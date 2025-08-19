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
        Schema::create('almacen_entradas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jugador_id')->nullable()->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('articulo_id')->constrained('articulos')->onDelete('restrict');
            $table->string('numero_serie');
            $table->date('fecha_entrada');
            $table->enum('tipo_entrada', ['Compra', 'Devolución de jugador', 'Cambio de equipo', 'Reparación terminada', 'Otro']);
            $table->string('otros_conceptos')->nullable();
            $table->string('orden_compra')->nullable();
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
        Schema::dropIfExists('almacen_entradas');
    }
};