import { handleSubtotalDescuentoImpuesto } from '../../utils/formTotales'

export const gastosForm = ({
  name,
  calcularTotalGastosCompras,
  value,
  formData,
  setFormData
}) => {
  handleSubtotalDescuentoImpuesto({
    name,
    value,
    formData,
    setFormData,
    calcularTotalGastosCompras
  })
}
