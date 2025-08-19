import { apiClient, apiClientForm } from './configAxios'

// Crear un registro
export const createUsuario = async (data) => {
  try {
    const formData = new FormData()
    formData.append('nombre_completo', data.nombre_completo)
    formData.append('rol_id', data.rol_id)
    formData.append('email', data.email)
    formData.append('telefono', data.telefono)
    formData.append('password', data.password)
    if (data.foto instanceof File) {
      formData.append('foto', data.foto)
    }

    const response = await apiClientForm.post('usuarios', formData)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getUsuario = async () => {
  try {
    const response = await apiClient.get('usuarios')
    const { data } = response
    return data.map((user) => ({
      ...user,
      rol_id: { label: user.rol.nombre, value: user.rol.id },
      rol_asignado: user.rol.nombre
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateUsuario = async (data) => {
  try {
    const { id } = data

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('nombre_completo', data.nombre_completo)
    formData.append('rol_id', data.rol_id)
    formData.append('email', data.email)
    formData.append('telefono', data.telefono)
    if (data?.password) {
      formData.append('password', data.password)
    }
    if (data.foto instanceof File) {
      formData.append('foto', data.foto)
    }

    const response = await apiClientForm.post(`usuarios/${id}`, formData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeUsuario = async (id) => {
  try {
    const response = await apiClient.delete(`usuarios/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
