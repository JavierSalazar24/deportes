import { apiClient } from './configAxios'

// Leer registros
export const getDashboard = async () => {
  try {
    const response = await apiClient.get('data-dashboard')
    const { data } = response

    return data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}
