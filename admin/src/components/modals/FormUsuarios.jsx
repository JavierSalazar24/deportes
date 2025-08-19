import { formOptions } from '../../forms/formUsuariosOptions'
import { InputField } from '../InputField'

export const FormUsuarios = ({
  view,
  add,
  edit,
  formData,
  handleInputChange,
  handleFileChange,
  loadOptionsRoles,
  handleCheckboxChange
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {formOptions.generalFields.map(
        ({ type, label, name, required, accept }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            required={required}
            value={formData[name] || ''}
            onChange={name === 'foto' ? handleFileChange : handleInputChange}
            accept={accept}
            disabled={
              formData.supervisor && ['nombre_completo', 'email'].includes(name)
                ? true
                : view
            }
            loadOptions={loadOptionsRoles}
            classInput='md:col-span-2'
          />
        )
      )}

      {add && (
        <InputField
          type='password'
          label='Contraseña *'
          name='password'
          required={true}
          value={formData.password || ''}
          onChange={handleInputChange}
          disabled={formData.supervisor ? true : view}
          classInput='md:col-span-2'
        />
      )}

      {edit && (
        <>
          <label className='inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              name='cambiar_pass'
              onChange={handleCheckboxChange}
              className='sr-only peer outline-0'
              disabled={view}
            />
            <div className="relative w-9 h-5 bg-gray-500 cursor-pointer peer-disabled:bg-gray-300 peer-disabled:cursor-auto peer-focus:outline-0 outline-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            <span className='ms-3 text-sm font-medium text-gray-900'>
              Cambiar contraseña
            </span>
          </label>

          {formData.cambiar_pass && (
            <InputField
              type='password'
              label='Contraseña'
              name='password'
              required={true}
              value={formData.password || ''}
              onChange={handleInputChange}
              disabled={view}
              classInput='md:col-span-2'
            />
          )}
        </>
      )}
    </div>
  )
}
