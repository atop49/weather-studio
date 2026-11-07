import { useState } from 'react'
import { useWeatherStore } from '../lib/weather-store'
import { IconSearch } from './icons'

export function SearchBar() {
  const [value, setValue] = useState('')
  const loadQuery = useWeatherStore((s) => s.loadQuery)
  const status = useWeatherStore((s) => s.status)

  const submit = () => {
    if (value.trim() === '') return
    void loadQuery(value)
  }

  return (
    <form
      className="flex items-center gap-3 border-b border-hairline-strong pb-3"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <IconSearch width={16} height={16} className="flex-none text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="搜索城市，如 上海、Tokyo、Paris…"
        aria-label="城市名称"
        className="w-full bg-transparent text-[15px] text-ink placeholder:text-muted/80 focus:outline-none"
      />
      {status === 'loading' ? (
        <span className="mono-label flex-none text-muted">查询中…</span>
      ) : (
        <button
          type="submit"
          className="mono-label flex-none text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        >
          搜索
        </button>
      )}
    </form>
  )
}
