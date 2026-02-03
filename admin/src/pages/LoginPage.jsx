import { LoginForm } from '../components/LoginForm'
import logo from '../assets/imgs/letra_logo.png'
import { useAuth } from '../context/AuthContext'
import { Toaster } from 'sonner'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-dark p-4 relative overflow-hidden'>
      <Toaster richColors position='bottom-right' />
      <div className='relative z-10 mx-auto w-full max-w-md'>
        <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20'>
          <div className='mb-8 flex justify-center'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-full blur-xl opacity-50' />
              <div className='relative h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary-dark/20 p-1 shadow-lg'>
                <div className='h-full w-full rounded-full bg-white p-1'>
                  <img
                    src={logo}
                    alt='Logo del club'
                    className='h-full w-full object-cover rounded-full'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='mb-8 text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Bienvenido
            </h2>
            <p className='text-sm text-gray-500'>
              Inicia sesión para continuar
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
