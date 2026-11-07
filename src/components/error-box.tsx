import { IconX } from './icons'

export function ErrorBox({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div
      role="alert"
      className="flex items-start justify-between gap-4 bg-white/55 px-5 py-4 backdrop-blur-md"
    >
      <div>
        <div className="text-sm font-medium text-ink">查询遇到问题</div>
        <div className="mt-1 text-[13px] leading-relaxed text-muted">{message}</div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="mt-0.5 p-1 text-muted transition-colors hover:text-accent"
        aria-label="关闭提示"
      >
        <IconX width={14} height={14} />
      </button>
    </div>
  )
}
