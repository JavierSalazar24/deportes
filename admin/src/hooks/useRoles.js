import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import Swal from 'sweetalert2'
import { createRol, getRol, removeRol, updateRol } from '../api/roles'
import { toast } from 'sonner'
import { usePermisosStore } from '../store/usePermisosStore'

export const useRoles = () => {
  // Store de modal
  const modalType = useModalStore((state) => state.modalType)
  const formData = useModalStore((state) => state.formData)
  const closeModal = useModalStore((state) => state.closeModal)
  const permisosSeleccionados = usePermisosStore(
    (state) => state.permisosSeleccionados
  )

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['roles'],
    queryFn: getRol
  })

  const createMutation = useMutation({
    mutationFn: createRol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
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
    mutationFn: updateRol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
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
    mutationFn: removeRol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
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

    const moduloIds = (formData.modulos_id || []).map((m) =>
      Number(m.value ?? m)
    )

    const permisosArray = moduloIds.map((id) => ({
      modulo_id: id,
      crear: !!permisosSeleccionados[id]?.crear,
      actualizar: !!permisosSeleccionados[id]?.actualizar,
      eliminar: !!permisosSeleccionados[id]?.eliminar
    }))

    const newData = {
      ...formData,
      permisos: permisosArray
    }

    if (modalType === 'add') {
      createMutation.mutate(newData)
    } else if (modalType === 'edit') {
      updateMutation.mutate(newData)
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
