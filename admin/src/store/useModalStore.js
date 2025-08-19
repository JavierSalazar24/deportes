import { create } from 'zustand'
import { getEquipoDisponible } from '../api/equipamiento'
import { usePermisosStore } from './usePermisosStore'

export const useModalStore = create((set, get) => ({
  isOpen: false,
  modalType: null,
  currentItem: null,
  formData: {},
  firma: null,
  cache: {},
  cacheExpiry: 5 * 60 * 1000,

  getArtDis: async (id) => {
    const now = Date.now()
    const { cache, cacheExpiry } = get()

    // Si los datos están en caché y no han expirado
    if (cache[id] && now - cache[id].timestamp < cacheExpiry) {
      return cache[id].data
    }

    // Si no, hacer la petición
    const data = await getEquipoDisponible(id)

    // Actualizar la caché
    set({
      cache: {
        ...cache,
        [id]: {
          data,
          timestamp: now
        }
      }
    })

    return data
  },

  clearCache: (id) => {
    const { cache } = get()
    const newCache = { ...cache }
    if (id) {
      delete newCache[id]
    } else {
      // Limpiar toda la caché si no se especifica ID
      Object.keys(newCache).forEach((key) => delete newCache[key])
    }
    set({ cache: newCache })
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
