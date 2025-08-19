import { Smile } from 'lucide-react'

export default function OnlineBanner() {
  return (
    <div className='flex justify-center items-center gap-3 fixed top-0 left-0 right-0 z-70 bg-green-700 text-white text-center font-bold py-2 shadow-lg animate-fade-in-down'>
      ¡Conexión restablecida! Ya puedes seguir trabajando.
      <Smile />
    </div>
  )
}
