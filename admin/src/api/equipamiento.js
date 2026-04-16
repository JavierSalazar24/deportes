import dayjs from 'dayjs'
import { apiClient, apiClientForm } from './configAxios'

const transformEquipamientoData = (data) => {
  const transformed = {
    devuelto: data.devuelto || 'NO',
    fecha_devuelto: data.fecha_devuelto || null,
    fecha_entrega: data.fecha_entrega,
    jugador_id: data.jugador_id?.value || data.jugador_id,
    otro: data.otro || null,
    seleccionados: []
  }

  // Procesar artículos y seleccionados juntos
  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('articulo-')) {
      const [_, nombre, id] = key.split('-')
      const nombreLower = nombre.toLowerCase()

      // Solo agregar al objeto si está activo (true)
      if (value === true) {
        transformed[nombreLower] = true

        // Buscar el número de serie correspondiente si existe
        const serieKey = `seleccionado-numero_serie-${id}`
        const numeroSerie = data[serieKey]

        if (numeroSerie && numeroSerie.trim() !== '') {
          transformed.seleccionados.push({
            numero_serie: numeroSerie,
            id: parseInt(id) || 0
          })
        }
      }
    }
  })

  return transformed
}

// Crear un registro
export const createEquipamiento = async (data) => {
  try {
    const transformedData = transformEquipamientoData(data)
    const formData = new FormData()

    formData.append('jugador_id', transformedData.jugador_id)
    formData.append('fecha_entrega', transformedData.fecha_entrega)
    formData.append('devuelto', transformedData.devuelto)

    if (transformedData?.fecha_devuelto) {
      formData.append('fecha_devuelto', transformedData?.fecha_devuelto)
    }
    if (transformedData?.otro) {
      formData.append('otro', transformedData?.otro)
    }

    // Articulos booleans
    Object.entries(transformedData).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0')
      }
    })

    // Array 'seleccionados'
    transformedData.seleccionados.forEach((item, index) => {
      formData.append(
        `seleccionados[${index}][numero_serie]`,
        item.numero_serie
      )
      formData.append(`seleccionados[${index}][id]`, item.id)
    })

    const response = await apiClientForm.post('equipo', formData)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getEquipamiento = async () => {
  try {
    const response = await apiClient.get('equipo')
    const { data } = response
    return data.map((equipo) => {
      const fecha_devuelto_format = equipo.fecha_devuelto
        ? dayjs(equipo.fecha_devuelto).format('DD/MM/YYYY')
        : 'Sin devolver'

      const equipo_asignado = equipo.detalles
        .map(
          (detalle) => `${detalle.articulo.nombre} (${detalle.numero_serie})`
        )
        .toString()
        .replaceAll(',', ', ')

      return {
        ...equipo,
        jugador_id: {
          label: `${equipo.jugador.nombre} ${equipo.jugador.apellido_p} ${equipo.jugador.apellido_m}`,
          value: equipo.jugador.id
        },
        jugador: `${equipo.jugador.nombre} ${equipo.jugador.apellido_p}`,
        equipo: equipo_asignado,
        fecha_entrega_format: dayjs(equipo.fecha_entrega).format('DD/MM/YYYY'),
        fecha_devuelto_format
      }
    })
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getEquipoDisponible = async (id) => {
  try {
    const response = await apiClient.get(`equipo-disponible/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateEquipamiento = async (data) => {
  try {
    const { id } = data
    const transformedData = transformEquipamientoData(data)
    const formData = new FormData()

    formData.append('_method', 'PUT')
    formData.append('jugador_id', transformedData.jugador_id)
    formData.append('fecha_entrega', transformedData.fecha_entrega)
    formData.append('devuelto', transformedData.devuelto)

    if (transformedData?.fecha_devuelto) {
      formData.append('fecha_devuelto', transformedData?.fecha_devuelto)
    }
    if (transformedData?.otro) {
      formData.append('otro', transformedData?.otro)
    }

    // Articulos booleans
    Object.entries(transformedData).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0')
      }
    })

    // Array 'seleccionados'
    transformedData.seleccionados.forEach((item, index) => {
      formData.append(
        `seleccionados[${index}][numero_serie]`,
        item.numero_serie
      )
      formData.append(`seleccionados[${index}][id]`, item.id)
    })

    const response = await apiClientForm.post(`equipo/${id}`, formData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeEquipamiento = async (id) => {
  try {
    const response = await apiClient.delete(`equipo/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
