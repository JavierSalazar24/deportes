import { CloudSun, MapPin } from 'lucide-react'
import { useClimaAPI } from '../../hooks/useClimaAPI'
import Loading from '../Loading'
import { usePanelMeteorologico } from '../../hooks/usePanelMeteorologico'
import { Temperatura } from './cardsMeteorologicas/Temperatura'
import { Riesgos } from './cardsMeteorologicas/Riesgos'
import { TecnicasCampo } from './cardsMeteorologicas/TecnicasCampo'
import { Pronostico } from './cardsMeteorologicas/Pronostico'

export function PanelMeteorologico() {
  const { data, isLoading, isError } = useClimaAPI()
  const { clima, uvInfo, alertaSensacion, alertaRachas, estaLloviendo } =
    usePanelMeteorologico({ data })

  if (isLoading) return <Loading />
  if (isError)
    return (
      <div className='p-10 text-center text-red-400'>Error de conexión</div>
    )

  return (
    <div className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden mt-6 w-full'>
      <div className='px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-white border border-gray-200 shadow-sm'>
            <CloudSun size={18} className='text-sky-500' />
          </div>
          <div>
            <h3 className='font-bold text-gray-800 text-sm md:text-base'>
              Condiciones de campo
            </h3>
            <p className='text-xs text-gray-500 hidden md:block'>
              Panel de control meteorológico en tiempo real
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm'>
          <MapPin size={12} className='text-gray-400' />
          <span className='text-xs font-medium text-gray-600'>Durango, MX</span>
        </div>
      </div>

      <div className='p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <Temperatura clima={clima} alertaSensacion={alertaSensacion} />
        <Riesgos clima={clima} alertaRachas={alertaRachas} uvInfo={uvInfo} />
        <TecnicasCampo clima={clima} estaLloviendo={estaLloviendo} />
        <Pronostico clima={clima} />
      </div>
    </div>
  )
}
