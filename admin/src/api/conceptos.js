import { apiClient } from './configAxios'

// Crear un registro
export const createConcepto = async (data) => {
  try {
    const response = await apiClient.post('conceptos', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getConcepto = async () => {
  try {
    const response = await apiClient.get('conceptos')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateConcepto = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`conceptos/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeConcepto = async (id) => {
  try {
    const response = await apiClient.delete(`conceptos/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
