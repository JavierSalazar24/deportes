import { ChevronDown, User, LogOut, ChevronUp } from 'lucide-react'
import { Link } from 'react-router'
import img_default from '../../assets/imgs/usuarios/default.png'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

export const DropDownNavbar = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    toggleDropdown()
    logout()
  }

  return (
    <div className='relative'>
      <button
        onClick={toggleDropdown}
        className='flex items-center gap-3 focus:outline-none cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors duration-200'
      >
        <div className='h-10 w-10 rounded-full ring-2 ring-primary/20 overflow-hidden'>
          <img
            className='h-full w-full object-cover'
            src={user?.foto_url || img_default}
            alt={user.nombre_completo}
          />
        </div>

        <span className='hidden md:flex flex-col items-start'>
          <span className='text-sm font-semibold text-gray-900'>
            {user ? user.nombre_completo : 'Usuario 1'}
          </span>
          <span className='text-xs text-gray-500'>
            {user ? user.rol.nombre : 'Super admin'}
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className='ml-1 h-4 w-4 text-gray-500' />
        ) : (
          <ChevronDown className='ml-1 h-4 w-4 text-gray-500' />
        )}
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'>
          <Link
            onClick={toggleDropdown}
            to='/perfil'
            className='flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150'
          >
            <User className='h-4 w-4 mr-3 text-gray-400' />
            Mi perfil
          </Link>
          <div className='border-t border-gray-100 my-1' />
          <button
            onClick={handleLogout}
            className='flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-150'
          >
            <LogOut className='h-4 w-4 mr-3' />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
