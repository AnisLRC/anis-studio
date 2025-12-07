// src/components/InteriorsClientForm.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAdminStore, type AdminStoreState } from '../lib/admin.store'
import { createClient, createProject, uploadProjectFileToStorage, type VrLocationPreference, type VrPackagePreference, type ProjectFile } from '../lib/interiors'

export interface StolarOption {
  id: string
  name: string // npr. "Stolarija Jurić (Rijeka)"
}

export interface ClientProjectFormValues {
  clientName: string
  email: string
  phone: string

  projectType: string
  location: string
  spaceStatus: string

  hasPlan: 'plan' | 'photos' | 'none' | ''
  planFiles: File[]
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

  projectNote: string

  contactPreference: string
  contactTime: string

  wantsVr: boolean
  vrLocationPreference: VrLocationPreference | null
  vrPackagePreference: VrPackagePreference | null
}

interface InteriorsClientFormProps {
  stolars: StolarOption[]
  onSubmit?: (values: ClientProjectFormValues) => void
  language?: 'hr' | 'en'
}

const INITIAL_VALUES: ClientProjectFormValues = {
  clientName: '',
  email: '',
  phone: '',

  projectType: '',
  location: '',
  spaceStatus: '',

  hasPlan: '',
  planFiles: [],
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

  projectNote: '',

  contactPreference: '',
  contactTime: '',

  wantsVr: false,
  vrLocationPreference: null,
  vrPackagePreference: null,
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

export function InteriorsClientForm({ stolars, onSubmit, language = 'hr' }: InteriorsClientFormProps) {
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";

  const textareaClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner resize-y min-h-[96px] focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";

  const selectClass = inputClass;

  const [values, setValues] = useState<ClientProjectFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [selectedPlanFileNames, setSelectedPlanFileNames] = useState<string[]>([])
  const [selectedPhotoFileName, setSelectedPhotoFileName] = useState<string | null>(null)
  const [selectedInspirationFileNames, setSelectedInspirationFileNames] = useState<string[]>([])
  const [inspirationFiles, setInspirationFiles] = useState<File[]>([])

  const addInteriorsRequest = useAdminStore((state: AdminStoreState) => state.addInteriorsRequest)

  const translations = {
    errors: {
      nameRequired: {
        hr: 'Ime i prezime ili naziv klijenta je obavezno',
        en: 'Client name is required'
      },
      emailRequired: {
        hr: 'Email je obavezan',
        en: 'Email is required'
      },
      emailInvalid: {
        hr: 'Molimo unesite valjanu email adresu',
        en: 'Please enter a valid email address'
      },
      phoneRequired: {
        hr: 'Molim te, upiši broj mobitela kako bih te mogla kontaktirati.',
        en: 'Please enter your phone number so I can contact you.'
      },
      projectTypeRequired: {
        hr: 'Molimo odaberite tip prostora',
        en: 'Please select space type'
      },
      locationRequired: {
        hr: 'Molimo unesite grad ili lokaciju',
        en: 'Please enter city or location'
      },
      spaceStatusRequired: {
        hr: 'Molimo odaberite stanje prostora',
        en: 'Please select space status'
      },
      hasPlanRequired: {
        hr: 'Molimo odaberite imate li tlocrt ili skicu',
        en: 'Please select if you have a plan or sketch'
      },
      mainUsersRequired: {
        hr: 'Molimo odaberite tko najviše koristi prostor',
        en: 'Please select main users'
      },
      projectDescriptionRequired: {
        hr: 'Molimo unesite opis projekta (najmanje 10 znakova)',
        en: 'Please enter project description (at least 10 characters)'
      },
      budgetRequired: {
        hr: 'Molimo odaberite okvirni budžet',
        en: 'Please select budget range'
      },
      desiredStartDateRequired: {
        hr: 'Molimo odaberite okvirni datum početka',
        en: 'Please select desired start date'
      },
      flexibilityRequired: {
        hr: 'Molimo odaberite fleksibilnost roka',
        en: 'Please select deadline flexibility'
      },
      hasOwnStolarRequired: {
        hr: 'Molimo odaberite imate li svog stolara',
        en: 'Please select if you have your own carpenter'
      },
      contactRequired: {
        hr: 'Molimo odaberite način kontaktiranja',
        en: 'Please select contact preference'
      }
    },
    success: {
      hr: 'Hvala ti na povjerenju! Tvoj upit za interijerski projekt je zaprimljen. Javit ću ti se povratno s informacijama i prijedlozima u najkraćem mogućem roku.',
      en: 'Thank you for your trust! Your interior project inquiry has been received. I will get back to you with information and proposals as soon as possible.'
    },
    vr: {
      wantsVr: {
        hr: 'Želim ponudu i za VR šetnju mojim budućim interijerom',
        en: 'I want a quote for VR walkthrough of my future interior'
      },
      locationTitle: {
        hr: 'Gdje želite VR prezentaciju?',
        en: 'Where would you like the VR presentation?'
      },
      locationStudio: {
        hr: 'Kod Ane u studiju',
        en: 'At Ana\'s studio'
      },
      locationClientHome: {
        hr: 'Kod mene doma',
        en: 'At my home'
      },
      locationUnsure: {
        hr: 'Nisam siguran, treba mi savjet',
        en: 'I\'m not sure, I need advice'
      },
      packageTitle: {
        hr: 'Koji VR paket vas zanima?',
        en: 'Which VR package interests you?'
      },
      package3dVr: {
        hr: '3D projekt + VR obilazak',
        en: '3D project + VR walkthrough'
      },
      package3dVrOnline: {
        hr: '3D + VR + online za obitelj',
        en: '3D + VR + online for family'
      },
      packageUnsure: {
        hr: 'Nisam siguran',
        en: 'I\'m not sure'
      }
    },
    error: {
      hr: 'Greška pri spremanju, pokušaj ponovno.',
      en: 'Error saving, please try again.'
    },
    fileUpload: {
      selectedFile: {
        hr: 'Odabrana datoteka:',
        en: 'Selected file:'
      },
      noFileSelected: {
        hr: 'Niste još odabrali datoteku.',
        en: 'No file selected yet.'
      },
      noFilesSelected: {
        hr: 'Niste još odabrali datoteke.',
        en: 'No files selected yet.'
      },
      oneFileSelectedLabel: {
        hr: 'Odabrana datoteka:',
        en: 'Selected file:'
      },
      multipleFilesSelectedLabel: {
        hr: 'Odabrane datoteke:',
        en: 'Selected files:'
      }
    }
  }

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
      return { ...prev, [field]: next }
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

  type FileField = 'planFile' | 'photoFiles' | 'inspirationFiles'

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: FileField
  ) => {
    const files = event.target.files
    if (!files) return

    if (field === 'planFile') {
      const fileArray = Array.from(files)

      // imena za prikaz
      setSelectedPlanFileNames(fileArray.map((file) => file.name))

      // sve datoteke u values.planFiles (File[])
      setValues((prev) => ({
        ...prev,
        planFiles: fileArray,
      }))

      return
    } else if (field === 'inspirationFiles') {
      const fileArray = Array.from(files)
      const fileNames = fileArray.map((file) => file.name)

      // imena za prikaz
      setSelectedInspirationFileNames(fileNames)

      // stvarne datoteke držimo u posebnom stateu, NE u values
      setInspirationFiles(fileArray)

      // ne diramo values.inspirationFiles – to polje ni ne postoji u tipu
      return
    } else {
      // trenutno je ovo samo za photoFiles, pa ako to koristiš neka ostane ovako
      setValues((prev) => ({
        ...prev,
        [field]: files,
      }))
    }
  }


  function validate(values: ClientProjectFormValues): { isValid: boolean; errors: Record<string, string>; firstErrorField: string | null } {
    const newErrors: Record<string, string> = {}

    // Validate name
    if (!values.clientName.trim()) {
      newErrors.clientName = translations.errors.nameRequired[language]
    }

    // Validate email
    if (!values.email.trim()) {
      newErrors.email = translations.errors.emailRequired[language]
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(values.email.trim())) {
        newErrors.email = translations.errors.emailInvalid[language]
      }
    }

    // Validate phone
    if (!values.phone.trim()) {
      newErrors.phone = translations.errors.phoneRequired[language]
    }

    // Validate project type
    if (!values.projectType) {
      newErrors.projectType = translations.errors.projectTypeRequired[language]
    }

    // Validate location
    if (!values.location.trim()) {
      newErrors.location = translations.errors.locationRequired[language]
    }

    // Validate space status
    if (!values.spaceStatus) {
      newErrors.spaceStatus = translations.errors.spaceStatusRequired[language]
    }

    // Validate has plan
    if (!values.hasPlan) {
      newErrors.hasPlan = translations.errors.hasPlanRequired[language]
    }

    // Validate main users
    if (!values.mainUsers) {
      newErrors.mainUsers = translations.errors.mainUsersRequired[language]
    }

    // Validate project description (projectNote)
    if (!values.projectNote.trim() || values.projectNote.trim().length < 10) {
      newErrors.projectNote = translations.errors.projectDescriptionRequired[language]
    }

    // Validate budget
    if (!values.budgetRange) {
      newErrors.budgetRange = translations.errors.budgetRequired[language]
    }

    // Validate desired start date
    if (!values.desiredStartDate) {
      newErrors.desiredStartDate = translations.errors.desiredStartDateRequired[language]
    }

    // Validate flexibility
    if (!values.flexibility) {
      newErrors.flexibility = translations.errors.flexibilityRequired[language]
    }

    // Validate has own stolar
    if (!values.hasOwnStolar) {
      newErrors.hasOwnStolar = translations.errors.hasOwnStolarRequired[language]
    }

    // Validate contact preference
    if (!values.contactPreference) {
      newErrors.contactPreference = translations.errors.contactRequired[language]
    }

    const firstErrorField = Object.keys(newErrors)[0] || null

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
      firstErrorField
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitted(false)
    setSubmitError(null)

    const validation = validate(values)
    setErrors(validation.errors)

    if (!validation.isValid) {
      // Focus first error field
      if (validation.firstErrorField) {
        setTimeout(() => {
          const field = document.getElementById(validation.firstErrorField!) || 
                       document.querySelector(`[name="${validation.firstErrorField}"]`) ||
                       document.querySelector(`input[name="${validation.firstErrorField}"], select[name="${validation.firstErrorField}"], textarea[name="${validation.firstErrorField}"]`)
          if (field) {
            field.focus()
            field.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
      return
    }

    // Clear all errors
    setErrors({})
    setIsSubmitting(true)

    try {
      // Calculate area_m2 from approxWidth and approxLength if available
      let areaM2: number | null = null
      if (values.approxWidth && values.approxLength) {
        const width = parseFloat(values.approxWidth.replace(/[^\d.,]/g, '').replace(',', '.'))
        const length = parseFloat(values.approxLength.replace(/[^\d.,]/g, '').replace(',', '.'))
        if (!isNaN(width) && !isNaN(length) && width > 0 && length > 0) {
          areaM2 = width * length
        }
      }

      // Parse budget from budgetRange
      let budget: number | null = null
      if (values.budgetRange) {
        const budgetMatch = values.budgetRange.match(/(\d+)/g)
        if (budgetMatch && budgetMatch.length > 0) {
          budget = parseFloat(budgetMatch[0]) * 1000 // Convert to euros if needed
        }
      }

      // Include inspiration files info in notes
      const inspirationCount = inspirationFiles.length
      const notesWithFilesInfo = inspirationCount > 0
        ? `${values.projectNote.trim() || ''}\n\nInspiration files attached: ${inspirationCount}`
        : values.projectNote.trim() || null

      // TODO: kasnije stvarni upload inspirationFiles u Supabase Storage + zapis u project_files

      // Create client
      const client = await createClient({
        name: values.clientName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        language: language,
        notes: notesWithFilesInfo,
      })

      // Create project
      const project = await createProject({
        title: `Projekt za ${values.clientName.trim()} – ${values.projectType || 'Nepoznato'}`,
        user_type: 'client',
        client_id: client.id,
        carpenter_id: null,
        drawn_by: 'ani',
        uses_corpus: true,
        wants_vr: values.wantsVr,
        vr_location_preference: values.wantsVr ? values.vrLocationPreference : null,
        vr_package_preference: values.wantsVr ? values.vrPackagePreference : null,
        status: 'inquiry',
        space_type: values.projectType || null,
        area_m2: areaM2,
        budget: budget,
        notes: notesWithFilesInfo,
      })

      // Upload povezanih datoteka (tlocrt + inspiracije) u Storage + project_files
      try {
        const uploadPromises: Promise<ProjectFile | null>[] = []

        // tlocrt / tlocrti → file_type = "plan"
        if (values.planFiles && values.planFiles.length > 0) {
          for (const file of values.planFiles) {
            uploadPromises.push(
              uploadProjectFileToStorage(project.id, file, "plan")
            )
          }
        }

        // inspiracije → file_type = "inspiration"
        if (inspirationFiles && inspirationFiles.length > 0) {
          for (const file of inspirationFiles) {
            uploadPromises.push(
              uploadProjectFileToStorage(project.id, file, "inspiration")
            )
          }
        }

        if (uploadPromises.length > 0) {
          await Promise.all(uploadPromises)
        }
      } catch (uploadError) {
        console.error(
          "[InteriorsClientForm] Error uploading project files:",
          uploadError
        )
        // ne rušimo cijeli submit – projekt je svejedno kreiran
        // kasnije možemo dodati user-facing upozorenje
      }

      // Reset poruke o odabranom tlocrtu odmah nakon uspješnog slanja
      setSelectedPlanFileNames([])
      setSelectedInspirationFileNames([])

      // Save to admin store (keep existing behavior)
      addInteriorsRequest({
        clientName: values.clientName || '',
        email: values.email || '',
        spaceType: values.projectType || 'Nije odabrano',
        city: values.location || '',
        stolarId: values.stolarId || null,
      })

      if (onSubmit) {
        // ne šalji File objekte u callback
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { planFiles, photoFiles, ...valuesWithoutFiles } = values

        onSubmit(valuesWithoutFiles as ClientProjectFormValues)
      }

      // Mark as submitted
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setValues(INITIAL_VALUES)
        setIsSubmitted(false)
        setSelectedPlanFileNames([])
        setSelectedPhotoFileName(null)
        setSelectedInspirationFileNames([])
        setInspirationFiles([])
      }, 3000)
    } catch (error) {
      console.error('Error submitting client form:', error)

      // dodatne informacije ako je običan Error objekt
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      }

      // ako je "Supabase-stil" error ili bilo što s .message
      if (error && typeof error === 'object' && 'message' in error) {
        try {
          console.error(
            'Supabase error details:',
            JSON.stringify(error, null, 2)
          )
        } catch {
          // ako JSON.stringify pukne, ignoriraj
        }
      }

      setSubmitError(translations.error[language])
    } finally {
      setIsSubmitting(false)
    }
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
              id="clientName"
              name="clientName"
              className={`${inputClass} ${errors.clientName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.clientName}
              onChange={e => handleChange('clientName', e.target.value)}
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
              id="email"
              name="email"
              className={`${inputClass} ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </label>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>{language === 'hr' ? 'Broj mobitela *' : 'Phone number *'}</span>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`${inputClass} ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.phone}
              onChange={e => handleChange('phone', e.target.value)}
              placeholder={language === 'hr' ? 'npr. 095 123 4567' : 'e.g. +385 95 123 4567'}
            />
          </label>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
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
                id="projectType"
                name="projectType"
                value={values.projectType}
                onChange={e => handleChange('projectType', e.target.value)}
                className={`${selectClass} ${errors.projectType ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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
                id="location"
                name="location"
                value={values.location}
                onChange={e => handleChange('location', e.target.value)}
                className={`${inputClass} ${errors.location ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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
                id="spaceStatus"
                name="spaceStatus"
                value={values.spaceStatus}
                onChange={e => handleChange('spaceStatus', e.target.value)}
                className={`${selectClass} ${errors.spaceStatus ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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

        <div id="hasPlan">
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Imaš li tlocrt ili skicu? *</p>
          <div className={`flex flex-col gap-1 sm:flex-row sm:flex-wrap ${errors.hasPlan ? 'border border-red-300 rounded-xl bg-red-50/40 px-3 py-2' : ''}`}>
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
          <div className="space-y-2">
            <p className="block text-sm font-medium text-slate-800">
              Tlocrt prostora (PDF ili slika)
            </p>
            <p className="text-xs text-slate-500">
              Možeš učitati više datoteka (preporučeno 3–5, PDF ili slike).
            </p>

            <div className="flex items-center gap-3 mt-2">
              {/* Gumb za tlocrt – isti stil kao inspiracije */}
              <label className="inline-flex cursor-pointer items-center rounded-full bg-violet-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-violet-600">
                Odaberi datoteke
                <input
                  id="plan-file-input"
                  type="file"
                  accept=".pdf,image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'planFile')}
                />
              </label>
            </div>

            {selectedPlanFileNames.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {selectedPlanFileNames.map((name) => (
                  <li key={name} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <span className="font-medium">{name}</span>
                  </li>
                ))}
              </ul>
            )}
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
                    onChange={e => handleFileChange(e, 'photoFiles')}
                  />
                </label>
                <span className="text-xs text-slate-500">
                  Možeš učitati više datoteka (preporučeno 3–5).
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {selectedPhotoFileName 
                  ? `${translations.fileUpload.selectedFile[language]} ${selectedPhotoFileName}`
                  : translations.fileUpload.noFileSelected[language]}
              </p>
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
            Posebne karakteristike prostora
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
              id="mainUsers"
              name="mainUsers"
              value={values.mainUsers}
              onChange={e => handleChange('mainUsers', e.target.value)}
              className={`${selectClass} ${errors.mainUsers ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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
              id="budgetRange"
              name="budgetRange"
              value={values.budgetRange}
              onChange={e => handleChange('budgetRange', e.target.value)}
              className={`${selectClass} ${errors.budgetRange ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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
              id="desiredStartDate"
              name="desiredStartDate"
              className={`${inputClass} ${errors.desiredStartDate ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.desiredStartDate}
              onChange={e => handleChange('desiredStartDate', e.target.value)}
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
              id="flexibility"
              name="flexibility"
              value={values.flexibility}
              onChange={e => handleChange('flexibility', e.target.value)}
              className={`${selectClass} ${errors.flexibility ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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

        <div id="hasOwnStolar">
          <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">Imaš li već svog stolara? *</p>
          <div className={`flex flex-col gap-1 sm:flex-row sm:flex-wrap ${errors.hasOwnStolar ? 'border border-red-300 rounded-xl bg-red-50/40 px-3 py-2' : ''}`}>
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
                  onChange={e => handleFileChange(e, 'inspirationFiles')}
                />
              </label>
              <span className="text-xs text-slate-500">
                Možeš učitati više datoteka (preporučeno 3–5).
              </span>
            </div>
            {selectedInspirationFileNames.length === 0 ? (
              <p className="text-xs text-slate-400 mt-1">
                {translations.fileUpload.noFilesSelected[language]}
              </p>
            ) : (
              <div className="mt-1 text-sm text-slate-600">
                <p>
                  {selectedInspirationFileNames.length === 1
                    ? translations.fileUpload.oneFileSelectedLabel[language]
                    : translations.fileUpload.multipleFilesSelectedLabel[language]}
                </p>
                <ul className="list-disc list-inside">
                  {selectedInspirationFileNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </label>
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Opiši svojim riječima što ti je najvažnije u ovom prostoru</span>
            <textarea
              id="projectNote"
              name="projectNote"
              value={values.projectNote}
              className={`${textareaClass} ${errors.projectNote ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              onChange={e => handleChange('projectNote', e.target.value)}
              rows={4}
            />
          </label>
          {errors.projectNote && (
            <p className="text-xs text-red-500 mt-1">{errors.projectNote}</p>
          )}
        </div>
      </fieldset>

      {/* KORAK 8 – Kontakt */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Kontakt</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Kako želiš da te kontaktiram? *</span>
            <select
              id="contactPreference"
              name="contactPreference"
              value={values.contactPreference}
              onChange={e => handleChange('contactPreference', e.target.value)}
              className={`${selectClass} ${errors.contactPreference ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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

      {/* VR Block */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">VR opcije</legend>

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1 accent-violet-500"
              checked={values.wantsVr}
              onChange={e => handleChange('wantsVr', e.target.checked)}
            />
            <span>{translations.vr.wantsVr[language]}</span>
          </label>
        </div>

        {values.wantsVr && (
          <>
            <div>
              <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
                {translations.vr.locationTitle[language]}
              </p>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="vrLocationPreference"
                    value="studio"
                    className="accent-violet-500"
                    checked={values.vrLocationPreference === 'studio'}
                    onChange={() => handleChange('vrLocationPreference', 'studio')}
                  />
                  <span>{translations.vr.locationStudio[language]}</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="vrLocationPreference"
                    value="client_home"
                    className="accent-violet-500"
                    checked={values.vrLocationPreference === 'client_home'}
                    onChange={() => handleChange('vrLocationPreference', 'client_home')}
                  />
                  <span>{translations.vr.locationClientHome[language]}</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="vrLocationPreference"
                    value="unsure"
                    className="accent-violet-500"
                    checked={values.vrLocationPreference === 'unsure'}
                    onChange={() => handleChange('vrLocationPreference', 'unsure')}
                  />
                  <span>{translations.vr.locationUnsure[language]}</span>
                </label>
              </div>
            </div>

            <div>
              <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
                {translations.vr.packageTitle[language]}
              </p>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="vrPackagePreference"
                    value="3d_vr"
                    className="accent-violet-500"
                    checked={values.vrPackagePreference === '3d_vr'}
                    onChange={() => handleChange('vrPackagePreference', '3d_vr')}
                  />
                  <span>{translations.vr.package3dVr[language]}</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="vrPackagePreference"
                    value="3d_vr_online"
                    className="accent-violet-500"
                    checked={values.vrPackagePreference === '3d_vr_online'}
                    onChange={() => handleChange('vrPackagePreference', '3d_vr_online')}
                  />
                  <span>{translations.vr.package3dVrOnline[language]}</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="vrPackagePreference"
                    value="unsure"
                    className="accent-violet-500"
                    checked={values.vrPackagePreference === 'unsure'}
                    onChange={() => handleChange('vrPackagePreference', 'unsure')}
                  />
                  <span>{translations.vr.packageUnsure[language]}</span>
                </label>
              </div>
            </div>
          </>
        )}
      </fieldset>

      {isSubmitted && (
        <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {translations.success[language]}
        </div>
      )}

      {submitError && (
        <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {submitError}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-violet-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (language === 'hr' ? 'Šaljem...' : 'Sending...') : (language === 'hr' ? 'Pošalji upit za interijerski projekt' : 'Send interior project inquiry')}
        </button>
      </div>
    </form>
  )
}
