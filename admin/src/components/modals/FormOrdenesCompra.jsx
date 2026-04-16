import { formOptions } from '../../forms/formOrdenesCompra'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'

export const FormOrdenesCompra = ({
  view,
  formData,
  edit,
  handleInputChange,
  loadOptionsBancos,
  loadOptionsArticulos,
  loadOptionsProveedores
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {edit && (
        <>
          <div className='sm:col-span-6 md:col-span-2'>
            <AlertaCard text='Estatus de la orden de pago' />
          </div>
          <InputField
            type='select'
            label='Estatus *'
            name='estatus'
            required={true}
            value={formData.estatus || ''}
            opcSelect={formOptions.opcSelect}
            onChange={handleInputChange}
            disabled={
              formData.estatus === 'Pagada' || formData.estatus === 'Cancelada'
                ? true
                : view
            }
            classInput='md:col-span-2'
          />

          {formData.estatus === 'Pagada' &&
            formOptions.metodoField.map(
              ({ type, label, name, required, opcSelect, condition }) =>
                (!condition || condition(formData.metodo_pago)) && (
                  <InputField
                    key={name}
                    type={type}
                    label={label}
                    name={name}
                    required={required}
                    value={formData[name] || ''}
                    opcSelect={opcSelect}
                    onChange={handleInputChange}
                    disabled={view}
                    classInput='md:col-span-2'
                  />
                )
            )}
        </>
      )}

      <div className='sm:col-span-6 md:col-span-2'>
        <AlertaCard text='Información de la orden de compra' />
      </div>
      {formOptions.generalFields.map(
        ({ type, label, name, required, step }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            step={step}
            required={required}
            value={formData[name] || ''}
            loadOptions={
              name === 'proveedor_id'
                ? loadOptionsProveedores
                : name === 'banco_id'
                ? loadOptionsBancos
                : loadOptionsArticulos
            }
            onChange={handleInputChange}
            disabled={
              ['precio_articulo', 'total', 'subtotal'].includes(name) ||
              formData.estatus === 'Pagada' ||
              formData.estatus === 'Cancelada'
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
