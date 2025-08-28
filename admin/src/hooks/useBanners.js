import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import Swal from 'sweetalert2'
import {
  createBanner,
  getBanner,
  removeBanner,
  updateBanner
} from '../api/banners'
import { toast } from 'sonner'

export const useBanners = () => {
  // Store de modal
  const modalType = useModalStore((state) => state.modalType)
  const formData = useModalStore((state) => state.formData)
  const closeModal = useModalStore((state) => state.closeModal)

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['banners'],
    queryFn: getBanner
  })

  const createMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] })
      toast.success('Registro agregado')
      Swal.close()
      closeModal()
    },
    onError: (error) => {
      Swal.close()
      toast.error(error.message)
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] })
      toast.success('Registro actualizado')
      closeModal()
      Swal.close()
    },
    onError: (error) => {
      toast.error(error.message)
      Swal.close()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: removeBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] })
      toast.success('Registro eliminado')
    },
    onError: (error) => {
      toast.error(error.message)
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

    if (modalType === 'add') {
      createMutation.mutate(formData)
    } else if (modalType === 'edit') {
      updateMutation.mutate(formData)
    }
  }

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
    closeModal()
  }

  return {
    data,
    error,
    isError,
    isLoading,
    handleSubmit,
    handleDelete
  }
}
