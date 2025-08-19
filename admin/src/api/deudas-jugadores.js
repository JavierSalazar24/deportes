import dayjs from 'dayjs'
import { formatearMonedaMXN } from '../utils/formattedCurrancy'
import { apiClient } from './configAxios'

// Crear un registro
export const createDeudasJugadores = async (data) => {
  try {
    const response = await apiClient.post('deudas-jugadores', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getDeudasJugadores = async () => {
  try {
    const response = await apiClient.get('deudas-jugadores')
    const { data } = response

    return data.map((deuda) => ({
      ...deuda,
      jugador_id: {
        label: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
        value: deuda.jugador.id
      },
      costo_categoria_id: {
        label: deuda.costo_categoria.concepto_cobro.nombre,
        value: deuda.costo_categoria.categoria.id
      },
      banco_id: {
        value: deuda?.pagos_jugadores[0]?.banco.id || null,
        label: deuda?.pagos_jugadores[0]?.banco.nombre || null
      },

      metodo_pago: deuda?.pagos_jugadores[0]?.metodo_pago || null,
      referencia: deuda?.pagos_jugadores[0]?.referencia || null,
      fecha_pagado: deuda?.pagos_jugadores[0]?.fecha_pagado,
      concepto: `${deuda.costo_categoria.concepto_cobro.nombre} (${deuda.costo_categoria.categoria.nombre})`,
      categoria: deuda.costo_categoria.categoria.nombre,
      nombre_jugador: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
      monto_base_format: formatearMonedaMXN(deuda.monto_base),
      monto_final_format: formatearMonedaMXN(deuda.monto_final),
      saldo: formatearMonedaMXN(deuda.saldo_restante),
      fecha_pago_format: dayjs(deuda.fecha_pago).format('DD/MM/YYYY'),
      fecha_limite_format: dayjs(deuda.fecha_limite).format('DD/MM/YYYY')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getDeudasFinalizadaJugadores = async () => {
  try {
    const response = await apiClient.get('historial-deudas-jugadores')
    const { data } = response

    return data.map((deuda) => ({
      ...deuda,
      jugador_id: {
        label: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
        value: deuda.jugador.id
      },
      costo_categoria_id: {
        label: deuda.costo_categoria.concepto_cobro.nombre,
        value: deuda.costo_categoria.categoria.id
      },
      banco_id: {
        value: deuda?.pagos_jugadores[0]?.banco.id || null,
        label: deuda?.pagos_jugadores[0]?.banco.nombre || null
      },
      temporada: deuda.costo_categoria.categoria.temporada.nombre,
      metodo_pago: deuda?.pagos_jugadores[0]?.metodo_pago || null,
      referencia: deuda?.pagos_jugadores[0]?.referencia || null,
      fecha_pagado: deuda?.pagos_jugadores[0]?.fecha_pagado,
      concepto: `${deuda.costo_categoria.concepto_cobro.nombre} (${deuda.costo_categoria.categoria.nombre})`,
      categoria: deuda.costo_categoria.categoria.nombre,
      nombre_jugador: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
      monto_base_format: formatearMonedaMXN(deuda.monto_base),
      monto_final_format: formatearMonedaMXN(deuda.monto_final),
      saldo: formatearMonedaMXN(deuda.saldo_restante),
      fecha_pago_format: dayjs(deuda.fecha_pago).format('DD/MM/YYYY'),
      fecha_limite_format: dayjs(deuda.fecha_limite).format('DD/MM/YYYY')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getDeudasTodoJugadores = async () => {
  try {
    const response = await apiClient.get('todos-deudas-jugadores')
    const { data } = response

    return data.map((deuda) => ({
      ...deuda,
      jugador_id: {
        label: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
        value: deuda.jugador.id
      },
      costo_categoria_id: {
        label: deuda.costo_categoria.concepto_cobro.nombre,
        value: deuda.costo_categoria.categoria.id
      },
      banco_id: {
        value: deuda?.pagos_jugadores[0]?.banco.id || null,
        label: deuda?.pagos_jugadores[0]?.banco.nombre || null
      },
      temporada: deuda.costo_categoria.categoria.temporada.nombre,
      metodo_pago: deuda?.pagos_jugadores[0]?.metodo_pago || null,
      referencia: deuda?.pagos_jugadores[0]?.referencia || null,
      fecha_pagado: deuda?.pagos_jugadores[0]?.fecha_pagado,
      concepto: `${deuda.costo_categoria.concepto_cobro.nombre} (${deuda.costo_categoria.categoria.nombre})`,
      categoria: deuda.costo_categoria.categoria.nombre,
      nombre_jugador: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
      monto_base_format: formatearMonedaMXN(deuda.monto_base),
      monto_final_format: formatearMonedaMXN(deuda.monto_final),
      saldo: formatearMonedaMXN(deuda.saldo_restante),
      fecha_pago_format: dayjs(deuda.fecha_pago).format('DD/MM/YYYY'),
      fecha_limite_format: dayjs(deuda.fecha_limite).format('DD/MM/YYYY')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros pendientes
export const getDeudasJugadoresPendientes = async () => {
  try {
    const response = await apiClient.get('deudas-pendientes')
    const { data } = response

    return data.map((deuda) => ({
      ...deuda,
      jugador_id: {
        label: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
        value: deuda.jugador.id
      },
      costo_categoria_id: {
        label: deuda.costo_categoria.concepto_cobro.nombre,
        value: deuda.costo_categoria.categoria.id
      },
      banco_id: null,
      metodo_pago: null,
      referencia: null,
      fecha_pagado: null,
      concepto: `${deuda.costo_categoria.concepto_cobro.nombre} (${deuda.costo_categoria.categoria.nombre})`,
      categoria: deuda.costo_categoria.categoria.nombre,
      nombre_jugador: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
      monto_base_format: formatearMonedaMXN(deuda.monto_base),
      monto_final_format: formatearMonedaMXN(deuda.monto_final),
      saldo: formatearMonedaMXN(deuda.saldo_restante),
      fecha_pago_format: dayjs(deuda.fecha_pago).format('DD/MM/YYYY'),
      fecha_limite_format: dayjs(deuda.fecha_limite).format('DD/MM/YYYY')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getDeudasJugadoresPeriodo = async (periodo) => {
  try {
    const response = await apiClient.get(`deudas-periodo/${periodo}`)
    const { data } = response

    return data.map((deuda) => ({
      ...deuda,
      jugador_id: {
        label: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
        value: deuda.jugador.id
      },
      costo_categoria_id: {
        label: deuda.costo_categoria.concepto_cobro.nombre,
        value: deuda.costo_categoria.categoria.id
      },
      banco_id: {
        value: deuda?.pagos_jugadores[0]?.banco.id || null,
        label: deuda?.pagos_jugadores[0]?.banco.nombre || null
      },

      metodo_pago: deuda?.pagos_jugadores[0]?.metodo_pago || null,
      referencia: deuda?.pagos_jugadores[0]?.referencia || null,
      fecha_pagado: deuda?.pagos_jugadores[0]?.fecha_pagado,
      concepto: `${deuda.costo_categoria.concepto_cobro.nombre} (${deuda.costo_categoria.categoria.nombre})`,
      categoria: deuda.costo_categoria.categoria.nombre,
      nombre_jugador: `${deuda.jugador.nombre} ${deuda.jugador.apellido_p} ${deuda.jugador.apellido_m}`,
      monto_base_format: formatearMonedaMXN(deuda.monto_base),
      monto_final_format: formatearMonedaMXN(deuda.monto_final),
      saldo: formatearMonedaMXN(deuda.saldo_restante),
      fecha_pago_format: dayjs(deuda.fecha_pago).format('DD/MM/YYYY'),
      fecha_limite_format: dayjs(deuda.fecha_limite).format('DD/MM/YYYY')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateDeudasJugadores = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`deudas-jugadores/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeDeudasJugadores = async (id) => {
  try {
    const response = await apiClient.delete(`deudas-jugadores/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
