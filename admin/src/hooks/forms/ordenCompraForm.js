import { getArticuloById } from '../../api/articulos'
import { handleSubtotalDescuentoImpuesto } from '../../utils/formTotales'
import { toFloat, toInt } from '../../utils/numbers'

export const ordenCompraForm = async ({
  name,
  setFormData,
  value,
  formData,
  actualizarTotal,
  calcularTotalGastosCompras
}) => {
  if (name === 'articulo_id') {
    const data = await getArticuloById(value.value)
    const precio = toFloat(data.precio_compra) || 0
    setFormData('precio_articulo', precio)
  }

  if (name === 'cantidad_articulo') {
    const precio = formData?.precio_articulo || 0
    const cantidad = toInt(value) || 0
    const subtotal = precio * cantidad

    setFormData('subtotal', subtotal)
    actualizarTotal(subtotal, 0, 0)
  }

  handleSubtotalDescuentoImpuesto({
    name,
    value,
    formData,
    setFormData,
    calcularTotalGastosCompras
  })
}
