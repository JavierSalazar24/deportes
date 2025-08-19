import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { useModal } from '../hooks/useModal'
import { useRoles } from '../hooks/useRoles'
import { FormRoles } from '../components/modals/FormRoles'
import { usePermisos } from '../hooks/usePermisos'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'

const columns = [
  { key: 'nombre', name: 'Nombre' },
  { key: 'descripcion', name: 'Descripción' }
]

export default function RolesPage() {
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

  const {
    modulosSeleccionados,
    getPermisoValue,
    handleChange,
    handlePermisoChange
  } = usePermisos()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useRoles()

  const { loadOptionsModulos } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Roles'
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
            <FormRoles
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsModulos={loadOptionsModulos}
              modulosSeleccionados={modulosSeleccionados}
              handleChange={handleChange}
              handlePermisoChange={handlePermisoChange}
              getPermisoValue={getPermisoValue}
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
