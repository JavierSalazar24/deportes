import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { hasPermission } from '../helpers/permissions'

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const { pathname } = useLocation()

  if (!isAuthenticated) return <Navigate to='/login' />
  if (['/perfil', '/', '/descargar-app'].includes(pathname)) return children

  if (!hasPermission(user, pathname, 'consultar')) {
    return <Navigate to='/' replace />
  }

  return children
}
