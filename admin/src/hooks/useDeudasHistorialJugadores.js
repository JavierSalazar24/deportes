import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import {
  getDeudasFinalizadaJugadores,
  getDeudasTodoJugadores,
  removeDeudasJugadores
} from '../api/deudas-jugadores'
import { toast } from 'sonner'

export const useDeudasHistorialJugadores = () => {
  // Store de modal
  const closeModal = useModalStore((state) => state.closeModal)

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['historial-deudas-jugadores'],
    queryFn: getDeudasFinalizadaJugadores
  })

  const {
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    data: dataTodos = [],
    error: errorTodos
  } = useQuery({
    queryKey: ['todos-deudas-jugadores'],
    queryFn: getDeudasTodoJugadores
  })

  const deleteMutation = useMutation({
    mutationFn: removeDeudasJugadores,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['historial-deudas-jugadores']
      })
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
