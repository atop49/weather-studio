import { useEffect } from 'react'
import { useWeatherStore } from './lib/weather-store'
import { useCityStore } from './store'
import { SearchBar } from './components/search-bar'
import { CurrentCard } from './components/current-card'
import { ForecastStrip } from './components/forecast-strip'
import { FavoriteList } from './components/favorite-list'
import { ErrorBox } from './components/error-box'
import { SkeletonPage } from './components/skeleton'

export default function App() {
  const status = useWeatherStore((s) => s.status)
  const forecast = useWeatherStore((s) => s.forecast)
  const errorMsg = useWeatherStore((s) => s.errorMsg)
  const activeRef = useWeatherStore((s) => s.activeRef)
  const loadRef = useWeatherStore((s) => s.loadRef)
  const lastCity = useCityStore((s) => s.lastCity)

  // 首次进入：恢复上次查询的城市
  useEffect(() => {
    if (status === 'idle' && lastCity) void loadRef(lastCity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-5 px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-xl tracking-wide text-ink">天气</h1>
          <p className="mono-label mt-1 text-muted">WEATHER STUDIO — 一眼知冷暖</p>
        </div>
        <span className="mono-label text-muted tabular-nums">OPENWEATHERMAP</span>
      </header>

      <SearchBar />
      <FavoriteList />

      {status === 'error' && (
        <ErrorBox
          message={errorMsg}
          onDismiss={() => useWeatherStore.setState({ status: 'idle', errorMsg: '' })}
        />
      )}

      {status === 'loading' ? (
        <SkeletonPage />
      ) : (
        <>
          {status === 'ready' && (
            <div className="card-enter flex flex-col gap-5">
              <CurrentCard />
              {forecast.length > 0 && <ForecastStrip days={forecast} />}
            </div>
          )}
          {status === 'idle' && (
            <div className="mt-16 border border-dashed border-hairline px-6 py-14 text-center">
              <p className="text-sm text-ink">搜索一个城市开始</p>
              <p className="mono-label mt-2 text-muted">或点击「定位」查看当前位置</p>
            </div>
          )}
        </>
      )}

      <footer className="mono-label mt-auto flex items-center justify-between pt-6 text-muted">
        <span>数据来源 OPENWEATHERMAP</span>
        {activeRef && <span className="tabular-nums">{activeRef.lat}, {activeRef.lon}</span>}
      </footer>
    </div>
  )
}
