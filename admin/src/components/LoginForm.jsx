import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

export const LoginForm = () => {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      await login(data.email, data.password)
    } catch (error) {
      console.log(error)
      toast.error('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          Correo
        </label>
        <div className='mt-1'>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='example@email.com'
            defaultValue='deportes@arcanix.com.mx'
            required
            className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100'
          />
        </div>
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          Contraseña
        </label>
        <div className='relative'>
          <input
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='••••••••'
            defaultValue='arcanix'
            required
            className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100'
          />
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full h-11 disabled:cursor-auto disabled:bg-primary/80 py-2 bg-primary text-white font-semibold rounded-md cursor-pointer hover:bg-primary-dark transition-all flex justify-center gap-3 items-center'
      >
        Iniciar sesión {loading && <div className='loader-loading'></div>}
      </button>
    </form>
  )
}
