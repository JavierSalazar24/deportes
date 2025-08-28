export const formOptions = {
  generalFields: [
    { required: true, type: 'text', label: 'Nombre *', name: 'nombre' },
    {
      required: true,
      type: 'file',
      label: 'Foto *',
      name: 'foto',
      accept: 'image/*'
    }
  ]
}
