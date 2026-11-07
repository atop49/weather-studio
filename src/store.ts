import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CityRef } from './types'

interface CityState {
  favorites: CityRef[]
  lastCity: CityRef | null
  addFavorite: (city: CityRef) => void
  removeFavorite: (id: string) => void
  setLastCity: (city: CityRef) => void
}

function sanitizeCity(raw: unknown): CityRef | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  if (typeof r.name !== 'string' || r.name === '') return null
  if (typeof r.lat !== 'number' || typeof r.lon !== 'number') return null
  const lat = Math.round(r.lat * 10000) / 10000
  const lon = Math.round(r.lon * 10000) / 10000
  return {
    id: typeof r.id === 'string' && r.id !== '' ? r.id : `${lat},${lon}`,
    name: r.name,
    country: typeof r.country === 'string' ? r.country : '',
    lat,
    lon,
  }
}

interface PersistedCity {
  favorites: CityRef[]
  lastCity: CityRef | null
}

export const useCityStore = create<PersistedCity & CityState>()(
  persist(
    (set) => ({
      favorites: [],
      lastCity: null,
      addFavorite: (city) =>
        set((s) => (s.favorites.some((f) => f.id === city.id) ? s : { favorites: [city, ...s.favorites] })),
      removeFavorite: (id) => set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),
      setLastCity: (city) => set({ lastCity: city }),
    }),
    {
      name: 'weather-studio.cities.v1',
      version: 1,
      migrate: (persisted) => {
        const raw = persisted as Partial<PersistedCity> | undefined
        const favorites = Array.isArray(raw?.favorites)
          ? raw.favorites.map(sanitizeCity).filter((c): c is CityRef => c !== null)
          : []
        const lastCity = sanitizeCity(raw?.lastCity)
        return { favorites, lastCity }
      },
    },
  ),
)

export function isFavorite(favorites: CityRef[], id: string): boolean {
  return favorites.some((f) => f.id === id)
}
