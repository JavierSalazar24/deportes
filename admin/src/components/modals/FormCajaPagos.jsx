import { formOptions } from '../../forms/formCajaPagosOptions'
import { InputField } from '../InputField'

export const FormCajaPagos = ({ view, formData, handleInputChange }) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {formOptions.generalFields.map(
        ({ type, label, name, required, step, opcSelect, condition }) =>
          (!condition || condition(formData.metodo_pago)) && (
            <InputField
              key={name}
              type={type}
              label={label}
              name={name}
              required={required}
              value={formData[name] || ''}
              onChange={handleInputChange}
              disabled={view}
              step={step}
              opcSelect={opcSelect}
              classInput='md:col-span-1'
            />
          )
      )}
    </div>
  )
}
