import { useQuery } from '@tanstack/react-query'
import { getClima } from '../api/climaAPI'

export const useClimaAPI = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['clima'],
    queryFn: getClima,
    staleTime: 1000 * 60 * 30,
    refetchInterval: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  })

  return {
    data,
    error,
    isError,
    isLoading
  }
}
