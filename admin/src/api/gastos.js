import { apiClient } from './configAxios'
import dayjs from 'dayjs'

// Crear un registro
export const createGasto = async (data) => {
  try {
    const response = await apiClient.post('gastos', data)
    return response.data
  } catch (error) {
    console.error('Error al crear el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getGasto = async () => {
  try {
    const response = await apiClient.get('gastos')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((gasto) => ({
          ...gasto,
          banco_id: {
            label: gasto.banco.nombre,
            value: gasto.banco.id
          },
          concepto_id: {
            label: gasto.concepto.nombre,
            value: gasto.concepto.id
          },
          concepto: gasto.concepto.nombre,
          banco: gasto.banco.nombre,
          total_format: `$${gasto.total}`,
          fecha: dayjs(gasto.created_at).format('DD/MM/YYYY')
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateGasto = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`gastos/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeGasto = async (id) => {
  try {
    const response = await apiClient.delete(`gastos/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
