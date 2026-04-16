export function getUVInfo(uv) {
  if (uv <= 2)
    return {
      label: 'Bajo',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      barColor: 'bg-green-500'
    }
  if (uv <= 5)
    return {
      label: 'Moderado',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      barColor: 'bg-yellow-500'
    }
  if (uv <= 7)
    return {
      label: 'Alto',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      barColor: 'bg-orange-500'
    }
  if (uv <= 10)
    return {
      label: 'Muy Alto',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      barColor: 'bg-red-500'
    }
  return {
    label: 'Extremo',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    barColor: 'bg-violet-500'
  }
}
