// src/components/InteriorsClientForm.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAdminStore, type AdminStoreState } from '../lib/admin.store'

export interface StolarOption {
  id: string
  name: string // npr. "Stolarija Jurić (Rijeka)"
}

export interface ClientProjectFormValues {
  clientName: string
  email: string

  projectType: string
  location: string
  spaceStatus: string

  hasPlan: 'plan' | 'photos' | 'none' | ''
  planFiles: FileList | null
  photoFiles: FileList | null

  approxWidth: string
  approxLength: string
  approxHeight: string
  specialFeatures: string[]

  style: string[]
  mood: string[]
  colorPreference: string[]

  mainUsers: string
  priority: string[]

  budgetRange: string
  desiredStartDate: string
  flexibility: string

  hasOwnStolar: 'yes' | 'no' | ''
  stolarId: string
  stolarNotRegistered: string
  needStolarRecommendation: boolean

  inspirationFiles: FileList | null
  projectNote: string

  contactPreference: string
  contactTime: string
}

interface InteriorsClientFormProps {
  stolars: StolarOption[]
  onSubmit?: (values: ClientProjectFormValues) => void
}

const INITIAL_VALUES: ClientProjectFormValues = {
  clientName: '',
  email: '',

  projectType: '',
  location: '',
  spaceStatus: '',

  hasPlan: '',
  planFiles: null,
  photoFiles: null,

  approxWidth: '',
  approxLength: '',
  approxHeight: '',
  specialFeatures: [],

  style: [],
  mood: [],
  colorPreference: [],

  mainUsers: '',
  priority: [],

  budgetRange: '',
  desiredStartDate: '',
  flexibility: '',

  hasOwnStolar: '',
  stolarId: '',
  stolarNotRegistered: '',
  needStolarRecommendation: false,

  inspirationFiles: null,
  projectNote: '',

  contactPreference: '',
  contactTime: '',
}

const STYLE_OPTIONS = [
  'Moderno',
  'Minimalistički',
  'Skandinavski',
  'Rustikalno',
  'Klasično',
  'Industrijski',
  'Ne znam, treba mi pomoć',
]

const MOOD_OPTIONS = [
  'Toplo i udobno',
  'Čisto i jednostavno',
  'Luksuzno',
  'Razigrano / obiteljsko',
  'Profesionalno / poslovno',
]

const COLOR_OPTIONS = [
  'Svijetli tonovi',
  'Tamni tonovi',
  'Pastelne boje',
  'Jarke boje kao akcent',
  'Otvorena sam prijedlozima',
]

const PRIORITY_OPTIONS = [
  'Puno spremišta',
  'Lako čišćenje / održavanje',
  'Maksimalno svjetla',
  'Mjesto za druženje',
  'Prilagođeno djeci',
  'Prilagođeno kućnim ljubimcima',
]

