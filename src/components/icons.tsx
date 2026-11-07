interface IconProps {
  width?: number
  height?: number
  className?: string
}

function Svg({ width = 16, height = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function IconSearch(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="7" cy="7" r="4" />
      <path d="m10.5 10.5 3 3" />
    </Svg>
  )
}

export function IconStar(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 2.5l1.6 3.2 3.5.5-2.55 2.5.6 3.5L8 10.55 4.85 12.2l.6-3.5L2.9 6.2l3.5-.5L8 2.5Z" />
    </Svg>
  )
}

export function IconStarFilled(props: IconProps) {
  return (
    <svg
      width={props.width ?? 16}
      height={props.height ?? 16}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M8 2.5l1.6 3.2 3.5.5-2.55 2.5.6 3.5L8 10.55 4.85 12.2l.6-3.5L2.9 6.2l3.5-.5L8 2.5Z" />
    </svg>
  )
}

export function IconPin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 14s-4.5-3.7-4.5-7A4.5 4.5 0 0 1 8 2.5 4.5 4.5 0 0 1 12.5 7c0 3.3-4.5 7-4.5 7Z" />
      <circle cx="8" cy="7" r="1.5" />
    </Svg>
  )
}

export function IconRefresh(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
      <path d="M13.5 2.5v2.6h-2.6" />
    </Svg>
  )
}

export function IconX(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4 4 8 8M12 4l-8 8" />
    </Svg>
  )
}

export function IconDroplet(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 2.5s4 4.2 4 7.2a4 4 0 0 1-8 0c0-3 4-7.2 4-7.2Z" />
    </Svg>
  )
}

export function IconWind(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 6.5h7a2 2 0 1 0-2-2" />
      <path d="M2 10h9.5a2 2 0 1 1-2 2" />
    </Svg>
  )
}

export function IconThermo(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 9.2V3.5a1.5 1.5 0 0 1 3 0v5.7a3 3 0 1 1-3 0Z" />
    </Svg>
  )
}
