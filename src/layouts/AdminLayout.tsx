import { Outlet } from 'react-router-dom'
import AdminNav from '../components/AdminNav'

/**
 * Persistent shell for authenticated admin routes.
 * Nav stays mounted; only the outlet content swaps (no page-level AnimatedPage).
 */
export default function AdminLayout() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <AdminNav />
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
