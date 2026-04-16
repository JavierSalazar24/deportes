import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormOrdenesCompra } from '../components/modals/FormOrdenesCompra'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useModal } from '../hooks/useModal'
import { useOrdenesCompra } from '../hooks/useOrdenesCompra'

const columns = [
  { key: 'banco', name: 'Banco' },
  { key: 'proveedor', name: 'Proveedor' },
  { key: 'numero_oc', name: '# OC' },
  { key: 'articulo', name: 'Artículo' },
  { key: 'total_format', name: 'Total' },
  { key: 'fecha', name: 'Fecha' },
  { key: 'estatus', name: 'Estatus' }
]

export default function OrdenesComprasPage() {
  const {
    modalType,
    add,
    closeModal,
    view,
    openModal,
    formData,
    edit,
    currentItem,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useOrdenesCompra()

  const { loadOptionsBancos, loadOptionsArticulos, loadOptionsProveedores } =
    useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Ordenes de compra'
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
            <FormOrdenesCompra
              view={view}
              formData={formData}
              edit={edit}
              handleInputChange={handleInputChange}
              loadOptionsBancos={loadOptionsBancos}
              loadOptionsArticulos={loadOptionsArticulos}
              loadOptionsProveedores={loadOptionsProveedores}
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
