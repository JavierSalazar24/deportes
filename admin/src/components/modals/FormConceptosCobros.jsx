import { formOptions } from '../../forms/formConceptosCobrosOptions'
import { InputField } from '../InputField'

export const FormConceptosCobros = ({ view, formData, handleInputChange }) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {formOptions.generalFields.map(
        ({ type, label, name, required, opcSelect }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            required={required}
            value={formData[name] || ''}
            onChange={handleInputChange}
            disabled={view}
            opcSelect={opcSelect}
            classInput='md:col-span-1'
          />
        )
      )}
    </div>
  )
}
