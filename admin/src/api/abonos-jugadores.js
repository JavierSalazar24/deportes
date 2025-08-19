import dayjs from 'dayjs'
import { formatearMonedaMXN } from '../utils/formattedCurrancy'
import { apiClient } from './configAxios'

// Crear un registro
export const createAbonoJugadores = async (data) => {
  try {
    const response = await apiClient.post('abonos-jugadores', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getAbonoJugadores = async () => {
  try {
    const response = await apiClient.get('abonos-jugadores')
    const { data } = response
    return data.map((abono) => {
      const jugador = `${abono.deuda_jugador.jugador.nombre} ${abono.deuda_jugador.jugador.apellido_p} ${abono.deuda_jugador.jugador.apellido_m}`
      const fechaPago = dayjs(abono.deuda_jugador.fecha_pago).format(
        'DD/MM/YYYY'
      )
      const deudaLabel = `${jugador} - ${abono.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${abono.deuda_jugador.costo_categoria.categoria.nombre}) - ${fechaPago}`

      return {
        ...abono,
        banco_id: {
          label: abono.banco.nombre,
          value: abono.banco.id
        },
        deuda_jugador_id: {
          label: deudaLabel,
          value: abono.deuda_jugador.id
        },
        concepto: `${abono.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${abono.deuda_jugador.costo_categoria.categoria.nombre})`,
        jugador,
        fecha_pago_format: fechaPago,
        banco_nombre: abono.banco.nombre,
        monto_abonado: formatearMonedaMXN(abono.monto),
        fecha_abono: dayjs(abono.fecha).format('DD/MM/YYYY')
      }
    })
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getAbonoFinalizadaJugadores = async () => {
  try {
    const response = await apiClient.get('historial-abonos-jugadores')
    const { data } = response
    return data.map((abono) => {
      const jugador = `${abono.deuda_jugador.jugador.nombre} ${abono.deuda_jugador.jugador.apellido_p} ${abono.deuda_jugador.jugador.apellido_m}`
      const fechaPago = dayjs(abono.deuda_jugador.fecha_pago).format(
        'DD/MM/YYYY'
      )
      const deudaLabel = `${jugador} - ${abono.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${abono.deuda_jugador.costo_categoria.categoria.nombre}) - ${fechaPago}`
      return {
        ...abono,
        banco_id: {
          label: abono.banco.nombre,
          value: abono.banco.id
        },
        deuda_jugador_id: {
          label: deudaLabel,
          value: abono.deuda_jugador.id
        },
        temporada:
          abono.deuda_jugador.costo_categoria.categoria.temporada.nombre,
        concepto: `${abono.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${abono.deuda_jugador.costo_categoria.categoria.nombre})`,
        fecha_pago_format: fechaPago,
        jugador,
        banco_nombre: abono.banco.nombre,
        monto_abonado: formatearMonedaMXN(abono.monto),
        fecha_abono: dayjs(abono.fecha).format('DD/MM/YYYY')
      }
    })
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getAbonoTodosJugadores = async () => {
  try {
    const response = await apiClient.get('todos-abonos-jugadores')
    const { data } = response
    return data.map((abono) => {
      const jugador = `${abono.deuda_jugador.jugador.nombre} ${abono.deuda_jugador.jugador.apellido_p} ${abono.deuda_jugador.jugador.apellido_m}`
      const fechaPago = dayjs(abono.deuda_jugador.fecha_pago).format(
        'DD/MM/YYYY'
      )
      const deudaLabel = `${jugador} - ${abono.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${abono.deuda_jugador.costo_categoria.categoria.nombre}) - ${fechaPago}`
      return {
        ...abono,
        banco_id: {
          label: abono.banco.nombre,
          value: abono.banco.id
        },
        deuda_jugador_id: {
          label: deudaLabel,
          value: abono.deuda_jugador.id
        },
        temporada:
          abono.deuda_jugador.costo_categoria.categoria.temporada.nombre,
        concepto: `${abono.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${abono.deuda_jugador.costo_categoria.categoria.nombre})`,
        fecha_pago_format: fechaPago,
        jugador,
        banco_nombre: abono.banco.nombre,
        monto_abonado: formatearMonedaMXN(abono.monto),
        fecha_abono: dayjs(abono.fecha).format('DD/MM/YYYY')
      }
    })
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateAbonoJugadores = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`abonos-jugadores/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeAbonoJugadores = async (id) => {
  try {
    const response = await apiClient.delete(`abonos-jugadores/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
