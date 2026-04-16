import { ContentPWATutorial } from '../components/ContentPWATutorial'
import { usePWATutorial } from '../hooks/usePWATutorial'

const PWATutorial = () => {
  const {
    activeDevice,
    currentSteps,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    switchDevice
  } = usePWATutorial()

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          ¿Cómo instalar la aplicación del panel administrativo en el celular
          y/o en la computadora?
        </h1>
        <p className='text-gray-600'>
          Sigue estos pasos para instalar la aplicación en tu dispositivo
        </p>
      </div>

      {/* Device Selector */}
      <div className='flex justify-center mb-8'>
        <div className='bg-gray-100 rounded-lg p-1 flex'>
          <button
            onClick={() => switchDevice('mobile')}
            className={`cursor-pointer px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeDevice === 'mobile'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📱 Móvil
          </button>
          <button
            onClick={() => switchDevice('desktop')}
            className={`cursor-pointer px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeDevice === 'desktop'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            💻 Computadora
          </button>
        </div>
      </div>

      {/* Content tutorial */}
      <ContentPWATutorial
        switchDevice={switchDevice}
        activeDevice={activeDevice}
        currentStep={currentStep}
        totalSteps={totalSteps}
        currentSteps={currentSteps}
        prevStep={prevStep}
        nextStep={nextStep}
        goToStep={goToStep}
      />

      {/* Additional Info */}
      <div className='mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200'>
        <div className='flex items-start space-x-3'>
          <div className='text-blue-500 text-xl'>💡</div>
          <div>
            <h3 className='font-semibold text-blue-800 mb-1'>Consejo:</h3>
            <p className='text-blue-700 text-sm'>
              {activeDevice === 'mobile'
                ? 'Una vez instalada, la app funcionará como una aplicación nativa y podrás acceder a ella desde tu pantalla de inicio sin necesidad de abrir el navegador.'
                : 'Las apps instaladas en computadora aparecen en tu menú de aplicaciones y pueden ejecutarse independientemente del navegador, ofreciendo una experiencia similar a las aplicaciones de escritorio.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PWATutorial
