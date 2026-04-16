import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { useModal } from '../hooks/useModal'
import { useEquipamiento } from '../hooks/useEquipamiento'
import { FormEquipamiento } from '../components/modals/FormEquipamiento'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'

const columns = [
  { key: 'jugador', name: 'Jugador' },
  { key: 'equipo', name: 'Equipo asignado' },
  { key: 'fecha_entrega_format', name: 'Fecha entrega' },
  { key: 'fecha_devuelto_format', name: 'Fecha devuelto' }
]

export default function EquipamientoPage() {
  const {
    modalType,
    currentItem,
    view,
    openModal,
    edit,
    add,
    closeModal,
    formData,
    articulosDisponibles,
    handleInputChange,
    handleCheckboxChange
  } = useModal()

  const { loadOptionsJugadores } = useCatalogLoaders()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useEquipamiento()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Asignación de equipo al jugador'
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
            <FormEquipamiento
              view={view}
              edit={edit}
              formData={formData}
              handleInputChange={handleInputChange}
              articulosDisponibles={articulosDisponibles}
              handleCheckboxChange={handleCheckboxChange}
              loadOptionsJugadores={loadOptionsJugadores}
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
