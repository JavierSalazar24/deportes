<?php

namespace Database\Factories;

use App\Models\Jugador;
use App\Models\Categoria;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

class JugadorFactory extends Factory
{
    protected $model = Jugador::class;

    public function definition()
    {
        // Selecciona una categoría random
        $categoria = Categoria::inRandomOrder()->first() ?? Categoria::factory()->create();

        // Define género igual que la categoría
        $genero = $categoria->genero ?? $this->faker->randomElement(['Hombre', 'Mujer']);

        // Fecha de nacimiento dentro del rango de la categoría
        $fecha_nacimiento = $this->faker->dateTimeBetween(
            $categoria->fecha_inicio,
            $categoria->fecha_fin
        )->format('Y-m-d');

        return [
            'categoria_id' => $categoria->id,
            'usuario_id' => 1,
            'nombre' => $this->faker->firstName($genero === 'Hombre' ? 'male' : 'female'),
            'apellido_p' => $this->faker->lastName(),
            'apellido_m' => $this->faker->lastName(),
            'genero' => $genero,
            'direccion' => $this->faker->address(),
            'telefono' => $this->faker->numerify('6#########'),
            'fecha_nacimiento' => $fecha_nacimiento,
            'curp' => strtoupper($this->faker->bothify('????######??????##')),
            'padecimientos' => $this->faker->word(),
            'alergias' => $this->faker->word(),

            'foto' => 'default.png',
            'curp_jugador' => 'default.pdf',
            'ine' => 'default.pdf',
            'acta_nacimiento' => 'default.pdf',
            'comprobante_domicilio' => 'default.pdf',
            'firma' => 'default.png',
        ];
    }
}