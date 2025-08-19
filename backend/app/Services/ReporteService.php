<?php

namespace App\Services;

use App\Models\MovimientoBancario;
use App\Models\OrdenCompra;
use App\Models\Compra;
use App\Models\Gasto;
use App\Models\DeudaJugador;
use App\Models\AbonoDeudaJugador;
use App\Models\PagoJugador;

class ReporteService
{
    public static function obtenerRegistros($modulo, $filtros)
    {
        $query = match ($modulo) {
            'movimientos'            => MovimientoBancario::query(),
            'orden-compra'           => OrdenCompra::query(),
            'compras'                => Compra::query(),
            'gastos'                 => Gasto::query(),
            'deudas-jugadores'       => DeudaJugador::query(),
            'abonos-jugadores'       => AbonoDeudaJugador::query(),
            'pagos-jugadores'        => PagoJugador::query(),
            default                  => null,
        };

        if (!$query) {
            return collect(); // Retorna colección vacía si no existe el módulo
        }

        // Aplicar rango de fechas
        $query->whereBetween('created_at', [$filtros['fecha_inicio'], $filtros['fecha_fin']]);

        // Aplicar filtros específicos según módulo
        match ($modulo) {
            'movimientos'         => self::filtrarMovimeinto($query, $filtros),
            'orden-compra'        => self::filtrarOrdenCompra($query, $filtros),
            'compras'             => self::filtrarCompra($query, $filtros),
            'gastos'              => self::filtrarGasto($query, $filtros),
            'deudas-jugadores'    => self::filtrarDeudasJugadores($query, $filtros),
            'abonos-jugadores'    => self::filtrarAbonosJugadores($query, $filtros),
            'pagos-jugadores'     => self::filtrarPagosJugadores($query, $filtros),
        };

        return $query->get();
    }

    private static function filtrarMovimeinto($query, $filtros)
    {
        $query->with('banco');

        if ($filtros['banco_id'] !== 'todos') {
            $query->where('banco_id', $filtros['banco_id']);
        }
        if ($filtros['tipo_movimiento'] !== 'todos') {
            $query->where('tipo_movimiento', $filtros['tipo_movimiento']);
        }
        if ($filtros['metodo_pago'] !== 'todos') {
            $query->where('metodo_pago', $filtros['metodo_pago']);
        }
    }

    private static function filtrarOrdenCompra($query, $filtros)
    {
        $query->with(['proveedor', 'banco', 'articulo']);

        if ($filtros['banco_id'] !== 'todos') {
            $query->where('banco_id', $filtros['banco_id']);
        }
        if ($filtros['proveedor_id'] !== 'todos') {
            $query->where('proveedor_id', $filtros['proveedor_id']);
        }
        if ($filtros['estatus'] !== 'todos') {
            $query->where('estatus', $filtros['estatus']);
        }
    }

    private static function filtrarCompra($query, $filtros)
    {
        $query->with(['orden_compra.proveedor', 'orden_compra.banco', 'orden_compra.articulo']);

        if ($filtros['banco_id'] !== 'todos') {
            $query->whereHas('orden_compra', function ($q) use ($filtros) {
                $q->where('banco_id', $filtros['banco_id']);
            });
        }
        if ($filtros['proveedor_id'] !== 'todos') {
            $query->whereHas('orden_compra', function ($q) use ($filtros) {
                $q->where('proveedor_id', $filtros['proveedor_id']);
            });
        }
        if ($filtros['metodo_pago'] !== 'todos') {
            $query->where('metodo_pago', $filtros['metodo_pago']);
        }
    }

    private static function filtrarGasto($query, $filtros)
    {
        $query->with(['banco', 'concepto']);

        if ($filtros['banco_id'] !== 'todos') {
            $query->where('banco_id', $filtros['banco_id']);
        }
        if ($filtros['metodo_pago'] !== 'todos') {
            $query->where('metodo_pago', $filtros['metodo_pago']);
        }
    }

    private static function filtrarDeudasJugadores($query, $filtros)
    {
        $query->with(['jugador', 'costo_categoria.concepto_cobro', 'costo_categoria.categoria.temporada']);

        if ($filtros['temporada_id'] !== 'todos') {
            $query->whereHas('costo_categoria.categoria', function ($q) use ($filtros) {
                $q->where('temporada_id', $filtros['temporada_id']);
            });
        }
        if ($filtros['estatus'] !== 'todos') {
            $query->where('estatus', $filtros['estatus']);
        }
    }

    private static function filtrarAbonosJugadores($query, $filtros)
    {
        $query->with(['deuda_jugador.jugador', 'deuda_jugador.costo_categoria.concepto_cobro', 'deuda_jugador.costo_categoria.categoria.temporada', 'banco']);

        if ($filtros['banco_id'] !== 'todos') {
            $query->where('banco_id', $filtros['banco_id']);
        }
        if ($filtros['metodo_pago'] !== 'todos') {
            $query->where('metodo_pago', $filtros['metodo_pago']);
        }
        if ($filtros['temporada_id'] !== 'todos') {
            $query->whereHas('deuda_jugador.costo_categoria.categoria', function ($q) use ($filtros) {
                $q->where('temporada_id', $filtros['temporada_id']);
            });
        }
    }

    private static function filtrarPagosJugadores($query, $filtros)
    {
        $query->with(['deuda_jugador.jugador', 'deuda_jugador.abonos_deudas', 'deuda_jugador.costo_categoria.categoria.temporada', 'deuda_jugador.costo_categoria.concepto_cobro', 'banco']);

        if ($filtros['banco_id'] !== 'todos') {
            $query->where('banco_id', $filtros['banco_id']);
        }
        if ($filtros['metodo_pago'] !== 'todos') {
            $query->where('metodo_pago', $filtros['metodo_pago']);
        }
        if ($filtros['temporada_id'] !== 'todos') {
            $query->whereHas('deuda_jugador.costo_categoria.categoria', function ($q) use ($filtros) {
                $q->where('temporada_id', $filtros['temporada_id']);
            });
        }
    }
}
