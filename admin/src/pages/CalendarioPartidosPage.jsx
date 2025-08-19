import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import Loading from '../components/Loading'
import { usePartidos } from '../hooks/usePartidos'

dayjs.locale('es')

export default function CalendarioPartidosPage() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null)
  const { data, isLoading, isError, error } = usePartidos()

  if (isError) return <div>{error.message}</div>
  if (isLoading) return <Loading />

  const eventos = data.map((partido) => ({
    id: partido.id,
    title: `Partido vs ${partido.rival}`,
    start: partido.fecha_hora,
    extendedProps: {
      categoria: partido.categoria.nombre,
      foto: partido.foto_url,
      rival: partido.rival,
      lugar: partido.lugar,
      fecha_hora: partido.fecha_hora
    }
  }))

  function Evento(arg) {
    const { foto, rival, lugar } = arg.event.extendedProps
    return (
      <div className='cursor-pointer flex items-center gap-2 bg-white shadow-md rounded-md px-2 py-1 border border-gray-100 transition-shadow duration-200'>
        <img
          src={foto || '/img/avatar_placeholder.png'}
          alt={rival}
          className='w-7 h-7 rounded-full object-cover border border-gray-300 flex-shrink-0'
        />
        <div className='flex flex-col min-w-0'>
          <span className='text-xs text-gray-600 truncate-event'>{lugar}</span>
        </div>
      </div>
    )
  }

  function handleEventClick(clickInfo) {
    setEventoSeleccionado(clickInfo.event)
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={eventos}
        eventContent={Evento}
        eventClick={handleEventClick}
        height='auto'
        locale={esLocale}
      />

      {eventoSeleccionado && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/40'>
          <div className='bg-white p-6 rounded-xl shadow-xl w-[90vw] max-w-sm relative'>
            <button
              className='absolute top-1 right-3 text-gray-400 hover:text-gray-700 cursor-pointer'
              onClick={() => setEventoSeleccionado(null)}
            >
              ✕
            </button>
            <div className='flex flex-col items-center gap-3'>
              <img
                src={
                  eventoSeleccionado.extendedProps.foto ||
                  '/img/avatar_placeholder.png'
                }
                alt={eventoSeleccionado.extendedProps.rival}
                className='w-32 h-32 rounded-full object-cover border p-2'
              />
              <div className='text-center'>
                <div className='flex justify-center mb-2'>
                  <span className='inline-block bg-blue-100 text-blue-700 font-semibold text-xs px-3 py-1 rounded-full'>
                    {eventoSeleccionado.extendedProps.categoria}
                  </span>
                </div>
                <div className='font-bold text-lg mb-1'>
                  Partido vs {eventoSeleccionado.extendedProps.rival}
                </div>
                <div className='text-gray-600 text-sm mb-2'>
                  Lugar: {eventoSeleccionado.extendedProps.lugar}
                </div>
                <div className='text-gray-500 text-xs'>
                  {dayjs(eventoSeleccionado.extendedProps.fecha_hora).format(
                    'D [de] MMMM [de] YYYY, h:mm A'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
