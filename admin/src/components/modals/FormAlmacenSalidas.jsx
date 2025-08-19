import { formOptions } from '../../forms/formAlmacenSalidasOptions'
import { InputField } from '../InputField'

export const FormAlmacenSalidas = ({
  view,
  formData,
  handleInputChange,
  loadOptionsArticulos,
  loadOptionsJugadores
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {formOptions.generalFields.map(
        ({ type, label, name, required, opcSelect }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            required={required}
            value={formData[name] || ''}
            opcSelect={opcSelect}
            loadOptions={loadOptionsArticulos}
            onChange={handleInputChange}
            disabled={name === 'numero_serie' ? true : view}
            classInput='md:col-span-1'
          />
        )
      )}

      {formData.motivo_salida === 'Otro' && (
        <InputField
          type='text'
          label='Otro(s) motivo(s) *'
          name='motivo_salida_otro'
          required={true}
          value={formData.motivo_salida_otro || ''}
          onChange={handleInputChange}
          disabled={view}
          classInput='md:col-span-1'
        />
      )}

      {formData.motivo_salida === 'Asignado' && (
        <InputField
          type='async'
          label='Selecciona al jugador a quien se le asignó el equipo *'
          name='jugador_id'
          required={true}
          value={formData.jugador_id || ''}
          onChange={handleInputChange}
          loadOptions={loadOptionsJugadores}
          disabled={view}
          classInput='md:col-span-1'
        />
      )}
    </div>
  )
}
