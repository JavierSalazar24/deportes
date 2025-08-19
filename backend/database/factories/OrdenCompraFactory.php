<?php

namespace Database\Factories;

use App\Models\OrdenCompra;
use App\Models\Proveedor;
use App\Models\Banco;
use App\Models\Articulo;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrdenCompraFactory extends Factory
{
    protected $model = OrdenCompra::class;

    public function definition()
    {
        $cantidad = $this->faker->numberBetween(1, 10);
        $precio = $this->faker->randomFloat(2, 100, 500);
        $subtotal = $cantidad * $precio;
        $impuesto = $this->faker->boolean;
        $total = $impuesto ? $subtotal * 0.16 : $subtotal;

        return [
            'proveedor_id' => Proveedor::inRandomOrder()->first()->id,
            'banco_id' => Banco::inRandomOrder()->first()->id,
            'articulo_id' => Articulo::inRandomOrder()->first()->id,
            'numero_oc' => $this->faker->unique()->bothify('OC####'),
            'cantidad_articulo' => $cantidad,
            'precio_articulo' => $precio,
            'impuesto' => $impuesto,
            'subtotal' => $subtotal,
            'total' => $total,
            'estatus' => $this->faker->randomElement(['Pagada', 'Pendiente', 'Cancelada']),
        ];
    }
}
