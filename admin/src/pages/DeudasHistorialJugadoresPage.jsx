import { useEffect, useState } from 'react'
import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormDeudasHistorialJugadores } from '../components/modals/FormDeudasHistorialJugadores'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useDeudasHistorialJugadores } from '../hooks/useDeudasHistorialJugadores'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'nombre_jugador', name: 'Jugador' },
  { key: 'temporada', name: 'Temporada' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'monto_final_format', name: 'Monto Final' },
  { key: 'saldo', name: 'Saldo restante' },
  { key: 'fecha_pago_format', name: 'Fecha pago' },
  { key: 'estatus', name: 'Estatus' }
]

export default function DeudasHistorialJugadoresPage() {
  const {
    modalType,
    add,
    closeModal,
    view,
    openModal,
    formData,
    currentItem,
    costosConcepto,
    handleInputChange
  } = useModal()

  const {
    data,
    isLoading,
    isError,
    error,
    handleDelete,
    isLoadingTodos,
    isErrorTodos,
    dataTodos,
    errorTodos
  } = useDeudasHistorialJugadores()

  const {
    loadOptionsJugadores,
    loadOptionsCostosCategoria,
    loadOptionsBancos
  } = useCatalogLoaders()

  const [filtroTemporada, setFiltroTemporada] = useState(true)
  const [dataTemporada, setDataTemporada] = useState([])

  const handleFiltroTemporada = () => setFiltroTemporada(!filtroTemporada)

  useEffect(() => {
    if (filtroTemporada) {
      setDataTemporada(data)
    } else {
      setDataTemporada(dataTodos)
    }
  }, [data, dataTodos, filtroTemporada])

  if (isError || isErrorTodos)
    return <div>{error.message || errorTodos.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={dataTemporada || []}
        title='Historial de deudas de jugadores'
        loading={isLoading || isLoadingTodos}
        openModal={openModal}
        filterTemporada={true}
        handleFiltro={handleFiltroTemporada}
        filtro={filtroTemporada}
      />

      {(modalType === 'add' ||
        modalType === 'edit' ||
        modalType === 'view') && (
        <BaseForm
          view={view}
          add={add}
          closeModal={closeModal}
          Inputs={
            <FormDeudasHistorialJugadores
              view={view}
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
