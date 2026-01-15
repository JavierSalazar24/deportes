import { toFloat } from '../utils/numbers'

export const useCalculosTotales = ({ formData, setFormData }) => {
  const aplicarImpuesto = (totalBase, costoExtra, porcentaje) => {
    const monto = toFloat(totalBase) + toFloat(costoExtra)
    const impuesto = toFloat(porcentaje) || 0
    return monto + monto * (impuesto / 100)
  }

  const actualizarTotal = (
    subtotal,
    descuentoPorcentaje = 0,
    costoExtra = 0,
    impuestoPorcentaje = formData?.impuesto
  ) => {
    const descuento = (subtotal * descuentoPorcentaje) / 100
    const baseConDescuento = subtotal - descuento

    setFormData('total_base', baseConDescuento)

    const total = aplicarImpuesto(
      baseConDescuento,
      costoExtra,
      impuestoPorcentaje
    )
    setFormData('total', total.toFixed(2))
  }

  const calcularTotalGastosCompras = ({
    subtotal,
    descuento_monto,
    impuesto
  }) => {
    // Valores a float, por seguridad
    const sub = toFloat(subtotal) || 0
    const desc = toFloat(descuento_monto) || 0
    const imp = toFloat(impuesto) || 0

    // Evita que el descuento sea mayor que el subtotal
    const subMenosDesc = Math.max(0, sub - desc)
    const impuestoCalculado = subMenosDesc * (imp / 100)
    const total = subMenosDesc + impuestoCalculado

    return {
      subtotal: sub,
      descuento_monto: desc,
      impuesto: imp,
      total: total.toFixed(2)
    }
  }

  return {
    actualizarTotal,
    calcularTotalGastosCompras
  }
}
