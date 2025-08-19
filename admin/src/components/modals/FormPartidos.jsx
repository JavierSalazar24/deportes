import { formOptions } from '../../forms/formPartidosOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'
import { FotoCard } from '../FotoCard'

export const FormPartidos = ({
  view,
  document,
  formData,
  handleInputChange,
  handleFileChange,
  loadOptionsCategorias
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      <div className='sm:col-span-6 md:col-span-2'>
        <AlertaCard text='Categoría que jugará el partido' />
      </div>
      <InputField
        type='async'
        label='Selecciona la categoría'
        name='categoria_id'
        required={true}
        value={formData.categoria_id || ''}
        onChange={handleInputChange}
        loadOptions={loadOptionsCategorias}
        disabled={view}
        classInput='md:col-span-2'
      />

      <FotoCard
        handleFileChange={handleFileChange}
        view={view}
        formData={formData}
        document={document}
        title='Foto del equipo rival'
      />

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
