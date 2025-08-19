import { apiClient } from './configAxios'

export const getCountAdminPage = async () => {
  try {
    const response = await apiClient.get('count-adminpage')
    return response.data
  } catch (error) {
    console.error('Error al obetener el registro', error)
    throw new Error(error.response.data.message)
  }
}
