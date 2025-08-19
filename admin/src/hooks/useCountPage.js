import { useQuery } from '@tanstack/react-query'
import { getCountAdminPage } from '../api/counts-page'

export const useCountPage = () => {
  const { isError, data, isLoading } = useQuery({
    queryKey: ['count'],
    queryFn: getCountAdminPage
  })

  return { isError, data, isLoading }
}
