import { AlertCircle } from 'lucide-react'
import { formOptions } from '../../forms/formModulosOptions'
import { InputField } from '../InputField'

export const FormModulos = ({ view, formData, handleInputChange }) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      <div className='sm:col-span-6 md:col-span-2'>
        <div className='bg-[#3674B5] font-semibold p-3 rounded-md text-white flex gap-1 items-center'>
          <AlertCircle />
          <h3>
            Agrega la ruta, es decir, si la ruta es:{' '}
            <i>https://admin.ejemplo.com/calendario-partidos</i>, el nombre de
            la ruta sería: <i>calendario-partidos</i>
          </h3>
        </div>
      </div>

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
