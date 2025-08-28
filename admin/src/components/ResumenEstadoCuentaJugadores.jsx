import { formatearMonedaMXN } from '../utils/formattedCurrancy'

export const ResumenEstadoCuentaJugadores = ({ data }) => {
  return (
    <div className='mb-7 p-4 border border-[#ddd] rounded-lg bg-[#f9f9f9]'>
      <h2 className='text-3xl mb-4 text-center text-[#27548a] font-bold'>
        Resumen del balance
      </h2>

      <div className='text-center'>
        <p className='text-[#b61818] font-bold mb-2'>
          Deuda: {formatearMonedaMXN(data.resumen.total_deuda)} MXN.
        </p>
        <p className='text-[#27548A] font-bold mb-2'>
          Abonado: {formatearMonedaMXN(data.resumen.total_abonos)} MXN.
        </p>
        <p className='text-[#0d7033] font-bold mb-2'>
          Pagado: {formatearMonedaMXN(data.resumen.total_pagado)} MXN.
        </p>
      </div>
    </div>
  )
}
