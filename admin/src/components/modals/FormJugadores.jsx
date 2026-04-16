import { InputField } from '../InputField'
import { AlertaCard } from '../AlertaCard'
import { formOptions } from '../../forms/formJugadoresOptions'
import { FotoCard } from '../FotoCard'
import { SignatureInput } from '../SignatureInput'

export const FormJugadores = ({
  view,
  edit,
  document,
  formData,
  handleInputChange,
  handleFileChange,
  loadOptionsTemporadas,
  loadOptionsCategorias,
  loadOptionsUsuarios,
  categorias
}) => {
  return (
    <>
      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 md:grid-cols-2 mb-7'>
        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Gestión deportiva' />
        </div>
        <InputField
          type='async'
          label='Selecciona la temporada *'
          required={true}
          name='temporada_id'
          value={formData.temporada_id || ''}
          onChange={handleInputChange}
          disabled={view}
          loadOptions={loadOptionsTemporadas}
          classInput='md:col-span-2'
        />

        <FotoCard
          handleFileChange={handleFileChange}
          view={view}
          formData={formData}
          document={document}
          title='Foto de perfil'
        />

        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Información personal' />
        </div>
        {formOptions.personalFields.map(
          ({ type, label, name, required, opcSelect }) => (
            <InputField
              key={name}
              type={type}
              label={label}
              name={name}
              required={required}
              value={formData[name] || ''}
              onChange={handleInputChange}
              disabled={
                ['categoria_id', 'correo_tutor', 'telefono_tutor'].includes(
                  name
                )
                  ? true
                  : view
              }
              opcSelect={name === 'categoria_id' ? categorias : opcSelect}
              loadOptions={
                name === 'categoria_id'
                  ? loadOptionsCategorias
                  : loadOptionsUsuarios
              }
            />
          )
        )}

        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Documentos' />
        </div>
        {formOptions.documentFields.map(
          ({ type, label, name, accept, required }) => (
            <InputField
              key={name}
              type={type}
              accept={accept}
              label={label}
              required={document ? !document : required}
              name={name}
              value={formData[name] || ''}
              onChange={handleFileChange}
              document={edit ? null : formData[`${name}_url`] || null}
              disabled={view}
            />
          )
        )}

        <div className='sm:col-span-6 md:col-span-2'>
          <AlertaCard text='Firma del responsable' />
        </div>
        <div className='sm:col-span-6 md:col-span-2'>
          <SignatureInput
            view={view}
            formData={formData}
            nombreFirma='firma_url'
          />
        </div>
      </div>
    </>
  )
}
