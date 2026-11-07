import { useCityStore } from '../store'
import { useWeatherStore } from '../lib/weather-store'
import { IconPin, IconX } from './icons'
import type { CityRef } from '../types'

export function FavoriteList() {
  const favorites = useCityStore((s) => s.favorites)
  const removeFavorite = useCityStore((s) => s.removeFavorite)
  const activeRef = useWeatherStore((s) => s.activeRef)
  const loadRef = useWeatherStore((s) => s.loadRef)
  const loadGeolocation = useWeatherStore((s) => s.loadGeolocation)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => void loadGeolocation()}
        className="flex items-center gap-1.5 bg-white/45 px-3 py-1.5 text-[12px] text-ink backdrop-blur-md transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
      >
        <IconPin width={13} height={13} />
        定位
      </button>
      {favorites.map((f) => (
        <FavoriteChip
          key={f.id}
          city={f}
          active={activeRef?.id === f.id}
          onSelect={() => void loadRef(f)}
          onRemove={() => removeFavorite(f.id)}
        />
      ))}
    </div>
  )
}

function FavoriteChip({
  city,
  active,
  onSelect,
  onRemove,
}: {
  city: CityRef
  active: boolean
  onSelect: () => void
  onRemove: () => void
}) {
  return (
    <span className={`relative flex items-center bg-white/45 backdrop-blur-md ${active ? 'ring-1 ring-accent' : ''}`}>
      {active && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-accent" />}
      <button
        type="button"
        onClick={onSelect}
        className="py-1.5 pl-4 pr-2 text-[12px] text-ink focus-visible:outline-none"
      >
        {city.name}
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="p-1.5 pr-2 text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        aria-label={`移除收藏 ${city.name}`}
      >
        <IconX width={11} height={11} />
      </button>
    </span>
  )
}
