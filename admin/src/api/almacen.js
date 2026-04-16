import dayjs from 'dayjs'
import { apiClient } from './configAxios'

// Leer registros
export const getAlmacen = async () => {
  try {
    const response = await apiClient.get('almacen')
    const { data } = response

    return data.map((almacen) => {
      const fecha_entrada = almacen.fecha_entrada
        ? dayjs(almacen.fecha_entrada, 'YYYY-MM-DD').format('DD/MM/YYYY')
        : 'Sin entrada'

      const tipo_entrada = almacen.tipo_entrada || 'Sin entrada'

      const fecha_salida = almacen.fecha_salida
        ? dayjs(almacen.fecha_salida, 'YYYY-MM-DD').format('DD/MM/YYYY')
        : 'Sin salida'

      const motivo_salida = almacen.motivo_salida || 'Sin salida'
      return {
        ...almacen,
        articulo: almacen.articulo.nombre,
        fecha_entrada,
        tipo_entrada,
        fecha_salida,
        motivo_salida
      }
    })
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getAlmacenDisponibles = async () => {
  try {
    const response = await apiClient.get('almacen-disponibles')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}
