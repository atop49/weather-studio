export function formatTemp(n: number): string {
  return `${Math.round(n)}`
}

export function formatWind(n: number): string {
  return `${n.toFixed(1)} m/s`
}

const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function formatWeekday(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`)
  if (Number.isNaN(d.getTime())) return dateStr
  return WEEK[d.getDay()] ?? dateStr
}

export function formatMonthDay(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`)
  if (Number.isNaN(d.getTime())) return dateStr
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

export function formatObservedTime(tsSec: number): string {
  const d = new Date(tsSec * 1000)
  const h = d.getHours()
  const m = d.getMinutes()
  return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`
}
