import dayjs from 'dayjs'
import { apiClient } from './configAxios'

// Crear un registro
export const createAlmacenEntrada = async (data) => {
  try {
    const response = await apiClient.post('almacen-entradas', data)
    return response.data
  } catch (error) {
    console.error('Error al crear el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getAlmacenEntrada = async () => {
  try {
    const response = await apiClient.get('almacen-entradas')
    const { data } = response

    return data.map((entrada) => ({
      ...entrada,
      jugador_id: {
        label: entrada?.jugador?.nombre || null,
        value: entrada?.jugador?.id || null
      },
      articulo_id: {
        label: entrada.articulo.nombre,
        value: entrada.articulo.id
      },
      articulo: entrada.articulo.nombre,
      numero_serie: entrada.numero_serie,
      fecha_entrada_format: dayjs(entrada.fecha_entrada, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      )
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getAlmacenEntradaById = async (id) => {
  try {
    const response = await apiClient.get('almacen-entradas/' + id)
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateAlmacenEntrada = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`almacen-entradas/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}
