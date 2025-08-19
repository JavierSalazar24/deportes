import { Construction, Hammer, HardHat } from 'lucide-react'

export const ModuloConstruccion = () => {
  return (
    <div className='flex items-center justify-center min-h-[400px] w-full p-4'>
      <div className='w-full max-w-md border-2 border-yellow-400 shadow-lg'>
        <div className='p-6'>
          <div className='flex flex-col items-center text-center space-y-6'>
            <div className='flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full'>
              <Construction className='w-10 h-10 text-yellow-600' />
            </div>

            <div className='space-y-2'>
              <h2 className='text-2xl font-bold tracking-tight'>
                Módulo en construcción
              </h2>
              <p className='text-muted-foreground'>
                Estamos trabajando para mejorar esta sección. Vuelve pronto para
                ver los cambios.
              </p>
            </div>

            <div className='flex items-center gap-4'>
              <HardHat className='w-6 h-6 text-yellow-600' />
              <Hammer className='w-6 h-6 text-yellow-600' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
