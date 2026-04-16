import { Clock, CloudRain, Info } from 'lucide-react'

export const Pronostico = ({ clima }) => {
  return (
    <div className='bg-gradient-to-br from-violet-50 to-white border border-violet-100 rounded-xl p-4 h-full shadow-sm flex flex-col'>
      <div className='flex justify-between items-start mb-4'>
        <span className='text-[10px] font-bold text-violet-600 uppercase tracking-wider bg-violet-100 px-2 py-0.5 rounded-full'>
          Próx. 3H
        </span>
        <Clock size={14} className='text-violet-400' />
      </div>

      <div className='flex-1 flex flex-col justify-between space-y-2'>
        {clima.pronostico.map((p, i) => (
          <div
            key={i}
            className='flex items-center justify-between p-2 rounded-lg bg-white border border-gray-100 hover:border-violet-100 transition-colors'
          >
            <span className='text-xs font-semibold text-gray-600'>
              {p.tiempo.format('h:mm A')}
            </span>
            <div className='flex items-center gap-1.5'>
              {p.probabilidadLluvia > 0 && (
                <CloudRain
                  size={12}
                  className={
                    p.probabilidadLluvia > 40
                      ? 'text-blue-500'
                      : 'text-gray-300'
                  }
                />
              )}
              <span
                className={`text-xs font-bold ${
                  p.probabilidadLluvia > 50
                    ? 'text-blue-600'
                    : p.probabilidadLluvia > 20
                      ? 'text-blue-400'
                      : 'text-gray-400'
                }`}
              >
                {p.probabilidadLluvia}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-2 pt-2 border-t border-violet-100 flex items-center gap-1.5 justify-center opacity-60'>
        <Info size={10} className='text-violet-400' />
        <span className='text-[9px] text-violet-400 font-medium'>
          Probabilidad de lluvia
        </span>
      </div>
    </div>
  )
}
