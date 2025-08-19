import { apiClient } from './configAxios'
import dayjs from 'dayjs'

// Crear un registro
export const createMovimientoBancario = async (data) => {
  try {
    const response = await apiClient.post('movimientos-bancarios', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getMovimientoBancario = async () => {
  try {
    const response = await apiClient.get('movimientos-bancarios')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((movimiento) => ({
          ...movimiento,
          banco_id: {
            label: movimiento.banco.nombre,
            value: movimiento.banco.id
          },
          banco: movimiento.banco.nombre,
          monto_format: `$${movimiento.monto}`,
          fecha_format: dayjs(movimiento.fecha).format('DD/MM/YYYY')
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateMovimientoBancario = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`movimientos-bancarios/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeMovimientoBancario = async (id) => {
  try {
    const response = await apiClient.delete(`movimientos-bancarios/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
