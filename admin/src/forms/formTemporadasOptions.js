export const formOptions = {
  generalFields: [
    { required: true, type: 'text', label: 'Nombre *', name: 'nombre' },
    {
      required: true,
      type: 'date',
      label: 'Fecha de inicio de la temporada *',
      name: 'fecha_inicio'
    },
    {
      required: true,
      type: 'date',
      label: 'Fecha de fin de la temporada *',
      name: 'fecha_fin'
    }
  ]
}
