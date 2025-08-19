export const formOptions = {
  generalFields: [
    {
      required: true,
      type: 'number',
      label: 'ID del módulo que cambió',
      name: 'modulo_id'
    },
    {
      required: true,
      type: 'text',
      label: 'Módulo en el que se hizo el cambió',
      name: 'modulo'
    },
    { required: true, type: 'text', label: 'Acción realizada', name: 'accion' },
    {
      required: true,
      type: 'text',
      label: 'Usuario que hizo el cambió',
      name: 'nombre_usuario'
    },
    {
      required: true,
      type: 'text',
      label: 'IP de quien hizo el cambió',
      name: 'ip'
    },
    {
      required: true,
      type: 'datetime-local',
      label: 'Fecha del cambió',
      name: 'fecha'
    }
  ],

  datosFields: [
    {
      required: true,
      type: 'textarea',
      label: 'Datos anteriores (si es nuevo registro se mostrará vacío)',
      name: 'datos_anteriores'
    },
    {
      required: true,
      type: 'textarea',
      label: 'Datos nuevos',
      name: 'datos_nuevos'
    }
  ]
}
