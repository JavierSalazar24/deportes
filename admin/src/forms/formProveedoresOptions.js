export const formOptions = {
  personalFields: [
    {
      required: true,
      type: 'text',
      label: 'Nombre *',
      name: 'nombre_contacto'
    },
    {
      required: true,
      type: 'text',
      label: 'Teléfono *',
      name: 'telefono_contacto'
    },
    {
      required: true,
      type: 'email',
      label: 'Correo *',
      name: 'correo_contacto'
    }
  ],

  empresaFields: [
    {
      required: true,
      type: 'text',
      label: 'Nombre de la empresa *',
      name: 'nombre_empresa'
    },
    { required: true, type: 'text', label: 'Calle *', name: 'calle' },
    {
      required: true,
      type: 'text',
      label: 'Número *',
      name: 'numero'
    },
    { required: true, type: 'text', label: 'Colonia *', name: 'colonia' },
    {
      required: true,
      type: 'number',
      label: 'Código postal *',
      name: 'cp'
    },
    { required: true, type: 'select', label: 'Estado *', name: 'estado' },
    { required: true, type: 'select', label: 'Municipio *', name: 'municipio' },
    { required: true, type: 'text', label: 'País *', name: 'pais' },
    {
      required: true,
      type: 'text',
      label: 'Teléfono empresa *',
      name: 'telefono_empresa'
    },
    {
      required: false,
      type: 'text',
      label: 'Extensión',
      name: 'extension_empresa'
    },
    {
      required: true,
      type: 'number',
      label: 'Días de crédito *',
      name: 'credito_dias'
    }
  ],

  rfcFields: [
    {
      required: true,
      type: 'text',
      label: 'RFC *',
      name: 'rfc'
    },
    {
      required: true,
      type: 'text',
      label: 'Razón social *',
      name: 'razon_social'
    },
    {
      required: true,
      type: 'text',
      label: 'Uso de CFDI *',
      name: 'uso_cfdi'
    },
    {
      required: true,
      type: 'text',
      label: 'Regimen fiscal *',
      name: 'regimen_fiscal'
    }
  ]
}
