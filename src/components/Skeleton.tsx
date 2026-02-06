interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangle' | 'circle'
}

export const Skeleton = ({ className = '', variant = 'text' }: SkeletonProps) => {
  const baseClass = 'animate-pulse bg-slate-200 dark:bg-slate-700'
  
  const variantClass = {
    text: 'h-4 rounded',
    rectangle: 'rounded-lg',
    circle: 'rounded-full'
  }[variant]
  
  return <div className={`${baseClass} ${variantClass} ${className}`} />
}

// Table skeleton for admin lists
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <Skeleton variant="circle" className="w-10 h-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-3/4" />
          <Skeleton className="w-1/2" />
        </div>
        <Skeleton variant="rectangle" className="w-20 h-8" />
      </div>
    ))}
  </div>
)

// Card skeleton for project cards
export const CardSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <Skeleton variant="rectangle" className="w-full h-48 mb-4" />
        <Skeleton className="w-3/4 mb-2" />
        <Skeleton className="w-full mb-2" />
        <Skeleton className="w-5/6" />
      </div>
    ))}
  </div>
)
