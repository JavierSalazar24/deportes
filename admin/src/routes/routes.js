import {
  Archive,
  BarChart3,
  Landmark,
  ShieldUser,
  UsersRound,
  ArrowRightLeft,
  Settings,
  FileText,
  MonitorSmartphone,
  Volleyball,
  NotepadTextDashed,
  CreditCard,
  FolderClock
} from 'lucide-react'

export const routes = [
  { path: '/', label: 'Dashboard', Icon: BarChart3 },
  { path: '/jugadores', label: 'Jugadores', Icon: Volleyball },
  { path: '/equipo', label: 'Utilería', Icon: ShieldUser },
  {
    label: 'Gestión deportiva',
    Icon: NotepadTextDashed,
    children: [
      { path: '/conceptos-cobros', label: 'Tipos de cobros' },
      { path: '/temporadas', label: 'Temporadas' },
      { path: '/categorias', label: 'Categorías' },
      { path: '/costos-categoria', label: 'Costos categoria' },
      { path: '/partidos', label: 'Partidos' },
      { path: '/calendario-partidos', label: 'Calendario' }
    ]
  },
  {
    label: 'Gestión de pagos',
    Icon: CreditCard,
    children: [
      { path: '/deudas-jugadores', label: 'Deudas jugadores' },
      { path: '/abonos-jugadores', label: 'Abonos jugadores' },
      { path: '/pagos-jugadores', label: 'Pagos jugadores' },
      { path: '/calendario-pagos', label: 'Calendario pagos' },
      { path: '/caja-pagos', label: 'Caja' }
    ]
  },
  {
    label: 'Historial de pagos',
    Icon: FolderClock,
    children: [
      { path: '/historial-deudas-jugadores', label: 'Historial de deudas' },
      { path: '/historial-abonos-jugadores', label: 'Historial de abonos' },
      { path: '/historial-pagos-jugadores', label: 'Historial de pagos' }
    ]
  },
  {
    label: 'Finanzas',
    Icon: Landmark,
    children: [
      { path: '/bancos', label: 'Bancos' },
      { path: '/movimientos-bancarios', label: 'Movimientos' },
      { path: '/estadocuenta-bancos', label: 'Estado de cuenta' }
    ]
  },
  {
    label: 'Proveedores',
    Icon: UsersRound,
    children: [
      { path: '/proveedores', label: 'Proveedores' },
      { label: 'Estado de cuenta', path: '/estadocuenta-proveedores' }
    ]
  },
  {
    label: 'Inventario',
    Icon: Archive,
    children: [
      { path: '/articulos', label: 'Artículos' },
      { path: '/almacen', label: 'Almacen' },
      { path: '/almacen-entradas', label: 'Entradas' },
      { path: '/almacen-salidas', label: 'Salidas' }
    ]
  },
  {
    label: 'Operaciones',
    Icon: ArrowRightLeft,
    children: [
      { path: '/conceptos', label: 'Tipos de concepto' },
      { path: '/ordenes-compra', label: 'Ordenes de compra' },
      { path: '/compras', label: 'Compras' },
      { path: '/gastos', label: 'Gastos' }
    ]
  },
  {
    label: 'Configuración',
    Icon: Settings,
    children: [
      { path: '/usuarios', label: 'Usuarios' },
      { path: '/roles', label: 'Roles' },
      // { path: '/modulos', label: 'Módulos' },
      { path: '/logs', label: 'Logs' }
    ]
  },
  { path: '/generador-reportes', label: 'Reportes', Icon: FileText },
  { path: '/descargar-app', label: 'Descargar App', Icon: MonitorSmartphone }
]
