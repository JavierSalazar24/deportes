export const formOptions = {
  generalFields: [
    { required: true, type: 'text', label: 'Nombre *', name: 'nombre' },
    { required: true, type: 'text', label: 'No. Cuenta *', name: 'cuenta' },
    { required: true, type: 'text', label: 'CLABE *', name: 'clabe' },
    {
      required: true,
      type: 'number',
      label: 'Saldo actual *',
      name: 'saldo_inicial'
    }
  ]
}
