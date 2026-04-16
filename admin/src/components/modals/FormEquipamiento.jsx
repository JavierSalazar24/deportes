import { useEquipamiento } from '../../hooks/useEquipamiento'
import { formOptions } from '../../forms/formEquipamientoOptions'
import { AlertaCard } from '../AlertaCard'
import { InputField } from '../InputField'
import { RendersArticulos } from '../RendersArticulos'

export const FormEquipamiento = ({
  view,
  edit,
  formData,
  handleInputChange,
  articulosDisponibles,
  handleCheckboxChange,
  loadOptionsJugadores
}) => {
  const { articulos, loadArti, errorArti } = useEquipamiento()

  const renderArticulo = (articulo) => {
    return (
      <RendersArticulos
        key={articulo.id}
        articulo={articulo}
        articulosDisponibles={articulosDisponibles}
        formData={formData}
        handleCheckboxChange={handleCheckboxChange}
        view={view}
        handleInputChange={handleInputChange}
      />
    )
  }

  return (
    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 md:grid-cols-1 mb-7'>
      {edit && (
        <>
          <AlertaCard text='Devolución de equipo' />
          <InputField
            type='select'
            label='¿Equipo devuelto? *'
            name='devuelto'
            required={true}
            value={formData.devuelto || ''}
            onChange={handleInputChange}
            disabled={formData.devuelto === 'SI' ? true : view}
            opcSelect={[
              { label: 'Selecciona una opción', value: '' },
              { label: 'SI', value: 'SI' },
              { label: 'NO', value: 'NO' }
            ]}
          />
        </>
      )}

      {formData.devuelto === 'SI' && (
        <InputField
          type='date'
          label='Fecha de equipo devuelto *'
          name='fecha_devuelto'
          required={true}
          value={formData.fecha_devuelto || ''}
          onChange={handleInputChange}
          disabled={view}
        />
      )}

      <AlertaCard text='Información de equipo a prestar' />
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
            onChange={handleInputChange}
            loadOptions={loadOptionsJugadores}
            disabled={
              formData.devuelto === 'SI' || (edit && name === 'jugador_id')
                ? true
                : view
            }
          />
        )
      )}

      <AlertaCard text='Asigna el equipo a prestar' />

      {!loadArti && !errorArti && articulos.map(renderArticulo)}
    </div>
  )
}
