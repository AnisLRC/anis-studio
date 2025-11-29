// src/components/StolarProfileForm.tsx
import { useState, FormEvent } from 'react'

export interface StolarProfileFormValues {
  // Osnovni podaci
  companyName: string
  contactPerson: string
  email: string
  phone: string
  location: string
  oib: string

  // Tipovi projekata
  projectTypes: string[]

  // Materijali i debljine
  boards: string
  worktops: string
  fronts: string

  // Okovi / brendovi
  hardwareBrands: string[]
  hardwareOther: string

  // Kapacitet i rokovi
  monthlyCapacity: string
  averageProductionTime: string
  deadlineNotes: string

  // Suradnja
  wantsCompleteDrawings: boolean
  usesPartialSolutions: boolean
  collaborationNotes: string

  // Kontakt preferencije
  contactPreference: string
  bestContactTime: string
}

const INITIAL_VALUES: StolarProfileFormValues = {
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  location: '',
  oib: '',

  projectTypes: [],

  boards: '',
  worktops: '',
  fronts: '',

  hardwareBrands: [],
  hardwareOther: '',

  monthlyCapacity: '',
  averageProductionTime: '',
  deadlineNotes: '',

  wantsCompleteDrawings: false,
  usesPartialSolutions: false,
  collaborationNotes: '',

  contactPreference: '',
  bestContactTime: '',
}

const PROJECT_TYPES = [
  'Kuhinje',
  'Dnevni boravci',
  'Spavaće sobe',
  'Dječje sobe',
  'Uredski namještaj',
  'Ugradbeni ormari',
  'Ostalo (drugi namještaj)',
]

const HARDWARE_BRANDS = ['Hettich', 'Blum', 'Grass']

