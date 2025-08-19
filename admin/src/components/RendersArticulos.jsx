import { InputField } from './InputField'
import { SwitchInputEquipamiento } from './SwitchInputEquipamiento'

export const RendersArticulos = ({
  articulo,
  articulosDisponibles,
  formData,
  handleCheckboxChange,
  view,
  handleInputChange
}) => {
  const key = `articulo-${articulo.nombre}-${articulo.id}`
  const inputKey = `serie-select-${articulo.id}`
  const articuloDisponible = articulosDisponibles[key] || []

  const isChecked = formData[key] || false

  return (
    <div className='w-full sm:w-[90%] mx-auto'>
      <SwitchInputEquipamiento
        name={key}
        value={`${articulo.nombre}-${articulo.id}`}
        formData={isChecked}
        handleCheckboxChange={handleCheckboxChange}
        view={formData.devuelto === 'SI' ? true : view}
        text={articulo.nombre}
      />

      {isChecked && (
        <div className='my-1'>
          <InputField
            key={inputKey}
            type='select'
            label='Selecciona el número de serie o de uniforme'
            name={`seleccionado-numero_serie-${articulo.id}`}
            required={true}
            value={formData[`seleccionado-numero_serie-${articulo.id}`] || ''}
            onChange={handleInputChange}
            disabled={formData.devuelto === 'SI' ? true : view}
            opcSelect={[
              { label: 'Selecciona una opción', value: '' },
              ...articuloDisponible.map((item) => ({
                label: item.numero_serie,
                value: item.numero_serie
              }))
            ]}
          />
        </div>
      )}
    </div>
  )
}
