export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'async',
      label: 'Jugador *',
      name: 'jugador_id'
    },
    {
      required: true,
      type: 'text',
      label: 'Categoría *',
      name: 'categoria'
    },
    {
      required: true,
      type: 'select',
      label: 'Concepto de cobro *',
      name: 'costo_categoria_id'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Costo *',
      name: 'monto_base'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Costo extra ($) *',
      name: 'extra'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Descuento (%) *',
      name: 'descuento'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Monto final ($) *',
      name: 'monto_final'
    },
    {
      required: true,
      type: 'date',
      label: 'Fecha de pago *',
      name: 'fecha_pago'
    }
  ],

  estatusFields: [
    {
      required: false,
      type: 'select',
      label: 'Estatus *',
      name: 'estatus',
      opcSelect: [
        { label: 'Selecciona una opción', value: '' },
        { label: 'Pendiente', value: 'Pendiente' },
        { label: 'Pagado', value: 'Pagado' },
        { label: 'Parcial', value: 'Parcial' },
        { label: 'Cancelado', value: 'Cancelado' }
      ]
    },
    {
      required: false,
      type: 'textarea',
      label: 'Notas',
      name: 'notas',
      condition: (estatus) =>
        estatus === 'Cancelado' || estatus === 'Parcial' || estatus === 'Pagado'
    }
  ],

  pagadoFiels: [
    {
      required: true,
      type: 'async',
      label: 'Selecciona el banco *',
      name: 'banco_id'
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
      label: 'Fecha en que se pagó *',
      name: 'fecha_pagado'
    }
  ]
}
