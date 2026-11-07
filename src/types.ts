export type Priority = 'high' | 'medium' | 'low'

export interface CurrentWeather {
  city: string
  country: string
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  condition: string
  icon: string
  dt: number
}

export interface ForecastDay {
  date: string
  tempMin: number
  tempMax: number
  condition: string
  icon: string
}

export interface CityRef {
  id: string
  name: string
  country: string
  lat: number
  lon: number
}

export type WeatherStatus = 'idle' | 'loading' | 'ready' | 'error'
