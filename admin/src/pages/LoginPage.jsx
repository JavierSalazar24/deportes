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
    <div className='flex min-h-screen items-center justify-center bg-primary-dark p-4'>
      <Toaster richColors position='bottom-right' />
      <div className='mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
        <div className='mb-6 flex justify-center'>
          <div className='h-24 w-24 overflow-hidden rounded-full bg-primary/10'>
            <img
              src={logo}
              alt='Logo del club potros'
              className='h-full w-full object-contain'
            />
          </div>
        </div>

        <h2 className='mb-6 text-center text-2xl font-bold text-gray-900'>
          Iniciar sesión
        </h2>

        <LoginForm />
      </div>
    </div>
  )
}
