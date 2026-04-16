import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormCajaPagos } from '../components/modals/FormCajaPagos'
import { useCajaPagos } from '../hooks/useCajaPagos'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'banco', name: 'Banco' },
  { key: 'usuario', name: 'Usuario recibió' },
  { key: 'jugador', name: 'Jugador' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'monto_format', name: 'Monto pagado' },
  { key: 'fecha_format', name: 'Fecha' },
  { key: 'metodo_pago', name: 'Método de pago' }
]

export default function CajaPagosPage() {
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

  const { data, isLoading, isError, error, handleDelete } = useCajaPagos()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Dinero recibido en caja'
        loading={isLoading}
        openModal={openModal}
      />

      {(modalType === 'add' ||
        modalType === 'edit' ||
        modalType === 'view') && (
        <BaseForm
          view={view}
          add={add}
          closeModal={closeModal}
          Inputs={
            <FormCajaPagos
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
