import { apiClient, apiClientForm } from './configAxios'

// Iniciar sesión
export const loginRequest = async (credentials) => {
  try {
    const response = await apiClient.post('login', credentials)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

// Cerrar sesión
export const logoutRequest = async () => {
  try {
    const response = await apiClient.post('logout')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Obtener perfil del usuario autenticado
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('perfil')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const updateUserProfile = async (id, profileData) => {
  try {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('nombre_completo', profileData.nombre_completo)
    if (profileData.foto instanceof File) {
      formData.append('foto', profileData.foto)
    }

    const { data } = await apiClientForm.post(`/perfil/${id}`, formData)
    return data
  } catch (error) {
    console.error('Error al actualizar el perfil', error)
    throw new Error(error.response.data.message)
  }
}
