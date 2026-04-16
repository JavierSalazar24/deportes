import { useQuery } from '@tanstack/react-query'
import { getLog } from '../api/logs'

export const useLogs = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['logs'],
    queryFn: getLog
  })

  return {
    data,
    error,
    isError,
    isLoading
  }
}
