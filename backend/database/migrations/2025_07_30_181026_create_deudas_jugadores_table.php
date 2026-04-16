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
        Schema::create('deudas_jugadores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jugador_id')->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('costo_categoria_id')->constrained('costos_categorias')->onDelete('restrict');
            $table->decimal('monto_base',10,2);
            $table->decimal('extra',10,2)->default(0);
            $table->decimal('descuento',10,2)->default(0);
            $table->decimal('monto_final',10,2);
            $table->decimal('saldo_restante',10,2);
            $table->enum('estatus',['Pendiente','Parcial','Pagado', 'Cancelado'])->default('Pendiente');
            $table->string('notas')->nullable();
            $table->date('fecha_pago');
            $table->date('fecha_limite');
            $table->timestamps();

            $table->unique(['costo_categoria_id','jugador_id','fecha_pago']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deudas_jugadores');
    }
};