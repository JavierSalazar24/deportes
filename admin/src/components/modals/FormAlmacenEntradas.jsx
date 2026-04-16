import { formOptions } from '../../forms/formAlmacenEntradasOptions'
import { InputField } from '../InputField'

export const FormAlmacenEntradas = ({
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
            disabled={view}
            classInput='md:col-span-1'
          />
        )
      )}

      {formData.tipo_entrada === 'Compra' && (
        <InputField
          type='text'
          label='# de OC *'
          name='orden_compra'
          required={true}
          value={formData.orden_compra || ''}
          onChange={handleInputChange}
          disabled={view}
          classInput='md:col-span-1'
        />
      )}

      {formData.tipo_entrada === 'Otro' && (
        <InputField
          type='text'
          label='Otro concepto *'
          name='otros_conceptos'
          required={true}
          value={formData.otros_conceptos || ''}
          onChange={handleInputChange}
          disabled={view}
          classInput='md:col-span-1'
        />
      )}

      {formData.tipo_entrada === 'Devolución de jugador' && (
        <InputField
          type='async'
          label='Selecciona al jugador que devuelve el equipo *'
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
