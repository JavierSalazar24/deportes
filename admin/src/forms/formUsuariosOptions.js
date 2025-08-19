export const formOptions = {
  generalFields: [
    {
      required: false,
      type: 'file',
      label: 'Foto',
      name: 'foto',
      accept: 'image/*'
    },
    {
      required: true,
      type: 'text',
      label: 'Nombre *',
      name: 'nombre_completo'
    },
    { required: true, type: 'async', label: 'Rol *', name: 'rol_id' },
    { required: true, type: 'number', label: 'Teléfono *', name: 'telefono' },
    { required: true, type: 'email', label: 'Correo *', name: 'email' }
  ]
}
