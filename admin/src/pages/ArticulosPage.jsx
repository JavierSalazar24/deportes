import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormArticulos } from '../components/modals/FormArticulos'
import { useArticulos } from '../hooks/useArticulos'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'nombre', name: 'Artículo' },
  { key: 'precio_compra', name: 'Precio de compra' },
  { key: 'precio_venta', name: 'Precio de venta' },
  { key: 'precio_reposicion', name: 'Precio de reposición' },
  { key: 'articulo_equipar', name: 'Artículo para asignar' }
]

export default function ArticulosPage() {
  const {
    modalType,
    currentItem,
    view,
    add,
    openModal,
    closeModal,
    formData,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useArticulos()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Articulos'
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
            <FormArticulos
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
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
