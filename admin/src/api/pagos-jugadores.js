import dayjs from 'dayjs'
import { formatearMonedaMXN } from '../utils/formattedCurrancy'
import { apiClient } from './configAxios'

// Crear un registro
export const createPagosJugadores = async (data) => {
  try {
    const response = await apiClient.post('pagos-jugadores', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getPagosJugadores = async () => {
  try {
    const response = await apiClient.get('pagos-jugadores')
    const { data } = response

    return data.map((pago) => ({
      ...pago,
      concepto: `${pago.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${pago.deuda_jugador.costo_categoria.categoria.nombre})`,
      banco: pago.banco.nombre,
      nombre_jugador: `${pago.deuda_jugador.jugador.nombre} ${pago.deuda_jugador.jugador.apellido_p} ${pago.deuda_jugador.jugador.apellido_m}`,
      monto: pago.deuda_jugador.monto_final,
      monto_pagado: formatearMonedaMXN(pago.deuda_jugador.monto_final),
      fecha_pagado_format: dayjs(pago.fecha_pagado).format('DD/MM/YYYY')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getPagosFinalizadaJugadores = async () => {
  try {
    const response = await apiClient.get('historial-pagos-jugadores')
    const { data } = response

    return data.map((pago) => ({
      ...pago,
      concepto: `${pago.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${pago.deuda_jugador.costo_categoria.categoria.nombre})`,
      banco: pago.banco.nombre,
      nombre_jugador: `${pago.deuda_jugador.jugador.nombre} ${pago.deuda_jugador.jugador.apellido_p} ${pago.deuda_jugador.jugador.apellido_m}`,
      monto: pago.deuda_jugador.monto_final,
      monto_pagado: formatearMonedaMXN(pago.deuda_jugador.monto_final),
      fecha_pagado_format: dayjs(pago.fecha_pagado).format('DD/MM/YYYY'),
      temporada: pago.deuda_jugador.costo_categoria.categoria.temporada.nombre
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getPagosTodosJugadores = async () => {
  try {
    const response = await apiClient.get('todos-pagos-jugadores')
    const { data } = response

    return data.map((pago) => ({
      ...pago,
      concepto: `${pago.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${pago.deuda_jugador.costo_categoria.categoria.nombre})`,
      banco: pago.banco.nombre,
      nombre_jugador: `${pago.deuda_jugador.jugador.nombre} ${pago.deuda_jugador.jugador.apellido_p} ${pago.deuda_jugador.jugador.apellido_m}`,
      monto: pago.deuda_jugador.monto_final,
      monto_pagado: formatearMonedaMXN(pago.deuda_jugador.monto_final),
      fecha_pagado_format: dayjs(pago.fecha_pagado).format('DD/MM/YYYY'),
      temporada: pago.deuda_jugador.costo_categoria.categoria.temporada.nombre
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updatePagosJugadores = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`pagos-jugadores/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removePagosJugadores = async (id) => {
  try {
    const response = await apiClient.delete(`pagos-jugadores/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
