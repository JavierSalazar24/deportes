import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'
import { ChartCard } from './ChartCard'

export const PagosCategoria = ({ pagosCategoria, title, subtitle }) => {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <div className='h-64'>
        {pagosCategoria.length === 0 ? (
          <p className='text-center text-gray-400 text-xl font-medium'>
            No hay datos para graficar.
          </p>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={pagosCategoria} barGap={0}>
              <CartesianGrid strokeDasharray='3 3' stroke='#dddddd' />
              <XAxis dataKey='categoria' stroke='#a3a3a3' fontSize={12} />
              <YAxis
                stroke='#a3a3a3'
                fontSize={12}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload }) =>
                  active &&
                  payload &&
                  payload.length > 0 && (
                    <div className='bg-white border border-gray-200 rounded-lg p-3 shadow-xl'>
                      <p className='text-sm font-medium text-gray-900 mb-2'>
                        {payload[0].payload.categoria}
                      </p>
                      {payload.map((entry, index) => (
                        <p
                          key={index}
                          className='text-sm'
                          style={{ color: entry.color }}
                        >
                          {entry.name}: {entry.value} jugadores.
                        </p>
                      ))}
                    </div>
                  )
                }
              />
              <Bar
                dataKey='pagados'
                fill='#00ab78'
                radius={[4, 4, 0, 0]}
                name='Pagados'
              />
              <Bar
                dataKey='pendientes'
                fill='#cc272e'
                radius={[4, 4, 0, 0]}
                name='Pendientes'
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='flex items-center justify-center gap-6 mt-4'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-success'></div>
          <span className='text-sm text-muted-foreground'>Pagados</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-danger'></div>
          <span className='text-sm text-muted-foreground'>Pendientes</span>
        </div>
      </div>
    </ChartCard>
  )
}
