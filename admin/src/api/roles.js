import { apiClient } from './configAxios'

// Crear un registro
export const createRol = async (data) => {
  try {
    const response = await apiClient.post('roles', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getRol = async () => {
  try {
    const response = await apiClient.get('roles')
    const { data } = response

    return data.map((rol) => {
      const modulos = rol.permisos.map((mod) => ({
        label: mod.modulo.nombre,
        value: mod.modulo.id
      }))

      return {
        ...rol,
        modulos_id: modulos
      }
    })
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateRol = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`roles/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeRol = async (id) => {
  try {
    const response = await apiClient.delete(`roles/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
