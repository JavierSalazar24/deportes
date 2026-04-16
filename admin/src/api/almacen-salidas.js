import dayjs from 'dayjs'
import { apiClient } from './configAxios'

// Crear un registro
export const createAlmacenSalida = async (data) => {
  try {
    const response = await apiClient.post('almacen-salidas', data)
    return response.data
  } catch (error) {
    console.error('Error al crear el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getAlmacenSalida = async () => {
  try {
    const response = await apiClient.get('almacen-salidas')
    const { data } = response

    return data.map((salida) => ({
      ...salida,
      jugador_id: {
        label: salida?.jugador?.nombre || null,
        value: salida?.jugador?.id || null
      },
      articulo_id: {
        label: `${salida.articulo.nombre} (${salida.numero_serie})`,
        value: `${salida.numero_serie}`,
        id: salida.articulo.id
      },
      articulo: salida.articulo.nombre,
      numero_serie: salida.numero_serie,
      fecha_salida_format: dayjs(salida.fecha_salida, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      )
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getAlmacenSalidaById = async (id) => {
  try {
    const response = await apiClient.get('almacen-salidas/' + id)
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateAlmacenSalida = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`almacen-salidas/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}
