// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, logoutRequest, getUserProfile } from '../api/auth'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      const response = await loginRequest({ email, password })
      const token = response.token
      localStorage.setItem('token', token)

      const profile = await getUserProfile()

      setUser(profile)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    const response = await logoutRequest()
    console.log(response)

    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    getUserProfile()
      .then((res) => setUser(res))
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/login')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
