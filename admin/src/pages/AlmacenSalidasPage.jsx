import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { FormAlmacenSalidas } from '../components/modals/FormAlmacenSalidas'
import { useAlmacenSalidas } from '../hooks/useAlmacenSalidas'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'articulo', name: 'Artículo' },
  { key: 'numero_serie', name: 'Número de serie o de uniforme' },
  { key: 'fecha_salida_format', name: 'Fecha de salida' },
  { key: 'motivo_salida', name: 'Mótivo de salida' }
]

export default function AlmacenSalidasPage() {
  const {
    modalType,
    add,
    closeModal,
    view,
    openModal,
    formData,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit } = useAlmacenSalidas()

  const { loadOptionsArticulosDisponibles, loadOptionsJugadores } =
    useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Historial de salidas en almacén'
        loading={isLoading}
        openModal={openModal}
      />

      {(modalType === 'add' ||
        modalType === 'edit' ||
        modalType === 'view') && (
        <BaseForm
          handleSubmit={handleSubmit}
          view={view}
          add={add}
          closeModal={closeModal}
          Inputs={
            <FormAlmacenSalidas
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsArticulos={loadOptionsArticulosDisponibles}
              loadOptionsJugadores={loadOptionsJugadores}
            />
          }
        />
      )}
    </div>
  )
}
