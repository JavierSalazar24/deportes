import dayjs from 'dayjs'
import { AlertaCard } from '../components/AlertaCard'
import { FormReportes } from '../components/modals/FormReportes'
import { useReportes } from '../hooks/useReportes'
import { toast } from 'sonner'

export default function ReportesPage() {
  const {
    formReport,
    generateReport,
    loadOptionsBancos,
    handleInputChange,
    loadOptionsProveedores,
    loadOptionsTemporadas
  } = useReportes()

  const handleGeneretReport = (e) => {
    e.preventDefault()

    if (dayjs(formReport.fecha_inicio).isAfter(dayjs(formReport.fecha_fin))) {
      toast.warning('La fecha de fin no puede ser antes que la fecha de inicio')
      return
    }

    let newData = formReport
    if (['orden-compra', 'compras'].includes(formReport.modulo)) {
      newData = {
        ...formReport,
        banco_id: formReport.banco_id.value,
        proveedor_id: formReport.proveedor_id.value
      }
    }

    if (['gastos', 'movimientos'].includes(formReport.modulo)) {
      newData = {
        ...formReport,
        banco_id: formReport.banco_id.value
      }
    }

    if (['abonos-jugadores', 'pagos-jugadores'].includes(formReport.modulo)) {
      newData = {
        ...formReport,
        temporada_id: formReport.temporada_id.value,
        banco_id: formReport.banco_id.value
      }
    }

    if (['deudas-jugadores'].includes(formReport.modulo)) {
      newData = {
        ...formReport,
        temporada_id: formReport.temporada_id.value
      }
    }

    generateReport(newData)
  }

  return (
    <div className='md:p-4 bg-gray-100'>
      <h1 className='text-2xl font-semibold text-gray-900 mb-4 sm:mb-0'>
        Generador de reportes
      </h1>

      <div className='mt-6 bg-white p-4 rounded-xl mx-auto'>
        <AlertaCard text='Generador de reportes del módulo seleccionado' />

        <FormReportes
          handleSubmit={handleGeneretReport}
          handleInputChange={handleInputChange}
          loadOptionsBancos={loadOptionsBancos}
          loadOptionsProveedores={loadOptionsProveedores}
          loadOptionsTemporadas={loadOptionsTemporadas}
          formReport={formReport}
        />
      </div>
    </div>
  )
}
