import { useEffect, useState } from 'react'
import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { FormPagosHistorialJugadores } from '../components/modals/FormPagosHistorialJugadores'
import { useCatalogLoaders } from '../hooks/useCatalogLoaders'
import { useModal } from '../hooks/useModal'
import { usePagosHistorialJugadores } from '../hooks/usePagosHistorialJugadores'

const columns = [
  { key: 'banco', name: 'Banco' },
  { key: 'nombre_jugador', name: 'Jugador' },
  { key: 'temporada', name: 'Temporada' },
  { key: 'concepto', name: 'Concepto' },
  { key: 'monto_pagado', name: 'Pago de' },
  { key: 'fecha_pagado_format', name: 'Fecha del pago' }
]

export default function PagosHistorialJugadoresPage() {
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
  } = usePagosHistorialJugadores()

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
        title='Historial de pagos de jugadores'
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
            <FormPagosHistorialJugadores
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
