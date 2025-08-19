export const toFloat = (v) => {
  const num = parseFloat(v)
  return isNaN(num) ? 0 : num
}

export const toInt = (value) => {
  const num = parseInt(value)
  return isNaN(num) ? 0 : num
}
