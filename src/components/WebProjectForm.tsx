// src/components/WebProjectForm.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAdminStore, type AdminStoreState } from '../lib/admin.store'

export interface WebProjectFormValues {
  // 1) Osnovne informacije
  fullNameOrCompany: string
  email: string
  phone: string
  existingWebsite: string
  referral: string

  // 2) Vrsta web projekta
  projectTypes: string[]
  projectTypesOther: string

  // 3) Ciljevi stranice
  goals: string[]
  goalsOther: string

  // 4) Sadržaj
  contentReady: 'yes' | 'partial' | 'no' | ''
  visualsReady: 'yes' | 'partial' | 'no' | ''
  contentLinks: string

  // 5) Dizajn i stil
  designMood: string[]
  designMoodOther: string
  designInspiration: string

  // 6) Funkcionalnosti
  features: string[]
  featuresOther: string
  featuresNotes: string

  // 7) Budžet i rok
  budgetRange: string
  launchDeadline: string
  deadlineFlexibility: string

  // 8) Kontakt i napomene
  contactPreference: string
  contactTime: string
  extraNotes: string
}

const INITIAL_VALUES: WebProjectFormValues = {
  fullNameOrCompany: '',
  email: '',
  phone: '',
  existingWebsite: '',
  referral: '',

  projectTypes: [],
  projectTypesOther: '',

  goals: [],
  goalsOther: '',

  contentReady: '',
  visualsReady: '',
  contentLinks: '',

  designMood: [],
  designMoodOther: '',
  designInspiration: '',

  features: [],
  featuresOther: '',
  featuresNotes: '',

  budgetRange: '',
  launchDeadline: '',
  deadlineFlexibility: '',

  contactPreference: '',
  contactTime: '',
  extraNotes: '',
}

const PROJECT_TYPES = [
  'Nova web stranica od nule',
  'Redizajn postojeće stranice',
  'Landing stranica za kampanju',
  'Web shop',
  'Portfolio / osobna stranica',
  'Sustav za rezervacije / termine',
  'Web aplikacija / SaaS',
  'Interna aplikacija / alat (za firmu)',
  'Drugo',
]

const GOALS = [
  'Predstaviti usluge / brand',
  'Prodavati proizvode online (web shop)',
  'Prikazati radove / portfolio',
  'Dobiti upite (leadove)',
  'Educirati (blog, članci, tutorijali)',
  'Primati rezervacije / termine online',
  'Omogućiti prijave / članstva (user accounti)',
  'Automatizirati interne procese (interna aplikacija / alat)',
  'Drugo',
]

const DESIGN_MOODS = [
  'Ozbiljno / poslovno',
  'Svježe i moderno',
  'Elegantno i luksuzno',
  'Razigrano i kreativno',
  'Minimalistički',
]

const FEATURES = [
  'Kontakt forma i osnovni upiti',
  'Blog / novosti',
  'Web shop (košarica, naplata)',
  'Sustav za rezervacije (kalendar, termini)',
  'Korisnički računi / članstvo',
  'Administratorski panel / dashboard',
  'Višejezičnost (npr. HR/EN)',
  'Integracija s newsletterom (Mailchimp, sl.)',
  'Integracije s vanjskim servisima (npr. CRM, sustav naplate)',
  'Integracija s društvenim mrežama',
  'Drugo',
]

