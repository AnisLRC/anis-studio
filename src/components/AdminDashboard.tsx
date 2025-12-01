// src/components/AdminDashboard.tsx
import { useState } from 'react'
import { useAdminStore } from '../lib/admin.store'
import type { RequestStatus } from '../lib/admin.store'

const STATUS_META: Record<
  RequestStatus,
  { label: string; bg: string; text: string }
> = {
  new: {
    label: 'Novi upit',
    bg: 'bg-sky-100',
    text: 'text-sky-800',
  },
  queued: {
    label: 'Na listi čekanja',
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
  },
  in_progress: {
    label: 'U radu',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
  },
  done: {
    label: 'Završeno',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
  },
  cancelled: {
    label: 'Otkazano',
    bg: 'bg-rose-100',
    text: 'text-rose-800',
  },
}

function StatusBadge({ status }: { status: RequestStatus }) {
  const meta = STATUS_META[status]
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        meta.bg,
        meta.text,
      ].join(' ')}
    >
      {meta.label}
    </span>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'interiors' | 'stolars' | 'web'>('interiors')
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all')
  const [archiveFilter, setArchiveFilter] = useState<'active' | 'archived' | 'all'>('active')

  const {
    interiors,
    stolars,
    web,
    updateStatus,
    toggleArchive,
    deleteInteriorsRequest,
  } = useAdminStore()

  const filteredInteriors = interiors
    .filter((req) =>
      statusFilter === 'all' ? true : req.status === statusFilter
    )
    .filter((req) => {
      if (archiveFilter === 'all') return true
      if (archiveFilter === 'active') return !req.isArchived
      return req.isArchived
    })

  const filteredStolars = stolars
    .filter((profile) =>
      statusFilter === 'all' ? true : profile.status === statusFilter
    )
    .filter((profile) => {
      if (archiveFilter === 'all') return true
      if (archiveFilter === 'active') return !profile.isArchived
      return profile.isArchived
    })

  const filteredWeb = web
    .filter((req) =>
      statusFilter === 'all' ? true : req.status === statusFilter
    )
    .filter((req) => {
      if (archiveFilter === 'all') return true
      if (archiveFilter === 'active') return !req.isArchived
      return req.isArchived
    })

  function handleStatusChange(
    type: 'interiors' | 'stolars' | 'web',
    id: string,
    status: RequestStatus
  ) {
    updateStatus(type, id, status)
  }

  function handleArchiveToggle(
    type: 'interiors' | 'stolars' | 'web',
    id: string
  ) {
    toggleArchive(type, id)
  }

  function handleMarkInvalid(
    type: 'interiors' | 'stolars' | 'web',
    id: string
  ) {
    handleStatusChange(type, id, 'cancelled')
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Naslov */}
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-slate-900">Admin dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Pregled upita za interijere, stolare i web projekte.
          </p>
        </header>

        {/* Tab navigacija */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('interiors')}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm transition ${
              activeTab === 'interiors'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Interijeri
          </button>
          <button
            onClick={() => setActiveTab('stolars')}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm transition ${
              activeTab === 'stolars'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Stolari
          </button>
          <button
            onClick={() => setActiveTab('web')}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm transition ${
              activeTab === 'web'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Web projekti
          </button>
        </div>

        {/* Status filter */}
        <div className="mb-4 flex flex-wrap gap-2 text-xs sm:text-sm">
          {[
            { key: 'all', label: 'Svi' },
            { key: 'new', label: 'Novi' },
            { key: 'queued', label: 'Na listi čekanja' },
            { key: 'in_progress', label: 'U radu' },
            { key: 'done', label: 'Završeni' },
            { key: 'cancelled', label: 'Otkazano' },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() =>
                setStatusFilter(f.key === 'all' ? 'all' : (f.key as RequestStatus))
              }
              className={[
                'rounded-full border px-3 py-1',
                statusFilter === f.key
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Archive filter */}
        <div className="mb-4 flex flex-wrap gap-2 text-xs sm:text-sm">
          {[
            { key: 'active', label: 'Aktivni' },
            { key: 'archived', label: 'Arhiva' },
            { key: 'all', label: 'Svi' },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setArchiveFilter(f.key as 'active' | 'archived' | 'all')}
              className={[
                'rounded-full border px-3 py-1',
                archiveFilter === f.key
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tablice */}
        {activeTab === 'interiors' && (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="border-b px-4 py-3">
              <h2 className="text-sm font-semibold">Interijeri – upiti klijenata</h2>
            </div>
            {filteredInteriors.length === 0 ? (
              <p className="px-4 py-6 text-sm text-slate-500">
                Trenutno nema upita za interijere.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto -mx-2 sm:mx-0">
                <table className="min-w-[720px] w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2">Datum</th>
                      <th className="px-4 py-2">Klijent</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Tip prostora</th>
                      <th className="px-4 py-2">Grad</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Stolar</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInteriors.map(req => {
                      const stolar = stolars.find((s) => s.id === req.stolarId)
                      return (
                      <tr key={req.id} className="border-t">
                        <td className="px-4 py-2 text-xs">{formatDate(req.createdAt)}</td>
                        <td className="px-4 py-2">{req.clientName}</td>
                        <td className="px-4 py-2 text-xs text-slate-600">{req.email}</td>
                        <td className="px-4 py-2 text-xs">{req.spaceType}</td>
                        <td className="px-4 py-2 text-xs">{req.city}</td>
                        <td className="px-4 py-2 text-sm text-slate-700">{stolar ? stolar.companyName : '—'}</td>
                        <td className="px-4 py-2 text-xs sm:text-sm">
                          <div className="flex flex-col items-center gap-2">
                            <StatusBadge status={req.status} />
                            <select
                              value={req.status}
                              onChange={(e) =>
                                handleStatusChange('interiors', req.id, e.target.value as RequestStatus)
                              }
                              className="w-full max-w-[160px] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                            >
                              <option value="new">Novi upit</option>
                              <option value="queued">Na listi čekanja</option>
                              <option value="in_progress">U radu</option>
                              <option value="done">Završeno</option>
                              <option value="cancelled">Otkazano</option>
                            </select>
                            <div className="flex flex-wrap justify-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkInvalid('interiors', req.id)
                                }
                                className="rounded-full border border-rose-200 px-2 py-0.5 text-[10px] text-rose-700 hover:bg-rose-50"
                              >
                                Nevažeće
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleArchiveToggle('interiors', req.id)
                                }
                                className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 hover:bg-slate-50"
                              >
                                {req.isArchived ? 'Vrati iz arhive' : 'Arhiviraj'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm('Jeste li sigurni da želite trajno obrisati ovaj upit?')) {
                                    deleteInteriorsRequest(req.id)
                                  }
                                }}
                                className="text-xs text-red-600 hover:text-red-700 underline ml-2"
                              >
                                Obriši
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stolars' && (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="border-b px-4 py-3">
              <h2 className="text-sm font-semibold">Stolari – profili</h2>
            </div>
            {filteredStolars.length === 0 ? (
              <p className="px-4 py-6 text-sm text-slate-500">
                Trenutno nema registriranih stolara.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto -mx-2 sm:mx-0">
                <table className="min-w-[720px] w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2">Firma</th>
                      <th className="px-4 py-2">Kontakt osoba</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Lokacija</th>
                      <th className="px-4 py-2">Tipovi projekata</th>
                      <th className="px-4 py-2">Kapacitet</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStolars.map(profile => (
                      <tr key={profile.id} className="border-t">
                        <td className="px-4 py-2">{profile.companyName}</td>
                        <td className="px-4 py-2 text-xs">{profile.contactPerson}</td>
                        <td className="px-4 py-2 text-xs text-slate-600">{profile.email}</td>
                        <td className="px-4 py-2 text-xs">{profile.location}</td>
                        <td className="px-4 py-2 text-xs">{profile.projectTypesSummary}</td>
                        <td className="px-4 py-2 text-xs">{profile.monthlyCapacity}</td>
                        <td className="px-4 py-2 text-xs sm:text-sm">
                          <div className="flex flex-col items-center gap-2">
                            <StatusBadge status={profile.status} />
                            <select
                              value={profile.status}
                              onChange={(e) =>
                                handleStatusChange('stolars', profile.id, e.target.value as RequestStatus)
                              }
                              className="w-full max-w-[160px] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                            >
                              <option value="new">Novi upit</option>
                              <option value="queued">Na listi čekanja</option>
                              <option value="in_progress">U radu</option>
                              <option value="done">Završeno</option>
                              <option value="cancelled">Otkazano</option>
                            </select>
                            <div className="flex flex-wrap justify-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkInvalid('stolars', profile.id)
                                }
                                className="rounded-full border border-rose-200 px-2 py-0.5 text-[10px] text-rose-700 hover:bg-rose-50"
                              >
                                Nevažeće
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleArchiveToggle('stolars', profile.id)
                                }
                                className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 hover:bg-slate-50"
                              >
                                {profile.isArchived ? 'Vrati iz arhive' : 'Arhiviraj'}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'web' && (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="border-b px-4 py-3">
              <h2 className="text-sm font-semibold">Web projekti – upiti</h2>
            </div>
            {filteredWeb.length === 0 ? (
              <p className="px-4 py-6 text-sm text-slate-500">
                Trenutno nema upita za web projekte.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto -mx-2 sm:mx-0">
                <table className="min-w-[720px] w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2">Datum</th>
                      <th className="px-4 py-2">Klijent</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Vrsta web projekta</th>
                      <th className="px-4 py-2">Budžet</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWeb.map(req => (
                      <tr key={req.id} className="border-t">
                        <td className="px-4 py-2 text-xs">{formatDate(req.createdAt)}</td>
                        <td className="px-4 py-2">{req.clientName}</td>
                        <td className="px-4 py-2 text-xs text-slate-600">{req.email}</td>
                        <td className="px-4 py-2 text-xs">{req.projectTypesSummary}</td>
                        <td className="px-4 py-2 text-xs">{req.budgetRange}</td>
                        <td className="px-4 py-2 text-xs sm:text-sm">
                          <div className="flex flex-col items-center gap-2">
                            <StatusBadge status={req.status} />
                            <select
                              value={req.status}
                              onChange={(e) =>
                                handleStatusChange('web', req.id, e.target.value as RequestStatus)
                              }
                              className="w-full max-w-[160px] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                            >
                              <option value="new">Novi upit</option>
                              <option value="queued">Na listi čekanja</option>
                              <option value="in_progress">U radu</option>
                              <option value="done">Završeno</option>
                              <option value="cancelled">Otkazano</option>
                            </select>
                            <div className="flex flex-wrap justify-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkInvalid('web', req.id)
                                }
                                className="rounded-full border border-rose-200 px-2 py-0.5 text-[10px] text-rose-700 hover:bg-rose-50"
                              >
                                Nevažeće
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleArchiveToggle('web', req.id)
                                }
                                className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 hover:bg-slate-50"
                              >
                                {req.isArchived ? 'Vrati iz arhive' : 'Arhiviraj'}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
