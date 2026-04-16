import { toast } from 'sonner'
import { getCategoriaJugadorCosto } from '../../api/costos-categoria'
import { toFloat } from '../../utils/numbers'

export const deudasJugadoresForm = async ({
  name,
  setFormData,
  value,
  formData,
  setCostosConcepto,
  costosConcepto
}) => {
  if (name === 'jugador_id') {
    setFormData('categoria', value.categoria)

    const data = await getCategoriaJugadorCosto(value.categoria_id)

    if (data?.length > 0) {
      toast.success(
        'El jugador está registrado en una temporada activa, puede elegir el concepto de cobro'
      )

      const categorias = data.map((costo) => ({
        label: costo.concepto_cobro.nombre,
        value: costo.id,
        categoria: costo.categoria.nombre,
        monto: costo.monto_base
      }))

      setCostosConcepto([
        { label: 'Selecciona una opción', value: '' },
        ...categorias
      ])
    } else {
      toast.warning('El jugador no está registrado en una temporada activa')
    }
  }

  if (name === 'costo_categoria_id') {
    const costoCategoria = costosConcepto.find(
      (v) => parseInt(v.value) === parseInt(value)
    )

    setFormData('monto_base', costoCategoria.monto)
  }
  if (['extra', 'descuento'].includes(name)) {
    const base = toFloat(formData.monto_base || 0)
    const extra =
      name === 'extra' ? toFloat(value) : toFloat(formData.extra || 0)
    const descuento =
      name === 'descuento' ? toFloat(value) : toFloat(formData.descuento || 0)
    const submonto = base + extra
    const descMonto = submonto * (descuento / 100)
    const montoFinal = submonto - descMonto
    setFormData('monto_final', montoFinal)
  }
}
