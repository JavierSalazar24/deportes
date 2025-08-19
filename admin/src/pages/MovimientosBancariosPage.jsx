import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { useModal } from '../hooks/useModal'
import { useMovimientosBancarios } from '../hooks/useMovimientosBancarios'
import { FormMovimientosBancarios } from '../components/modals/FormMovimientosBancarios'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'

const columns = [
  { key: 'banco', name: 'Banco' },
  { key: 'tipo_movimiento', name: 'Tipo movimiento' },
  { key: 'metodo_pago', name: 'Método pago' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'monto_format', name: 'Monto' },
  { key: 'fecha_format', name: 'Fecha movimiento' },
  { key: 'modulo', name: 'Módulo' }
]

export default function MovimientosBancariosPage() {
  const {
    modalType,
    add,
    closeModal,
    openModal,
    view,
    formData,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit } =
    useMovimientosBancarios()

  const { loadOptionsBancos } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Movimientos bancarios'
        loading={isLoading}
        openModal={openModal}
      />

      {modalType === 'view' && (
        <BaseForm
          handleSubmit={handleSubmit}
          view={view}
          add={add}
          closeModal={closeModal}
          Inputs={
            <FormMovimientosBancarios
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsBancos={loadOptionsBancos}
            />
          }
        />
      )}
    </div>
  )
}
