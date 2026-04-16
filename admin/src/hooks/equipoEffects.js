import { toast } from 'sonner'

export const equipoEffects = ({
  currentItem,
  pathname,
  setInitialLoad,
  initialLoad,
  setFormData,
  setArticulosDisponibles,
  getArtDis
}) => {
  // Este useEffect es disparado cada vez que initialLoad cambia
  if (initialLoad && currentItem && pathname === '/equipo') {
    const loadInitialData = async () => {
      const nuevosDisponibles = {}

      for (const detalle of currentItem.detalles) {
        const checkboxKey = `articulo-${detalle.articulo.nombre}-${detalle.articulo.id}`
        const selectKey = `seleccionado-numero_serie-${detalle.articulo.id}`

        setFormData(checkboxKey, true)
        setFormData(selectKey, detalle.numero_serie)

        try {
          const disponibles = await getArtDis(detalle.articulo.id)
          const seleccionadoExiste = disponibles.some(
            (item) => item.numero_serie === detalle.numero_serie
          )
          if (!seleccionadoExiste) {
            disponibles.push({ numero_serie: detalle.numero_serie })
          }
          nuevosDisponibles[checkboxKey] = disponibles
        } catch (err) {
          // Puedes usar toast si quieres avisar al usuario:
          toast.error(`Error al cargar artículos: ${err.message}`)
          console.error('Error al cargar artículos disponibles:', err)
          nuevosDisponibles[checkboxKey] = [
            { numero_serie: detalle.numero_serie }
          ]
        }
      }

      // Solo actualiza si el componente sigue montado
      setArticulosDisponibles((prev) => ({
        ...prev,
        ...nuevosDisponibles
      }))
      setInitialLoad(false)
    }

    loadInitialData()
  }
}
