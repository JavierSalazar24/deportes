import { User, Mail, Shield, Save, Upload } from 'lucide-react'
import foto_default from '../assets/imgs/usuarios/default.png'

export const FormProfile = ({
  handleSubmit,
  formData,
  handleChange,
  handleImageChange
}) => {
  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='flex flex-col items-center mb-4'>
        <div className='relative'>
          <img
            src={
              formData.foto instanceof File
                ? URL.createObjectURL(formData.foto)
                : formData.foto_url || foto_default
            }
            alt={formData.nombre_completo}
            className='w-32 h-32 rounded-full object-cover border-4 border-gray-200'
          />
          <label className='absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer hover:bg-primary/80'>
            <Upload size={16} />
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
            />
          </label>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='flex items-center border rounded-md p-2'>
          <User className='text-gray-500 mr-2' size={18} />
          <input
            type='text'
            name='nombre_completo'
            value={formData.nombre_completo}
            onChange={handleChange}
            className='flex-1 outline-none'
            placeholder='Nombre'
          />
        </div>

        <div className='flex items-center border rounded-md p-2 bg-gray-200'>
          <Mail className='text-gray-500 mr-2' size={18} />
          <input
            type='email'
            defaultValue={formData.email}
            className='flex-1 outline-none'
            placeholder='Correo electrónico'
            disabled
          />
        </div>

        <div className='flex items-center border rounded-md p-2 bg-gray-200'>
          <Shield className='text-gray-500 mr-2' size={18} />
          <input
            type='text'
            defaultValue={formData.rol.nombre}
            className='flex-1 outline-none'
            placeholder='Rol'
            disabled
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-md hover:bg-primary/90 cursor-pointer'
      >
        <Save size={18} />
        Guardar cambios
      </button>
    </form>
  )
}
