import { apiClient } from './configAxios'

// Crear un registro
export const createModulo = async (data) => {
  try {
    const response = await apiClient.post('modulos', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getModulo = async () => {
  try {
    const response = await apiClient.get('modulos')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateModulo = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`modulos/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeModulo = async (id) => {
  try {
    const response = await apiClient.delete(`modulos/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
