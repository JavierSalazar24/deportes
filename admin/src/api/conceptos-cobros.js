import { apiClient } from './configAxios'

// Crear un registro
export const createConceptoCobros = async (data) => {
  try {
    const response = await apiClient.post('conceptos-cobros', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getConceptoCobros = async () => {
  try {
    const response = await apiClient.get('conceptos-cobros')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateConceptoCobros = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`conceptos-cobros/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeConceptoCobros = async (id) => {
  try {
    const response = await apiClient.delete(`conceptos-cobros/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
