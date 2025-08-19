import { formOptions } from '../../forms/formTemporadasOptions'
import { InputField } from '../InputField'

export const FormTemporadas = ({ view, edit, formData, handleInputChange }) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {(view || edit) && (
        <InputField
          type='select'
          label='Estatus *'
          name='estatus'
          required={true}
          value={formData.estatus || ''}
          onChange={handleInputChange}
          disabled={view}
          opcSelect={[
            { label: 'Selecciona una opción', value: '' },
            { label: 'Activa', value: 'Activa' },
            { label: 'Finalizada', value: 'Finalizada' }
          ]}
          classInput='md:col-span-2'
        />
      )}

      {formOptions.generalFields.map(({ type, label, name, required }) => (
        <InputField
          key={name}
          type={type}
          label={label}
          name={name}
          required={required}
          value={formData[name] || ''}
          onChange={handleInputChange}
          disabled={view}
          classInput='md:col-span-2'
        />
      ))}
    </div>
  )
}
