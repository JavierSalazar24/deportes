import { useLocation } from 'react-router'
import { ActionButtons } from './ActionButtons'
import Loading from './Loading'

export const TbodyTable = ({
  loading,
  columns,
  currentData,
  handleClass,
  openModal
}) => {
  const { pathname } = useLocation()

  return (
    <tbody className='bg-white divide-y divide-gray-200'>
      {loading ? (
        <tr>
          <td colSpan={columns.length + 1} className='pb-10'>
            <Loading />
          </td>
        </tr>
      ) : (
        <>
          {currentData?.map((item) => (
            <tr key={item.id} className='hover:bg-gray-50'>
              {columns.map((col, index) => (
                <td key={col.key} className='text-center px-6 py-4'>
                  {index === 0 ? (
                    <div
                      className={`flex items-center gap-3 ${
                        item.foto_url ? 'justify-start' : 'justify-center'
                      }`}
                    >
                      {item.foto_url && (
                        <img
                          src={item.foto_url}
                          alt='Foto'
                          className='w-10 h-10 rounded-full'
                        />
                      )}

                      <p className='text-sm text-gray-900'>
                        <span></span>
                        {item[col.key]?.toString() || 'N/A'}
                      </p>
                    </div>
                  ) : (
                    <>
                      {[
                        'Pendiente',
                        'Pagada',
                        'Pagado',
                        'Cancelada',
                        'Cancelado',
                        'Parcial',
                        'SI',
                        'NO',
                        'Disponible',
                        'PENDIENTE',
                        'Vencida',
                        'Atendido',
                        'Finalizada',
                        'En proceso',
                        'Activado',
                        'Desactivado',
                        'Activa'
                      ].includes(item[col.key]) ? (
                        <p>
                          <span
                            className={`text-sm text-white pt-[3px] pb-[5px] px-[6px] rounded-md ${handleClass(
                              item,
                              col.key
                            )}`}
                          >
                            {`${
                              item[col.key]?.toString() === 'En proceso'
                                ? 'Activa'
                                : item[col.key]?.toString()
                            }` || 'N/A'}
                          </span>
                        </p>
                      ) : (
                        <p className='text-sm text-gray-900'>
                          <span></span>
                          {item[col.key]?.toString() || 'N/A'}
                        </p>
                      )}
                    </>
                  )}
                </td>
              ))}
              {pathname !== '/compras' && pathname !== '/almacen' && (
                <td className='text-center px-6 py-4'>
                  <ActionButtons data={item} openModal={openModal} />
                </td>
              )}
            </tr>
          ))}
          {currentData?.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className='px-6 py-4 text-center text-sm text-gray-500'
              >
                No se encontraron registros
              </td>
            </tr>
          )}
        </>
      )}
    </tbody>
  )
}
