import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormTemporadas } from '../components/modals/FormTemporadas'
import { useModal } from '../hooks/useModal'
import { useTemporadas } from '../hooks/useTemporadas'

const columns = [
  { key: 'nombre', name: 'Temporada' },
  { key: 'fecha_inicio_format', name: 'Fecha de inicio' },
  { key: 'fecha_fin_format', name: 'Fecha de fin' },
  { key: 'estatus', name: 'Estatus' }
]

export default function TemporadasPage() {
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
    useTemporadas()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Temporadas'
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
            <FormTemporadas
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
