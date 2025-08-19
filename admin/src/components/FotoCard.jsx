import { Upload } from 'lucide-react'
import { useRef } from 'react'
import { AlertaCard } from './AlertaCard'

export const FotoCard = ({
  handleFileChange,
  view,
  formData,
  document,
  title
}) => {
  const fileInputRef = useRef(null)

  const handleFileBoxClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <div className='sm:col-span-6 md:col-span-2'>
        <AlertaCard text={title} />
      </div>

      <div className='sm:col-span-6 md:col-span-2 w-96 mx-auto'>
        <div
          onClick={handleFileBoxClick}
          className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all hover:border-blue-500 flex flex-col items-center justify-center'
        >
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='image/*'
            className='hidden'
            name='foto'
            required={!document}
            disabled={view}
          />

          {formData.preview || document ? (
            <div className='w-full'>
              <img
                src={formData.preview || formData.foto_url}
                alt='Foto de perfil'
                className='max-h-60 mx-auto rounded-md object-contain'
              />
            </div>
          ) : (
            <div className='py-6 flex flex-col items-center'>
              <Upload className='h-20 w-10 text-gray-400 mb-2' />
              <p className='text-gray-500 text-center'>
                Click para seleccionar foto
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
