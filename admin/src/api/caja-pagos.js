import dayjs from 'dayjs'
import { apiClient } from './configAxios'
import { formatearMonedaMXN } from '../utils/formattedCurrancy'

// Leer registros
export const getCajaPago = async () => {
  try {
    const response = await apiClient.get('caja-pagos')
    const { data } = response

    return data.map((caja) => ({
      ...caja,
      banco: caja.banco.nombre,
      usuario: caja.usuario.nombre_completo,
      jugador: `${caja.jugador.nombre} ${caja.jugador.apellido_p} ${caja.jugador.apellido_m}`,
      monto_format: formatearMonedaMXN(caja.monto),
      fecha_format: dayjs(caja.created_at).format('DD/MM/YYYY'),
      fecha: dayjs(caja.created_at).format('YYYY-MM-DD')
    }))
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeCajaPago = async (id) => {
  try {
    const response = await apiClient.delete(`caja-pagos/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
