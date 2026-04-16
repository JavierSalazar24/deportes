import { Link } from 'react-router'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import { ChevronRight } from 'lucide-react'
import { AlertaCard } from './AlertaCard'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'dayjs/locale/es'
import { useCalendarioPagos } from '../hooks/useCalendarioPagos'
import { GlosarioColoresCalendario } from './GlosarioColoresCalendario'
import Loading from './Loading'
import { useState } from 'react'
import { ModalCalendario } from './modals/ModalCalendario'

dayjs.locale('es')

const localizer = dayjsLocalizer(dayjs)

export const CalendrioPagos = () => {
  const { eventosJugadores, error, isError, isLoading } = useCalendarioPagos()
  const [toggle, setToggle] = useState(false)
  const [info, setInfo] = useState({})

  const toggleModal = (props) => {
    if (props.event) {
      const nombre = props.event.title
      const categoria = props.event.categoria
      const url = `/deudas-jugadores?nombre=${encodeURIComponent(nombre)}`
      const fecha_pago = props.event.fecha_pago
      const deudas = props.event.deudas.filter(
        (deuda) => deuda.fecha_pago === fecha_pago
      )

      setInfo({
        nombre,
        deudas,
        categoria,
        url
      })
    }

    setToggle(!toggle)
  }

  const components = {
    event: (props) => {
      const deudas = props.event.deudas ?? []
      const activas = deudas.filter((d) => d.estatus !== 'Cancelado')

      let cls
      if (activas.length === 0) {
        cls = 'bg-orange-600/80'
      } else if (activas.every((d) => d.estatus === 'Pagado')) {
        cls = 'bg-green-700'
      } else if (
        activas.some((d) => d.estatus === 'Parcial' || d.estatus === 'Pagado')
      ) {
        cls = 'bg-[#4682A9]'
      } else {
        cls = 'bg-red-600/80'
      }

      return (
        <div
          className={`${cls} px-2 rounded-sm`}
          onClick={() => toggleModal(props)}
        >
          {props.title}
        </div>
      )
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {toggle && <ModalCalendario info={info} closeModal={toggleModal} />}

      <div className='mb-3'>
        <AlertaCard text='Calendario de deudas de jugadores' />
      </div>

      <GlosarioColoresCalendario />

      <div className='w-full h-[600px]'>
        <Calendar
          views={['month']}
          components={components}
          events={eventosJugadores}
          localizer={localizer}
          popup={true}
        />
      </div>
      <div className='mt-4 text-center'>
        <Link
          to='/deudas-jugadores'
          className='bg-[#3674B5] text-white py-1 px-3 rounded-md hover:bg-[#2a598b] transition-all flex mx-auto items-center max-w-max'
        >
          Ir a la sección de pagos
          <ChevronRight />
        </Link>
      </div>
    </>
  )
}
