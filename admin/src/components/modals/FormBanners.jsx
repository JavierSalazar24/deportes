import { formOptions } from '../../forms/formBannersOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'

export const FormBanners = ({
  view,
  formData,
  handleInputChange,
  handleFileChange
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      <div className='sm:col-span-6'>
        <AlertaCard text='El banner debe de ser una imagen en formato JPG, JPEG, PNG. Debe de tener medidas de 400x200 o 600x300 píxeles para que se muestre correctamente.' />
      </div>
      {formOptions.generalFields.map(
        ({ type, label, name, required, accept }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            accept={accept}
            required={required}
            value={formData[name] || ''}
            onChange={type === 'file' ? handleFileChange : handleInputChange}
            disabled={view}
            classInput='md:col-span-2'
          />
        )
      )}
    </div>
  )
}
