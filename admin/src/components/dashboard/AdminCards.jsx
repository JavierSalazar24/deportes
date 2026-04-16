import { Shirt, Landmark, Volleyball, Users } from 'lucide-react'
import { useCountPage } from '../../hooks/useCountPage'

export const AdminCards = () => {
  const { isError, data, isLoading } = useCountPage()
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center'>
          <div className='p-3 rounded-full bg-blue-100 text-blue-500'>
            <Volleyball className='h-6 w-6' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-500'>Jugadores</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {isError || isLoading ? 0 : data.jugadores}
            </p>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center'>
          <div className='p-3 rounded-full bg-green-100 text-green-500'>
            <Users className='h-6 w-6' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-500'>Usuarios</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {isError || isLoading ? 0 : data.usuarios}
            </p>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center'>
          <div className='p-3 rounded-full bg-yellow-100 text-yellow-500'>
            <Shirt className='h-6 w-6' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-500'>Artículos</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {isError || isLoading ? 0 : data.articulos}
            </p>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center'>
          <div className='p-3 rounded-full bg-purple-100 text-purple-500'>
            <Landmark className='h-6 w-6' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-500'>Bancos</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {isError || isLoading ? 0 : data.bancos}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
