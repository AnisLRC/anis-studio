// src/components/InteriorsClientForm.tsx
import { useState, FormEvent } from 'react'

export interface StolarOption {
  id: string
  name: string // npr. "Stolarija Jurić (Rijeka)"
}

export interface ClientProjectFormValues {
  projectType: string
  location: string
  spaceStatus: string

  hasPlan: 'plan' | 'photos' | 'none' | ''
  planFiles: FileList | null
  photoFiles: FileList | null

  approxWidth: string
  approxLength: string
  approxHeight: string

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
  projectType: '',
  location: '',
  spaceStatus: '',

  hasPlan: '',
  planFiles: null,
  photoFiles: null,

  approxWidth: '',
  approxLength: '',
  approxHeight: '',

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
  const [values, setValues] = useState<ClientProjectFormValues>(INITIAL_VALUES)

  function handleChange(
    field: keyof ClientProjectFormValues,
    value: ClientProjectFormValues[typeof field]
  ) {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  function handleToggleMulti(field: keyof ClientProjectFormValues, option: string) {
    setValues(prev => {
      const current = (prev[field] as string[]) || []
      const exists = current.includes(option)
      const next = exists ? current.filter(o => o !== option) : [...current, option]
      return { ...prev, [field]: next as any }
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(values)
    } else {
      console.log('Client project form submitted:', values)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* KORAK 1 – Osnovne informacije */}
      <fieldset>
        <legend>Osnovne informacije o prostoru</legend>

        <div>
          <label>
            Tip prostora *
            <select
              value={values.projectType}
              onChange={e => handleChange('projectType', e.target.value)}
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
        </div>

        <div>
          <label>
            Grad / lokacija *
            <input
              type="text"
              value={values.location}
              onChange={e => handleChange('location', e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Prostor je *
            <select
              value={values.spaceStatus}
              onChange={e => handleChange('spaceStatus', e.target.value)}
              required
            >
              <option value="">Odaberi...</option>
              <option value="existing">Postojeći – renovacija</option>
              <option value="new">Potpuno novi (novogradnja)</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* KORAK 2 – Dimenzije i postojeće stanje */}
      <fieldset>
        <legend>Dimenzije i postojeće stanje</legend>

        <div>
          <span>Imaš li tlocrt ili skicu? *</span>
          <label>
            <input
              type="radio"
              name="hasPlan"
              value="plan"
              checked={values.hasPlan === 'plan'}
              onChange={() => handleChange('hasPlan', 'plan')}
              required
            />
            Imam tlocrt
          </label>
          <label>
            <input
              type="radio"
              name="hasPlan"
              value="photos"
              checked={values.hasPlan === 'photos'}
              onChange={() => handleChange('hasPlan', 'photos')}
            />
            Imam samo fotografije / skice
          </label>
          <label>
            <input
              type="radio"
              name="hasPlan"
              value="none"
              checked={values.hasPlan === 'none'}
              onChange={() => handleChange('hasPlan', 'none')}
            />
            Nemam ništa od navedenog
          </label>
        </div>

        {values.hasPlan === 'plan' && (
          <div>
            <label>
              Učitaj tlocrt / nacrt
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={e => handleChange('planFiles', e.target.files)}
              />
            </label>
          </div>
        )}

        {(values.hasPlan === 'photos' || values.hasPlan === 'none') && (
          <div>
            <label>
              Učitaj fotografije prostora
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={e => handleChange('photoFiles', e.target.files)}
              />
            </label>
          </div>
        )}

        <div>
          <label>
            Širina prostora (cca)
            <input
              type="text"
              placeholder="npr. 3.5 m"
              value={values.approxWidth}
              onChange={e => handleChange('approxWidth', e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Dužina prostora (cca)
            <input
              type="text"
              placeholder="npr. 4.2 m"
              value={values.approxLength}
              onChange={e => handleChange('approxLength', e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Visina prostora (cca)
            <input
              type="text"
              placeholder="npr. 2.7 m"
              value={values.approxHeight}
              onChange={e => handleChange('approxHeight', e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      {/* KORAK 3 – Stil, osjećaj, boje */}
      <fieldset>
        <legend>Stil i osjećaj prostora</legend>

        <div>
          <span>Željeni stil</span>
          {STYLE_OPTIONS.map(option => (
            <label key={option}>
              <input
                type="checkbox"
                checked={values.style.includes(option)}
                onChange={() => handleToggleMulti('style', option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div>
          <span>Kakav osjećaj želiš u prostoru?</span>
          {MOOD_OPTIONS.map(option => (
            <label key={option}>
              <input
                type="checkbox"
                checked={values.mood.includes(option)}
                onChange={() => handleToggleMulti('mood', option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div>
          <span>Preferirane boje</span>
          {COLOR_OPTIONS.map(option => (
            <label key={option}>
              <input
                type="checkbox"
                checked={values.colorPreference.includes(option)}
                onChange={() => handleToggleMulti('colorPreference', option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {/* KORAK 4 – Funkcija i navike */}
      <fieldset>
        <legend>Funkcija i navike</legend>

        <div>
          <label>
            Tko najviše koristi prostor? *
            <select
              value={values.mainUsers}
              onChange={e => handleChange('mainUsers', e.target.value)}
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
        </div>

        <div>
          <span>Što ti je najvažnije?</span>
          {PRIORITY_OPTIONS.map(option => (
            <label key={option}>
              <input
                type="checkbox"
                checked={values.priority.includes(option)}
                onChange={() => handleToggleMulti('priority', option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {/* KORAK 5 – Budžet i rok */}
      <fieldset>
        <legend>Budžet i rok</legend>

        <div>
          <label>
            Okvirni budžet za namještaj *
            <select
              value={values.budgetRange}
              onChange={e => handleChange('budgetRange', e.target.value)}
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
        </div>

        <div>
          <label>
            Kada bi ti okvirno odgovaralo da krenemo? *
            <input
              type="date"
              value={values.desiredStartDate}
              onChange={e => handleChange('desiredStartDate', e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Koliko si fleksibilna s rokom? *
            <select
              value={values.flexibility}
              onChange={e => handleChange('flexibility', e.target.value)}
              required
            >
              <option value="">Odaberi...</option>
              <option value="fixed">Datum je fiksan</option>
              <option value="2weeks">Može kasniti do 2 tjedna</option>
              <option value="1month">Može kasniti do mjesec dana</option>
              <option value="flex">Vrlo fleksibilno</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* KORAK 6 – Stolar / suradnja */}
      <fieldset>
        <legend>Stolar</legend>

        <div>
          <span>Imaš li već svog stolara? *</span>
          <label>
            <input
              type="radio"
              name="hasOwnStolar"
              value="yes"
              checked={values.hasOwnStolar === 'yes'}
              onChange={() => handleChange('hasOwnStolar', 'yes')}
              required
            />
            Da, imam svog stolara
          </label>
          <label>
            <input
              type="radio"
              name="hasOwnStolar"
              value="no"
              checked={values.hasOwnStolar === 'no'}
              onChange={() => handleChange('hasOwnStolar', 'no')}
            />
            Nemam stolara / treba mi preporuka
          </label>
        </div>

        {values.hasOwnStolar === 'yes' && (
          <>
            <div>
              <label>
                Odaberi svog stolara (ako je registriran)
                <select
                  value={values.stolarId}
                  onChange={e => handleChange('stolarId', e.target.value)}
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
              <label>
                Moj stolar još nije registriran (ime + kontakt)
                <input
                  type="text"
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
            <label>
              <input
                type="checkbox"
                checked={values.needStolarRecommendation}
                onChange={e =>
                  handleChange('needStolarRecommendation', e.target.checked)
                }
              />
              Želim preporuku stolara
            </label>
          </div>
        )}
      </fieldset>

      {/* KORAK 7 – Inspiracija i opis */}
      <fieldset>
        <legend>Inspiracija i opis</legend>

        <div>
          <label>
            Učitaj slike inspiracije (npr. Pinterest, Instagram)
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={e => handleChange('inspirationFiles', e.target.files)}
            />
          </label>
        </div>

        <div>
          <label>
            Opiši svojim riječima što ti je najvažnije u ovom prostoru
            <textarea
              value={values.projectNote}
              onChange={e => handleChange('projectNote', e.target.value)}
              rows={4}
            />
          </label>
        </div>
      </fieldset>

      {/* KORAK 8 – Kontakt */}
      <fieldset>
        <legend>Kontakt</legend>

        <div>
          <label>
            Kako želiš da te kontaktiram? *
            <select
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
        </div>

        <div>
          <label>
            Kada ti najviše odgovara da te kontaktiram?
            <input
              type="text"
              placeholder="npr. radnim danom od 17 do 20h"
              value={values.contactTime}
              onChange={e => handleChange('contactTime', e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      <button type="submit">Pošalji upit za interijerski projekt</button>
    </form>
  )
}
