import { create } from 'zustand'
import { getEquipoDisponible } from '../api/equipamiento'
import { usePermisosStore } from './usePermisosStore'

export const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null,
  currentItem: null,
  formData: {},
  firma: null,

  getArtDis: async (id) => {
    const data = await getEquipoDisponible(id)
    return data
  },

  editFirma: (file) => {
    set({ firma: file })
  },

  openModal: (type, item = null, defaultData = {}) => {
    const setPermisosDesdeAPI = usePermisosStore.getState().setPermisosDesdeAPI
    const setModulosSeleccionados =
      usePermisosStore.getState().setModulosSeleccionados

    if ((type === 'view' || type === 'edit') && item?.permisos) {
      const permisosNormalizados = item.permisos.map((p) => ({
        modulo_id: p.modulo.id,
        consultar: p.consultar,
        crear: p.crear,
        actualizar: p.actualizar,
        eliminar: p.eliminar
      }))
      setPermisosDesdeAPI(permisosNormalizados)

      // ✅ Esto es lo nuevo: cargar también los módulos seleccionados
      const modulos = item.permisos.map((p) => ({
        label: p.modulo.nombre,
        value: p.modulo.id
      }))
      setModulosSeleccionados(modulos)
    }

    if (type === 'add') {
      const resetPermisos = usePermisosStore.getState().resetPermisos

      resetPermisos()
    }

    set({
      isOpen: true,
      modalType: type,
      currentItem: item,
      formData: item ? { ...item } : { ...defaultData }
    })
  },

  closeModal: () => set({ isOpen: false, modalType: null, currentItem: null }),

  setFormData: (key, value) =>
    set((state) => {
      const keys = key?.split('.') // Manejar claves anidadas como "transferencia.monto"
      let newFormData = { ...state.formData }
      let current = newFormData

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] = value
        } else {
          current[k] = current[k] || {} // Asegurar que el objeto anidado exista
          current = current[k]
        }
      })

      return { formData: newFormData }
    }),

  setNestedFormData: (key, value) =>
    set((state) => {
      const keys = key.split('.')
      let newFormData = { ...state.formData }
      let current = newFormData

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          // Si el campo es de fecha y está vacío, guardarlo como null
          if (k.includes('fecha') && value === '') {
            current[k] = null
          }
          // Si el campo es estatus y no tiene valor, establecerlo en "pendiente"
          else if (k === 'estatus' && !value) {
            current[k] = 'pendiente'
          } else {
            current[k] = value
          }
        } else {
          current[k] = current[k] || (isNaN(keys[index + 1]) ? {} : [])
          current = current[k]
        }
      })

      return { formData: newFormData }
    })
}))
