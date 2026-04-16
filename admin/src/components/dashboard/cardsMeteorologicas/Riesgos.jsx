import { ArrowUp, ShieldAlert, Sun, Wind } from 'lucide-react'

export const Riesgos = ({ clima, alertaRachas, uvInfo }) => {
  return (
    <div className='bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-xl p-4 flex flex-col h-full shadow-sm'>
      <div className='flex justify-between items-start mb-3'>
        <span className='text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-full'>
          Riesgos
        </span>
        <ShieldAlert size={14} className='text-amber-400' />
      </div>

      <div className='flex-1 flex flex-col gap-3'>
        <div className='flex-1 bg-gradient-to-b from-white/80 to-amber-50/50 p-3 rounded-lg border border-dashed border-amber-200 flex flex-col justify-center'>
          <div className='flex justify-between items-center mb-5'>
            <div className='flex items-center gap-1.5 text-gray-500'>
              <Wind size={14} />
              <span className='text-xs font-medium'>Viento </span>
            </div>
            <div className='flex items-center gap-1.5'>
              <div
                className='bg-amber-100 p-1 rounded-full transform transition-transform duration-700 shadow-sm'
                style={{
                  transform: `rotate(${clima.viento.direccion}deg)`
                }}
              >
                <ArrowUp size={10} className='text-amber-600' />
              </div>
              <span className='text-sm font-bold text-gray-700'>
                {clima.viento.velocidad}{' '}
                <span className='text-[10px] font-normal text-gray-400'>
                  km/h
                </span>
              </span>
            </div>
          </div>

          {/* Rachas */}
          <div
            className={`flex justify-between items-center text-xs px-2.5 py-1.5 rounded-md ${alertaRachas ? 'bg-red-50 text-red-600 border border-red-100 font-bold' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}
          >
            <span>Rachas max:</span>
            <span className='flex items-center gap-1'>
              {clima.viento.rachas} km/h
              {alertaRachas && <span className='animate-pulse'>⚠️</span>}
            </span>
          </div>
        </div>

        {/* Bloque UV */}
        <div>
          <div className='flex justify-between items-end mb-1 px-1'>
            <span className='text-xs text-gray-500 flex items-center gap-1'>
              <Sun size={12} /> UV
            </span>
            <span className={`text-xs font-bold ${uvInfo.color}`}>
              {uvInfo.label}
            </span>
          </div>
          <div className='h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner'>
            <div
              className={`h-full ${uvInfo.barColor} transition-all duration-1000 ease-out`}
              style={{ width: `${(clima.indiceUV / 11) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
