import type { CityRef, CurrentWeather, ForecastDay } from '../types'

const BASE = 'https://api.openweathermap.org'

function key(): string {
  const k = import.meta.env.VITE_OWM_KEY
  if (!k) throw new Error('未配置 API Key：请在 D:\\weather-studio\\.env.local 写入 VITE_OWM_KEY=你的Key 后重启 dev server')
  return k
}

export class ApiError extends Error {
  readonly code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

async function request<T>(url: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(url)
  } catch {
    throw new ApiError(0, '网络不可用，请检查连接后重试')
  }
  let body: unknown = null
  try {
    body = await res.json()
  } catch {
    /* 非 JSON 响应按未知错误处理 */
  }
  const cod = (body as { cod?: number | string } | null)?.cod
  if (!res.ok || (cod !== undefined && Number(cod) !== 200)) {
    const msg =
      (body as { message?: string } | null)?.message ??
      (res.status === 401
        ? 'API Key 无效或尚未激活（新 Key 需等待几分钟）'
        : res.status === 404
          ? '没有找到这个城市'
          : '请求失败，请稍后重试')
    throw new ApiError(res.status, msg)
  }
  return body as T
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000
}

export function cityId(lat: number, lon: number): string {
  return `${round4(lat)},${round4(lon)}`
}

export function refFromGeo(g: GeoResult): CityRef {
  return {
    id: cityId(g.lat, g.lon),
    name: g.local_names?.['zh'] ?? g.name,
    country: g.country ?? '',
    lat: round4(g.lat),
    lon: round4(g.lon),
  }
}

interface GeoResult {
  name: string
  local_names?: Record<string, string>
  country?: string
  lat: number
  lon: number
}

export async function geocode(query: string): Promise<CityRef[]> {
  const url = `${BASE}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${key()}`
  const list = await request<GeoResult[]>(url)
  return list.map(refFromGeo)
}

export async function reverseGeocode(lat: number, lon: number): Promise<CityRef> {
  const url = `${BASE}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key()}`
  const list = await request<GeoResult[]>(url)
  const first = list[0]
  if (!first) throw new ApiError(404, '无法识别当前位置的城市')
  return refFromGeo(first)
}

interface OwmMain {
  temp: number
  feels_like: number
  humidity: number
}
interface OwmWeather {
  description: string
  icon: string
}
interface OwmCurrent {
  name: string
  dt: number
  main: OwmMain
  weather: OwmWeather[]
  wind: { speed: number }
  sys?: { country?: string }
}
interface OwmForecastItem {
  dt: number
  main: { temp_min: number; temp_max: number }
  weather: OwmWeather[]
}
interface OwmForecast {
  list: OwmForecastItem[]
}

function toCurrent(city: CityRef, raw: OwmCurrent): CurrentWeather {
  const w = raw.weather[0]
  return {
    city: raw.name || city.name,
    country: raw.sys?.country ?? city.country,
    temp: raw.main.temp,
    feelsLike: raw.main.feels_like,
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    condition: w?.description ?? '',
    icon: w?.icon ?? '01d',
    dt: raw.dt,
  }
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

function dayKey(tsMs: number): string {
  const d = new Date(tsMs)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export async function loadCity(ref: CityRef): Promise<{ current: CurrentWeather; forecast: ForecastDay[] }> {
  const curUrl = `${BASE}/data/2.5/weather?lat=${ref.lat}&lon=${ref.lon}&units=metric&lang=zh_cn&appid=${key()}`
  const fcUrl = `${BASE}/data/2.5/forecast?lat=${ref.lat}&lon=${ref.lon}&units=metric&lang=zh_cn&appid=${key()}`
  const [rawCur, rawFc] = await Promise.all([
    request<OwmCurrent>(curUrl),
    request<OwmForecast>(fcUrl),
  ])

  const groups = new Map<string, OwmForecastItem[]>()
  for (const item of rawFc.list) {
    const k = dayKey(item.dt * 1000)
    const arr = groups.get(k)
    if (arr) arr.push(item)
    else groups.set(k, [item])
  }

  const today = dayKey(Date.now())
  const forecast: ForecastDay[] = []
  for (const [date, items] of groups) {
    if (date <= today) continue
    let min = Number.POSITIVE_INFINITY
    let max = Number.NEGATIVE_INFINITY
    for (const it of items) {
      if (it.main.temp_min < min) min = it.main.temp_min
      if (it.main.temp_max > max) max = it.main.temp_max
    }
    const noon = items.reduce((best, it) =>
      Math.abs(new Date(it.dt * 1000).getHours() - 12) < Math.abs(new Date(best.dt * 1000).getHours() - 12) ? it : best,
    )
    forecast.push({
      date,
      tempMin: min,
      tempMax: max,
      condition: noon.weather[0]?.description ?? '',
      icon: noon.weather[0]?.icon ?? '01d',
    })
    if (forecast.length >= 5) break
  }

  return { current: toCurrent(ref, rawCur), forecast }
}
