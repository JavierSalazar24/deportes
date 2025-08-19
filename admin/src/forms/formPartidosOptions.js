export const formOptions = {
  generalFields: [
    { required: true, type: 'text', label: 'Equipo rival *', name: 'rival' },
    {
      required: true,
      type: 'textarea',
      label: 'Lugar del partido *',
      name: 'lugar'
    },
    {
      required: true,
      type: 'datetime-local',
      label: 'Fecha y hora del partido *',
      name: 'fecha_hora'
    }
  ]
}
