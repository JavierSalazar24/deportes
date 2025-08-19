import { Toaster } from 'sonner'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import Loading from './components/Loading'
import { useAuth } from './context/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
import OfflineBanner from './components/OfflineBanner'
import OnlineBanner from './components/OnlineBanner'

const AdminPage = lazy(() => import('./pages/AdminPage'))
const JugadoresPage = lazy(() => import('./pages/JugadoresPage'))
const EquipamientoPage = lazy(() => import('./pages/EquipamientoPage'))
const ConceptosCobrosPage = lazy(() => import('./pages/ConceptosCobrosPage'))
const TemporadasPage = lazy(() => import('./pages/TemporadasPage'))
const CategoriasPage = lazy(() => import('./pages/CategoriasPage'))
const CostosCategoriaPage = lazy(() => import('./pages/CostosCategoriaPage'))
const PartidosPage = lazy(() => import('./pages/PartidosPage'))
const CalendarioPartidosPage = lazy(() =>
  import('./pages/CalendarioPartidosPage')
)
const DeudasJugadoresPage = lazy(() => import('./pages/DeudasJugadoresPage'))
const AbonosJugadoresPage = lazy(() => import('./pages/AbonosJugadoresPage'))
const PagosJugadoresPage = lazy(() => import('./pages/PagosJugadoresPage'))
const DeudasHistorialJugadoresPage = lazy(() =>
  import('./pages/DeudasHistorialJugadoresPage')
)
const AbonosHistorialJugadoresPage = lazy(() =>
  import('./pages/AbonosHistorialJugadoresPage')
)
const PagosHistorialJugadoresPage = lazy(() =>
  import('./pages/PagosHistorialJugadoresPage')
)
const CalendarioPagosPage = lazy(() => import('./pages/CalendarioPagosPage'))
const CajaPagosPage = lazy(() => import('./pages/CajaPagosPage'))
const BancosPage = lazy(() => import('./pages/BancosPage'))
const MovimientosBancariosPage = lazy(() =>
  import('./pages/MovimientosBancariosPage')
)
const EstadoCuentaBancoPage = lazy(() =>
  import('./pages/EstadoCuentaBancoPage')
)
const ProveedoresPage = lazy(() => import('./pages/ProveedoresPage'))
const EstadoCuentaProveedorPage = lazy(() =>
  import('./pages/EstadoCuentaProveedorPage')
)
const ArticulosPage = lazy(() => import('./pages/ArticulosPage'))
const AlmacenPage = lazy(() => import('./pages/AlmacenPage'))
const AlmacenEntradasPage = lazy(() => import('./pages/AlmacenEntradasPage'))
const AlmacenSalidasPage = lazy(() => import('./pages/AlmacenSalidasPage'))
const ConceptosPage = lazy(() => import('./pages/ConceptosPage'))
const OrdenesComprasPage = lazy(() => import('./pages/OrdenesComprasPage'))
const ComprasPage = lazy(() => import('./pages/ComprasPage'))
const GastosPage = lazy(() => import('./pages/GastosPage'))
const UsuariosPage = lazy(() => import('./pages/UsuariosPage'))
const RolesPage = lazy(() => import('./pages/RolesPage'))
const ModulosPage = lazy(() => import('./pages/ModulosPage'))
const LogsPage = lazy(() => import('./pages/LogsPage'))
const ReportesPage = lazy(() => import('./pages/ReportesPage'))
const PWATutorialPage = lazy(() => import('./pages/PWATutorialPage'))

