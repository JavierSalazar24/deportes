import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

const getDotColor = (valor) => {
  if (valor > 30000) return '#b91c1c' // rojo oscuro
  if (valor > 15000) return '#ef4444' // rojo normal
  return '#f87171' // rojo claro
}

export const EgresosChart = ({ data = [] }) => {
  return (
    <div className='bg-white rounded-lg shadow p-4 mt-7'>
      <h2 className='text-lg font-semibold text-gray-900 mb-4'>
        Egresos del año
      </h2>
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='mes' />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                const { payload } = props
                return [
                  `$${value.toLocaleString('es-MX')}`,
                  `Módulos: ${payload.modulos.join(', ') || 'Sin origen'}`
                ]
              }}
              labelFormatter={(label) => `Mes: ${label}`}
            />
            <Line
              type='monotone'
              dataKey='total'
              stroke='#ef4444'
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={({ cx, cy, payload, index }) => (
                <circle
                  key={`dot-${payload.mes}-${index}`}
                  cx={cx}
                  cy={cy}
                  r={5}
                  stroke={getDotColor(payload.total)}
                  strokeWidth={2}
                  fill='white'
                />
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
