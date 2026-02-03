export const getWeatherDescription = (code) => {
  const codes = {
    0: 'Cielo despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna densa',
    56: 'Llovizna helada',
    57: 'Llovizna helada densa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia fuerte',
    66: 'Lluvia helada',
    67: 'Lluvia helada fuerte',
    71: 'Nevada ligera',
    73: 'Nevada moderada',
    75: 'Nevada fuerte',
    77: 'Granos de nieve',
    80: 'Chubascos leves',
    81: 'Chubascos mod.',
    82: 'Chubascos violentos',
    85: 'Chubascos nieve',
    86: 'Chubascos nieve fuertes',
    95: 'Tormenta eléctrica',
    96: 'Tormenta con granizo',
    99: 'Tormenta granizo fuerte'
  }
  return codes[code] || 'Desconocido'
}
