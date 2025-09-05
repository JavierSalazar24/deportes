import { formOptions } from '../../forms/formBancosOptions'
import { InputField } from '../InputField'

export const FormBancos = ({ view, edit, formData, handleInputChange }) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {(view || edit) && (
        <InputField
          type='number'
          label='Saldo inicial'
          name='saldo_inicial'
          required={true}
          value={formData.saldo_inicial || ''}
          onChange={handleInputChange}
          disabled={view}
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
