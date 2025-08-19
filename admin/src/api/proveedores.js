import { apiClient } from './configAxios'

// Crear un registro
export const createProveedor = async (data) => {
  try {
    const response = await apiClient.post('proveedores', data)
    return response.data
  } catch (error) {
    console.error('Error al crear el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getProveedor = async () => {
  try {
    const response = await apiClient.get('proveedores')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateProveedor = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`proveedores/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeProveedor = async (id) => {
  try {
    const response = await apiClient.delete(`proveedores/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
