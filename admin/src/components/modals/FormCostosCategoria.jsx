import { formOptions } from '../../forms/formCostosCategoriasOptions'
import { InputField } from '../InputField'

export const FormCostosCategoria = ({
  view,
  formData,
  handleInputChange,
  loadOptionsCategorias,
  loadOptionsConceptoCobros,
  edit
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {formOptions.generalFields.map(
        ({ type, label, name, required, step }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            required={required}
            value={formData[name] || ''}
            onChange={handleInputChange}
            disabled={
              ['categoria_id', 'concepto_cobro_id'].includes(name) && edit
                ? true
                : view
            }
            step={step}
            loadOptions={
              name === 'categoria_id'
                ? loadOptionsCategorias
                : loadOptionsConceptoCobros
            }
            classInput='md:col-span-2'
          />
        )
      )}
    </div>
  )
}
