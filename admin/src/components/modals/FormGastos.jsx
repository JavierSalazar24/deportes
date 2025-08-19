import { formOptions } from '../../forms/formGastosOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'

export const FormGastos = ({
  view,
  add,
  formData,
  handleInputChange,
  loadOptionsBancos,
  loadOptionsConcepto
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      <div className='sm:col-span-6 md:col-span-2'>
        <AlertaCard text='Datos de gastos' />
      </div>

      {formOptions.generalFields.map(
        ({ type, label, name, required, step, opcSelect, condition }) =>
          (!condition || condition(formData.metodo_pago)) && (
            <InputField
              key={name}
              type={type}
              label={label}
              name={name}
              step={step}
              required={required}
              value={formData[name] || ''}
              opcSelect={opcSelect}
              loadOptions={
                name === 'banco_id' ? loadOptionsBancos : loadOptionsConcepto
              }
              onChange={handleInputChange}
              disabled={
                ([
                  'banco_id',
                  'subtotal',
                  'descuento_monto',
                  'impuesto'
                ].includes(name) &&
                  !add) ||
                name === 'total'
                  ? true
                  : view
              }
              classInput='md:col-span-1'
            />
          )
      )}
    </div>
  )
}
