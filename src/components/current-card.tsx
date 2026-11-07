import { useCityStore, isFavorite } from '../store'
import { useWeatherStore } from '../lib/weather-store'
import { formatWind, formatObservedTime } from '../lib/format'
import { OwmIcon } from './owm-icon'
import { IconDroplet, IconRefresh, IconStar, IconStarFilled, IconThermo, IconWind } from './icons'
import type { CurrentWeather } from '../types'

export function CurrentCard() {
  const current = useWeatherStore((s) => s.current)
  const activeRef = useWeatherStore((s) => s.activeRef)
  const status = useWeatherStore((s) => s.status)
  const loadRef = useWeatherStore((s) => s.loadRef)
  const favorites = useCityStore((s) => s.favorites)
  const addFavorite = useCityStore((s) => s.addFavorite)
  const removeFavorite = useCityStore((s) => s.removeFavorite)

  if (status !== 'ready' || !current || !activeRef) return null

  const faved = isFavorite(favorites, activeRef.id)
  const toggleFavorite = () => (faved ? removeFavorite(activeRef.id) : addFavorite(activeRef))

  return (
    <section className="border border-hairline bg-white/45 px-8 py-10 shadow-[0_12px_40px_rgba(17,17,17,0.07)] backdrop-blur-md">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl tracking-wide text-ink">
          {current.city}
          {current.country !== '' && <span className="ml-2 text-sm text-muted">{current.country}</span>}
        </h1>
        <div className="flex flex-none items-center gap-1">
          <button
            type="button"
            onClick={() => void loadRef(activeRef)}
            className="p-2 text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
            aria-label="刷新当前城市天气"
          >
            <IconRefresh width={16} height={16} />
          </button>
          <button
            type="button"
            onClick={toggleFavorite}
            className={
              faved
                ? 'p-2 text-accent'
                : 'p-2 text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none'
            }
            aria-label={faved ? '取消收藏' : '收藏此城市'}
            aria-pressed={faved}
          >
            {faved ? <IconStarFilled width={16} height={16} /> : <IconStar width={16} height={16} />}
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
        <TempReadout temp={current.temp} />
        <div className="flex flex-col items-center gap-1">
          <OwmIcon code={current.icon} width={72} height={72} className="drop-shadow-[0_1px_4px_rgba(17,17,17,0.18)]" />
          <div className="text-sm text-ink">{current.condition}</div>
        </div>
        <dl className="flex flex-col gap-2 text-[13px] text-muted">
          <div className="flex items-center gap-2">
            <IconDroplet width={14} height={14} className="flex-none" />
            <dt className="sr-only">湿度</dt>
            <dd>
              湿度 <span className="font-mono tabular-nums text-ink">{current.humidity}%</span>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <IconWind width={14} height={14} className="flex-none" />
            <dt className="sr-only">风速</dt>
            <dd>
              风速 <span className="font-mono tabular-nums text-ink">{formatWind(current.windSpeed)}</span>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <IconThermo width={14} height={14} className="flex-none" />
            <dt className="sr-only">体感温度</dt>
            <dd>
              体感 <span className="font-mono tabular-nums text-ink">{Math.round(current.feelsLike)}°</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mono-label mt-6 text-muted">观测于 {formatObservedTime(current.dt)}</div>
    </section>
  )
}

function TempReadout({ temp }: { temp: CurrentWeather['temp'] }) {
  return (
    <div className="font-mono text-[4.5rem] font-medium leading-none tracking-tight tabular-nums text-ink drop-shadow-[0_2px_6px_rgba(17,17,17,0.14)]">
      {Math.round(temp)}
      <span className="align-top text-3xl text-muted">°C</span>
    </div>
  )
}
