import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { useModal } from '../hooks/useModal'
import { useUsuarios } from '../hooks/useUsuarios'
import { FormUsuarios } from '../components/modals/FormUsuarios'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'

const columns = [
  { key: 'nombre_completo', name: 'Nombre completo' },
  { key: 'telefono', name: 'Teléfono' },
  { key: 'email', name: 'Correo' },
  { key: 'rol_asignado', name: 'Rol' }
]

export default function UsuariosPage() {
  const {
    modalType,
    closeModal,
    view,
    add,
    edit,
    openModal,
    formData,
    currentItem,
    handleInputChange,
    handleFileChange,
    handleCheckboxChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useUsuarios()

  const { loadOptionsRoles } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Usuarios'
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
            <FormUsuarios
              view={view}
              add={add}
              edit={edit}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              loadOptionsRoles={loadOptionsRoles}
              handleCheckboxChange={handleCheckboxChange}
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
