export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'text',
      label: 'Nombre del concepto *',
      name: 'nombre'
    },
    {
      required: false,
      type: 'select',
      label: 'Periodo *',
      name: 'periodicidad',
      opcSelect: [
        { label: 'Selecciona una opción', value: '' },
        { label: 'Diario', value: 'Diario' },
        { label: 'Semanal', value: 'Semanal' },
        { label: 'Quincenal', value: 'Quincenal' },
        { label: 'Mensual', value: 'Mensual' },
        { label: 'Bimestral', value: 'Bimestral' },
        { label: 'Trimestral', value: 'Trimestral' },
        { label: 'Cuatrimestral', value: 'Cuatrimestral' },
        { label: 'Semestral', value: 'Semestral' },
        { label: 'Anual', value: 'Anual' },
        { label: 'Duración de la temporada', value: 'Temporada' }
      ]
    }
  ]
}
