import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormProveedores } from '../components/modals/FormProveedores'
import { useEstadosMunicipios } from '../hooks/useEstadosMunicipios'
import { useModal } from '../hooks/useModal'
import { useProveedores } from '../hooks/useProveedores'

const columns = [
  { key: 'nombre_empresa', name: 'Nombre de la empresa' },
  { key: 'rfc', name: 'RFC' },
  { key: 'razon_social', name: 'Razón social' },
  { key: 'nombre_contacto', name: 'Nombre contacto' },
  { key: 'telefono_contacto', name: 'Teléfono contacto' }
]

export default function ProveedoresPage() {
  const {
    modalType,
    add,
    closeModal,
    view,
    formData,
    openModal,
    currentItem,
    setFormData,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useProveedores()

  const { municipios, opcionesEstados } = useEstadosMunicipios({
    estadoSeleccionado: formData.estado,
    setFormData,
    add
  })

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Proveedores'
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
            <FormProveedores
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
              opcionesEstados={opcionesEstados}
              municipios={municipios}
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
