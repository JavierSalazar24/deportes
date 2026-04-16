import axios from 'axios'
import { API_HOST } from '../config'

export const apiClient = axios.create({
  baseURL: `${API_HOST}/api/`,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const apiClientForm = axios.create({
  baseURL: `${API_HOST}/api/`
})

apiClientForm.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
