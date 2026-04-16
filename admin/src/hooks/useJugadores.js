import { toast } from 'sonner'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createJugador,
  getJugadores,
  removeJugador,
  updateJugador
} from '../api/jugadores'
import { useModalStore } from '../store/useModalStore'
import Swal from 'sweetalert2'
import { jugadorSchema } from '../zod/schemas'

export const useJugadores = () => {
  const modalType = useModalStore((state) => state.modalType)
  const formData = useModalStore((state) => state.formData)
  const closeModal = useModalStore((state) => state.closeModal)
  const firma = useModalStore((state) => state.firma)
  const editFirma = useModalStore((state) => state.editFirma)

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['jugadores'],
    queryFn: getJugadores
  })

  const createMutation = useMutation({
    mutationFn: createJugador,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jugadores'] })
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
    mutationFn: updateJugador,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jugadores'] })
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
    mutationFn: removeJugador,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jugadores'] })
      toast.success('Registro eliminado')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación con Zod
    const parsed = jugadorSchema.safeParse(formData)

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0][0]
      toast.error(firstError)
      return
    }

    let signatureFirma = null
    if (firma === null && modalType === 'add') {
      toast.warning('La firma es obligatoría.')
      return
    } else if (firma === null && modalType === 'edit') {
      signatureFirma = formData.firma_jugador
    } else if (firma !== null) {
      signatureFirma = firma
    }

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
      usuario_id: formData.usuario_id.value,
      temporada_id: formData.temporada_id.value,
      firma: signatureFirma
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
    isLoading,
    isError,
    data,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
    handleSubmit,
    handleDelete
  }
}
