import dayjs from 'dayjs'
import { apiClient } from './configAxios'

// Crear un registro
export const createCategoria = async (data) => {
  try {
    const response = await apiClient.post('categorias', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getCategoria = async () => {
  try {
    const response = await apiClient.get('categorias')
    const { data } = response

    return data.map((categoria) => ({
      ...categoria,
      temporada_id: {
        label: categoria.temporada.nombre,
        value: categoria.temporada.id
      },
      nombre_temporada: categoria.temporada.nombre,
      fecha_inicio_format: dayjs(categoria.fecha_inicio).format('DD/MM/YYYY'),
      fecha_fin_format: dayjs(categoria.fecha_fin).format('DD/MM/YYYY')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getFiltroCategoria = async ({
  temporada,
  fecha_nacimiento,
  genero
}) => {
  try {
    const response = await apiClient.get(
      `filtro-categorias?temporada_id=${temporada}&fecha_nacimiento=${fecha_nacimiento}&genero=${genero}`
    )
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateCategoria = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`categorias/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeCategoria = async (id) => {
  try {
    const response = await apiClient.delete(`categorias/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
