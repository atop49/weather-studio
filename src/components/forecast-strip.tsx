import { formatWeekday, formatMonthDay } from '../lib/format'
import { OwmIcon } from './owm-icon'
import type { ForecastDay } from '../types'

export function ForecastStrip({ days }: { days: ForecastDay[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1" role="list" aria-label="未来预报">
      {days.map((d) => (
        <div
          key={d.date}
          role="listitem"
          className="flex min-w-[7.5rem] flex-1 flex-col items-center gap-1.5 border border-hairline bg-white/45 px-3 py-4 shadow-[0_8px_24px_rgba(17,17,17,0.05)] backdrop-blur-md"
        >
          <div className="mono-label text-muted">{formatWeekday(d.date)}</div>
          <div className="text-[11px] text-muted">{formatMonthDay(d.date)}</div>
          <OwmIcon code={d.icon} width={34} height={34} />
          <div className="mt-1 font-mono text-sm tabular-nums text-ink">
            <span className="font-medium">{Math.round(d.tempMax)}°</span>
            <span className="ml-1.5 text-muted">{Math.round(d.tempMin)}°</span>
          </div>
          <div className="text-center text-[11px] leading-snug text-muted">{d.condition}</div>
        </div>
      ))}
    </div>
  )
}
