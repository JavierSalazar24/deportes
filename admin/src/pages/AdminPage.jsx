import { AdminCards } from '../components/dashboard/AdminCards'
import { GastosDistribucion } from '../components/dashboard/GastosDistribucion'
import { IngresosVsEgresos } from '../components/dashboard/IngresosVsEgresos'
import { PagosCategoria } from '../components/dashboard/PagosCategoria'
import { PagosPendientes } from '../components/dashboard/PagosPendientes'
import { PanelMeteorologico } from '../components/dashboard/PanelMeteorologico'
import { ProximosPartidos } from '../components/dashboard/ProximosPartidos'
import { ResumenBancos } from '../components/dashboard/ResumenBancos'
import Loading from '../components/Loading'
import { useDashboard } from '../hooks/useDashboard'

const AdminPage = () => {
  const { data, isLoading, isError } = useDashboard()

  if (isLoading) return <Loading />
  if (isError)
    return (
      <div className='text-red-600 font-bold text-center text-lg'>
        Ah ocurrido un error, comunicate con sistemas.
      </div>
    )

  return (
    <>
      <AdminCards />

      <PanelMeteorologico />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6'>
        <div className='lg:col-span-2'>
          <IngresosVsEgresos ingresosEgresos={data.ingresosEgresos} />
        </div>

        <ResumenBancos
          movimientos={data.movimientosBancariosDia.movimientos}
          balance={data.movimientosBancariosDia.resumen.balance}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
        <PagosCategoria
          pagosCategoria={data.pagosCategoriaFemenil}
          title='Pagos por categoría femenil'
          subtitle='Jugadoras que ya pagaron vs pendientes'
        />
        <PagosCategoria
          pagosCategoria={data.pagosCategoriaVaronil}
          title='Pagos por categoría varonil'
          subtitle='Jugadores que ya pagaron vs pendientes'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 mt-6'>
        <PagosPendientes pagosPendientes={data.pagosPendientes} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
        <ProximosPartidos proximosPartidos={data.proximosPartidos} />
        <GastosDistribucion distribucionGastos={data.distribucionGastos} />
      </div>
    </>
  )
}
export default AdminPage
