import { create } from 'zustand'

export const usePermisosStore = create((set) => ({
  modulosSeleccionados: [],
  permisosSeleccionados: {},

  setModulosSeleccionados: (modulos) =>
    set((state) => {
      const ids = (modulos || []).map((m) => Number(m.value))
      // conserva solo los existentes…
      const permisos = Object.fromEntries(
        Object.entries(state.permisosSeleccionados).filter(([id]) =>
          ids.includes(Number(id))
        )
      )
      // …y crea los que falten en false
      ids.forEach((id) => {
        if (!permisos[id]) {
          permisos[id] = { crear: false, actualizar: false, eliminar: false }
        }
      })

      return {
        modulosSeleccionados: modulos || [],
        permisosSeleccionados: permisos
      }
    }),

  setPermisosDesdeAPI: (permisosAPI) => {
    const permisos = {}
    permisosAPI.forEach(({ modulo_id, crear, actualizar, eliminar }) => {
      permisos[Number(modulo_id)] = { crear, actualizar, eliminar }
    })
    set({ permisosSeleccionados: permisos })
  },

  togglePermiso: (moduloId, permiso) =>
    set((state) => {
      const id = Number(moduloId)
      const permisos = { ...state.permisosSeleccionados }
      if (!permisos[id])
        permisos[id] = { crear: false, actualizar: false, eliminar: false }
      permisos[id][permiso] = !permisos[id][permiso]
      return { permisosSeleccionados: permisos }
    }),

  getPermisoValue: (moduloId, permiso) => {
    const p = usePermisosStore.getState().permisosSeleccionados
    return !!p[Number(moduloId)]?.[permiso]
  },

  resetPermisos: () =>
    set({ modulosSeleccionados: [], permisosSeleccionados: {} })
}))
