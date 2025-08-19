import dayjs from 'dayjs'
import { Calendar, NotebookText } from 'lucide-react'
import { Link } from 'react-router'
import { AlertaCard } from '../AlertaCard'
import { CardAbonos } from '../CardAbonos'

export const ModalCalendario = ({ closeModal, info }) => {
  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='flex items-end justify-start md:justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
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
        <div className='md:max-w-[70%] inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-2xl'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900 mb-3'
                  id='modal-title'
                >
                  Deudas de {info.nombre} ({info.categoria})
                </h3>
                <hr className='text-gray-300' />
                <div className='mt-4'>
                  {info.deudas?.length > 0 &&
                    info.deudas.map((deuda) => (
                      <div className='mb-5' key={deuda.id}>
                        <div
                          className={`border border-gray-200 shadow-sm mb-3 md:w-[40%] mx-auto p-4 text-center ${
                            deuda.estatus === 'Pagado'
                              ? 'bg-green-100 text-green-800'
                              : deuda.estatus === 'Pendiente'
                              ? 'bg-red-100 text-red-800'
                              : deuda.estatus === 'Parcial'
                              ? 'bg-[#4682A9] text-white'
                              : 'bg-[#EA7300] text-white'
                          }`}
                        >
                          <p className='text-lg font-medium'>
                            Estatus: {deuda.estatus}
                          </p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='border border-gray-200 shadow-sm'>
                            <div className='p-4'>
                              <div className='flex items-center gap-2 mb-2 justify-center'>
                                <Calendar className='h-5 w-5 text-blue-500' />
                                <h4 className='font-medium text-gray-700'>
                                  Fecha a pagar el/la{' '}
                                  <b>
                                    {
                                      deuda.costo_categoria.concepto_cobro
                                        .nombre
                                    }
                                  </b>
                                </h4>
                              </div>
                              <p className='text-lg font-semibold text-gray-900 text-center'>
                                {dayjs(deuda.fecha_pago).format('LL')}
                              </p>
                            </div>
                          </div>
                          <div className='border border-gray-200 shadow-sm'>
                            <div className='p-4'>
                              <div className='flex items-center gap-2 mb-2 justify-center'>
                                <Calendar className='h-5 w-5 text-blue-500' />
                                <h4 className='font-medium text-gray-700 '>
                                  Fecha limite de pago de{' '}
                                  <b>
                                    {
                                      deuda.costo_categoria.concepto_cobro
                                        .nombre
                                    }
                                  </b>
                                </h4>
                              </div>
                              <p className='text-lg font-semibold text-gray-900 text-center'>
                                {dayjs(deuda.fecha_limite).format('LL')}
                              </p>
                            </div>
                          </div>

                          {deuda.abonos_deudas.length > 0 && (
                            <div className='sm:grid-cols-1 md:col-span-2'>
                              <AlertaCard
                                text={`Abonos de ${deuda.costo_categoria.concepto_cobro.nombre}`}
                              />

                              {deuda.abonos_deudas.map((abono) => (
                                <div key={abono.id}>
                                  <CardAbonos
                                    amount={abono.monto}
                                    date={abono.fecha}
                                    method={abono.metodo_pago}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <hr className='mt-7 text-gray-700/40' />
                      </div>
                    ))}
                </div>

                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                  <Link
                    to={info.url}
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm cursor-pointer transition-all'
                  >
                    Ir a sus pagos
                  </Link>
                  <button
                    type='button'
                    onClick={closeModal}
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm cursor-pointer transition-all'
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
