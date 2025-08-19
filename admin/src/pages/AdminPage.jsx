import { AdminCards } from '../components/AdminCards'
import AdminClock from '../components/AdminClock'
import { EgresosChart } from '../components/EgresosChart'
import { IngresosChart } from '../components/IngresosChart'
import Loading from '../components/Loading'
import { useAuth } from '../context/AuthContext'
import { useGraphic } from '../hooks/useGraphic'
import { tienePermiso } from '../utils/permisoGraficas'
import { NoGrafica } from './NoGrafica'

const AdminPage = () => {
  const {
    ingresos,
    isErrorIngresos,
    isLoadingIngresos,
    egresos,
    isErrorEgresos,
    isLoadingEgresos
  } = useGraphic()

  const { user } = useAuth()

  return (
    <>
      <AdminCards />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {tienePermiso(user, 'movimientos-bancarios', 'consultar') ? (
          isErrorIngresos ? (
            <p>No se puede mostrar la gráfica de ingresos</p>
          ) : isLoadingIngresos ? (
            <Loading />
          ) : (
            <div className='col-span-6'>
              <IngresosChart data={ingresos} />
            </div>
          )
        ) : (
          <div className='sm:col-span-6 md:col-span-1'>
            <AdminClock />
          </div>
        )}

        {tienePermiso(user, 'movimientos-bancarios', 'consultar') ? (
          isErrorEgresos ? (
            <p>No se puede mostrar la gráfica de egresos</p>
          ) : isLoadingEgresos ? (
            <Loading />
          ) : (
            <div className='col-span-6'>
              <EgresosChart data={egresos} />
            </div>
          )
        ) : (
          <div className='sm:col-span-6 md:col-span-1'>
            <NoGrafica />
          </div>
        )}
      </div>
    </>
  )
}
export default AdminPage
