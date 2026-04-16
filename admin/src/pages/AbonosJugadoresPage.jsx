import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormAbonosJugadores } from '../components/modals/FormAbonosJugadores'
import { useAbonosJugadores } from '../hooks/useAbonosJugadores'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'banco_nombre', name: 'Banco' },
  { key: 'metodo_pago', name: 'metodo' },
  { key: 'jugador', name: 'Jugador' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'monto_abonado', name: 'Monto abonado' },
  { key: 'fecha_abono', name: 'Fecha del abono' }
]

export default function AbonosJugadoresPage() {
  const {
    modalType,
    add,
    edit,
    closeModal,
    view,
    openModal,
    formData,
    currentItem,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useAbonosJugadores()

  const { loadOptionsBancos, loadOptionsDeudasJugadores } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Abonos de deudas de jugadores'
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
            <FormAbonosJugadores
              view={view}
              edit={edit}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsBancos={loadOptionsBancos}
              loadOptionsDeudasJugadores={loadOptionsDeudasJugadores}
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
