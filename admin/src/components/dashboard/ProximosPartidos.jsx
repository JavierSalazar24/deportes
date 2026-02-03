import { ArrowRight, ChevronRight, Clock } from 'lucide-react'
import { Link } from 'react-router'

// const proximosPartidos = [
//   {
//     id: 1,
//     equipo: 'Sub-13',
//     rival: 'Águilas FC',
//     fecha: '05 Feb',
//     hora: '10:00',
//     lugar: 'Local'
//   },
//   {
//     id: 2,
//     equipo: 'Sub-15',
//     rival: 'Tigres Academy',
//     fecha: '06 Feb',
//     hora: '12:00',
//     lugar: 'Visitante'
//   },
//   {
//     id: 3,
//     equipo: 'Sub-11',
//     rival: 'Pumas Jr',
//     fecha: '07 Feb',
//     hora: '09:00',
//     lugar: 'Local'
//   }
// ]

export function ProximosPartidos({ proximosPartidos }) {
  return (
    <div className='bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden'>
      <div className='p-5 border-b border-gray-200 flex items-center justify-between'>
        <div>
          <h3 className='font-semibold text-foreground'>Próximos partidos</h3>
          <p className='text-sm text-muted-foreground mt-0.5'>Esta semana</p>
        </div>
        <Link
          to='/calendario-partidos'
          className='flex items-center gap-2 text-sm text-success hover:text-success/80 font-medium'
        >
          Ver calendario
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className='divide-y divide-gray-200 max-h-90 overflow-y-auto'>
        {proximosPartidos.length === 0 ? (
          <p className='text-center text-gray-400 text-xl font-medium py-5'>
            No se encontraron partidos para esta semana.
          </p>
        ) : (
          proximosPartidos.map((partido) => (
            <Link
              to={`/partidos?nombre=${partido.rival}`}
              key={partido.id}
              className='p-4 hover:bg-gray-200/40 cursor-pointer transition-colors block'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='text-center min-w-[50px]'>
                    <p className='text-lg font-bold text-foreground'>
                      {partido.fecha.split(' ')[0]}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {partido.fecha.split(' ')[1]}
                    </p>
                  </div>
                  <div className='w-px h-10 bg-gray-200' />
                  <div>
                    <p className='text-sm font-medium text-foreground'>
                      {partido.categoria} vs {partido.rival}
                    </p>
                    <div className='flex items-center gap-2 mt-1 md:flex-col xl:flex-row'>
                      <div className='flex items-center gap-1'>
                        <Clock size={12} className='text-muted-foreground' />
                        <span className='text-xs text-muted-foreground'>
                          {partido.hora}
                        </span>
                      </div>
                      <span className='text-xs px-2 py-0.5 rounded-full bg-success/10 text-success text-center'>
                        {partido.lugar}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='p-2 rounded-lg transition-colors'>
                  <ChevronRight size={18} className='text-muted-foreground' />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
