import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { formatearMonedaMXN } from '../../utils/formattedCurrancy'

export const PagosPendientes = ({ pagosPendientes }) => {
  return (
    <div className='bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden'>
      <div className='p-5 border-b border-gray-200 flex items-center justify-between'>
        <div>
          <h3 className='font-semibold text-foreground'>Pagos pendientes</h3>
          <p className='text-sm text-muted-foreground mt-0.5'>
            Jugadores con adeudos{' '}
            <span className='hidden sm:inline'>
              {pagosPendientes.length > 0 &&
                `(los ${pagosPendientes.length} más próximos a vencer)`}
            </span>
          </p>
        </div>
        <Link
          to='/deudas-jugadores'
          className='flex items-center gap-2 text-sm text-success hover:text-success/80 font-medium hover:underline transition-colors'
        >
          Ver todos
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className='overflow-x-auto max-h-96'>
        <table className='w-full'>
          <thead className='sticky z-0 top-0 bg-white'>
            <tr className='border-b border-gray-200'>
              <th className='text-center py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                Jugador
              </th>
              <th className='text-center py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                Categoría
              </th>
              <th className='text-center py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                Monto
              </th>
              <th className='text-center py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                Vencimiento
              </th>
              <th className='text-center py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                Estado
              </th>
              <th className='text-center py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {pagosPendientes.length === 0 ? (
              <tr>
                <td
                  colSpan='6'
                  className='text-center text-gray-400 text-xl font-medium py-4'
                >
                  No se encontraron registros.
                </td>
              </tr>
            ) : (
              pagosPendientes.map((pago) => (
                <tr
                  key={pago.id}
                  className='border-b border-gray-200 hover:bg-gray-200 transition-colors'
                >
                  <td className='py-4 px-5 text-center'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                        <img
                          src={pago.foto}
                          alt={`Foto del jugador: ${pago.jugador}`}
                          className='rounded-full'
                        />
                      </div>
                      <span className='text-sm font-medium text-gray-600'>
                        {pago.jugador}
                      </span>
                    </div>
                  </td>
                  <td className='py-4 px-5 text-center'>
                    <span className='text-sm text-muted-foreground'>
                      {pago.categoria}
                    </span>
                  </td>
                  <td className='py-4 px-5 text-center'>
                    <span className='text-sm font-semibold text-gray-700'>
                      {formatearMonedaMXN(pago.monto)}
                    </span>
                  </td>
                  <td className='py-4 px-5 text-center'>
                    <span className='text-sm text-muted-foreground'>
                      {dayjs(pago.vencimiento).format('DD/MM/YYYY')}
                    </span>
                  </td>
                  <td className='py-4 px-5 text-center'>
                    {pago.diasVencido === 0 ? (
                      <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning'>
                        Por vencer
                      </span>
                    ) : (
                      <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-danger/10 text-danger'>
                        {pago.diasVencido} días vencido
                      </span>
                    )}
                  </td>
                  <td className='py-4 px-5 text-center'>
                    <Link
                      to={`/deudas-jugadores?nombre=${pago.jugador}`}
                      className='text-sm text-primary hover:underline font-medium'
                    >
                      Ir a deuda
                      <ArrowRight size={14} className='inline-block ml-1' />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
