import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormCostosCategoria } from '../components/modals/FormCostosCategoria'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useCostosCategoria } from '../hooks/useCostosCategoria'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'nombre_temporada', name: 'Temporada' },
  { key: 'nombre_categoria', name: 'Categoría' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'precio_format', name: 'Precio' }
]

export default function CostosCategoriaPage() {
  const {
    modalType,
    add,
    view,
    edit,
    closeModal,
    openModal,
    formData,
    currentItem,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useCostosCategoria()

  const { loadOptionsCategorias, loadOptionsConceptoCobros } =
    useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Costos por categoría'
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
            <FormCostosCategoria
              view={view}
              edit={edit}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsCategorias={loadOptionsCategorias}
              loadOptionsConceptoCobros={loadOptionsConceptoCobros}
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
