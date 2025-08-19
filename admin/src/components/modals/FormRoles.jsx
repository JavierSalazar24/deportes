import { formOptions } from '../../forms/formRolesOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'

export const FormRoles = ({
  view,
  formData,
  handleInputChange,
  loadOptionsModulos,
  modulosSeleccionados,
  handleChange,
  handlePermisoChange,
  getPermisoValue
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
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

      <div className='sm:col-span-6 md:col-span-2'>
        <AlertaCard text='Permisos por módulo' />
      </div>

      <InputField
        type='async-multi'
        label='Selecciona el módulo *'
        required={true}
        onChange={handleChange}
        name='modulos_id'
        value={
          modulosSeleccionados.length
            ? modulosSeleccionados
            : formData.modulos_id
        }
        loadOptions={loadOptionsModulos}
        disabled={view}
        classInput='md:col-span-2'
      />

      {modulosSeleccionados.map((modulo) => (
        <div
          key={modulo.value}
          className='border border-gray-300 rounded-xl p-4 bg-gray-50 shadow'
        >
          <p className='text-lg font-semibold mb-3'>
            Permisos para {modulo.label}
          </p>
          <div className='grid grid-cols-2 gap-4'>
            {['crear', 'actualizar', 'eliminar'].map((permiso) => (
              <label
                className='inline-flex items-center mt-5'
                key={`${modulo.value}_${permiso}`}
              >
                <input
                  type='checkbox'
                  name={`${modulo.value}_${permiso}`}
                  checked={getPermisoValue(modulo.value, permiso)}
                  onChange={() => handlePermisoChange(modulo.value, permiso)}
                  className='sr-only peer outline-0'
                  disabled={view}
                />
                <div className="relative w-9 h-5 bg-gray-500 cursor-pointer peer-checked:peer-disabled:bg-blue-300 peer-disabled:bg-gray-300 peer-disabled:cursor-auto peer-focus:outline-0 outline-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                <span className='ms-3 text-sm font-medium text-gray-900 cursor-pointer peer-disabled:cursor-auto'>
                  {`¿Puede ${permiso}?`}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
