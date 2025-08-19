import { toast } from 'sonner'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useModalStore } from '../store/useModalStore'
import Swal from 'sweetalert2'
import {
  createAlmacenEntrada,
  getAlmacenEntrada,
  updateAlmacenEntrada
} from '../api/almacen-entradas'
import { getArticulo } from '../api/articulos'
import { getJugadores } from '../api/jugadores'

export const useAlmacenEntrada = () => {
  const modalType = useModalStore((state) => state.modalType)
  const formData = useModalStore((state) => state.formData)
  const closeModal = useModalStore((state) => state.closeModal)

  const queryClient = useQueryClient()

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ['entradas'],
    queryFn: getAlmacenEntrada
  })

  const createMutation = useMutation({
    mutationFn: createAlmacenEntrada,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entradas'] })
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
    mutationFn: updateAlmacenEntrada,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entradas'] })
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
      jugador_id: formData.jugador_id?.value || null
    }

    if (modalType === 'add') {
      createMutation.mutate(newData)
    } else if (modalType === 'edit') {
      updateMutation.mutate(newData)
    }
  }

  const loadOptionsArticulos = async () => {
    try {
      const response = await getArticulo()

      return response.map((articulo) => ({
        value: articulo.id,
        label: articulo.nombre
      }))
    } catch (error) {
      console.error('Error cargando registros:', error)
      return []
    }
  }

  const loadOptionsJugadores = async () => {
    try {
      const response = await getJugadores()

      return response.map((jugador) => ({
        value: jugador.id,
        label: jugador.nombre_completo
      }))
    } catch (error) {
      console.error('Error cargando registros:', error)
      return []
    }
  }

  return {
    isLoading,
    isError,
    data,
    error,
    createMutation,
    updateMutation,
    handleSubmit,
    loadOptionsArticulos,
    loadOptionsJugadores
  }
}
