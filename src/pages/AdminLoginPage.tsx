import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../providers/AdminAuthProvider'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { login, isAdmin } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/settings', { replace: true })
    }
  }, [isAdmin, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const ok = await login(password)

    if (ok) {
      const from = location.state?.from?.pathname
      navigate(from || '/admin/settings', { replace: true })
    } else {
      setError('Pogrešna lozinka. Pokušaj ponovno.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-8 border-b pb-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Admin prijava
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Ova stranica je namijenjena samo vlasniku Ani's Studia.
          </p>
        </header>

        {/* Login Card */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-900 mb-2"
                >
                  Lozinka
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-900"
                  placeholder="Unesite lozinku"
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !password.trim()}
                className="w-full px-4 py-2.5 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                  boxShadow: '0 2px 8px rgba(110, 68, 255, 0.3)'
                }}
              >
                {isSubmitting ? 'Prijava...' : 'Prijava'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

