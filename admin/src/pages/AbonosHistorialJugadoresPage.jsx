import { useEffect, useState } from 'react'
import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormAbonosHistorialJugadores } from '../components/modals/FormAbonosHistorialJugadores'
import { useAbonosHistorialJugadores } from '../hooks/useAbonosHistorialJugadores'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useModal } from '../hooks/useModal'

const columns = [
  { key: 'banco_nombre', name: 'Banco' },
  { key: 'jugador', name: 'Jugador' },
  { key: 'temporada', name: 'Temporada' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'monto_abonado', name: 'Monto abonado' },
  { key: 'fecha_abono', name: 'Fecha del abono' }
]

export default function AbonosHistorialJugadoresPage() {
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
    data,
    isLoading,
    isError,
    error,
    handleDelete,
    isLoadingTodos,
    isErrorTodos,
    dataTodos,
    errorTodos
  } = useAbonosHistorialJugadores()

  const { loadOptionsBancos, loadOptionsDeudasJugadores } = useCatalogLoaders()

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
        title='Historial de abonos de deudas de jugadores'
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
            <FormAbonosHistorialJugadores
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
