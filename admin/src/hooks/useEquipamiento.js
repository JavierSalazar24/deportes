import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import Swal from 'sweetalert2'
import {
  createEquipamiento,
  getEquipamiento,
  removeEquipamiento,
  updateEquipamiento
} from '../api/equipamiento'
import { toast } from 'sonner'
import { getArticuloAsignar } from '../api/articulos'

export const useEquipamiento = () => {
  // Store de modal
  const modalType = useModalStore((state) => state.modalType)
  const formData = useModalStore((state) => state.formData)
  const closeModal = useModalStore((state) => state.closeModal)
  const editFirma = useModalStore((state) => state.editFirma)

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['equipamiento'],
    queryFn: getEquipamiento
  })

  const {
    isLoading: loadArti,
    isError: errorArti,
    data: articulos
  } = useQuery({
    queryKey: ['articulos-asignar'],
    queryFn: getArticuloAsignar
  })

  const createMutation = useMutation({
    mutationFn: createEquipamiento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipamiento'] })
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
    mutationFn: updateEquipamiento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipamiento'] })
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
    mutationFn: removeEquipamiento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipamiento'] })
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

    const newData = {
      ...formData,
      jugador_id: formData.jugador_id.value
    }

    if (modalType === 'add') {
      createMutation.mutate(newData)
    } else if (modalType === 'edit') {
      updateMutation.mutate(newData)
    }

    editFirma(null)
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
    loadArti,
    errorArti,
    articulos,
    handleSubmit,
    handleDelete
  }
}
