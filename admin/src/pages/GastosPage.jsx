import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormGastos } from '../components/modals/FormGastos'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useGastos } from '../hooks/useGastos'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'banco', name: 'Banco' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'metodo_pago', name: 'Método de pago' },
  { key: 'total_format', name: 'Total' },
  { key: 'fecha', name: 'Fecha' }
]

export default function MovimientosBancariosPage() {
  const {
    modalType,
    openModal,
    closeModal,
    view,
    add,
    formData,
    currentItem,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useGastos()

  const { loadOptionsBancos, loadOptionsConcepto } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Gastos'
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
            <FormGastos
              view={view}
              add={add}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsBancos={loadOptionsBancos}
              loadOptionsConcepto={loadOptionsConcepto}
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
