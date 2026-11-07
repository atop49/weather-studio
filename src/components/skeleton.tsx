export function SkeletonCard() {
  return (
    <div className="bg-white/45 px-8 py-10 backdrop-blur-md" aria-hidden="true">
      <div className="flex items-baseline justify-between">
        <div className="skeleton h-7 w-36" />
        <div className="skeleton h-4 w-16" />
      </div>
      <div className="mt-8 flex items-center gap-6">
        <div className="skeleton h-24 w-40" />
        <div className="skeleton h-16 w-16 rounded-full" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-4 w-28" />
      </div>
    </div>
  )
}

export function SkeletonStrip({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="min-w-[7.5rem] flex-1 bg-white/45 px-3 py-4 backdrop-blur-md">
          <div className="skeleton mx-auto h-3 w-10" />
          <div className="skeleton mx-auto mt-2 h-3 w-14" />
          <div className="skeleton mx-auto mt-4 h-8 w-8 rounded-full" />
          <div className="skeleton mx-auto mt-4 h-3 w-16" />
          <div className="skeleton mx-auto mt-2 h-3 w-20" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonPage() {
  return (
    <div className="flex flex-1 flex-col gap-5">
      <SkeletonCard />
      <SkeletonStrip />
    </div>
  )
}
