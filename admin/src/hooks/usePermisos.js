import { useModalStore } from '../store/useModalStore'
import { usePermisosStore } from '../store/usePermisosStore'

export const usePermisos = () => {
  const setFormData = useModalStore((state) => state.setFormData)

  const modulosSeleccionados = usePermisosStore(
    (state) => state.modulosSeleccionados
  )
  const permisosSeleccionados = usePermisosStore(
    (state) => state.permisosSeleccionados
  )
  const setModulosSeleccionados = usePermisosStore(
    (state) => state.setModulosSeleccionados
  )
  const togglePermiso = usePermisosStore((state) => state.togglePermiso)
  const getPermisoValue = usePermisosStore((state) => state.getPermisoValue)

  const handleChange = (selectedOptions) => {
    setFormData('modulos_id', selectedOptions)
    setModulosSeleccionados(selectedOptions)
  }

  const handlePermisoChange = (moduloId, permiso) => {
    togglePermiso(moduloId, permiso)
  }

  return {
    modulosSeleccionados,
    permisosSeleccionados,
    handleChange,
    handlePermisoChange,
    getPermisoValue
  }
}
