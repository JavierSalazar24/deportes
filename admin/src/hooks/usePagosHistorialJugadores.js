import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import {
  getPagosFinalizadaJugadores,
  getPagosTodosJugadores,
  removePagosJugadores
} from '../api/pagos-jugadores'
import { toast } from 'sonner'

export const usePagosHistorialJugadores = () => {
  // Store de modal
  const closeModal = useModalStore((state) => state.closeModal)

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['historial-pagos-jugadores'],
    queryFn: getPagosFinalizadaJugadores
  })

  const {
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    data: dataTodos = [],
    error: errorTodos
  } = useQuery({
    queryKey: ['todos-pagos-jugadores'],
    queryFn: getPagosTodosJugadores
  })

  const deleteMutation = useMutation({
    mutationFn: removePagosJugadores,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historial-pagos-jugadores'] })
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
    isLoadingTodos,
    isErrorTodos,
    dataTodos,
    errorTodos,
    handleDelete
  }
}
