import { toFloat, toInt } from '../utils/numbers'

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

  const calcularJugadoresTotal = (dia, noche) =>
    (toInt(dia) || 0) + (toInt(noche) || 0)

  const calcularPrecioJugadoresDiaTotal = (precio, cantidad) =>
    (toFloat(precio) || 0) * (toInt(cantidad) || 0)

  const calcularSubtotalJugadores = ({
    totalDia,
    totalNoche,
    precioJefe,
    precioSupervisor
  }) =>
    (toFloat(totalDia) || 0) +
    (toFloat(totalNoche) || 0) +
    (toFloat(precioJefe) || 0) +
    (toFloat(precioSupervisor) || 0)

  const recalcularTotales = ({
    precioDia = formData.precio_jugadores_dia,
    precioNoche = formData.precio_jugadores_noche,
    jugadoresDia = formData.jugadores_dia,
    jugadoresNoche = formData.jugadores_noche,
    precioJefe = formData.precio_jefe_turno,
    precioSupervisor = formData.precio_supervisor,
    descuentoPor = formData.descuento_porcentaje,
    costoExtra = formData.costo_extra,
    precioTotalServicios = formData.precio_total_servicios
  } = {}) => {
    const totalDia = calcularPrecioJugadoresDiaTotal(precioDia, jugadoresDia)
    const totalNoche = calcularPrecioJugadoresDiaTotal(
      precioNoche,
      jugadoresNoche
    )

    setFormData('precio_jugadores_dia_total', totalDia)
    setFormData('precio_jugadores_noche_total', totalNoche)

    const subtotalJugadores = calcularSubtotalJugadores({
      totalDia,
      totalNoche,
      precioJefe,
      precioSupervisor
    })

    const subtotal = subtotalJugadores + toFloat(precioTotalServicios)

    setFormData('subtotal', subtotal)
    actualizarTotal(subtotal, descuentoPor, costoExtra)
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
    recalcularTotales,
    calcularJugadoresTotal,
    actualizarTotal,
    calcularTotalGastosCompras
  }
}
