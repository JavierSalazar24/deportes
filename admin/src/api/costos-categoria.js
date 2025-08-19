import { formatearMonedaMXN } from '../utils/formattedCurrancy'
import { apiClient } from './configAxios'

// Crear un registro
export const createCostosCategoria = async (data) => {
  try {
    const response = await apiClient.post('costos-categoria', data)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getCostosCategoria = async () => {
  try {
    const response = await apiClient.get('costos-categoria')
    const { data } = response

    return data.map((costo) => ({
      ...costo,
      categoria_id: {
        label: `${costo.categoria.nombre} (${costo.categoria.temporada.nombre})`,
        value: costo.categoria.id
      },
      concepto_cobro_id: {
        label: costo.concepto_cobro.nombre,
        value: costo.concepto_cobro.id
      },
      nombre_temporada: costo.categoria.temporada.nombre,
      nombre_categoria: costo.categoria.nombre,
      concepto: costo.concepto_cobro.nombre,
      precio_format: formatearMonedaMXN(costo.monto_base),
      categoria_concepto: `${costo.concepto_cobro.nombre} (${costo.monto_base})`
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getCategoriaJugadorCosto = async (categoria_id) => {
  try {
    const response = await apiClient.get(
      `categoria-costo-jugador/${categoria_id}`
    )
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateCostosCategoria = async (data) => {
  try {
    const { id } = data

    const response = await apiClient.put(`costos-categoria/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeCostosCategoria = async (id) => {
  try {
    const response = await apiClient.delete(`costos-categoria/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
