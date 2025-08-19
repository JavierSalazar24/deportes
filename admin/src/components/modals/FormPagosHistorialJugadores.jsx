import { formOptions } from '../../forms/formPagosJugadoresOptions'
import { InputField } from '../InputField'

export const FormPagosHistorialJugadores = ({
  view,
  formData,
  handleInputChange,
  loadOptionsBancos,
  loadOptionsDeudasJugadores
}) => {
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
              loadOptions={
                name === 'banco_id'
                  ? loadOptionsBancos
                  : loadOptionsDeudasJugadores
              }
              classInput='md:col-span-1'
            />
          )
      )}
    </div>
  )
}
