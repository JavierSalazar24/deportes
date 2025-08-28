import { apiClient, apiClientForm } from './configAxios'

// Crear un registro
export const createBanner = async (data) => {
  try {
    const formData = new FormData()
    formData.append('nombre', data.nombre)
    if (data.foto instanceof File) {
      formData.append('foto', data.foto)
    }

    const response = await apiClientForm.post('banners', formData)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getBanner = async () => {
  try {
    const response = await apiClient.get('banners')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateBanner = async (data) => {
  try {
    const { id } = data

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('nombre', data.nombre)
    if (data.foto instanceof File) {
      formData.append('foto', data.foto)
    }

    const response = await apiClientForm.post(`banners/${id}`, formData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeBanner = async (id) => {
  try {
    const response = await apiClient.delete(`banners/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
