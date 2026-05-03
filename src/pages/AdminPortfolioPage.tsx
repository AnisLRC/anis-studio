import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TableSkeleton } from '../components/Skeleton'
import {
  createPortfolioItem,
  deletePortfolioImage,
  deletePortfolioItem,
  fetchAdminPortfolioItems,
  updatePortfolioItem,
  uploadPortfolioImage,
  type PortfolioCategory,
  type PortfolioItem,
  type PortfolioItemInput,
} from '../lib/portfolio'

const CATEGORY_OPTIONS: { value: PortfolioCategory; label: string }[] = [
  { value: 'lrc', label: 'LRC' },
  { value: 'interiors', label: 'Interiors' },
  { value: 'web-atelier', label: 'Web atelier' },
]

const ACCEPT_IMAGES = 'image/jpeg,image/png,image/webp'

function emptyForm(category: PortfolioCategory = 'interiors'): PortfolioFormDraft {
  return {
    title: '',
    description: '',
    category,
    tagsCsv: '',
    image_alt: '',
    display_order: 0,
    is_visible: true,
    project_link: '',
    client_name: '',
    year_completed_input: '',
  }
}

interface PortfolioFormDraft {
  title: string
  description: string
  category: PortfolioCategory
  tagsCsv: string
  image_alt: string
  display_order: number
  is_visible: boolean
  project_link: string
  client_name: string
  year_completed_input: string
}

function itemToForm(item: PortfolioItem): PortfolioFormDraft {
  return {
    title: item.title,
    description: item.description ?? '',
    category: item.category,
    tagsCsv: item.tags.join(', '),
    image_alt: item.image_alt ?? '',
    display_order: item.display_order,
    is_visible: item.is_visible,
    project_link: item.project_link ?? '',
    client_name: item.client_name ?? '',
    year_completed_input:
      item.year_completed != null && Number.isFinite(item.year_completed)
        ? String(item.year_completed)
        : '',
  }
}

