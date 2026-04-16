import { Frown } from 'lucide-react'

export default function OfflineBanner() {
  return (
    <div className='flex justify-center items-center gap-3 fixed top-0 left-0 right-0 z-70 bg-red-600 text-white text-center font-bold py-2 shadow-lg animate-pulse'>
      No tienes conexión a internet, revisa la red.
      <Frown />
    </div>
  )
}
