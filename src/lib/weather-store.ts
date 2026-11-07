import { create } from 'zustand'
import { ApiError, geocode, loadCity, reverseGeocode } from './api'
import type { CityRef, CurrentWeather, ForecastDay, WeatherStatus } from '../types'
import { useCityStore } from '../store'

interface WeatherState {
  status: WeatherStatus
  activeRef: CityRef | null
  current: CurrentWeather | null
  forecast: ForecastDay[]
  errorMsg: string
  loadRef: (ref: CityRef) => Promise<void>
  loadQuery: (query: string) => Promise<boolean>
  loadGeolocation: () => Promise<void>
}

function fail(msg: string): { status: 'error'; errorMsg: string } {
  return { status: 'error', errorMsg: msg }
}

export const useWeatherStore = create<WeatherState>()((set) => ({
  status: 'idle',
  activeRef: null,
  current: null,
  forecast: [],
  errorMsg: '',

  loadRef: async (ref) => {
    set({ status: 'loading', errorMsg: '' })
    try {
      const { current, forecast } = await loadCity(ref)
      set({ status: 'ready', activeRef: ref, current, forecast })
      useCityStore.getState().setLastCity(ref)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : '请求失败，请稍后重试'
      set(fail(msg))
    }
  },

  loadQuery: async (query) => {
    const q = query.trim()
    if (q === '') return false
    set({ status: 'loading', errorMsg: '' })
    try {
      const refs = await geocode(q)
      const first = refs[0]
      if (!first) {
        set(fail('没有找到这个城市'))
        return false
      }
      const { current, forecast } = await loadCity(first)
      set({ status: 'ready', activeRef: first, current, forecast })
      useCityStore.getState().setLastCity(first)
      return true
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : '请求失败，请稍后重试'
      set(fail(msg))
      return false
    }
  },

  loadGeolocation: async () => {
    set({ status: 'loading', errorMsg: '' })
    const getPos = () =>
      new Promise<GeolocationPosition>((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('浏览器不支持定位'))
          return
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 300000,
        })
      })
    try {
      const pos = await getPos()
      const ref = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
      const { current, forecast } = await loadCity(ref)
      set({ status: 'ready', activeRef: ref, current, forecast })
      useCityStore.getState().setLastCity(ref)
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : err instanceof GeolocationPositionError
            ? '定位被拒绝或不可用，请手动搜索城市'
            : '定位失败，请手动搜索城市'
      set(fail(msg))
    }
  },
}))
