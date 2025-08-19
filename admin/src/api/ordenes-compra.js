import { apiClient } from './configAxios'
import dayjs from 'dayjs'

// Crear un registro
export const createOrdenCompra = async (data) => {
  try {
    const response = await apiClient.post('ordenes-compra', data)
    return response.data
  } catch (error) {
    console.error('Error al crear el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getOrdenCompra = async () => {
  try {
    const response = await apiClient.get('ordenes-compra')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((orden) => ({
          ...orden,
          banco_id: {
            label: orden.banco.nombre,
            value: orden.banco.id
          },
          proveedor_id: {
            label: orden.proveedor.nombre_empresa,
            value: orden.proveedor.id
          },
          articulo_id: {
            label: orden.articulo.nombre,
            value: orden.articulo.id
          },

          banco: orden.banco.nombre,
          proveedor: orden.proveedor.nombre_empresa,
          articulo: orden.articulo.nombre,
          total_format: `$${orden.total}`,
          fecha: dayjs(orden.created_at).format('DD/MM/YYYY')
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateOrdenCompra = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`ordenes-compra/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeOrdenCompra = async (id) => {
  try {
    const response = await apiClient.delete(`ordenes-compra/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
