interface StatusBadgeProps {
  status: 'new' | 'read' | 'archived' | 'active' | 'completed'
  label: string
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const colors = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    read: 'bg-purple-100 text-purple-700 border-purple-200',
    archived: 'bg-slate-100 text-slate-600 border-slate-200',
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    completed: 'bg-green-100 text-green-700 border-green-200'
  }
  
  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
      border ${colors[status]}
      transition-all duration-200 hover:scale-105
    `}>
      {label}
    </span>
  )
}
