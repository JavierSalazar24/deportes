export const ContentPWATutorial = ({
  currentStep,
  totalSteps,
  currentSteps,
  prevStep,
  nextStep,
  goToStep
}) => {
  return (
    <>
      {/* Progress Bar */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium text-gray-600'>
            Paso {currentStep + 1} de {totalSteps}
          </span>
          <span className='text-sm text-gray-500'>
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% completado
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-blue-500 h-2 rounded-full transition-all duration-300'
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className='bg-gray-50 rounded-lg p-4 mb-8'>
        <div className='text-center space-y-6'>
          {/* Content */}
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-800 mb-1'>
              {currentSteps[currentStep].title}
            </h2>
            <p className='text-gray-600 text-base leading-relaxed max-w-2xl mx-auto'>
              {currentSteps[currentStep].description}
            </p>
          </div>

          {/* Image */}
          <div className='flex justify-center'>
            <img
              src={currentSteps[currentStep].image || '/placeholder.svg'}
              alt={currentSteps[currentStep].title}
              className='rounded-lg shadow-md border border-gray-200 max-w-full h-auto object-contain max-h-80 lg:max-h-96'
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className='flex justify-between items-center mb-6'>
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`cursor-pointer px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          ← Anterior
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
          className={`cursor-pointer px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentStep === totalSteps - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {currentStep === totalSteps - 1 ? '¡Completado!' : 'Siguiente →'}
        </button>
      </div>

      {/* Step Indicators */}
      <div className='flex justify-center space-x-2'>
        {currentSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentStep
                ? 'bg-blue-500'
                : index < currentStep
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </>
  )
}
