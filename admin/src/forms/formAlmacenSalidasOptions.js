export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'async',
      label: 'Selecciona el artículo *',
      name: 'articulo_id'
    },
    {
      required: true,
      type: 'text',
      label: 'Número de serie o de uniforme *',
      name: 'numero_serie'
    },
    {
      required: true,
      type: 'date',
      label: 'Fecha de salida *',
      name: 'fecha_salida'
    },
    {
      required: false,
      type: 'select',
      label: 'Mótivo de salida *',
      name: 'motivo_salida',
      opcSelect: [
        { label: 'Selecciona una opción', value: '' },
        { label: 'Asignado', value: 'Asignado' },
        { label: 'Devolución a proveedor', value: 'Devolución a proveedor' },
        { label: 'Venta', value: 'Venta' },
        { label: 'Destrucción', value: 'Destrucción' },
        { label: 'Mantenimiento', value: 'Mantenimiento' },
        { label: 'Robo', value: 'Robo' },
        { label: 'Pérdida', value: 'Pérdida' },
        { label: 'Otro', value: 'Otro' }
      ]
    }
  ]
}
