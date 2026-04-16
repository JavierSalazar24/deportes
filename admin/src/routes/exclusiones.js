export const EXCLUDE_GENERAL = [
  '/logs',
  '/pagos-jugadores',
  '/modulos',
  '/caja-pagos'
]

export const EXCLUDE_EDIT = [
  '/movimientos-bancarios',
  '/historial-deudas-jugadores',
  '/historial-abonos-jugadores',
  '/historial-pagos-jugadores'
]

export const EXCLUDE_DELETE = [
  '/almacen-salidas',
  '/almacen-entradas',
  '/movimientos-bancarios',
  '/deudas-jugadores'
]

export const EXCLUDE_CREATE = [
  '/compras',
  '/almacen',
  ...EXCLUDE_GENERAL,
  ...EXCLUDE_EDIT,
  '/movimientos-bancarios'
]
