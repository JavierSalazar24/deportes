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
      type: 'async',
      label: 'Concepto *',
      name: 'concepto_id'
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
    },
    {
      required: false,
      type: 'text',
      label: 'Referencia',
      name: 'referencia',
      condition: (metodo) =>
        metodo === 'Transferencia bancaria' ||
        metodo === 'Tarjeta de crédito/débito'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Subtotal *',
      name: 'subtotal'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Descuento ($) *',
      name: 'descuento_monto'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Porcentaje de impuestos (si no aplica introducir 0) *',
      name: 'impuesto'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Total *',
      name: 'total'
    }
  ]
}
