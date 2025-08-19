import { useQuery } from '@tanstack/react-query'
import { getCompras } from '../api/compras'

export const useCompras = () => {
  const { isError, data, error, isLoading } = useQuery({
    queryKey: ['compras'],
    queryFn: getCompras
  })

  return {
    isLoading,
    isError,
    data,
    error
  }
}
