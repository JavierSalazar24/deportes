import { ordenCompraForm } from './ordenCompraForm'
import { gastosForm } from './gastosForm'
import { almacenForm } from './almacenForm'
import { jugadoresForm } from './jugadoresForm'
import { deudasJugadoresForm } from './deudasJugadoresForm'
import { pagosJugadoresForm } from './pagosJugadoresForm'

// Puedes agregar aquí todos tus formularios por módulo
const FORM_HANDLERS = {
  '/ordenes-compra': ordenCompraForm,
  '/gastos': gastosForm,
  '/almacen-entradas': almacenForm,
  '/almacen-salidas': almacenForm,
  '/jugadores': jugadoresForm,
  '/deudas-jugadores': deudasJugadoresForm,
  '/pagos-jugadores': pagosJugadoresForm
}

export async function dispatchFormLogic(pathname, props) {
  const fn = FORM_HANDLERS[pathname]
  if (fn) return await fn(props)
  return null
}
