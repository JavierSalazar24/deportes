import { useQuery } from '@tanstack/react-query'
import { getPartidoProximo } from '../api/partidos'

export const usePartidoProximo = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['partido-proximo'],
    queryFn: getPartidoProximo
  })

  return {
    data,
    error,
    isError,
    isLoading
  }
}
