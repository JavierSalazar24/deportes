export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'async',
      label: 'Selecciona el banco *',
      name: 'banco_id'
    },
    {
      required: true,
      type: 'select',
      label: 'Tipo de movimiento *',
      name: 'tipo_movimiento',
      opcSelect: [
        { label: 'Selecciona una opción', value: '' },
        { label: 'Ingreso', value: 'Ingreso' },
        { label: 'Egreso', value: 'Egreso' }
      ]
    },
    { required: true, type: 'text', label: 'Concepo *', name: 'concepto' },
    {
      required: true,
      type: 'date',
      label: 'Fecha del movimiento *',
      name: 'fecha'
    },
    {
      required: false,
      type: 'text',
      label: 'Referencia',
      name: 'referencia'
    },
    {
      required: true,
      type: 'number',
      label: 'Monto *',
      step: '0.01',
      name: 'monto'
    },
    {
      required: true,
      type: 'select',
      label: 'Método de pago *',
      name: 'metodo_pago',
      opcSelect: [
        { label: 'Selecciona una opción', value: '' },
        { label: 'Transferencia bancaria', value: 'Transferencia bancaria' },
        {
          label: 'Tarjeta de crédito/débito',
          value: 'Tarjeta de crédito/débito'
        },
        { label: 'Efectivo', value: 'Efectivo' },
        { label: 'Cheques', value: 'Cheques' }
      ]
    }
  ]
}
