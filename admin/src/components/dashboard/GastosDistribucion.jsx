import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ChartCard } from './ChartCard'
import { formatearMonedaMXN } from '../../utils/formattedCurrancy'

export const GastosDistribucion = ({ distribucionGastos }) => {
  return (
    <ChartCard title='Distribución de gastos' subtitle='Por categoría'>
      {distribucionGastos.length === 0 ? (
        <p className='text-center text-gray-400 text-xl font-medium py-5'>
          No hay datos para graficar.
        </p>
      ) : (
        <>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={distribucionGastos}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey='value'
                >
                  {distribucionGastos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) =>
                    active &&
                    payload &&
                    payload.length > 0 && (
                      <div className='bg-white border border-gray-200 rounded-lg p-3 shadow-xl'>
                        {payload.map((entry, index) => (
                          <p
                            key={index}
                            className='text-sm font-medium'
                            style={{ color: entry.payload.color }}
                          >
                            {console.log(entry)}
                            {entry.name}: {formatearMonedaMXN(entry.value)}
                          </p>
                        ))}
                      </div>
                    )
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-2 mt-2'>
            {distribucionGastos.map((item) => (
              <div key={item.name} className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className='text-xs text-muted-foreground'>
                  {item.name}: {formatearMonedaMXN(item.value)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </ChartCard>
  )
}
