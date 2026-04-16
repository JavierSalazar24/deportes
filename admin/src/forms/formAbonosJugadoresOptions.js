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
      label: 'Selecciona la deuda a abonar *',
      name: 'deuda_jugador_id'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Monto del abono *',
      name: 'monto'
    },
    {
      required: true,
      type: 'date',
      label: 'Fecha del abono *',
      name: 'fecha'
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
      required: false,
      type: 'textarea',
      label: 'Observaciones',
      name: 'observaciones'
    }
  ]
}
