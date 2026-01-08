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
  if (valor > 20000) return '#059669'
  if (valor > 10000) return '#A4DD00'
  return '#98CD00'
}

export const IngresosChart = ({ data = [] }) => {
  return (
    <div className='bg-white rounded-lg shadow p-4'>
      <h2 className='text-lg font-semibold text-gray-900 mb-4'>
        Ingresos del año
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
              stroke='#98CD00'
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
