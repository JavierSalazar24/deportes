import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormPartidos } from '../components/modals/FormPartidos'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useModal } from '../hooks/useModal'
import { usePartidos } from '../hooks/usePartidos'

const columns = [
  { key: 'rival', name: 'Rival' },
  { key: 'lugar', name: 'Lugar del partido' },
  { key: 'fecha_hora_format', name: 'Fecha y hora del partido' },
  { key: 'nombre_categoria', name: 'Categoría' }
]

export default function PartidosPage() {
  const {
    modalType,
    add,
    closeModal,
    view,
    openModal,
    formData,
    currentItem,
    document,
    handleFileChange,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    usePartidos()

  const { loadOptionsCategorias } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Partidos a jugar'
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
            <FormPartidos
              view={view}
              document={document}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              loadOptionsCategorias={loadOptionsCategorias}
            />
          }
        />
      )}

      {modalType === 'delete' && currentItem && (
        <ModalDelete
          handleDelete={handleDelete}
          closeModal={closeModal}
          formData={formData}
        />
      )}
    </div>
  )
}
