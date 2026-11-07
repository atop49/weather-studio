const CDN = 'https://openweathermap.org/img/wn'

interface Props {
  code: string
  width?: number
  height?: number
  className?: string
}

export function OwmIcon({ code, width = 48, height = 48, className }: Props) {
  const safe = /^[0-9]{2}[dn]$/.test(code) ? code : '01d'
  return (
    <img
      src={`${CDN}/${safe}@2x.png`}
      width={width}
      height={height}
      alt=""
      className={className}
      loading="lazy"
      draggable={false}
    />
  )
}
