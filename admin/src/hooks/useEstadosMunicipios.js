import { useEffect, useState } from 'react'
import estadosData from '../utils/estados.json'
import estadosMunicipiosData from '../utils/municipios.json'

export function useEstadosMunicipios({ estadoSeleccionado, setFormData, add }) {
  const [estados, setEstados] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [estadosMunicipios, setEstadosMunicipios] = useState({})

  // Inicializa catálogos una vez
  useEffect(() => {
    setEstados(estadosData)
    setEstadosMunicipios(estadosMunicipiosData)
    if (add && setFormData) {
      setFormData('pais', 'México')
    }
  }, [add, setFormData])

  // Cuando cambia el estado seleccionado, actualiza municipios
  useEffect(() => {
    if (!estadoSeleccionado) {
      setMunicipios([])
      return
    }
    const municipiosEstado = estadosMunicipios[estadoSeleccionado]
    setMunicipios(
      municipiosEstado
        ? municipiosEstado.map((m) => ({ value: m, label: m }))
        : []
    )
  }, [estadoSeleccionado, estadosMunicipios])

  // Opciones para selects (útil para Form)
  const opcionesEstados = [
    { value: '', label: 'Selecciona un estado' },
    ...estados.map((estado) => ({
      value: estado.nombre,
      label: estado.nombre
    }))
  ]

  return { estados, municipios, opcionesEstados }
}
