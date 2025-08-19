import dayjs from 'dayjs'
import { AlertaCard } from '../components/AlertaCard'
import { useReportes } from '../hooks/useReportes'
import { toast } from 'sonner'
import { FormEstadoCuentaProveedor } from '../components/modals/FormEstadoCuentaProveedor'

export default function EstadoCuentaProveedorPage() {
  const {
    formReport,
    estado,
    generateEstadoCuentaProveedor,
    handleInputChange,
    loadOptionsProveedoresUnico
  } = useReportes()

  const handleGeneretReport = (e) => {
    e.preventDefault()

    if (dayjs(formReport.fecha_inicio).isAfter(dayjs(formReport.fecha_fin))) {
      toast.warning('La fecha de fin no puede ser antes que la fecha de inicio')
      return
    }

    const newData = {
      ...formReport,
      proveedor_id: formReport.proveedor_id.value
    }
    generateEstadoCuentaProveedor(newData)
  }

  return (
    <div className='md:p-4 bg-gray-100'>
      <h1 className='text-2xl font-semibold text-gray-900 mb-4 sm:mb-0'>
        Estado de cuenta de los proveedores
      </h1>

      <div className='mt-6 bg-white p-4 rounded-xl mx-auto'>
        <AlertaCard text='Generador de estado de cuentas de los proveedores' />

        <FormEstadoCuentaProveedor
          estado={estado}
          handleSubmit={handleGeneretReport}
          handleInputChange={handleInputChange}
          loadOptionsProveedores={loadOptionsProveedoresUnico}
          formReport={formReport}
        />
      </div>
    </div>
  )
}
