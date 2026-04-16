import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { FormAlmacenEntradas } from '../components/modals/FormAlmacenEntradas'
import { useAlmacenEntrada } from '../hooks/useAlmacenEntrada'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'articulo', name: 'Artículo' },
  { key: 'numero_serie', name: 'Número de serie o de uniforme' },
  { key: 'fecha_entrada_format', name: 'Fecha de entrada' },
  { key: 'tipo_entrada', name: 'Tipo de entrada' }
]

export default function AlmacenEntradasPage() {
  const {
    add,
    closeModal,
    modalType,
    view,
    openModal,
    formData,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit } = useAlmacenEntrada()

  const { loadOptionsJugadores, loadOptionsArticulos } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Historial de entradas en almacén'
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
            <FormAlmacenEntradas
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsArticulos={loadOptionsArticulos}
              loadOptionsJugadores={loadOptionsJugadores}
            />
          }
        />
      )}
    </div>
  )
}
