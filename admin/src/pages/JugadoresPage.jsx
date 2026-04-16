import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { useModal } from '../hooks/useModal'
import { useJugadores } from '../hooks/useJugadores'
import { FormJugadores } from '../components/modals/FormJugadores'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'

const columns = [
  { key: 'jugador', name: 'Nombre' },
  { key: 'curp', name: 'CURP' },
  { key: 'nombre_categoria', name: 'Categoría' },
  { key: 'nombre_temporada', name: 'Temporada' }
]

export default function JugadoresPage() {
  const {
    modalType,
    closeModal,
    view,
    add,
    edit,
    openModal,
    document,
    formData,
    currentItem,
    categorias,
    handleInputChange,
    handleFileChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useJugadores()

  const {
    loadOptionsTemporadasActivas,
    loadOptionsCategorias,
    loadOptionsUsuarios
  } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Jugadores'
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
            <FormJugadores
              view={view}
              edit={edit}
              document={document}
              formData={formData}
              categorias={categorias}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              loadOptionsTemporadas={loadOptionsTemporadasActivas}
              loadOptionsCategorias={loadOptionsCategorias}
              loadOptionsUsuarios={loadOptionsUsuarios}
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
