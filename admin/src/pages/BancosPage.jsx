import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { useModal } from '../hooks/useModal'
import { useBancos } from '../hooks/useBancos'
import { FormBancos } from '../components/modals/FormBancos'

const columns = [
  { key: 'nombre', name: 'Nombre' },
  { key: 'cuenta', name: 'No. Cuenta' },
  { key: 'clabe', name: 'CLABE' },
  { key: 'saldo_inicial_format', name: 'Saldo inicial' },
  { key: 'saldo_actual_format', name: 'Saldo actual' }
]

export default function BancosPage() {
  const {
    modalType,
    add,
    closeModal,
    openModal,
    formData,
    currentItem,
    view,
    edit,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useBancos()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Bancos'
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
            <FormBancos
              view={view}
              edit={edit}
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
