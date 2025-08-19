export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'async',
      label: 'Selecciona la categoría *',
      name: 'categoria_id'
    },
    {
      required: true,
      type: 'async',
      label: 'Selecciona el cocepto del cobro *',
      name: 'concepto_cobro_id'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Costo *',
      name: 'monto_base'
    }
  ]
}
