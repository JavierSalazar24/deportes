import { API_HOST } from '../../config'
import { InputField } from '../InputField'
import { ResumenEstadoCuentaJugadores } from '../ResumenEstadoCuentaJugadores'

export const FormEstadoCuentaJugadores = ({
  formReport,
  handleInputChange,
  loadOptionsJugadores,
  handleSubmit,
  estado
}) => {
  return (
    <form
      className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 mt-3'
      onSubmit={handleSubmit}
    >
      <InputField
        label='Selecciona el jugador *'
        id='jugador_id'
        name='jugador_id'
        type='async'
        required={true}
        value={formReport.jugador_id || ''}
        onChange={handleInputChange}
        loadOptions={loadOptionsJugadores}
        classInput='md:col-span-6'
      />

      <InputField
        label='Fecha de inicio'
        id='fecha_inicio'
        name='fecha_inicio'
        type='date'
        required={true}
        value={formReport.fecha_inicio || ''}
        onChange={handleInputChange}
        classInput='md:col-span-6'
      />
      <InputField
        label='Fecha de fin'
        id='fecha_fin'
        name='fecha_fin'
        type='date'
        required={true}
        value={formReport.fecha_fin || ''}
        onChange={handleInputChange}
        classInput='md:col-span-6'
      />

      {estado && (
        <div className='sm:col-span-6 md:col-span-6'>
          <ResumenEstadoCuentaJugadores data={estado} />
        </div>
      )}

      <div className='md:col-span-6 sm:col-span-6'>
        <button
          type='submit'
          className='rounded-sm text-white font-medium py-2 px-3 bg-[#3674B5] hover:bg-[#486483] transition-all cursor-pointer'
        >
          Generar reporte
        </button>

        {estado && (
          <a
            href={`${API_HOST}/api/pdf/estado-cuenta-jugadores?jugador_id=${formReport.jugador_id.value}&fecha_inicio=${formReport.fecha_inicio}&fecha_fin=${formReport.fecha_fin}`}
            target='_blank'
            className='rounded-sm ml-3 text-white font-medium py-2 px-3 bg-red-600 hover:bg-red-800 transition-all cursor-pointer'
          >
            Exportar PDF
          </a>
        )}
      </div>
    </form>
  )
}
