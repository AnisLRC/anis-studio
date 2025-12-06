import { useState, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'

export default function AdminSettingsPage() {
  const { settings, isLoading, error, updateSettings } = useSettings()
  const [isToggling, setIsToggling] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleToggle = async () => {
    if (!settings || isToggling) return

    setIsToggling(true)
    setSuccessMessage(null)

    const newValue = !settings.is_lrc_form_enabled
    const result = await updateSettings({ is_lrc_form_enabled: newValue })

    if (result.success) {
      setSuccessMessage(
        newValue
          ? 'LRC forma je sada omogućena.'
          : 'LRC forma je sada onemogućena.'
      )
      setTimeout(() => setSuccessMessage(null), 3000)
    }

    setIsToggling(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
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
              LRC Forma
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Omogući ili onemogući formu za personalizirane narudžbe na /lrc stranici.
              Webshop će uvijek ostati vidljiv.
            </p>
          </div>

          <div className="px-6 py-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-slate-600">Učitavanje postavki...</p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-slate-900">
                    Omogući LRC formu
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {settings?.is_lrc_form_enabled
                      ? 'Forma je trenutno omogućena i vidljiva korisnicima.'
                      : 'Forma je trenutno onemogućena i skrivena korisnicima.'}
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
                    ${settings?.is_lrc_form_enabled ? 'bg-violet-600' : 'bg-slate-200'}
                    ${isToggling || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  role="switch"
                  aria-checked={settings?.is_lrc_form_enabled}
                  aria-label="Toggle LRC form"
                >
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                      transition duration-200 ease-in-out
                      ${settings?.is_lrc_form_enabled ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Napomena:</strong> Promjene se primjenjuju odmah. Kada je forma
            onemogućena, korisnici neće moći slati upite za personalizirane narudžbe,
            ali webshop s gotovim proizvodima ostaje dostupan.
          </p>
        </div>
      </div>
    </div>
  )
}

