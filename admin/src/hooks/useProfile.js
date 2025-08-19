import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import { updateUserProfile } from '../api/auth'

export const useProfile = () => {
  const queryClient = useQueryClient()
  const { user, setUser } = useAuth()
  const loadToast = useRef(null)

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    if (user) setFormData(user)
  }, [user])

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateUserProfile(id, data),
    onMutate: () => {
      loadToast.current = toast.loading('Actualizando perfil...')
    },
    onSuccess: (dataActualizada) => {
      setUser(dataActualizada)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      setIsEditing(false)
      if (loadToast.current) toast.dismiss(loadToast.current)
      toast.success('Perfil actualizado correctamente.')
    },
    onError: () => {
      if (loadToast.current) toast.dismiss(loadToast.current)
      toast.error('Error al actualizar perfil.')
    }
  })

  const handleEditToggle = () => setIsEditing((prev) => !prev)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, foto: file }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData?.id) return
    mutation.mutate({ id: formData.id, data: formData })
  }

  return {
    user,
    isEditing,
    formData,
    handleEditToggle,
    handleChange,
    handleSubmit,
    handleImageChange,
    setFormData
  }
}