export function StolarProfileForm() {
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";

  const textareaClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner resize-y min-h-[96px] focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";

  const selectClass = inputClass;

  const [values, setValues] = useState<StolarProfileFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(
    field: keyof StolarProfileFormValues,
    value: StolarProfileFormValues[typeof field]
  ) {
    setValues(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user changes it
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev
        return rest
      })
    }
  }

  function handleToggleMulti(field: keyof StolarProfileFormValues, option: string) {
    setValues(prev => {
      const current = (prev[field] as string[]) || []
      const exists = current.includes(option)
      const next = exists ? current.filter(o => o !== option) : [...current, option]
      return { ...prev, [field]: next as any }
    })
    // Clear error for this field when user changes it
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev
        return rest
      })
    }
  }

  function validate(values: StolarProfileFormValues) {
    const newErrors: Record<string, string> = {}
    
    if (!values.companyName) newErrors.companyName = 'Molim te upiši naziv firme.'
    if (!values.contactPerson) newErrors.contactPerson = 'Molim te upiši ime i prezime kontakt osobe.'
    if (!values.email) newErrors.email = 'Molim te upiši email.'
    if (!values.phone) newErrors.phone = 'Molim te upiši telefon.'
    if (!values.location) newErrors.location = 'Molim te upiši grad ili lokaciju.'
    
    if (values.projectTypes.length === 0) newErrors.projectTypes = 'Molim te odaberi barem jedan tip projekta.'
    
    if (!values.boards) newErrors.boards = 'Molim te upiši informacije o pločama.'
    if (!values.worktops) newErrors.worktops = 'Molim te upiši informacije o radnim pločama.'
    if (!values.fronts) newErrors.fronts = 'Molim te upiši informacije o frontovima.'
    
    if (!values.monthlyCapacity) newErrors.monthlyCapacity = 'Molim te upiši koliko projekata mjesečno možeš preuzeti.'
    if (!values.averageProductionTime) newErrors.averageProductionTime = 'Molim te upiši prosječan rok izrade.'
    
    if (!values.contactPreference) newErrors.contactPreference = 'Molim te odaberi način kontaktiranja.'
    
    return newErrors
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitted(false)

    const newErrors = validate(values)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return // Stop if there are errors
    }

    setErrors({}) // Clear all errors on successful validation
    setIsSubmitted(true)

    console.log('Stolar profile submitted:', values)
    setValues(INITIAL_VALUES) // Reset form
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-8 space-y-8">
      <h1>Profil stolara</h1>
      <p>Ispunite formu jednom da biste se registrirali kao stolar partner.</p>

      {/* 1) Osnovni podaci */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Osnovni podaci</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Naziv firme / obrta *</span>
            <input
              type="text"
              className={inputClass}
              value={values.companyName}
              onChange={e => handleChange('companyName', e.target.value)}
              required
            />
          </label>
          {errors.companyName && (
            <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Ime i prezime kontakt osobe *</span>
            <input
              type="text"
              className={inputClass}
              value={values.contactPerson}
              onChange={e => handleChange('contactPerson', e.target.value)}
              required
            />
          </label>
          {errors.contactPerson && (
            <p className="text-xs text-red-500 mt-1">{errors.contactPerson}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Email *</span>
            <input
              type="email"
              className={inputClass}
              value={values.email}
              onChange={e => handleChange('email', e.target.value)}
              required
            />
          </label>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Telefon *</span>
            <input
              type="tel"
              className={inputClass}
              value={values.phone}
              onChange={e => handleChange('phone', e.target.value)}
              required
            />
          </label>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Grad / lokacija *</span>
            <input
              type="text"
              className={inputClass}
              value={values.location}
              onChange={e => handleChange('location', e.target.value)}
              required
            />
          </label>
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>OIB</span>
            <input
              type="text"
              className={inputClass}
              value={values.oib}
              onChange={e => handleChange('oib', e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      {/* 2) Tipovi projekata */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Tipovi projekata koje rade</legend>

        <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
          Tipovi projekata koje radite (može više odabira) *
        </p>
        <div className={`grid gap-2 sm:grid-cols-2 ${errors.projectTypes ? 'border border-red-300 rounded-xl bg-red-50/40 px-3 py-2' : ''}`}>
          {PROJECT_TYPES.map(option => (
            <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 accent-violet-500"
                checked={values.projectTypes.includes(option)}
                onChange={() => handleToggleMulti('projectTypes', option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.projectTypes && (
          <p className="text-xs text-red-500 mt-1">{errors.projectTypes}</p>
        )}
      </fieldset>

      {/* 3) Materijali i debljine */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Materijali i debljine koje standardno koriste</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Ploče (npr. 18mm, 19mm, 36mm...) *</span>
            <input
              type="text"
              className={inputClass}
              value={values.boards}
              onChange={e => handleChange('boards', e.target.value)}
              placeholder="npr. 18mm, 19mm, 36mm..."
            />
          </label>
          {errors.boards && (
            <p className="text-xs text-red-500 mt-1">{errors.boards}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Radne ploče (materijali, debljine...) *</span>
            <input
              type="text"
              className={inputClass}
              value={values.worktops}
              onChange={e => handleChange('worktops', e.target.value)}
              placeholder="npr. kvarc, granit, laminat..."
            />
          </label>
          {errors.worktops && (
            <p className="text-xs text-red-500 mt-1">{errors.worktops}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Frontovi (materijali, finiši...) *</span>
            <input
              type="text"
              className={inputClass}
              value={values.fronts}
              onChange={e => handleChange('fronts', e.target.value)}
              placeholder="npr. MDF, HPL, melamin..."
            />
          </label>
          {errors.fronts && (
            <p className="text-xs text-red-500 mt-1">{errors.fronts}</p>
          )}
        </div>
      </fieldset>

      {/* 4) Okovi / brendovi */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Okovi / brendovi</legend>

        <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
          Okovi / brendovi koje koristite (može više odabira)
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {HARDWARE_BRANDS.map(brand => (
            <label key={brand} className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 accent-violet-500"
                checked={values.hardwareBrands.includes(brand)}
                onChange={() => handleToggleMulti('hardwareBrands', brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Ostali okovi / napomena</span>
            <input
              type="text"
              className={inputClass}
              value={values.hardwareOther}
              onChange={e => handleChange('hardwareOther', e.target.value)}
              placeholder="npr. Mepla, Hafele..."
            />
          </label>
        </div>
      </fieldset>

      {/* 5) Kapacitet i rokovi */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Kapacitet i rokovi</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Koliko projekata mjesečno mogu realno preuzeti? *</span>
            <input
              type="text"
              className={inputClass}
              value={values.monthlyCapacity}
              onChange={e => handleChange('monthlyCapacity', e.target.value)}
              placeholder="npr. 3-5 projekata"
            />
          </label>
          {errors.monthlyCapacity && (
            <p className="text-xs text-red-500 mt-1">{errors.monthlyCapacity}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Prosječan rok izrade u tjednima *</span>
            <input
              type="text"
              className={inputClass}
              value={values.averageProductionTime}
              onChange={e => handleChange('averageProductionTime', e.target.value)}
              placeholder="npr. 4-6 tjedana"
            />
          </label>
          {errors.averageProductionTime && (
            <p className="text-xs text-red-500 mt-1">{errors.averageProductionTime}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Napomena o rokovima</span>
            <textarea
              className={textareaClass}
              value={values.deadlineNotes}
              onChange={e => handleChange('deadlineNotes', e.target.value)}
              rows={4}
              placeholder="Dodatne napomene o rokovima izrade..."
            />
          </label>
        </div>
      </fieldset>

      {/* 6) Suradnja s Ani's Studiom */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Suradnja s Ani's Studiom / Corpus</legend>

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1 accent-violet-500"
              checked={values.wantsCompleteDrawings}
              onChange={e => handleChange('wantsCompleteDrawings', e.target.checked)}
            />
            <span>Želim da mi Ani priprema kompletne nacrte i krojne liste</span>
          </label>
        </div>

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1 accent-violet-500"
              checked={values.usesPartialSolutions}
              onChange={e => handleChange('usesPartialSolutions', e.target.checked)}
            />
            <span>Koristit ću dijelove rješenja (djelomična izrada po crtežu)</span>
          </label>
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Posebne napomene za suradnju</span>
            <textarea
              className={textareaClass}
              value={values.collaborationNotes}
              onChange={e => handleChange('collaborationNotes', e.target.value)}
              rows={4}
              placeholder="Dodatne napomene o suradnji..."
            />
          </label>
        </div>
      </fieldset>

      {/* 7) Kontakt preferencije */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Kontakt preferencije</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Način kontaktiranja *</span>
            <select
              className={selectClass}
              value={values.contactPreference}
              onChange={e => handleChange('contactPreference', e.target.value)}
            >
              <option value="">Odaberi...</option>
              <option value="email">Email</option>
              <option value="phone">Telefon</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="viber">Viber</option>
            </select>
          </label>
          {errors.contactPreference && (
            <p className="text-xs text-red-500 mt-1">{errors.contactPreference}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Najbolje vrijeme za kontakt</span>
            <input
              type="text"
              className={inputClass}
              value={values.bestContactTime}
              onChange={e => handleChange('bestContactTime', e.target.value)}
              placeholder="npr. radnim danom od 8 do 16h"
            />
          </label>
        </div>
      </fieldset>

      {/* Success message */}
      {isSubmitted && (
        <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Hvala ti! Tvoj profil stolara je uspješno zaprimljen.
          Na temelju ovih podataka ću ti prilagoditi nacrte i suradnju na budućim projektima.
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-violet-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2"
        >
          Spremi profil stolara
        </button>
      </div>
    </form>
  )
}

