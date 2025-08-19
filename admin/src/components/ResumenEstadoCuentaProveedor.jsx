import { formatearMonedaMXN } from '../utils/formattedCurrancy'

export const ResumenEstadoCuentaProveedor = ({ data }) => {
  return (
    <div className='mb-7 p-4 border border-[#ddd] rounded-lg bg-[#f9f9f9]'>
      <h2 className='text-3xl mb-4 text-center text-[#27548a] font-bold'>
        Resumen General
      </h2>

      <div className='ml-6'>
        <li className='text-[#0d7033] font-bold'>
          Pagadas: {formatearMonedaMXN(data.resumen.pagadas)} MXN.
        </li>
        <li className='text-[#b61818] font-bold'>
          Pendientes: {formatearMonedaMXN(data.resumen.pendientes)} MXN.
        </li>
        <li className='text-[#b61818] font-bold'>
          Vencidas: {formatearMonedaMXN(data.resumen.vencidas)} MXN.
        </li>
        <li className='text-[#d46700] font-bold'>
          Canceladas: {formatearMonedaMXN(data.resumen.canceladas)} MXN.
        </li>
        <li>
          <strong>Total de órdenes:</strong>{' '}
          {formatearMonedaMXN(data.resumen.total)} MXN.
        </li>
      </div>
      <p className='text-center mt-5'>
        <span className='px-2.5 py-1.5 rounded-md bg-[#27548A] text-white'>
          Total por pagar (pendientes + vencidas):{' '}
          {formatearMonedaMXN(data.resumen.por_pagar)} MXN.
        </span>
      </p>
    </div>
  )
}
