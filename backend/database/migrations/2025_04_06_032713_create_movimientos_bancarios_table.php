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
        Schema::create('movimientos_bancarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('banco_id')->constrained('bancos')->onDelete('restrict');
            $table->enum('tipo_movimiento', ['Ingreso', 'Egreso']);
            $table->text('concepto');
            $table->date('fecha');
            $table->string('referencia')->nullable();
            $table->decimal('monto', 10, 2);
            $table->enum('metodo_pago', ['Transferencia bancaria', 'Tarjeta de crédito/débito', 'Efectivo', 'Cheques']);
            $table->unsignedBigInteger('origen_id')->nullable();
            $table->string('origen_type')->nullable();
            $table->index(['origen_id', 'origen_type']);
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
        Schema::dropIfExists('movimientos_bancarios');
    }
};
