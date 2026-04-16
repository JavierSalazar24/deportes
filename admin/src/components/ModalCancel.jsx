import { Ban } from 'lucide-react'
import { InputField } from './InputField'

export const ModalCancel = ({
  handleCancel,
  closeModal,
  formData,
  handleInputChange
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()

    handleCancel(formData)
  }

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto'
      aria-labelledby='modal-title'
      ocupacion='dialog'
      aria-modal='true'
    >
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div
          className='fixed inset-0 bg-black opacity-40 transition-opacity'
          aria-hidden='true'
          onClick={closeModal}
        ></div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        <form
          onSubmit={handleSubmit}
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
        >
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10'>
                <Ban className='h-6 w-6 text-orange-600' />
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900'
                  id='modal-title'
                >
                  Cancelar venta
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500 mb-5'>
                    ¿Estás seguro de realizar esta acción? No podrás retroceder.
                  </p>

                  <InputField
                    type='textarea'
                    label='Mótivo de cancelación'
                    name='motivo_cancelada'
                    required={true}
                    value={formData.motivo_cancelada || ''}
                    onChange={handleInputChange}
                    disabled={false}
                    classInput='md:col-span-2'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='submit'
              className='cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Cancelar venta
            </button>
            <button
              type='button'
              onClick={closeModal}
              className='cursor-pointer mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Cerrar ventana
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
