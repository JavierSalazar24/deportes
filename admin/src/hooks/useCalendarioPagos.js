import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { getCalendarioJugadores } from '../api/jugadores'

export const useCalendarioPagos = () => {
  const {
    isLoading,
    isError,
    data = [],
    error
  } = useQuery({
    queryKey: ['calendario-pagos'],
    queryFn: getCalendarioJugadores
  })

  const eventosJugadores = useMemo(() => {
    if (!Array.isArray(data)) return []

    return data.flatMap((item) => {
      if (!item?.fecha || !item?.jugador) return []

      const nombre =
        `${item.jugador.nombre} ${item.jugador.apellido_p} ${item.jugador.apellido_m}`.trim()

      return [
        {
          title: nombre,
          categoria: item.jugador.categoria,
          deudas: item.deudas,
          fecha_pago: item.fecha,
          start: dayjs(item.fecha).startOf('day').toDate(),
          end: dayjs(item.fecha).endOf('day').toDate()
        }
      ]
    })
  }, [data])

  return { eventosJugadores, isLoading, isError, error }
}
