import { useEffect, useState } from 'react'
import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormDeudasJugadores } from '../components/modals/FormDeudasJugadores'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useDeudasJugadores } from '../hooks/useDeudasJugadores'
import { useModal } from '../hooks/useModal'
import { getDeudasJugadoresPeriodo } from '../api/deudas-jugadores'

const columns = [
  { key: 'nombre_jugador', name: 'Jugador' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'monto_base_format', name: 'Monto base' },
  { key: 'monto_final_format', name: 'Monto Final' },
  { key: 'saldo', name: 'Saldo restante' },
  { key: 'fecha_pago_format', name: 'Fecha pago' },
  { key: 'fecha_limite_format', name: 'Fecha limite' },
  { key: 'estatus', name: 'Estatus' }
]

const periodicidad = [
  { key: 'todos', name: 'Todos' },
  { key: 'Diario', name: 'Diario' },
  { key: 'Semanal', name: 'Semanal' },
  { key: 'Quincenal', name: 'Quincenal' },
  { key: 'Mensual', name: 'Mensual' },
  { key: 'Bimestral', name: 'Bimestral' },
  { key: 'Trimestral', name: 'Trimestral' },
  { key: 'Cuatrimestral', name: 'Cuatrimestral' },
  { key: 'Semestral', name: 'Semestral' },
  { key: 'Anual', name: 'Anual' },
  { key: 'Temporada', name: 'Temporada' }
]

export default function DeudasJugadoresPage() {
  const {
    modalType,
    add,
    edit,
    closeModal,
    view,
    openModal,
    formData,
    currentItem,
    costosConcepto,
    handleInputChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useDeudasJugadores()

  const {
    loadOptionsJugadores,
    loadOptionsCostosCategoria,
    loadOptionsBancos
  } = useCatalogLoaders()

  const [loading, setLoading] = useState(false)
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos')
  const [deudas, setDeudas] = useState([])

  const handleFiltroPeriodo = async (periodo) => {
    setLoading(true)
    setFiltroPeriodo(periodo)

    const result = await getDeudasJugadoresPeriodo(periodo)

    setDeudas(result)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(isLoading)
    setDeudas(data)
  }, [data, isLoading])

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={deudas || []}
        title='Deudas de jugadores'
        loading={loading}
        openModal={openModal}
        filterPeriodo={true}
        handleFiltro={handleFiltroPeriodo}
        periodicidad={periodicidad}
        filtro={filtroPeriodo}
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
            <FormDeudasJugadores
              view={view}
              edit={edit}
              formData={formData}
              handleInputChange={handleInputChange}
              loadOptionsJugadores={loadOptionsJugadores}
              loadOptionsCostosCategoria={loadOptionsCostosCategoria}
              loadOptionsBancos={loadOptionsBancos}
              costosConcepto={costosConcepto}
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
