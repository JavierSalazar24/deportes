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
      console.error(error)
      toast.error('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <label
          htmlFor='email'
          className='block text-sm font-semibold text-gray-700 mb-2'
        >
          Correo electrónico
        </label>
        <div className='relative'>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='example@email.com'
            defaultValue='deportes@arcanix.com.mx'
            required
            className='w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-gray-50 focus:bg-white'
          />
        </div>
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='password'
          className='block text-sm font-semibold text-gray-700 mb-2'
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
            className='w-full px-4 py-3 pr-12 text-sm border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-gray-50 focus:bg-white'
          />
          <button
            type='button'
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full flex justify-center items-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl cursor-pointer hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 text-lg'
      >
        Iniciar sesión {loading && <div className='loader-loading'></div>}
      </button>
    </form>
  )
}
