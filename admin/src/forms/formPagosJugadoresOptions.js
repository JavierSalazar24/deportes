export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'text',
      label: 'Banco *',
      name: 'banco'
    },
    {
      required: true,
      type: 'text',
      label: 'Jugador *',
      name: 'nombre_jugador'
    },
    {
      required: true,
      type: 'text',
      label: 'Concepto de la deuda *',
      name: 'concepto'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Monto pagado *',
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
      type: 'date',
      label: 'Fecha de pago *',
      name: 'fecha_pagado'
    }
  ]
}
