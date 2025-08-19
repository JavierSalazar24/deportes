import { useQuery } from '@tanstack/react-query'
import { getEgresosMensuales, getIngresosMensuales } from '../api/graphic'

export const useGraphic = () => {
  const {
    data: ingresos,
    isError: isErrorIngresos,
    isLoading: isLoadingIngresos
  } = useQuery({
    queryKey: ['ingresos-mensuales'],
    queryFn: getIngresosMensuales
  })

  const {
    data: egresos,
    isError: isErrorEgresos,
    isLoading: isLoadingEgresos
  } = useQuery({
    queryKey: ['egresos-mensuales'],
    queryFn: getEgresosMensuales
  })

  return {
    egresos,
    isErrorEgresos,
    isLoadingEgresos,
    ingresos,
    isErrorIngresos,
    isLoadingIngresos
  }
}