export function WebProjectForm() {
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";
  
  const textareaClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner resize-y min-h-[96px] focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";
  
  const selectClass = inputClass;

  const [values, setValues] = useState<WebProjectFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const addWebProjectRequest = useAdminStore((state: AdminStoreState) => state.addWebProjectRequest)

  function handleChange(
    field: keyof WebProjectFormValues,
    value: WebProjectFormValues[typeof field]
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

  function handleToggleMulti(field: keyof WebProjectFormValues, option: string) {
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

  function validate(values: WebProjectFormValues) {
    const newErrors: Record<string, string> = {}
    
    if (!values.fullNameOrCompany) newErrors.fullNameOrCompany = 'Molim te upiši ime i prezime ili naziv firme.'
    if (!values.email) newErrors.email = 'Molim te upiši email.'
    if (values.projectTypes.length === 0) newErrors.projectTypes = 'Molim te odaberi barem jedan tip web projekta.'
    if (!values.budgetRange) newErrors.budgetRange = 'Molim te odaberi okvirni budžet.'
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

    // Save to admin store
    addWebProjectRequest({
      clientName: values.fullNameOrCompany,
      email: values.email,
      projectTypesSummary: Array.isArray(values.projectTypes)
        ? values.projectTypes.join(', ')
        : '',
      budgetRange: values.budgetRange || '',
    })

    console.log('Web project form submitted:', values)
    setValues(INITIAL_VALUES) // Reset form
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Naslov i podnaslov */}
        <div className="space-y-1 text-center mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Upit za web projekt
          </h2>
          <p className="text-sm text-slate-600">
            Ispunite formu s detaljima o vašem web projektu.
          </p>
        </div>

        {/* Legenda za checkboxe i radio gumbe */}
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Legenda: kružić (◉) znači da možeš odabrati <span className="font-semibold">samo jednu</span> opciju, a kvadratić (☑) da možeš odabrati <span className="font-semibold">više</span> opcija.
        </p>

        {/* 1) Osnovne informacije */}
        <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
          <legend className="text-lg font-semibold mb-2 text-slate-800">Osnovne informacije</legend>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Ime i prezime ili naziv firme *</span>
              <input
                type="text"
                className={inputClass}
                value={values.fullNameOrCompany}
                onChange={e => handleChange('fullNameOrCompany', e.target.value)}
                required
              />
            </label>
            {errors.fullNameOrCompany && (
              <p className="text-xs text-red-500 mt-1">{errors.fullNameOrCompany}</p>
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
              <span>Telefon</span>
              <input
                type="tel"
                className={inputClass}
                value={values.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Postoji li već web stranica? (URL)</span>
              <input
                type="url"
                className={inputClass}
                value={values.existingWebsite}
                onChange={e => handleChange('existingWebsite', e.target.value)}
                placeholder="https://..."
              />
            </label>
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Kako si saznao/la za Ani's Studio?</span>
              <select
                className={selectClass}
                value={values.referral}
                onChange={e => handleChange('referral', e.target.value)}
              >
                <option value="">Odaberi...</option>
                <option value="google">Google pretraživanje</option>
                <option value="social">Društvene mreže</option>
                <option value="recommendation">Preporuka</option>
                <option value="other">Drugo</option>
              </select>
            </label>
          </div>
        </fieldset>

        {/* 2) Vrsta web projekta */}
        <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
          <legend className="text-lg font-semibold mb-2 text-slate-800">Koji tip web projekta želiš? (može više odabira) *</legend>
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

          {values.projectTypes.includes('Drugo') && (
            <div>
              <label className="block space-y-1 text-sm sm:text-base text-slate-800">
                <span>Opiši drugi tip projekta</span>
                <input
                  type="text"
                  className={inputClass}
                  value={values.projectTypesOther}
                  onChange={e => handleChange('projectTypesOther', e.target.value)}
                  placeholder="Opiši..."
                />
              </label>
            </div>
          )}
        </fieldset>

        {/* 3) Ciljevi stranice */}
        <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
          <legend className="text-lg font-semibold mb-2 text-slate-800">Koji su glavni ciljevi tvog online projekta? (može više odabira)</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {GOALS.map(option => (
              <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 accent-violet-500"
                  checked={values.goals.includes(option)}
                  onChange={() => handleToggleMulti('goals', option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {values.goals.includes('Drugo') && (
            <div>
              <label className="block space-y-1 text-sm sm:text-base text-slate-800">
                <span>Opiši druge ciljeve</span>
                <input
                  type="text"
                  className={inputClass}
                  value={values.goalsOther}
                  onChange={e => handleChange('goalsOther', e.target.value)}
                  placeholder="Opiši..."
                />
              </label>
            </div>
          )}
        </fieldset>

        {/* 4) Sadržaj */}
        <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
          <legend className="text-lg font-semibold mb-2 text-slate-800">Sadržaj</legend>

          <div>
            <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Jesu li tekstovi spremni?</p>
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="contentReady"
                  value="yes"
                  className="accent-violet-500"
                  checked={values.contentReady === 'yes'}
                  onChange={e => handleChange('contentReady', e.target.value as 'yes' | 'partial' | 'no')}
                />
                <span>Da</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="contentReady"
                  value="partial"
                  className="accent-violet-500"
                  checked={values.contentReady === 'partial'}
                  onChange={e => handleChange('contentReady', e.target.value as 'yes' | 'partial' | 'no')}
                />
                <span>Djelomično</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="contentReady"
                  value="no"
                  className="accent-violet-500"
                  checked={values.contentReady === 'no'}
                  onChange={e => handleChange('contentReady', e.target.value as 'yes' | 'partial' | 'no')}
                />
                <span>Ne</span>
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Jesu li fotografije/vizuali spremni?</p>
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="visualsReady"
                  value="yes"
                  className="accent-violet-500"
                  checked={values.visualsReady === 'yes'}
                  onChange={e => handleChange('visualsReady', e.target.value as 'yes' | 'partial' | 'no')}
                />
                <span>Da</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="visualsReady"
                  value="partial"
                  className="accent-violet-500"
                  checked={values.visualsReady === 'partial'}
                  onChange={e => handleChange('visualsReady', e.target.value as 'yes' | 'partial' | 'no')}
                />
                <span>Djelomično</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="visualsReady"
                  value="no"
                  className="accent-violet-500"
                  checked={values.visualsReady === 'no'}
                  onChange={e => handleChange('visualsReady', e.target.value as 'yes' | 'partial' | 'no')}
                />
                <span>Ne</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Linkovi na postojeće materijale (Drive, Canva, stara stranica...)</span>
              <input
                type="text"
                className={inputClass}
                value={values.contentLinks}
                onChange={e => handleChange('contentLinks', e.target.value)}
                placeholder="https://..."
              />
            </label>
          </div>
        </fieldset>

        {/* 5) Dizajn i stil */}
        <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
          <legend className="text-lg font-semibold mb-2 text-slate-800">Dizajn i stil</legend>

          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
            Kakav stil dizajna želiš?
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {DESIGN_MOODS.map(option => (
              <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 accent-violet-500"
                  checked={values.designMood.includes(option)}
                  onChange={() => handleToggleMulti('designMood', option)}
                />
                <span>{option}</span>
              </label>
            ))}
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 accent-violet-500"
                checked={values.designMood.includes('Drugo')}
                onChange={() => handleToggleMulti('designMood', 'Drugo')}
              />
              <span>Drugo</span>
            </label>
          </div>

          {values.designMood.includes('Drugo') && (
            <div>
              <label className="block space-y-1 text-sm sm:text-base text-slate-800">
                <span>Opiši drugi stil</span>
                <input
                  type="text"
                  className={inputClass}
                  value={values.designMoodOther}
                  onChange={e => handleChange('designMoodOther', e.target.value)}
                  placeholder="Opiši..."
                />
              </label>
            </div>
          )}

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Linkovi na stranice koje ti se sviđaju + opis zašto</span>
              <textarea
                className={textareaClass}
                value={values.designInspiration}
                onChange={e => handleChange('designInspiration', e.target.value)}
                rows={4}
                placeholder="https://primjer.com - volim ovaj minimalistički pristup..."
              />
            </label>
          </div>
        </fieldset>

        {/* 6) Funkcionalnosti */}
        <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
          <legend className="text-lg font-semibold mb-2 text-slate-800">Funkcionalnosti</legend>

          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
            Koje funkcionalnosti želiš na stranici?
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {FEATURES.map(option => (
              <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 accent-violet-500"
                  checked={values.features.includes(option)}
                  onChange={() => handleToggleMulti('features', option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {values.features.includes('Drugo') && (
            <div>
              <label className="block space-y-1 text-sm sm:text-base text-slate-800">
                <span>Opiši druge funkcionalnosti</span>
                <input
                  type="text"
                  className={inputClass}
                  value={values.featuresOther}
                  onChange={e => handleChange('featuresOther', e.target.value)}
                  placeholder="Opiši..."
                />
              </label>
            </div>
          )}

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Dodatne funkcionalnosti ili specifični zahtjevi</span>
              <textarea
                className={textareaClass}
                value={values.featuresNotes}
                onChange={e => handleChange('featuresNotes', e.target.value)}
                rows={4}
                placeholder="Dodatne napomene o funkcionalnostima..."
              />
            </label>
          </div>
        </fieldset>

        {/* 7) Budžet i rok */}
        <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
          <legend className="text-lg font-semibold mb-2 text-slate-800">Budžet i rok</legend>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Okvirni budžet *</span>
              <select
                className={selectClass}
                value={values.budgetRange}
                onChange={e => handleChange('budgetRange', e.target.value)}
                required
              >
                <option value="">Odaberi...</option>
                <option value="under-1000">Do 1000 €</option>
                <option value="1000-3000">1000 – 3000 €</option>
                <option value="3000-7000">3000 – 7000 €</option>
                <option value="7000+">7000+ €</option>
              </select>
            </label>
            {errors.budgetRange && (
              <p className="text-xs text-red-500 mt-1">{errors.budgetRange}</p>
            )}
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Željeni datum pokretanja</span>
              <input
                type="date"
                className={inputClass}
                value={values.launchDeadline}
                onChange={e => handleChange('launchDeadline', e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Fleksibilnost roka</span>
              <select
                className={selectClass}
                value={values.deadlineFlexibility}
                onChange={e => handleChange('deadlineFlexibility', e.target.value)}
              >
                <option value="">Odaberi...</option>
                <option value="fixed">Fiksno</option>
                <option value="flexible">Može kasniti malo</option>
                <option value="very-flexible">Vrlo fleksibilno</option>
              </select>
            </label>
          </div>
        </fieldset>

        {/* 8) Kontakt i napomene */}
        <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
          <legend className="text-lg font-semibold mb-2 text-slate-800">Kontakt i napomene</legend>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Način kontaktiranja *</span>
              <select
                className={selectClass}
                value={values.contactPreference}
                onChange={e => handleChange('contactPreference', e.target.value)}
                required
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
                value={values.contactTime}
                onChange={e => handleChange('contactTime', e.target.value)}
                placeholder="npr. radnim danom od 9 do 17h"
              />
            </label>
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Dodatne napomene</span>
              <textarea
                className={textareaClass}
                value={values.extraNotes}
                onChange={e => handleChange('extraNotes', e.target.value)}
                rows={4}
                placeholder="Sve dodatne informacije koje bi mogle biti korisne..."
              />
            </label>
          </div>
        </fieldset>

        {/* Success message */}
        {isSubmitted && (
          <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Hvala ti na upitu! Tvoj web projekt je uspješno zaprimljen.
            Javit ću ti se povratno s prijedlozima strukture, dizajna i daljnjim koracima.
          </div>
        )}

        {/* Submit button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-violet-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2"
          >
            Pošalji upit za web projekt
          </button>
        </div>
      </form>
    </div>
  )
}

