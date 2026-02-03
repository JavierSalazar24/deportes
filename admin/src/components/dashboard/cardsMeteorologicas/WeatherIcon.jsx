import { Sun, Moon } from 'lucide-react' // Agregamos Moon
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiFog,
  WiNightFog,
  WiShowers,
  WiNightAltShowers,
  WiRain,
  WiNightAltRain,
  WiThunderstorm,
  WiNightAltThunderstorm,
  WiSnow,
  WiNightAltSnow
} from 'weather-icons-react'

export const WeatherIcon = ({ code, isDay, size = 64 }) => {
  // Colores
  const sunColor = '#f9d71c' // Amarillo Sol
  const moonColor = '#a0c8f0' // Azul Claro Luna
  const cloudColor = '#a0a0a0'
  const rainColor = '#5a91e0'

  const getIcon = (wmoCode) => {
    switch (true) {
      // 0: Despejado
      case wmoCode === 0:
        return isDay ? (
          <WiDaySunny size={size} color={sunColor} />
        ) : (
          <Moon size={40} color={moonColor} />
        )

      // 1-3: Nublado parcial
      case wmoCode >= 1 && wmoCode <= 3:
        return isDay ? (
          <WiDayCloudy size={size} color={cloudColor} />
        ) : (
          <WiNightAltCloudy size={size} color={moonColor} />
        )

      // 45, 48: Niebla
      case wmoCode >= 45 && wmoCode <= 48:
        return isDay ? (
          <WiFog size={size} color={cloudColor} />
        ) : (
          <WiNightFog size={size} color={cloudColor} />
        )

      // 51-67: Lloviznas y Lluvias
      case wmoCode >= 51 && wmoCode <= 67:
        return isDay ? (
          <WiRain size={size} color={rainColor} />
        ) : (
          <WiNightAltRain size={size} color={rainColor} />
        )

      // 71-77: Nieve
      case wmoCode >= 71 && wmoCode <= 77:
        return isDay ? (
          <WiSnow size={size} color='#ffffff' />
        ) : (
          <WiNightAltSnow size={size} color='#ffffff' />
        )

      // 80-82: Chubascos
      case wmoCode >= 80 && wmoCode <= 82:
        return isDay ? (
          <WiShowers size={size} color={rainColor} />
        ) : (
          <WiNightAltShowers size={size} color={rainColor} />
        )

      // 85-86: Chubascos de nieve
      case wmoCode >= 85 && wmoCode <= 86:
        return isDay ? (
          <WiSnow size={size} color='#ffffff' />
        ) : (
          <WiNightAltSnow size={size} color='#ffffff' />
        )

      // 95-99: Tormentas
      case wmoCode >= 95 && wmoCode <= 99:
        return isDay ? (
          <WiThunderstorm size={size} color='#4a4a4a' />
        ) : (
          <WiNightAltThunderstorm size={size} color='#4a4a4a' />
        )

      // Default
      default:
        return isDay ? (
          <Sun className='text-amber-300' size={size * 0.6} />
        ) : (
          <Moon className='text-gray-300' size={size * 0.6} />
        )
    }
  }

  return getIcon(code)
}
