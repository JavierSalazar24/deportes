import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import {
  getAbonoFinalizadaJugadores,
  getAbonoTodosJugadores,
  removeAbonoJugadores
} from '../api/abonos-jugadores'
import { toast } from 'sonner'

export const useAbonosHistorialJugadores = () => {
  // Store de modal
  const closeModal = useModalStore((state) => state.closeModal)

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['historial-abonos-jugadores'],
    queryFn: getAbonoFinalizadaJugadores
  })

  const {
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    data: dataTodos = [],
    error: errorTodos
  } = useQuery({
    queryKey: ['todos-abonos-jugadores'],
    queryFn: getAbonoTodosJugadores
  })

  const deleteMutation = useMutation({
    mutationFn: removeAbonoJugadores,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['historial-abonos-jugadores']
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
