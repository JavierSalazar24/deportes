import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '../api/dashboard'

export const useDashboard = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard
  })

  return {
    data,
    error,
    isError,
    isLoading
  }
}
