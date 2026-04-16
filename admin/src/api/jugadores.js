import { apiClient, apiClientForm } from './configAxios'

// Crear un registro
export const createJugador = async (data) => {
  try {
    const formData = new FormData()
    formData.append('temporada_id', data.temporada_id)
    formData.append('usuario_id', data.usuario_id)
    formData.append('nombre', data.nombre)
    formData.append('apellido_p', data.apellido_p)
    formData.append('apellido_m', data.apellido_m)
    formData.append('genero', data.genero)
    formData.append('direccion', data.direccion)
    formData.append('telefono', data.telefono)
    formData.append('fecha_nacimiento', data.fecha_nacimiento)
    formData.append('curp', data.curp)
    formData.append('padecimientos', data.padecimientos)
    formData.append('alergias', data.alergias)
    if (data.foto instanceof File) {
      formData.append('foto', data.foto)
    }
    if (data.curp_jugador instanceof File) {
      formData.append('curp_jugador', data.curp_jugador)
    }
    if (data.ine instanceof File) {
      formData.append('ine', data.ine)
    }
    if (data.acta_nacimiento instanceof File) {
      formData.append('acta_nacimiento', data.acta_nacimiento)
    }
    if (data.comprobante_domicilio instanceof File) {
      formData.append('comprobante_domicilio', data.comprobante_domicilio)
    }
    if (data.firma instanceof File) {
      formData.append('firma', data.firma)
    }

    const response = await apiClientForm.post('jugadores', formData)
    return response.data
  } catch (error) {
    console.error('Error al agregar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Leer registros
export const getJugadores = async () => {
  try {
    const response = await apiClient.get('jugadores')
    const { data } = response

    const newData = Array.isArray(data)
      ? data.map((jugador) => ({
          ...jugador,
          jugador: `${jugador.nombre} ${jugador.apellido_p} ${jugador.apellido_m}`,
          categoria_id: {
            label: jugador.categoria.nombre,
            value: jugador.categoria.id
          },
          temporada_id: {
            label: jugador.categoria.temporada.nombre,
            value: jugador.categoria.temporada.id
          },
          nombre_temporada: jugador.categoria.temporada.nombre,
          nombre_categoria: jugador.categoria.nombre,
          usuario_id: {
            label: jugador.usuario.nombre_completo,
            value: jugador.usuario.id
          },
          correo_tutor: jugador.usuario.email,
          telefono_tutor: jugador.usuario.telefono
        }))
      : []

    return newData
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getCalendarioJugadores = async () => {
  try {
    const response = await apiClient.get('calendario-pagos')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

export const getJugadorById = async (id) => {
  try {
    const response = await apiClient.get('jugadores/' + id)
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}

// Actualizar un registro
export const updateJugador = async (data) => {
  try {
    const { id } = data

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('temporada_id', data.temporada_id)
    formData.append('usuario_id', data.usuario_id)
    formData.append('nombre', data.nombre)
    formData.append('apellido_p', data.apellido_p)
    formData.append('apellido_m', data.apellido_m)
    formData.append('genero', data.genero)
    formData.append('direccion', data.direccion)
    formData.append('telefono', data.telefono)
    formData.append('fecha_nacimiento', data.fecha_nacimiento)
    formData.append('curp', data.curp)
    formData.append('padecimientos', data.padecimientos)
    formData.append('alergias', data.alergias)
    if (data.foto instanceof File) {
      formData.append('foto', data.foto)
    }
    if (data.curp_jugador instanceof File) {
      formData.append('curp_jugador', data.curp_jugador)
    }
    if (data.ine instanceof File) {
      formData.append('ine', data.ine)
    }
    if (data.acta_nacimiento instanceof File) {
      formData.append('acta_nacimiento', data.acta_nacimiento)
    }
    if (data.comprobante_domicilio instanceof File) {
      formData.append('comprobante_domicilio', data.comprobante_domicilio)
    }
    if (data.firma instanceof File) {
      formData.append('firma', data.firma)
    }

    const response = await apiClientForm.post(`jugadores/${id}`, formData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar registro:', error)
    throw new Error(error.response.data.message)
  }
}

// Eliminar un registro
export const removeJugador = async (id) => {
  try {
    const response = await apiClient.delete(`jugadores/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar registro:', error)
    throw new Error(error.response.data.message)
  }
}
