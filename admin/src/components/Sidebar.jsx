import { X, ChevronDown, ChevronUp, Dot } from 'lucide-react'
import logo from '../assets/imgs/logo.png'
import { Link, useLocation } from 'react-router'
import { useState } from 'react'
import { routes } from '../routes/routes'
import { useAuth } from '../context/AuthContext'

export const Sidebar = ({ toggleSidebar, sidebarOpen }) => {
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState({})
  const { user } = useAuth()

  const permisosModulos = new Set(
    user?.rol?.permisos.map((permiso) => permiso.modulo.ruta)
  )

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-primary-hover shadow-lg'
      : 'hover:bg-primary-hover'

  const handleLinkClick = () => {
    if (sidebarOpen) {
      toggleSidebar()
    }
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-primary-dark to-primary text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-screen sidebar shadow-xl ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex items-center justify-between h-20 px-6 border-b border-white/10 bg-white/5 backdrop-blur-sm'>
        <Link
          onClick={handleLinkClick}
          to='/'
          className='flex items-center group'
        >
          <div className='w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-white/10 group-hover:bg-white/20 transition-all duration-200'>
            <img src={logo} alt='Logo de Arcanix' className='w-8 h-8' />
          </div>
          <div className='flex flex-col'>
            <span className='text-lg font-bold'>Panel Admin</span>
            <span className='text-xs text-white/70'>
              Club deportivo Arcanix
            </span>
          </div>
        </Link>
        <button
          onClick={toggleSidebar}
          className='p-1 rounded-md hover:bg-primary-dark lg:hidden cursor-pointer'
        >
          <X size={20} />
        </button>
      </div>

      <nav className='mt-5 px-2'>
        <div className='space-y-1'>
          {routes
            .filter((route) => {
              if (['/', '/descargar-app'].includes(route.path)) return true
              if (route.children) {
                return route.children.some((child) =>
                  permisosModulos.has(child.path.replace('/', ''))
                )
              }
              return permisosModulos.has(route.path?.replace('/', ''))
            })
            .map((route) => (
              <div key={route.label}>
                {route.path ? (
                  <Link
                    to={route.path}
                    onClick={handleLinkClick}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl text-white transition-all duration-200 group hover:shadow-lg ${isActive(
                      route.path
                    )}`}
                  >
                    {route.Icon && <route.Icon className='mr-2 h-5 w-5' />}
                    {route.label}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleMenu(route.label)}
                      className='cursor-pointer flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl text-white hover:bg-primary-hover transition-all duration-200 hover:shadow-lg'
                    >
                      {route.Icon && <route.Icon className='mr-2 h-5 w-5' />}
                      {route.label}
                      {openMenus[route.label] ? (
                        <ChevronUp className='ml-auto h-4 w-4' />
                      ) : (
                        <ChevronDown className='ml-auto h-4 w-4' />
                      )}
                    </button>
                    <div
                      className={`ml-6 mt-1 space-y-1 transition-all overflow-hidden ${
                        openMenus[route.label] ? 'h-auto pb-2' : 'max-h-0'
                      }`}
                    >
                      {route.children
                        .filter((child) =>
                          permisosModulos.has(child.path.replace('/', ''))
                        )
                        .map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={handleLinkClick}
                            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-white/90 transition-all duration-200 hover:shadow-lg ${isActive(
                              child.path
                            )}`}
                          >
                            <Dot className='h-5 w-5' />
                            {child.label}
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </nav>
    </div>
  )
}
