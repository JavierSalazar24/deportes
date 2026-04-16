import { apiClient } from './configAxios'

// Crear un registro
export const createArticulo = async (data) => {
  try {
    const response = await apiClient.post('articulos', data)
    return response.data
  } catch (error) {
    console.error('Error al crear el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getArticulo = async () => {
  try {
    const response = await apiClient.get('articulos')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getArticuloAsignar = async () => {
  try {
    const response = await apiClient.get('articulos-asignar')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getArticuloById = async (id) => {
  try {
    const response = await apiClient.get('articulos/' + id)
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateArticulo = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`articulos/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeArticulo = async (id) => {
  try {
    const response = await apiClient.delete(`articulos/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
