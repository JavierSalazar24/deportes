import { Thermometer } from 'lucide-react'
import { WeatherIcon } from './WeatherIcon'

export const Temperatura = ({ clima, alertaSensacion }) => {
  return (
    <div className='bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-xl p-4 flex flex-col justify-between h-full shadow-sm'>
      <div className='flex justify-between items-start'>
        <span className='text-[10px] font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-2 py-0.5 rounded-full'>
          Actual
        </span>
        <Thermometer size={14} className='text-sky-400' />
      </div>

      <div className='flex flex-col items-center justify-center py-2'>
        <div className='scale-110 mb-2'>
          <WeatherIcon
            code={clima.weatherCode}
            size={52}
            isDay={clima.esDeDia}
          />
        </div>
        <div className='text-4xl font-black text-gray-800 tracking-tight'>
          {clima.temperaturaReal}°
        </div>
        <div
          className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-md ${alertaSensacion ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
        >
          Sensación {clima.sensacionTermica}°
        </div>
      </div>

      <div className='text-center border-t border-sky-100 pt-3'>
        <p className='text-sm font-medium text-gray-600 capitalize'>
          {clima.descripcion}
        </p>
      </div>
    </div>
  )
}
