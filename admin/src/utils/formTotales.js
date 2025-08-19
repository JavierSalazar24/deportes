export function handleSubtotalDescuentoImpuesto({
  name,
  value,
  formData,
  setFormData,
  calcularTotalGastosCompras
}) {
  if (['subtotal', 'descuento_monto', 'impuesto'].includes(name)) {
    const newSubtotal = name === 'subtotal' ? value : formData.subtotal
    const newDescuento =
      name === 'descuento_monto' ? value : formData.descuento_monto
    const newImpuesto = name === 'impuesto' ? value : formData.impuesto

    const resultado = calcularTotalGastosCompras({
      subtotal: newSubtotal,
      descuento_monto: newDescuento,
      impuesto: newImpuesto
    })

    setFormData('total', resultado.total)
  }
}
