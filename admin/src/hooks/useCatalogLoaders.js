// hooks/useCatalogLoaders.js

import { getBanco } from '../api/bancos'
import { getProveedor } from '../api/proveedores'
import { getArticulo } from '../api/articulos'
import { getJugadores } from '../api/jugadores'
import { getRol } from '../api/roles'
import { getModulo } from '../api/modulos'
import { getConcepto } from '../api/conceptos'
import { getAlmacenDisponibles } from '../api/almacen'
import { getTemporada, getTemporadaActiva } from '../api/temporadas'
import { getCategoria } from '../api/categorias'
import { getUsuario } from '../api/usuarios'
import { getConceptoCobros } from '../api/conceptos-cobros'
import { getCostosCategoria } from '../api/costos-categoria'
import { getDeudasJugadoresPendientes } from '../api/deudas-jugadores'

// Loader genérico simple (label normal)
function genericLoader(getter, labelKey) {
  let cache = null
  return async (inputValue) => {
    if (!cache) cache = await getter()
    const filtered = cache.filter((item) =>
      (item[labelKey] ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase())
    )
    return filtered.map((item) => ({
      value: item.id,
      label: item[labelKey]
    }))
  }
}

// Loader para etiquetas compuestas o lógica custom
function customLoader(getter, filterFn, mapFn) {
  let cache = null
  return async (inputValue) => {
    if (!cache) cache = await getter()
    const filtered = cache.filter((item) => filterFn(item, inputValue))
    return filtered.map(mapFn)
  }
}

// Todos los loaders simples y compuestos:
export const useCatalogLoaders = () => ({
  loadOptionsTemporadasActivas: genericLoader(getTemporadaActiva, 'nombre'),
  loadOptionsTemporadas: genericLoader(getTemporada, 'nombre'),
  loadOptionsBancos: genericLoader(getBanco, 'nombre'),
  loadOptionsProveedores: genericLoader(getProveedor, 'nombre_empresa'),
  loadOptionsArticulos: genericLoader(getArticulo, 'nombre'),
  loadOptionsConcepto: genericLoader(getConcepto, 'nombre'),
  loadOptionsRoles: genericLoader(getRol, 'nombre'),
  loadOptionsModulos: genericLoader(getModulo, 'nombre'),
  loadOptionsConceptoCobros: genericLoader(getConceptoCobros, 'nombre'),
  // Etiquetas compuestas:
  loadOptionsCategorias: customLoader(
    getCategoria,
    (data, inputValue) =>
      (data.nombre ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()) ||
      (data.nombre_temporada ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()),
    (data) => ({
      value: data.id,
      label: `${data.nombre} (${data.nombre_temporada})`
    })
  ),
  loadOptionsCostosCategoria: customLoader(
    getCostosCategoria,
    (data, inputValue) =>
      (data.concepto_cobro_id.label ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()),
    (data) => ({
      value: data.id,
      label: data.concepto_cobro_id.label,
      categoria: data.categoria_id.label,
      monto: data.monto_base
    })
  ),
  loadOptionsDeudasJugadores: customLoader(
    getDeudasJugadoresPendientes,
    (data, inputValue) =>
      (data.nombre_jugador ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()) ||
      (data.concepto ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()) ||
      (data.fecha_pago_format ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()),
    (data) => ({
      value: data.id,
      label: `${data.nombre_jugador} - ${data.concepto} - ${data.fecha_pago_format}`,
      jugador: data.nombre_jugador,
      monto: data.monto_final
    })
  ),
  loadOptionsUsuarios: customLoader(
    getUsuario,
    (data, inputValue) =>
      (data.nombre_completo ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()),
    (data) => ({
      value: data.id,
      label: data.nombre_completo,
      correo: data.email,
      telefono: data.telefono
    })
  ),
  loadOptionsJugadores: customLoader(
    getJugadores,
    (data, inputValue) =>
      (data.jugador ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()) ||
      (data.numero_empleado ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()),
    (data) => ({
      value: data.id,
      label: data.jugador,
      categoria_id: data.categoria.id,
      categoria: data.categoria.nombre
    })
  ),
  loadOptionsArticulosDisponibles: customLoader(
    getAlmacenDisponibles,
    (data, inputValue) =>
      (data.articulo.nombre ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()) ||
      (data.numero_serie ?? '')
        .toLowerCase()
        .includes((inputValue ?? '').toLowerCase()),
    (data) => ({
      value: data.articulo.id,
      label: `${data.articulo.nombre} (${data.numero_serie})`,
      numero_serie: data.numero_serie
    })
  )
})
