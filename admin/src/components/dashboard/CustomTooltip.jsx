import { formatearMonedaMXN } from '../../utils/formattedCurrancy'

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border border-gray-200 rounded-lg p-3 shadow-xl'>
        <p className='text-sm font-medium text-gray-900 mb-2'>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className='text-sm' style={{ color: entry.color }}>
            {entry.name}:{' '}
            {typeof entry.value === 'number' && entry.value > 1000
              ? formatearMonedaMXN(entry.value)
              : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}
