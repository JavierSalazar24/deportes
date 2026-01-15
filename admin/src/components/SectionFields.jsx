import { AlertaCard } from './AlertaCard'
import { InputField } from './InputField'

export function SectionFields({
  title,
  fields,
  formData,
  handleInputChange,
  view,
  disableLogic
}) {
  if (!fields?.length) return null
  return (
    <>
      {title && (
        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text={title} />
        </div>
      )}
      {fields.map(
        ({
          type,
          label,
          name,
          required,
          opcSelect,
          step,
          loadOptions,
          classInput,
          ...rest
        }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            required={required}
            opcSelect={opcSelect}
            step={step}
            loadOptions={loadOptions}
            value={formData[name] || ''}
            onChange={handleInputChange}
            disabled={
              typeof disableLogic === 'function' ? disableLogic(name) : view
            }
            classInput={classInput}
            {...rest}
          />
        )
      )}
    </>
  )
}
