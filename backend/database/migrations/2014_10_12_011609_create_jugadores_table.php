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
        Schema::create('jugadores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categoria_id')->constrained('categorias')->onDelete('cascade');
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            $table->mediumText('foto');
            $table->string('nombre', 100);
            $table->string('apellido_p', 100);
            $table->string('apellido_m', 100);
            $table->enum('genero', ['Hombre', 'Mujer']);
            $table->mediumtext('direccion');
            $table->string('telefono', 15);
            $table->date('fecha_nacimiento');
            $table->string('curp', 18);
            $table->string('padecimientos', 100);
            $table->string('alergias', 100);
            $table->mediumText('curp_jugador')->nullable();
            $table->mediumText('ine')->nullable();
            $table->mediumText('acta_nacimiento')->nullable();
            $table->mediumText('comprobante_domicilio')->nullable();
            $table->mediumText('firma');
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
        Schema::dropIfExists('jugadores');
    }
};