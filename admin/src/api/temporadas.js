import dayjs from 'dayjs'
import { apiClient } from './configAxios'

// Crear un registro
export const createTemporada = async (data) => {
  try {
    const response = await apiClient.post('temporadas', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getTemporada = async () => {
  try {
    const response = await apiClient.get('temporadas')
    const { data } = response

    return data.map((temporada) => ({
      ...temporada,
      fecha_inicio_format: dayjs(temporada.fecha_inicio).format('DD/MM/YYYY'),
      fecha_fin_format: dayjs(temporada.fecha_fin).format('DD/MM/YYYY')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getTemporadaActiva = async () => {
  try {
    const response = await apiClient.get('temporadas-activas')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateTemporada = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`temporadas/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeTemporada = async (id) => {
  try {
    const response = await apiClient.delete(`temporadas/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
