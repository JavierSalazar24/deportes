import { toast } from 'sonner'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import Swal from 'sweetalert2'
import {
  createAlmacenSalida,
  getAlmacenSalida,
  updateAlmacenSalida
} from '../api/almacen-salidas'

export const useAlmacenSalidas = () => {
  const modalType = useModalStore((state) => state.modalType)
  const formData = useModalStore((state) => state.formData)
  const closeModal = useModalStore((state) => state.closeModal)

  const queryClient = useQueryClient()

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ['salidas'],
    queryFn: getAlmacenSalida
  })

  const createMutation = useMutation({
    mutationFn: createAlmacenSalida,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salidas'] })
      toast.success('Registro agregado')
      closeModal()
      Swal.close()
    },
    onError: (error) => {
      toast.error(error.message)
      Swal.close()
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateAlmacenSalida,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salidas'] })
      toast.success('Registro actualizado')
      closeModal()
      Swal.close()
    },
    onError: (error) => {
      toast.error(error.message)
      Swal.close()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    Swal.fire({
      title:
        '<h2 style="font-family: "sans-serif";">Guardando registro, por favor espere...</h2>',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const newData = {
      ...formData,
      articulo_id: formData.articulo_id.value,
      numero_serie: formData.articulo_id.numero_serie,
      jugador_id: formData.jugador_id?.value || null
    }

    if (modalType === 'add') {
      createMutation.mutate(newData)
    } else if (modalType === 'edit') {
      updateMutation.mutate(newData)
    }
  }

  return {
    isLoading,
    isError,
    data,
    error,
    createMutation,
    updateMutation,
    handleSubmit
  }
}