function parseTags(csv: string): string[] {
  return csv
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function parseYear(s: string): number | null {
  const t = s.trim()
  if (!t) return null
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [isLoadingList, setIsLoadingList] = useState(true)
  const [listError, setListError] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PortfolioFormDraft>(() => emptyForm())

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [blobPreviewUrl, setBlobPreviewUrl] = useState<string | null>(null)
  const [persistedImageUrl, setPersistedImageUrl] = useState<string | null>(null)

  const [formError, setFormError] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [storageCleanupWarning, setStorageCleanupWarning] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedFile) {
      setBlobPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(selectedFile)
    setBlobPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [selectedFile])

  const loadItems = useCallback(async () => {
    setIsLoadingList(true)
    setListError(null)
    try {
      const data = await fetchAdminPortfolioItems()
      setItems(data)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Neočekivana greška pri dohvatu liste.'
      setListError(msg)
    } finally {
      setIsLoadingList(false)
    }
  }, [])

  useEffect(() => {
    void loadItems()
  }, [loadItems])

  const previewUrl = useMemo(
    () => blobPreviewUrl ?? persistedImageUrl,
    [blobPreviewUrl, persistedImageUrl]
  )

  const resetFormToNew = useCallback(() => {
    setEditingId(null)
    setForm(emptyForm())
    setSelectedFile(null)
    setPersistedImageUrl(null)
    setFormError(null)
    setUploadError(null)
    setStorageCleanupWarning(null)
  }, [])

  const fillFormFromItem = useCallback((item: PortfolioItem) => {
    setEditingId(item.id)
    setForm(itemToForm(item))
    setSelectedFile(null)
    setPersistedImageUrl(item.image_url)
    setFormError(null)
    setUploadError(null)
    setStorageCleanupWarning(null)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null)
    const file = e.target.files?.[0] ?? null
    e.target.value = ''
    if (!file) {
      setSelectedFile(null)
      return
    }

    const mime = (file.type || '').toLowerCase()
    const ok = mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/webp'
    if (!ok) {
      setUploadError('Dopušteni formati su JPEG, PNG i WebP.')
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
  }

  const buildPayloadBase = (): PortfolioItemInput => {
    const tags = parseTags(form.tagsCsv)
    const year = parseYear(form.year_completed_input)

    const project_link_trim = form.project_link.trim()

    return {
      description: form.description.trim() || null,
      category: form.category,
      tags,
      image_alt: form.image_alt.trim() || null,
      display_order: Number.isFinite(form.display_order) ? form.display_order : 0,
      is_visible: form.is_visible,
      project_link: project_link_trim || null,
      client_name: form.client_name.trim() || null,
      year_completed: year,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setUploadError(null)
    setStorageCleanupWarning(null)

    const titleTrim = form.title.trim()
    if (!titleTrim) {
      setFormError('Naslov je obavezan.')
      return
    }

    setIsSaving(true)

    try {
      const existing =
        editingId != null ? items.find((x) => x.id === editingId) : undefined

      const previousStoragePathRaw =
        editingId != null && selectedFile ? existing?.image_path : undefined
      const previousStoragePath =
        typeof previousStoragePathRaw === 'string' && previousStoragePathRaw.trim() !== ''
          ? previousStoragePathRaw.trim()
          : null

      let image_url: string | null = existing?.image_url ?? persistedImageUrl
      let image_path: string | null = existing?.image_path ?? null

      if (selectedFile) {
        try {
          const up = await uploadPortfolioImage(selectedFile, form.category)
          image_url = up.publicUrl
          image_path = up.path
        } catch (upErr) {
          const um = upErr instanceof Error ? upErr.message : 'Upload nije uspio.'
          setUploadError(um)
          return
        }
      }

      const base = buildPayloadBase()

      if (editingId != null) {
        const updated = await updatePortfolioItem(editingId, {
          title: titleTrim,
          ...base,
          image_url,
          image_path,
        })
        setItems((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))
        fillFormFromItem(updated)

        if (
          previousStoragePath &&
          image_path &&
          previousStoragePath !== image_path
        ) {
          try {
            await deletePortfolioImage(previousStoragePath)
          } catch (cleanErr) {
            const cm =
              cleanErr instanceof Error
                ? cleanErr.message
                : 'Brisanje stare slike iz spremišta nije uspjelo.'
            console.warn(
              '[portfolio admin] Zamjena slike je u bazi spremljena, ali stara Storage datoteka nije uklonjena.',
              { previousPath: previousStoragePath, newPath: image_path, detail: cm }
            )
            setStorageCleanupWarning(
              `Stavka je spremljena u bazu, ali čišćenje stare slike možda nije uspjelo. Stara putanja (pokušaj brisanja): ${previousStoragePath}. ${cm}`
            )
          }
        }
      } else {
        const created = await createPortfolioItem({
          title: titleTrim,
          category: form.category,
          ...base,
          image_url,
          image_path,
        })
        setItems((prev) => [created, ...prev])
        resetFormToNew()
      }

      setSelectedFile(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Greška pri spremanju.'
      setFormError(msg)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (item: PortfolioItem) => {
    const ok = window.confirm(
      `Obrisati stavku "${item.title}"? Ovo se ne može poništiti.`
    )
    if (!ok) return

    const storagePathToRemove =
      typeof item.image_path === 'string' && item.image_path.trim() !== ''
        ? item.image_path.trim()
        : null

    setDeletingId(item.id)
    setFormError(null)
    setStorageCleanupWarning(null)
    try {
      await deletePortfolioItem(item.id)
      setItems((prev) => prev.filter((x) => x.id !== item.id))
      if (editingId === item.id) {
        resetFormToNew()
      }
      if (storagePathToRemove) {
        try {
          await deletePortfolioImage(storagePathToRemove)
        } catch (cleanErr) {
          const attemptedPath = storagePathToRemove
          const cm =
            cleanErr instanceof Error
              ? cleanErr.message
              : 'Brisanje slike iz spremišta nije uspjelo.'
          console.warn(
            '[portfolio admin] Stavka obrisana u bazi, ali čišćenje Storage nije uspjelo.',
            { attemptedPath, detail: cm }
          )
          setStorageCleanupWarning(
            `Stavka je uklonjena iz liste, ali slika možda još je u Storage. Pokušana putanja u bucketu: ${attemptedPath}. ${cm}`
          )
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Brisanje nije uspjelo.'
      setFormError(msg)
    } finally {
      setDeletingId(null)
    }
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500'

  const labelClass = 'block text-sm font-medium text-slate-700'

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-semibold text-slate-900">Portfolio</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Upravljanje portfolio stavkama i slikama za javni prikaz (sadržaj unosiš na hrvatskom / glavnom jeziku za sada — prijevodi javnog prikaza mogu dodati naknadno). Stvori novu stavku,
            uređuj postojeće ili obriši unos; promjene se odnose samo na admin i bazu podataka prema pravima pristupa.
          </p>
        </header>

        {listError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {listError}
          </div>
        )}

        {storageCleanupWarning && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            {storageCleanupWarning}
          </div>
        )}

        {formError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {formError}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr,minmax(320px,400px)]">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Stavke</h2>

            {isLoadingList && <TableSkeleton rows={6} />}

            {!isLoadingList && !listError && items.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
                Još nema portfolio stavki. Koristi obrazac desno ili ispod za dodavanje prve stavke.
              </div>
            )}

            {!isLoadingList && !listError && items.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Redosljed
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Naslov
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Kategorija
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Vidljivo
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Akcije
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((row) => {
                      const isActive = editingId === row.id
                      return (
                        <tr
                          key={row.id}
                          className={isActive ? 'bg-violet-50/70' : 'hover:bg-slate-50'}
                        >
                          <td className="whitespace-nowrap px-3 py-2 text-slate-700">
                            {row.display_order}
                          </td>
                          <td className="max-w-xs px-3 py-2 font-medium text-slate-900">
                            {row.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 text-slate-700">
                            {row.category}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 text-slate-700">
                            {row.is_visible ? 'Da' : 'Ne'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 text-right">
                            <button
                              type="button"
                              className="mr-2 text-violet-700 hover:underline disabled:opacity-50"
                              onClick={() => fillFormFromItem(row)}
                              disabled={isSaving}
                            >
                              Uredi
                            </button>
                            <button
                              type="button"
                              className="text-red-700 hover:underline disabled:opacity-50"
                              onClick={() => void handleDelete(row)}
                              disabled={deletingId === row.id || isSaving}
                            >
                              {deletingId === row.id ? 'Brišem…' : 'Obriši'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? 'Uredi stavku' : 'Nova stavka'}
              </h2>
              {(editingId != null || form.title.trim() !== '') && (
                <button
                  type="button"
                  onClick={() => resetFormToNew()}
                  className="shrink-0 text-sm font-medium text-slate-600 hover:text-violet-700"
                  disabled={isSaving}
                >
                  Očisti obrazac
                </button>
              )}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className={labelClass} htmlFor="pf-title">
                  Naslov <span className="text-red-600">*</span>
                </label>
                <input
                  id="pf-title"
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  disabled={isSaving}
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="pf-desc">
                  Opis
                </label>
                <textarea
                  id="pf-desc"
                  rows={3}
                  className={`${inputClass} resize-y min-h-[4.5rem]`}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="pf-category">
                  Kategorija <span className="text-red-600">*</span>
                </label>
                <select
                  id="pf-category"
                  className={inputClass}
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      category: e.target.value as PortfolioCategory,
                    }))
                  }
                  disabled={isSaving}
                  required
                >
                  {CATEGORY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="pf-tags">
                  Oznake (odvojene zarezom)
                </label>
                <input
                  id="pf-tags"
                  className={inputClass}
                  value={form.tagsCsv}
                  onChange={(e) => setForm((f) => ({ ...f, tagsCsv: e.target.value }))}
                  placeholder="vizualni identitet, web"
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="pf-file">
                  Slika (JPEG, PNG, WebP; do 10 MB)
                </label>
                <input
                  id="pf-file"
                  type="file"
                  accept={ACCEPT_IMAGES}
                  className="mt-1 block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-violet-800 hover:file:bg-violet-100"
                  onChange={handleFileChange}
                  disabled={isSaving}
                />
                {uploadError && (
                  <p className="mt-2 text-sm font-medium text-red-700">{uploadError}</p>
                )}
                {previewUrl && (
                  <div className="mt-3">
                    <p className="mb-1 text-xs font-medium text-slate-500">Pregled</p>
                    <img
                      src={previewUrl}
                      alt=""
                      className="max-h-40 max-w-full rounded-lg border border-slate-200 object-contain"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="pf-alt">
                  Alt tekst slike
                </label>
                <input
                  id="pf-alt"
                  className={inputClass}
                  value={form.image_alt}
                  onChange={(e) => setForm((f) => ({ ...f, image_alt: e.target.value }))}
                  disabled={isSaving}
                />
                <p className="mt-1 text-xs text-slate-500">
                  Kratki opis za pristupačnost (čitači zaslona). Unosi se na glavnom jeziku sadržaja.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="pf-order">
                    Redosljed prikaza
                  </label>
                  <input
                    id="pf-order"
                    type="number"
                    className={inputClass}
                    value={form.display_order}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        display_order: Number(e.target.value) || 0,
                      }))
                    }
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="pf-year">
                    Godina završetka
                  </label>
                  <input
                    id="pf-year"
                    type="number"
                    inputMode="numeric"
                    className={inputClass}
                    value={form.year_completed_input}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, year_completed_input: e.target.value }))
                    }
                    placeholder="2024"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="pf-visible"
                  type="checkbox"
                  checked={form.is_visible}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, is_visible: e.target.checked }))
                  }
                  disabled={isSaving}
                  className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                <label htmlFor="pf-visible" className="text-sm font-medium text-slate-700">
                  Vidljivo na javnom portfelju
                </label>
              </div>

              <div>
                <label className={labelClass} htmlFor="pf-link">
                  Poveznica projekta
                </label>
                <input
                  id="pf-link"
                  type="url"
                  className={inputClass}
                  value={form.project_link}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, project_link: e.target.value }))
                  }
                  placeholder="https://"
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="pf-client">
                  Ime klijenta
                </label>
                <input
                  id="pf-client"
                  className={inputClass}
                  value={form.client_name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, client_name: e.target.value }))
                  }
                  disabled={isSaving}
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? 'Spremanje…' : editingId ? 'Spremi promjene' : 'Spremi stavku'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