const PerfilPage = lazy(() => import('./pages/PerfilPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))

export default function App() {
  const { isAuthenticated, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [showOnlineBanner, setShowOnlineBanner] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      setShowOnlineBanner(true)
      setTimeout(() => setShowOnlineBanner(false), 3000) // 3 segundos visible
    }
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  if (loading) return <Loading />
  if (isAuthenticated === null) return <Loading />

  return (
    <Suspense fallback={<Loading />}>
      {isOffline && <OfflineBanner />}
      {showOnlineBanner && <OnlineBanner />}

      {isAuthenticated ? (
        <div className='flex h-screen bg-gray-100'>
          <Toaster richColors position='bottom-right' />
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar toggleSidebar={toggleSidebar} />
            <main className='flex-1 overflow-auto p-4'>
              <Routes>
                <Route
                  index
                  path='/'
                  element={
                    <PrivateRoute>
                      <AdminPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/jugadores'
                  element={
                    <PrivateRoute>
                      <JugadoresPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/equipo'
                  element={
                    <PrivateRoute>
                      <EquipamientoPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/conceptos-cobros'
                  element={
                    <PrivateRoute>
                      <ConceptosCobrosPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/temporadas'
                  element={
                    <PrivateRoute>
                      <TemporadasPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/categorias'
                  element={
                    <PrivateRoute>
                      <CategoriasPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/costos-categoria'
                  element={
                    <PrivateRoute>
                      <CostosCategoriaPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/partidos'
                  element={
                    <PrivateRoute>
                      <PartidosPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/calendario-partidos'
                  element={
                    <PrivateRoute>
                      <CalendarioPartidosPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/deudas-jugadores'
                  element={
                    <PrivateRoute>
                      <DeudasJugadoresPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/abonos-jugadores'
                  element={
                    <PrivateRoute>
                      <AbonosJugadoresPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/pagos-jugadores'
                  element={
                    <PrivateRoute>
                      <PagosJugadoresPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/calendario-pagos'
                  element={
                    <PrivateRoute>
                      <CalendarioPagosPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/caja-pagos'
                  element={
                    <PrivateRoute>
                      <CajaPagosPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/historial-deudas-jugadores'
                  element={
                    <PrivateRoute>
                      <DeudasHistorialJugadoresPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/historial-abonos-jugadores'
                  element={
                    <PrivateRoute>
                      <AbonosHistorialJugadoresPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/historial-pagos-jugadores'
                  element={
                    <PrivateRoute>
                      <PagosHistorialJugadoresPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/bancos'
                  element={
                    <PrivateRoute>
                      <BancosPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/movimientos-bancarios'
                  element={
                    <PrivateRoute>
                      <MovimientosBancariosPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/estadocuenta-bancos'
                  element={
                    <PrivateRoute>
                      <EstadoCuentaBancoPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/proveedores'
                  element={
                    <PrivateRoute>
                      <ProveedoresPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/estadocuenta-proveedores'
                  element={
                    <PrivateRoute>
                      <EstadoCuentaProveedorPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/articulos'
                  element={
                    <PrivateRoute>
                      <ArticulosPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/almacen'
                  element={
                    <PrivateRoute>
                      <AlmacenPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/almacen-entradas'
                  element={
                    <PrivateRoute>
                      <AlmacenEntradasPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/almacen-salidas'
                  element={
                    <PrivateRoute>
                      <AlmacenSalidasPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/conceptos'
                  element={
                    <PrivateRoute>
                      <ConceptosPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/ordenes-compra'
                  element={
                    <PrivateRoute>
                      <OrdenesComprasPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/compras'
                  element={
                    <PrivateRoute>
                      <ComprasPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/gastos'
                  element={
                    <PrivateRoute>
                      <GastosPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/usuarios'
                  element={
                    <PrivateRoute>
                      <UsuariosPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/roles'
                  element={
                    <PrivateRoute>
                      <RolesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/modulos'
                  element={
                    <PrivateRoute>
                      <ModulosPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/logs'
                  element={
                    <PrivateRoute>
                      <LogsPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/generador-reportes'
                  element={
                    <PrivateRoute>
                      <ReportesPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/descargar-app'
                  element={
                    <PrivateRoute>
                      <PWATutorialPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/perfil'
                  element={
                    <PrivateRoute>
                      <PerfilPage />
                    </PrivateRoute>
                  }
                />
                <Route path='/login' element={<Navigate to='/' />} />
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      )}
    </Suspense>
  )
}
