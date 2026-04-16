export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'text',
      label: 'Nombre del artículo *',
      name: 'nombre'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Precio de compra *',
      name: 'precio_compra'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Precio de venta *',
      name: 'precio_venta'
    },
    {
      required: true,
      type: 'number',
      step: '0.01',
      label: 'Precio de reposición *',
      name: 'precio_reposicion'
    },
    {
      required: true,
      type: 'select',
      label: '¿Artículo para asignación de equipo? *',
      name: 'articulo_equipar',
      opcSelect: [
        { label: 'Selecciona una opción', value: '' },
        { label: 'SI', value: 'SI' },
        { label: 'NO', value: 'NO' }
      ]
    }
  ]
}
