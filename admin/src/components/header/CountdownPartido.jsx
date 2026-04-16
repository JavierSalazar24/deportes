import { MapPin, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Separator } from './countdown/Separator'
import { TimeBlock } from './countdown/TimeBlock'
import { usePartidoProximo } from '../../hooks/usePartidoProximo'

export function CountdownPartido() {
  const { data, isLoading, isError } = usePartidoProximo()

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  })

  useEffect(() => {
    const calcularTiempo = () => {
      const ahora = new Date()
      const diferencia = new Date(data?.fecha_hora) - ahora

      if (diferencia > 0) {
        setTimeLeft({
          dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((diferencia / (1000 * 60)) % 60),
          segundos: Math.floor((diferencia / 1000) % 60)
        })
      }
    }

    calcularTiempo()
    const intervalo = setInterval(calcularTiempo, 1000)
    return () => clearInterval(intervalo)
  }, [data])

  if (isError) return null

  return isLoading ? (
    <div className='loader'></div>
  ) : (
    data && (
      <div className='flex items-center gap-3 md:gap-5'>
        <div className='flex items-center gap-2 md:gap-3'>
          <div className='relative'>
            <div className='absolute inset-0 bg-blue-500/30 rounded-xl blur-xl'></div>
            <div className='relative p-1 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl border border-blue-500/30 w-12 h-12 md:w-13 md:h-13 flex items-center justify-center'>
              <Trophy size={20} className='text-blue-500 md:w-6 md:h-6' />
              <img
                src={data?.foto_url}
                alt='Próximo rival'
                className='w-full h-full object-cover rounded-xl'
              />
            </div>
          </div>
          <div className='hidden lg:block'>
            <p className='text-[10px] text-muted-foreground uppercase tracking-wider font-medium'>
              Proximo Partido
            </p>
            <p className='text-sm font-semibold text-foreground'>
              {data?.categoria.nombre}
            </p>
            <p className='text-xs text-blue-500 font-semibold'>
              vs {data?.rival}
            </p>
          </div>
        </div>

        <div className='hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent'></div>

        <div className='flex items-start gap-1 md:gap-2'>
          <TimeBlock value={timeLeft.dias} label='Dias' />
          <Separator />
          <TimeBlock value={timeLeft.horas} label='Hrs' />
          <Separator />
          <TimeBlock value={timeLeft.minutos} label='Min' />
          <div className='hidden sm:flex items-center gap-1 md:gap-2'>
            <Separator />
            <TimeBlock value={timeLeft.segundos} label='Seg' />
          </div>
        </div>

        <div className='hidden xl:flex items-center gap-2 px-3 py-1.5 bg-gray-100/50 rounded-lg border border-border'>
          <MapPin size={14} className='text-blue-500' />
          <span className='text-xs text-muted-foreground'>{data?.lugar}</span>
        </div>
      </div>
    )
  )
}
