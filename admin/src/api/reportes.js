import { apiClient } from './configAxios'

export const getReporte = async (info) => {
  try {
    const response = await apiClient.post('generador-reportes', info)
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getEstadoCuentaProveedor = async (info) => {
  try {
    const response = await apiClient.get('generar-estadocuenta-proveedor', {
      params: {
        proveedor_id: info.proveedor_id,
        fecha_inicio: info.fecha_inicio,
        fecha_fin: info.fecha_fin
      }
    })
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getEstadoCuentaBanco = async (info) => {
  try {
    const response = await apiClient.get('generar-estadocuenta-banco', {
      params: {
        banco_id: info.banco_id,
        fecha_inicio: info.fecha_inicio,
        fecha_fin: info.fecha_fin
      }
    })
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getEstadoCuentaJugadores = async (info) => {
  try {
    const response = await apiClient.get('generar-estadocuenta-jugador', {
      params: {
        jugador_id: info.jugador_id,
        fecha_inicio: info.fecha_inicio,
        fecha_fin: info.fecha_fin
      }
    })
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response.data.message)
  }
}
