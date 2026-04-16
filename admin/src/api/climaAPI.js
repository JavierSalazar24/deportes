import axios from 'axios'

export const getClima = async () => {
  try {
    const lat = 24.0203
    const lon = -104.6576

    // URL OPTIMIZADA PARA DEPORTES:
    // Incluye: UV, Rachas, Dirección Viento, Sensación, Probabilidad Lluvia Hora a Hora
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'weather_code',
        'cloud_cover',
        'pressure_msl',
        'wind_speed_10m',
        'wind_direction_10m', // VITAL para la flecha
        'wind_gusts_10m',
        'uv_index'
      ].join(','),
      hourly: 'precipitation_probability', // Solo pedimos probabilidad para no saturar
      timezone: 'auto',
      forecast_days: 1
    })

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`

    const response = await axios.get(url)

    if (response.status !== 200) {
      throw new Error('Error al obtener el clima')
    }

    return response.data
  } catch (error) {
    console.error('Error al obtener el registro', error)
    throw new Error(error.response?.data?.message || error.message)
  }
}
