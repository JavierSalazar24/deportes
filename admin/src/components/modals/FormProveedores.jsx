import { formOptions } from '../../forms/formProveedoresOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'

export const FormProveedores = ({
  view,
  formData,
  handleInputChange,
  opcionesEstados,
  municipios
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      <div className='sm:col-span-6 md:col-span-2'>
        <AlertaCard text='Datos del contacto' />
      </div>

      {formOptions.personalFields.map(({ type, label, name, required }) => (
        <InputField
          key={name}
          type={type}
          label={label}
          name={name}
          required={required}
          value={formData[name] || ''}
          onChange={handleInputChange}
          disabled={view}
          classInput='md:col-span-1'
        />
      ))}

      <div className='sm:col-span-6 md:col-span-2'>
        <AlertaCard text='Datos de la empresa' />
      </div>
      {formOptions.empresaFields.map(({ type, label, name, required }) => (
        <InputField
          key={name}
          type={type}
          label={label}
          name={name}
          required={required}
          value={formData[name] || ''}
          onChange={(e) => {
            handleInputChange(e)
            if (name === 'estado') {
              handleInputChange({
                target: { name: 'municipio', value: '' }
              })
            }
          }}
          disabled={
            name === 'municipio'
              ? municipios.length === 0
                ? true
                : view
              : view
          }
          opcSelect={
            name === 'estado'
              ? opcionesEstados
              : [{ value: '', label: 'Selecciona un municipio' }, ...municipios]
          }
          classInput='md:col-span-1'
        />
      ))}

      <div className='sm:col-span-6 md:col-span-2'>
        <AlertaCard text='Datos fiscales' />
      </div>

      {formOptions.rfcFields.map(({ type, label, name, required }) => (
        <InputField
          key={name}
          type={type}
          label={label}
          name={name}
          required={type === 'file' ? false : required}
          value={formData[name] || ''}
          onChange={handleInputChange}
          disabled={view}
          classInput='md:col-span-1'
        />
      ))}
    </div>
  )
}