export function InteriorsClientForm({ stolars, onSubmit }: InteriorsClientFormProps) {
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";

  const textareaClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner resize-y min-h-[96px] focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";

  const selectClass = inputClass;

  const [values, setValues] = useState<ClientProjectFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const addInteriorsRequest = useAdminStore((state: AdminStoreState) => state.addInteriorsRequest)

  function handleChange(
    field: keyof ClientProjectFormValues,
    value: ClientProjectFormValues[typeof field]
  ) {
    setValues(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: _, ...rest } = prev
        return rest
      })
    }
  }

  function handleToggleMulti(field: keyof ClientProjectFormValues, option: string) {
    setValues(prev => {
      const current = (prev[field] as string[]) || []
      const exists = current.includes(option)
      const next = exists ? current.filter(o => o !== option) : [...current, option]
      return { ...prev, [field]: next as any }
    })
    // Clear error for this field when user makes a selection
    if (errors[field]) {
      setErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: _, ...rest } = prev
        return rest
      })
    }
  }

  function validate(values: ClientProjectFormValues) {
    const newErrors: Record<string, string> = {}

    if (!values.clientName) newErrors.clientName = 'Molim te upiši ime i prezime ili naziv klijenta.'
    if (!values.email) newErrors.email = 'Molim te upiši email adresu.'
    if (!values.projectType) newErrors.projectType = 'Molim te odaberi tip prostora.'
    if (!values.location) newErrors.location = 'Molim te upiši grad ili lokaciju.'
    if (!values.spaceStatus) newErrors.spaceStatus = 'Molim te odaberi stanje prostora.'
    if (!values.hasPlan) newErrors.hasPlan = 'Molim te odaberi imaš li tlocrt ili skicu.'
    if (!values.mainUsers) newErrors.mainUsers = 'Molim te odaberi tko najviše koristi prostor.'
    if (!values.budgetRange) newErrors.budgetRange = 'Molim te odaberi okvirni budžet.'
    if (!values.desiredStartDate) newErrors.desiredStartDate = 'Molim te odaberi okvirni datum početka.'
    if (!values.flexibility) newErrors.flexibility = 'Molim te odaberi fleksibilnost roka.'
    if (!values.hasOwnStolar) newErrors.hasOwnStolar = 'Molim te odaberi imaš li svog stolara.'
    if (!values.contactPreference) newErrors.contactPreference = 'Molim te odaberi kako želiš da te kontaktiram.'

    return newErrors
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitted(false)

    const newErrors = validate(values)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    // Clear all errors and mark as submitted
    setErrors({})
    setIsSubmitted(true)

    // Save to admin store
    addInteriorsRequest({
      clientName: values.clientName || '',
      email: values.email || '',
      spaceType: values.projectType || 'Nije odabrano',
      city: values.location || '',
    })

    if (onSubmit) {
      onSubmit(values)
    } else {
      console.log('Client project form submitted:', values)
    }

    setValues(INITIAL_VALUES)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Naslov i podnaslov */}
      <div className="space-y-1 text-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Naručite svoj 3D prikaz interijera po mjeri
        </h2>
        <p className="text-sm text-slate-600">
          Ispunite formu s vašim dimenzijama, potrebama i opisom.
        </p>
      </div>

      {/* Legenda za checkboxe i radio gumbe */}
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Legenda: kružić (◉) znači da možeš odabrati <span className="font-semibold">samo jednu</span> opciju, a kvadratić (☑) da možeš odabrati <span className="font-semibold">više</span> opcija.
      </p>

      {/* Kontakt podaci */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Kontakt podaci</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Ime i prezime / naziv klijenta *</span>
            <input
              type="text"
              className={inputClass}
              value={values.clientName}
              onChange={e => handleChange('clientName', e.target.value)}
              required
            />
          </label>
          {errors.clientName && (
            <p className="text-xs text-red-500 mt-1">{errors.clientName}</p>
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
      </fieldset>

      {/* KORAK 1 – Osnovne informacije */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Osnovne informacije o prostoru</legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Tip prostora *</span>
              <select
                value={values.projectType}
                onChange={e => handleChange('projectType', e.target.value)}
                className={selectClass}
                required
              >
                <option value="">Odaberi...</option>
                <option value="kuhinja">Kuhinja</option>
                <option value="dnevni">Dnevni boravak</option>
                <option value="spavaca">Spavaća soba</option>
                <option value="djecja">Dječja soba</option>
                <option value="hodnik">Hodnik / predprostor</option>
                <option value="kupaonica">Kupaonica</option>
                <option value="ured">Ured / poslovni prostor</option>
                <option value="drugo">Drugo</option>
              </select>
            </label>
            {errors.projectType && (
              <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>
            )}
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Grad / lokacija *</span>
              <input
                type="text"
                value={values.location}
                onChange={e => handleChange('location', e.target.value)}
                className={inputClass}
                required
              />
            </label>
            {errors.location && (
              <p className="text-xs text-red-500 mt-1">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Prostor je *</span>
              <select
                value={values.spaceStatus}
                onChange={e => handleChange('spaceStatus', e.target.value)}
                className={selectClass}
                required
              >
                <option value="">Odaberi...</option>
                <option value="existing">Postojeći – renovacija</option>
                <option value="new">Potpuno novi (novogradnja)</option>
              </select>
            </label>
            {errors.spaceStatus && (
              <p className="text-xs text-red-500 mt-1">{errors.spaceStatus}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* KORAK 2 – Dimenzije i postojeće stanje */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Dimenzije i postojeće stanje</legend>

        <div>
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Imaš li tlocrt ili skicu? *</p>
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="hasPlan"
                value="plan"
                className="accent-violet-500"
                checked={values.hasPlan === 'plan'}
                onChange={() => handleChange('hasPlan', 'plan')}
                required
              />
              <span>Imam tlocrt</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="hasPlan"
                value="photos"
                className="accent-violet-500"
                checked={values.hasPlan === 'photos'}
                onChange={() => handleChange('hasPlan', 'photos')}
              />
              <span>Imam samo fotografije / skice</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="hasPlan"
                value="none"
                className="accent-violet-500"
                checked={values.hasPlan === 'none'}
                onChange={() => handleChange('hasPlan', 'none')}
              />
              <span>Nemam ništa od navedenog</span>
            </label>
          </div>
        </div>
        {errors.hasPlan && (
          <p className="text-xs text-red-500 mt-1">{errors.hasPlan}</p>
        )}

        {values.hasPlan === 'plan' && (
          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Učitaj tlocrt / nacrt</span>
              <div className="flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center rounded-full bg-violet-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-violet-600">
                  Odaberi datoteke
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    multiple
                    onChange={e => handleChange('planFiles', e.target.files)}
                  />
                </label>
                <span className="text-xs text-slate-500">
                  Možeš učitati više datoteka (preporučeno 3–5).
                </span>
              </div>
            </label>
          </div>
        )}

        {(values.hasPlan === 'photos' || values.hasPlan === 'none') && (
          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Učitaj fotografije prostora</span>
              <div className="flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center rounded-full bg-violet-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-violet-600">
                  Odaberi datoteke
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    multiple
                    onChange={e => handleChange('photoFiles', e.target.files)}
                  />
                </label>
                <span className="text-xs text-slate-500">
                  Možeš učitati više datoteka (preporučeno 3–5).
                </span>
              </div>
            </label>
          </div>
        )}

        {/* Dimenzije prostora */}
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Širina prostora (cca)</span>
            <input
              type="text"
              className={inputClass}
              value={values.approxWidth}
              onChange={e => handleChange('approxWidth', e.target.value)}
            />
            <span className="text-xs text-slate-500">npr. 3.5 m</span>
          </label>

          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Dužina prostora (cca)</span>
            <input
              type="text"
              className={inputClass}
              value={values.approxLength}
              onChange={e => handleChange('approxLength', e.target.value)}
            />
            <span className="text-xs text-slate-500">npr. 4.2 m</span>
          </label>

          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Visina prostora (cca)</span>
            <input
              type="text"
              className={inputClass}
              value={values.approxHeight}
              onChange={e => handleChange('approxHeight', e.target.value)}
            />
            <span className="text-xs text-slate-500">npr. 2.7 m</span>
          </label>
        </div>

        {/* Posebne karakteristike prostora */}
        <div>
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
            Posebne karakteristike prostora (moguć više odabira)
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {['Greda', 'Kosina', 'Stup', 'Niša u zidu', 'Sniženi strop', 'Drugo (opis u napomeni)'].map(option => (
              <label
                key={option}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  className="mt-1 accent-violet-500"
                  checked={values.specialFeatures.includes(option)}
                  onChange={() => handleToggleMulti('specialFeatures', option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* KORAK 3 – Stil, osjećaj, boje */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Stil i osjećaj prostora</legend>

        <div>
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Željeni stil</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {STYLE_OPTIONS.map(option => (
              <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 accent-violet-500"
                  checked={values.style.includes(option)}
                  onChange={() => handleToggleMulti('style', option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Kakav osjećaj želiš u prostoru?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {MOOD_OPTIONS.map(option => (
              <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 accent-violet-500"
                  checked={values.mood.includes(option)}
                  onChange={() => handleToggleMulti('mood', option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Preferirane boje</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {COLOR_OPTIONS.map(option => (
              <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 accent-violet-500"
                  checked={values.colorPreference.includes(option)}
                  onChange={() => handleToggleMulti('colorPreference', option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* KORAK 4 – Funkcija i navike */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Funkcija i navike</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Tko najviše koristi prostor? *</span>
            <select
              value={values.mainUsers}
              onChange={e => handleChange('mainUsers', e.target.value)}
              className={selectClass}
              required
            >
              <option value="">Odaberi...</option>
              <option value="single">1 osoba</option>
              <option value="couple">Par</option>
              <option value="familySmall">Obitelj s malom djecom</option>
              <option value="familyOlder">Obitelj sa starijom djecom</option>
              <option value="office">Ured / poslovni prostor</option>
            </select>
          </label>
          {errors.mainUsers && (
            <p className="text-xs text-red-500 mt-1">{errors.mainUsers}</p>
          )}
        </div>

        <div>
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Što ti je najvažnije?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {PRIORITY_OPTIONS.map(option => (
              <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 accent-violet-500"
                  checked={values.priority.includes(option)}
                  onChange={() => handleToggleMulti('priority', option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* KORAK 5 – Budžet i rok */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Budžet i rok</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Okvirni budžet za namještaj *</span>
            <select
              value={values.budgetRange}
              onChange={e => handleChange('budgetRange', e.target.value)}
              className={selectClass}
              required
            >
              <option value="">Odaberi...</option>
              <option value="0-1000">do 1.000 €</option>
              <option value="1000-3000">1.000 – 3.000 €</option>
              <option value="3000-7000">3.000 – 7.000 €</option>
              <option value="7000+">iznad 7.000 €</option>
              <option value="unknown">Ne znam, trebam okvirnu procjenu</option>
            </select>
          </label>
          {errors.budgetRange && (
            <p className="text-xs text-red-500 mt-1">{errors.budgetRange}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Kada bi ti okvirno odgovaralo da krenemo? *</span>
            <input
              type="date"
              className={inputClass}
              value={values.desiredStartDate}
              onChange={e => handleChange('desiredStartDate', e.target.value)}
              required
            />
          </label>
          {errors.desiredStartDate && (
            <p className="text-xs text-red-500 mt-1">{errors.desiredStartDate}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Koliko si fleksibilna s rokom? *</span>
            <select
              value={values.flexibility}
              onChange={e => handleChange('flexibility', e.target.value)}
              className={selectClass}
              required
            >
              <option value="">Odaberi...</option>
              <option value="fixed">Datum je fiksan</option>
              <option value="2weeks">Može kasniti do 2 tjedna</option>
              <option value="1month">Može kasniti do mjesec dana</option>
              <option value="flex">Vrlo fleksibilno</option>
            </select>
          </label>
          {errors.flexibility && (
            <p className="text-xs text-red-500 mt-1">{errors.flexibility}</p>
          )}
        </div>
      </fieldset>

      {/* KORAK 6 – Stolar / suradnja */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Stolar</legend>

        <div>
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Imaš li već svog stolara? *</p>
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="hasOwnStolar"
                value="yes"
                className="accent-violet-500"
                checked={values.hasOwnStolar === 'yes'}
                onChange={() => handleChange('hasOwnStolar', 'yes')}
                required
              />
              <span>Da, imam svog stolara</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="hasOwnStolar"
                value="no"
                className="accent-violet-500"
                checked={values.hasOwnStolar === 'no'}
                onChange={() => handleChange('hasOwnStolar', 'no')}
              />
              <span>Nemam stolara / treba mi preporuka</span>
            </label>
          </div>
        </div>
        {errors.hasOwnStolar && (
          <p className="text-xs text-red-500 mt-1">{errors.hasOwnStolar}</p>
        )}

        {values.hasOwnStolar === 'yes' && (
          <>
            <div>
              <label className="block space-y-1 text-sm sm:text-base text-slate-800">
                <span>Odaberi svog stolara (ako je registriran)</span>
                <select
                  value={values.stolarId}
                  onChange={e => handleChange('stolarId', e.target.value)}
                  className={selectClass}
                >
                  <option value="">Odaberi...</option>
                  {stolars.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="block space-y-1 text-sm sm:text-base text-slate-800">
                <span>Moj stolar još nije registriran (ime + kontakt)</span>
                <input
                  type="text"
                  className={inputClass}
                  value={values.stolarNotRegistered}
                  onChange={e =>
                    handleChange('stolarNotRegistered', e.target.value)
                  }
                  placeholder="Ime stolara i kontakt"
                />
              </label>
            </div>
          </>
        )}

        {values.hasOwnStolar === 'no' && (
          <div>
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 accent-violet-500"
                checked={values.needStolarRecommendation}
                onChange={e =>
                  handleChange('needStolarRecommendation', e.target.checked)
                }
              />
              <span>Želim preporuku stolara</span>
            </label>
          </div>
        )}
      </fieldset>

      {/* KORAK 7 – Inspiracija i opis */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Inspiracija i opis</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Učitaj slike inspiracije (npr. Pinterest, Instagram)</span>
            <div className="flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center rounded-full bg-violet-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-violet-600">
                Odaberi datoteke
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  multiple
                  onChange={e => handleChange('inspirationFiles', e.target.files)}
                />
              </label>
              <span className="text-xs text-slate-500">
                Možeš učitati više datoteka (preporučeno 3–5).
              </span>
            </div>
          </label>
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Opiši svojim riječima što ti je najvažnije u ovom prostoru</span>
            <textarea
              value={values.projectNote}
              className={textareaClass}
              onChange={e => handleChange('projectNote', e.target.value)}
              rows={4}
            />
          </label>
        </div>
      </fieldset>

      {/* KORAK 8 – Kontakt */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Kontakt</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Kako želiš da te kontaktiram? *</span>
            <select
              value={values.contactPreference}
              onChange={e => handleChange('contactPreference', e.target.value)}
              className={selectClass}
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
            <span>Kada ti najviše odgovara da te kontaktiram?</span>
            <input
              type="text"
              placeholder="npr. radnim danom od 17 do 20h"
              className={inputClass}
              value={values.contactTime}
              onChange={e => handleChange('contactTime', e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      {isSubmitted && (
        <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Hvala ti na povjerenju! Tvoj upit za interijerski projekt je zaprimljen.
          Javit ću ti se povratno s informacijama i prijedlozima u najkraćem mogućem roku.
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-violet-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2"
        >
          Pošalji upit za interijerski projekt
        </button>
      </div>
    </form>
  )
}
