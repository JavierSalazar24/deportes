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
        Schema::create('proveedores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_empresa', 100);
            $table->string('nombre_contacto', 100);
            $table->string('calle', 100);
            $table->string('numero', 20);
            $table->string('colonia', 50);
            $table->unsignedInteger('cp');
            $table->string('municipio', 100);
            $table->string('estado', 100);
            $table->string('pais', 100);
            $table->string('telefono_empresa', 15);
            $table->string('extension_empresa', 10)->nullable();
            $table->string('telefono_contacto', 15);
            $table->string('correo_contacto', 100)->unique();
            $table->unsignedInteger('credito_dias')->nullable();
            $table->string('rfc', 13);
            $table->string('razon_social');
            $table->string('uso_cfdi');
            $table->string('regimen_fiscal');
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
        Schema::dropIfExists('proveedores');
    }
};
