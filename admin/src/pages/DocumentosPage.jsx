import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { useModal } from '../hooks/useModal'
import { useDocumentos } from '../hooks/useDocumentos'
import { FormDocumentos } from '../components/modals/FormDocumentos'

const columns = [{ key: 'nombre', name: 'Nombre' }]

export default function DocumentosPage() {
  const {
    modalType,
    add,
    edit,
    closeModal,
    openModal,
    formData,
    currentItem,
    view,
    handleInputChange,
    handleFileChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useDocumentos()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Documentos que el tutor debe aceptar'
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
            <FormDocumentos
              view={view}
              edit={edit}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
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
