export const formOptions = {
  generalFields: [
    { required: true, type: 'text', label: 'Nombre *', name: 'nombre' },
    {
      required: true,
      type: 'file',
      label: 'Documento (PDF) *',
      name: 'documento',
      accept: 'application/pdf'
    }
  ]
}
