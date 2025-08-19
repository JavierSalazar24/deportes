import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormPagosJugadores } from '../components/modals/FormPagosJugadores'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useModal } from '../hooks/useModal'
import { usePagosJugadores } from '../hooks/usePagosJugadores'

const columns = [
  { key: 'banco', name: 'Banco' },
  { key: 'nombre_jugador', name: 'Jugador' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'monto_pagado', name: 'Pago de' },
  { key: 'metodo_pago', name: 'Método de pago' },
  { key: 'fecha_pagado_format', name: 'Fecha del pago' }
]

export default function PagosJugadoresPage() {
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
    usePagosJugadores()

  const { loadOptionsBancos, loadOptionsDeudasJugadores } = useCatalogLoaders()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Pagos de jugadores'
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
            <FormPagosJugadores
              view={view}
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
