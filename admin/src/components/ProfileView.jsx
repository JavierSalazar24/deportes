import { Mail, Shield } from 'lucide-react'
import foto_default from '../assets/imgs/usuarios/default.png'
import { useAuth } from '../context/AuthContext'

export const ProfileView = () => {
  const { user } = useAuth()

  return (
    <div className='space-y-6'>
      <div className='flex flex-col items-center mb-6'>
        <img
          src={user?.foto_url || foto_default}
          alt={user.nombre_completo}
          className='w-32 h-32 rounded-full object-cover border-4 border-gray-200'
        />
        <h3 className='mt-4 text-xl font-semibold text-gray-800'>
          {user.nombre_completo}
        </h3>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center'>
          <Mail className='text-gray-500 mr-3' size={20} />
          <div>
            <p className='text-sm text-gray-500'>Correo</p>
            <p className='font-medium'>{user.email}</p>
          </div>
        </div>

        <div className='flex items-center'>
          <Shield className='text-gray-500 mr-3' size={20} />
          <div>
            <p className='text-sm text-gray-500'>Rol</p>
            <p className='font-medium'>{user.rol.nombre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
