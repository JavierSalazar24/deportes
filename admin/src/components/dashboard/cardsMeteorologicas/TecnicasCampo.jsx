import { Cloud, CloudRain, Droplets, Gauge } from 'lucide-react'
import { MetricBox } from '../MetricBox'

export const TecnicasCampo = ({ clima, estaLloviendo }) => {
  return (
    <div className='bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-4 h-full shadow-sm flex flex-col'>
      {/* Header */}
      <div className='flex justify-between items-start mb-4'>
        <span className='text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full'>
          Campo
        </span>
        <Gauge size={14} className='text-emerald-400' />
      </div>

      <div className='grid grid-cols-2 gap-2 flex-1'>
        <MetricBox
          icon={Droplets}
          label='Humedad'
          value={`${clima.humedad}%`}
          color='text-blue-500'
          bg='bg-blue-50 h-full'
        />
        <MetricBox
          icon={Gauge}
          label='Presión'
          value={clima.presion}
          sub='hPa'
          color='text-purple-500'
          bg='bg-purple-50 h-full'
        />
        <MetricBox
          icon={Cloud}
          label='Nubes'
          value={`${clima.nubosidad}%`}
          color='text-gray-500'
          bg='bg-gray-100 h-full'
        />

        <div
          className={`rounded-lg p-2 flex flex-col justify-center h-full ${estaLloviendo ? 'bg-blue-50 border border-blue-200' : 'bg-emerald-50/50'}`}
        >
          <div className='flex items-center gap-1.5 mb-0.5 justify-center'>
            <CloudRain
              size={12}
              className={estaLloviendo ? 'text-blue-500' : 'text-emerald-400'}
            />
            <span className='text-[11px] text-gray-500 uppercase'>Lluvia</span>
          </div>
          <span
            className={`text-sm font-bold text-center ${estaLloviendo ? 'text-blue-600' : 'text-gray-700'}`}
          >
            {clima.precipitacion}
            <span className='text-[11px] font-normal ml-0.5'>mm</span>
          </span>
        </div>
      </div>
    </div>
  )
}
