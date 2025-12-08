import { useState, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'
import AdminNav from '../components/AdminNav'

export default function AdminSettingsPage() {
  const { settings, isLoading, error, updateSettings } = useSettings()
  const [isToggling, setIsToggling] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [toggleError, setToggleError] = useState<string | null>(null)
  const [localEnabled, setLocalEnabled] = useState<boolean>(settings?.is_lrc_form_enabled ?? true)

  // Sync localEnabled with settings when settings change
  useEffect(() => {
    if (settings?.is_lrc_form_enabled !== undefined) {
      setLocalEnabled(settings.is_lrc_form_enabled)
    }
  }, [settings?.is_lrc_form_enabled])

  const handleToggle = async () => {
    if (!settings || isToggling) return

    setIsToggling(true)
    setSuccessMessage(null)
    setToggleError(null)

    const oldValue = localEnabled
    const newValue = !oldValue

    // Optimistic update
    setLocalEnabled(newValue)

    const result = await updateSettings({ is_lrc_form_enabled: newValue })

    if (result.success) {
      setSuccessMessage(
        newValue
          ? 'LRC prijave su sada omogućene.'
          : 'LRC prijave su sada onemogućene.'
      )
      setTimeout(() => setSuccessMessage(null), 3000)
    } else {
      // Rollback on error
      setLocalEnabled(oldValue)
      setToggleError('Nije uspjelo spremanje postavki. Pokušajte ponovno.')
    }

    setIsToggling(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <div className="px-4 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <header className="mb-8 border-b pb-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Postavke sustava
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Upravljaj postavkama Ani's Studio sustava.
          </p>
        </header>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">
              Greška: {error}
            </p>
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

        {/* Settings Card */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              LRC prijave
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Kada je isključeno, public LRC forma se skriva i na stranici se prikazuje poruka da trenutno nema otvorenih prijava za LRC radionice.
            </p>
          </div>

          <div className="px-6 py-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-slate-600">Učitavanje postavki...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-medium text-slate-900">
                      Omogući LRC prijave
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {localEnabled
                        ? 'Prijave su trenutno omogućene i forma za prijavu na LRC radionice je vidljiva korisnicima.'
                        : 'Prijave su trenutno onemogućene i korisnici vide poruku da trenutno nema otvorenih prijava za LRC radionice.'}
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={handleToggle}
                    disabled={isToggling || isLoading}
                    className={`
                      relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                      transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
                      ${localEnabled ? 'bg-violet-600' : 'bg-slate-200'}
                      ${isToggling || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    role="switch"
                    aria-checked={localEnabled}
                    aria-label="Toggle LRC form"
                  >
                    <span
                      className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                        transition duration-200 ease-in-out
                        ${localEnabled ? 'translate-x-5' : 'translate-x-0'}
                      `}
                    />
                  </button>
                </div>

                {/* Toggle Error Message */}
                {toggleError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-xs text-red-700">{toggleError}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Napomena:</strong> Promjene se primjenjuju odmah. Kada su LRC prijave
            onemogućene, korisnici vide poruku da trenutno nema otvorenih prijava za LRC radionice,
            ali webshop s gotovim proizvodima ostaje dostupan.
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}


