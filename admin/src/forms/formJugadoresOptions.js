export const formOptions = {
  personalFields: [
    { required: true, type: 'text', label: 'Nombre *', name: 'nombre' },
    {
      required: true,
      type: 'text',
      label: 'Apellido paterno *',
      name: 'apellido_p'
    },
    {
      required: true,
      type: 'text',
      label: 'Apellido materno *',
      name: 'apellido_m'
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
    },
    {
      required: true,
      type: 'text',
      label: 'Dirección completa *',
      name: 'direccion'
    },
    { required: true, type: 'number', label: 'Celular *', name: 'telefono' },
    {
      required: true,
      type: 'date',
      label: 'Fecha de nacimiento *',
      name: 'fecha_nacimiento'
    },
    { required: true, type: 'text', label: 'CURP *', name: 'curp' },
    {
      required: true,
      type: 'text',
      label: 'Padecimientos *',
      name: 'padecimientos'
    },
    { required: true, type: 'text', label: 'Alergias *', name: 'alergias' },
    {
      required: true,
      type: 'select',
      label: 'Categoría *',
      name: 'categoria_id'
    },
    {
      required: true,
      type: 'async',
      label: 'Padre/Madre/Tutor/Responsable *',
      name: 'usuario_id'
    },
    {
      required: true,
      type: 'number',
      label: 'Celular del tutor *',
      name: 'telefono_tutor'
    },
    {
      required: true,
      type: 'email',
      label: 'Correo del tutor *',
      name: 'correo_tutor'
    }
  ],

  documentFields: [
    {
      required: false,
      type: 'file',
      label: 'CURP del jugador (PDF)',
      name: 'curp_jugador',
      accept: 'application/pdf'
    },
    {
      required: false,
      type: 'file',
      label: 'Acta de nacimiento del jugador (PDF)',
      name: 'acta_nacimiento',
      accept: 'application/pdf'
    },
    {
      required: false,
      type: 'file',
      label: 'INE del responsable (PDF)',
      name: 'ine',
      accept: 'application/pdf'
    },
    {
      required: false,
      type: 'file',
      label: 'Comprobante de domicilio (PDF)',
      name: 'comprobante_domicilio',
      accept: 'application/pdf'
    }
  ]
}
