import dayjs from 'dayjs'
import { apiClient, apiClientForm } from './configAxios'

// Crear un registro
export const createPartido = async (data) => {
  try {
    const formData = new FormData()
    formData.append('categoria_id', data.categoria_id)
    formData.append('rival', data.rival)
    formData.append('lugar', data.lugar)
    formData.append('fecha_hora', data.fecha_hora)
    if (data?.foto) {
      formData.append('foto', data.foto)
    }

    const response = await apiClientForm.post('partidos', formData)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getPartido = async () => {
  try {
    const response = await apiClient.get('partidos')
    const { data } = response

    return data.map((partido) => ({
      ...partido,
      categoria_id: {
        label: partido.categoria.nombre,
        value: partido.categoria.id
      },
      nombre_categoria: partido.categoria.nombre,
      fecha_hora_format: dayjs(partido.fecha_hora).format('DD/MM/YYYY hh:mm A')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Ultimo partido
export const getPartidoProximo = async () => {
  try {
    const response = await apiClient.get('partido-proximo')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updatePartido = async (data) => {
  try {
    const { id } = data

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('categoria_id', data.categoria_id)
    formData.append('rival', data.rival)
    formData.append('lugar', data.lugar)
    formData.append('fecha_hora', data.fecha_hora)
    if (data.foto instanceof File) {
      formData.append('foto', data.foto)
    }

    const response = await apiClientForm.post(`partidos/${id}`, formData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removePartido = async (id) => {
  try {
    const response = await apiClient.delete(`partidos/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
