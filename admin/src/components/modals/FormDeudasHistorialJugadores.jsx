import { formOptions } from '../../forms/formDeudasJugadoresOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'

export const FormDeudasHistorialJugadores = ({
  view,
  formData,
  handleInputChange,
  loadOptionsJugadores,
  loadOptionsCostosCategoria,
  loadOptionsBancos,
  costosConcepto
}) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
      {formOptions.generalFields.map(
        ({ type, label, name, required, step, opcSelect }) => (
          <InputField
            key={name}
            type={type}
            label={label}
            name={name}
            required={required}
            value={formData[name] || ''}
            onChange={handleInputChange}
            disabled={view}
            step={step}
            opcSelect={
              name === 'costo_categoria_id' ? costosConcepto : opcSelect
            }
            loadOptions={
              name === 'jugador_id'
                ? loadOptionsJugadores
                : loadOptionsCostosCategoria
            }
            classInput='md:col-span-1'
          />
        )
      )}

      {view && (
        <InputField
          type='date'
          label='Fecha limite'
          name='fecha_limite'
          required={true}
          value={formData.fecha_limite || ''}
          onChange={handleInputChange}
          disabled={true}
          classInput='md:col-span-2'
        />
      )}

      {view &&
        formOptions.estatusFields.map(
          ({ type, label, name, required, opcSelect, condition }) =>
            (!condition || condition(formData.estatus)) && (
              <InputField
                key={name}
                type={type}
                label={label}
                name={name}
                required={required}
                value={formData[name] || ''}
                onChange={handleInputChange}
                disabled={view}
                opcSelect={opcSelect}
                classInput={'md:col-span-2'}
              />
            )
        )}

      {formData.estatus === 'Pagado' && (
        <>
          <div className='sm:col-span-6 md:col-span-2'>
            <AlertaCard text='Información del pago' />
          </div>

          {formOptions.pagadoFiels.map(
            ({ type, label, name, required, opcSelect, condition }) =>
              (!condition || condition(formData.metodo_pago)) && (
                <InputField
                  key={name}
                  type={type}
                  label={label}
                  name={name}
                  required={required}
                  value={formData[name] || ''}
                  onChange={handleInputChange}
                  disabled={view}
                  opcSelect={opcSelect}
                  loadOptions={loadOptionsBancos}
                  classInput={'md:col-span-2'}
                />
              )
          )}
        </>
      )}
    </div>
  )
}
