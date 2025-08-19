import dayjs from 'dayjs'
import { AlertaCard } from '../components/AlertaCard'
import { useReportes } from '../hooks/useReportes'
import { toast } from 'sonner'
import { FormEstadoCuentaBanco } from '../components/modals/FormEstadoCuentaBanco'

export default function EstadoCuentaBancoPage() {
  const {
    formReport,
    estado,
    generateEstadoCuentaBanco,
    handleInputChange,
    loadOptionsBancosUnico
  } = useReportes()

  const handleGeneretReport = (e) => {
    e.preventDefault()

    if (dayjs(formReport.fecha_inicio).isAfter(dayjs(formReport.fecha_fin))) {
      toast.warning('La fecha de fin no puede ser antes que la fecha de inicio')
      return
    }

    const newData = {
      ...formReport,
      banco_id: formReport.banco_id.value
    }
    generateEstadoCuentaBanco(newData)
  }

  return (
    <div className='md:p-4 bg-gray-100'>
      <h1 className='text-2xl font-semibold text-gray-900 mb-4 sm:mb-0'>
        Estado de cuenta de los bancos
      </h1>

      <div className='mt-6 bg-white p-4 rounded-xl mx-auto'>
        <AlertaCard text='Generador de estado de cuentas de los bancos' />

        <FormEstadoCuentaBanco
          estado={estado}
          handleSubmit={handleGeneretReport}
          handleInputChange={handleInputChange}
          loadOptionsBancos={loadOptionsBancosUnico}
          formReport={formReport}
        />
      </div>
    </div>
  )
}
