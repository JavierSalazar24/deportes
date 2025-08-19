import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import { getCajaPago, removeCajaPago } from '../api/caja-pagos'
import { toast } from 'sonner'

export const useCajaPagos = () => {
  // Store de modal
  const closeModal = useModalStore((state) => state.closeModal)

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['caja-pagos'],
    queryFn: getCajaPago
  })

  const deleteMutation = useMutation({
    mutationFn: removeCajaPago,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caja-pagos'] })
      toast.success('Registro eliminado')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
    closeModal()
  }

  return {
    data,
    error,
    isError,
    isLoading,
    handleDelete
  }
}
