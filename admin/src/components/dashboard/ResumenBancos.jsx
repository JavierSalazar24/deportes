import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { formatearMonedaMXN } from '../../utils/formattedCurrancy'

dayjs.locale('es')

export function ResumenBancos({ movimientos, balance }) {
  return (
    <div className='bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden '>
      <div className='p-5 border-b border-gray-200'>
        <div className='flex items-center justify-between lg:flex-col xl:flex-row'>
          <div>
            <h3 className='font-semibold text-foreground'>
              Movimientos del día
            </h3>
            <p className='text-sm text-muted-foreground mt-0.5'>
              Resumen de transacciones
            </p>
          </div>
          <span className='text-xs text-muted-foreground'>
            {dayjs().format('DD MMMM, YYYY')}
          </span>
        </div>
      </div>
      <div className='p-5 space-y-4 max-h-90 overflow-y-auto'>
        {movimientos.length === 0 ? (
          <p className='text-center text-gray-400 text-xl font-medium'>
            No hay movimientos hoy.
          </p>
        ) : (
          movimientos.map((movimiento) => (
            <div
              key={movimiento.id}
              className={`pt-2 px-2 pb-1 rounded-lg border ${movimiento.tipo === 'Ingreso' ? 'bg-success/5 border-success/20' : 'bg-danger/5 border border-danger/20'} `}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div
                    className={`p-2 rounded-lg ${movimiento.tipo === 'Ingreso' ? 'bg-success/10' : 'bg-danger/10'}`}
                  >
                    {movimiento.tipo === 'Ingreso' ? (
                      <ArrowDownLeft size={18} className='text-success' />
                    ) : (
                      <ArrowUpRight size={18} className='text-danger' />
                    )}
                  </div>
                  <div>
                    <p className='text-sm font-medium text-foreground'>
                      {movimiento.tipo}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {movimiento.banco}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-bold ${movimiento.tipo === 'Ingreso' ? 'text-success' : 'text-danger'}`}
                >
                  {movimiento.tipo === 'Ingreso'
                    ? `+${formatearMonedaMXN(movimiento.monto)}`
                    : `-${formatearMonedaMXN(movimiento.monto)}`}
                </p>
              </div>
              <p className='text-[10px] text-muted-foreground text-right'>
                {dayjs(movimiento.fecha).format('hh:mm A')}
              </p>
            </div>
          ))
        )}

        <div className='pt-4 border-t border-gray-200'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-muted-foreground'>Balance del día</p>
            <p
              className={`text-xl font-bold ${balance > 0 ? 'text-success' : balance < 0 ? 'text-danger' : 'text-foreground'}`}
            >
              {formatearMonedaMXN(balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
