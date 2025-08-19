import dayjs from 'dayjs'
import { apiClient } from './configAxios'

// Leer registros
export const getLog = async () => {
  try {
    const response = await apiClient.get('logs')
    const { data } = response

    const info = data.map((log) => {
      const datos_anteriores = log.datos_anteriores
        ? JSON.stringify(log.datos_anteriores, null, 3)
        : ''
      const datos_nuevos = log.datos_nuevos
        ? JSON.stringify(log.datos_nuevos, null, 3)
        : ''

      return {
        ...log,
        fecha: dayjs(log.created_at).format('YYYY-MM-DD HH:mm:ss'),
        fecha_cambio: dayjs(log.created_at).format('DD/MM/YYYY'),
        datos_anteriores,
        nombre_usuario: log?.usuario?.nombre_completo || 'Sistema automático',
        datos_nuevos
      }
    })

    return info
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}
