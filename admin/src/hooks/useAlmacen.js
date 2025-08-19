import { useQuery } from '@tanstack/react-query'
import { getAlmacen } from '../api/almacen'

export const useAlmacen = () => {
  const { isError, data, error, isLoading } = useQuery({
    queryKey: ['almacen'],
    queryFn: getAlmacen
  })

  return {
    isLoading,
    isError,
    data,
    error
  }
}
