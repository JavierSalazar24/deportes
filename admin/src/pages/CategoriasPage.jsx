import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormCategorias } from '../components/modals/FormCategorias'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useCategorias } from '../hooks/useCategorias'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'nombre_temporada', name: 'Temporada' },
  { key: 'nombre', name: 'Categoría' },
  { key: 'rango', name: 'Edad' },
  { key: 'nacidos', name: 'Nacidos entre' },
  { key: 'genero', name: 'Género' }
]

export default function CategoriasPage() {
  const {
    modalType,
    add,
    closeModal,
    view,
    openModal,
    formData,
    currentItem,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useCategorias()

  const { loadOptionsTemporadas } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Categorías'
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
            <FormCategorias
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsTemporadas={loadOptionsTemporadas}
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
