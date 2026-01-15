export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'async',
      label: 'Selecciona la temporada *',
      name: 'temporada_id'
    },
    { required: true, type: 'text', label: 'Nombre *', name: 'nombre' },
    {
      required: true,
      type: 'date',
      label: 'Nacimiento desde *',
      name: 'fecha_inicio'
    },
    {
      required: true,
      type: 'date',
      label: 'Nacimiento hasta *',
      name: 'fecha_fin'
    },
    {
      required: true,
      type: 'select',
      label: 'Género *',
      name: 'genero',
      opcSelect: [
        { label: 'Selecciona una opción', value: '' },
        { label: 'Hombre', value: 'Hombre' },
        { label: 'Mujer', value: 'Mujer' }
      ]
    }
  ]
}
