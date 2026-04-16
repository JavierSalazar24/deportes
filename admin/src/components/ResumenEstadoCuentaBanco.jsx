import { formatearMonedaMXN } from '../utils/formattedCurrancy'

export const ResumenEstadoCuentaBanco = ({ data }) => {
  return (
    <div className='mb-7 p-4 border border-[#ddd] rounded-lg bg-[#f9f9f9]'>
      <h2 className='text-3xl mb-4 text-center text-[#27548a] font-bold'>
        Resumen Financiero
      </h2>

      <div className='text-center'>
        <p className='text-[#0d7033] font-bold mb-2'>
          Ingresos: {formatearMonedaMXN(data.resumen.ingresos)} MXN.
        </p>
        <p className='text-[#b61818] font-bold mb-6'>
          Egresos: {formatearMonedaMXN(data.resumen.egresos)} MXN.
        </p>
        <p className='font-bold mb-3'>
          Balance final:{' '}
          <span className='px-2.5 py-1.5 rounded-md bg-[#27548A] text-white'>
            {formatearMonedaMXN(data.resumen.balance)} MXN.
          </span>
        </p>
      </div>
    </div>
  )
}
