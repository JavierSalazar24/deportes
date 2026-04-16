import { apiClient } from './configAxios'
import dayjs from 'dayjs'

// Leer registros
export const getCompras = async () => {
  try {
    const response = await apiClient.get('compras')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((compra) => ({
          ...compra,
          banco_id: {
            label: compra.orden_compra.banco.nombre,
            value: compra.orden_compra.banco.id
          },
          proveedor_id: {
            label: compra.orden_compra.proveedor.nombre_empresa,
            value: compra.orden_compra.proveedor.id
          },
          articulo_id: {
            label: compra.orden_compra.articulo.nombre,
            value: compra.orden_compra.articulo.id
          },

          banco: compra.orden_compra.banco.nombre,
          proveedor: compra.orden_compra.proveedor.nombre_empresa,
          articulo: compra.orden_compra.articulo.nombre,
          numero_oc: compra.orden_compra.numero_oc,
          total: compra.orden_compra.total,
          estatus: compra.orden_compra.estatus,
          metodo_pago: compra.metodo_pago,
          fecha: dayjs(compra.created_at).format('DD/MM/YYYY')
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}
