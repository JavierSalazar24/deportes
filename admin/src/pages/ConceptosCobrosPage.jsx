import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormConceptosCobros } from '../components/modals/FormConceptosCobros'
import { useConceptosCobros } from '../hooks/useConceptosCobros'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'nombre', name: 'Tipo de pago' },
  { key: 'periodicidad', name: 'Periodo' }
]

export default function ConceptosCobrosPage() {
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
    useConceptosCobros()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Tipos de cobros a jugadores'
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
            <FormConceptosCobros
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
