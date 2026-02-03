import dayjs from 'dayjs'
import { getUVInfo } from '../utils/getUVInfo'
import { getWeatherDescription } from '../utils/getWeatherDescription'

export const usePanelMeteorologico = ({ data }) => {
  const current = data?.current
  const hourly = data?.hourly

  const next3Hours = [1, 2, 3].map((offset) => {
    const futureTime = dayjs().add(offset, 'hour')
    return {
      tiempo: futureTime,
      probabilidadLluvia:
        hourly?.precipitation_probability[new Date().getHours() + offset] || 0
    }
  })

  const clima = {
    temperaturaReal: Math.round(current?.temperature_2m),
    sensacionTermica: Math.round(current?.apparent_temperature),
    descripcion: getWeatherDescription(current?.weather_code),
    weatherCode: current?.weather_code,
    viento: {
      velocidad: current?.wind_speed_10m,
      rachas: current?.wind_gusts_10m,
      direccion: current?.wind_direction_10m
    },
    indiceUV: current?.uv_index,
    humedad: current?.relative_humidity_2m,
    presion: Math.round(current?.pressure_msl),
    nubosidad: current?.cloud_cover,
    precipitacion: current?.precipitation,
    pronostico: next3Hours,
    esDeDia: current?.is_day === 1
  }

  const uvInfo = getUVInfo(clima.indiceUV)
  const diferenciaSensacion = clima.sensacionTermica - clima.temperaturaReal
  const alertaSensacion = diferenciaSensacion >= 3
  const alertaRachas = clima.viento.rachas > 40
  const estaLloviendo = clima.precipitacion > 0

  return { clima, uvInfo, alertaSensacion, alertaRachas, estaLloviendo }
}
