import { getArticuloById } from '../../api/articulos'
import { toFloat } from '../../utils/numbers'

export const almacenForm = async ({ name, setFormData, value, pathname }) => {
  if (name === 'articulo_id') {
    if (pathname === '/almacen-salidas') {
      setFormData('numero_serie', value.numero_serie)
    } else {
      const data = await getArticuloById(value.value)
      const precio = toFloat(data.precio_compra) || 0
      setFormData('precio_articulo', precio)
    }
  }
}
