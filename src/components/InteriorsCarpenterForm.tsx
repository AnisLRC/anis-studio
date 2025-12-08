// src/components/InteriorsCarpenterForm.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { createCarpenter, createProject, uploadProjectFileToStorage, type DrawnBy, type VrPackagePreference } from '../lib/interiors'

export interface CarpenterProjectFormValues {
  companyName: string
  contactName: string
  email: string
  phone: string
  location: string
  website: string
  oib: string

  projectType: string
  projectTypes: string[]
  spaceType: string
  areaM2: string
  budget: string
  notes: string

  boards: string
  worktops: string
  fronts: string

  hardwareBrands: string[]
  hardwareOther: string

  monthlyCapacity: string
  averageProductionTime: string
  deadlineNotes: string

  wantsCompleteDrawings: boolean
  usesPartialSolutions: boolean
  collaborationNotes: string

  contactPreference: string
  bestContactTime: string

  drawnByOption: DrawnBy | ''
  usesCorpus: boolean
  corpusExportFile: File | null

  wantsVr: boolean
  vrForClientsPerYear: string
  vrNeeds: string[]
}

interface InteriorsCarpenterFormProps {
  language?: 'hr' | 'en'
}

const INITIAL_VALUES: CarpenterProjectFormValues = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  oib: '',

  projectType: '',
  projectTypes: [],
  spaceType: '',
  areaM2: '',
  budget: '',
  notes: '',

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

  drawnByOption: '',
  usesCorpus: false,
  corpusExportFile: null,

  wantsVr: false,
  vrForClientsPerYear: '',
  vrNeeds: [],
}

const VR_NEEDS_OPTIONS = [
  'VR prezentacija kod Ane u studiju',
  'Materijali (slike/video iz VR-a) za prezentaciju tvom klijentu',
  'Online 3D/VR link za tvog klijenta',
]

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

export function InteriorsCarpenterForm({ language = 'hr' }: InteriorsCarpenterFormProps) {
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";

  const textareaClass =
    "w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow-inner resize-y min-h-[96px] focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-400";

  const selectClass = inputClass;

  const [values, setValues] = useState<CarpenterProjectFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [exportFiles, setExportFiles] = useState<File[]>([])
  const [kitchenSketchFiles, setKitchenSketchFiles] = useState<File[]>([])

  const translations = {
    title: {
      hr: 'Upit za projekt / suradnju – stolari i studiji',
      en: 'Project / collaboration inquiry – carpenters and studios'
    },
    description: {
      hr: 'Istim obrascem šaljete i svoje podatke i konkretan upit za projekt',
      en: 'With the same form you send both your details and a specific project inquiry'
    },
    sections: {
      carpenterDetails: {
        hr: '1. Podaci o stolaru / studiju',
        en: '1. Carpenter / Studio details'
      },
      projectInquiry: {
        hr: '2. Upit za projekt',
        en: '2. Project inquiry'
      }
    },
    fields: {
      location: {
        hr: 'Grad / lokacija',
        en: 'City / location'
      },
      website: {
        hr: 'Website',
        en: 'Website'
      },
      phone: {
        hr: 'Telefon *',
        en: 'Phone *'
      }
    },
    errors: {
      companyNameRequired: {
        hr: 'Naziv firme je obavezan',
        en: 'Company name is required'
      },
      contactNameRequired: {
        hr: 'Ime kontakt osobe je obavezno',
        en: 'Contact person name is required'
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
        hr: 'Telefon je obavezan',
        en: 'Phone number is required'
      },
      projectTypeRequired: {
        hr: 'Molimo odaberite tip projekta',
        en: 'Please select project type'
      },
      drawnByRequired: {
        hr: 'Molimo odaberite tko crta projekt',
        en: 'Please select who draws the project'
      },
      boardsRequired: {
        hr: 'Molim te upiši informacije o pločama.',
        en: 'Please enter information about boards.'
      },
      worktopsRequired: {
        hr: 'Molim te upiši informacije o radnim pločama.',
        en: 'Please enter information about worktops.'
      },
      frontsRequired: {
        hr: 'Molim te upiši informacije o frontovima.',
        en: 'Please enter information about fronts.'
      },
      monthlyCapacityRequired: {
        hr: 'Molim te upiši koliko projekata mjesečno možeš preuzeti.',
        en: 'Please enter how many projects per month you can take on.'
      },
      averageProductionTimeRequired: {
        hr: 'Molim te upiši prosječan rok izrade.',
        en: 'Please enter average production time.'
      },
      contactPreferenceRequired: {
        hr: 'Molim te odaberi način kontaktiranja.',
        en: 'Please select contact preference.'
      }
    },
    success: {
      hr: 'Hvala ti! Tvoj upit za projekt je zaprimljen. Javit ću ti se povratno s informacijama u najkraćem mogućem roku.',
      en: 'Thank you! Your project inquiry has been received. I will get back to you with information as soon as possible.'
    },
    error: {
      hr: 'Greška pri spremanju, pokušaj ponovno.',
      en: 'Error saving, please try again.'
    },
    drawnBy: {
      title: {
        hr: 'Tko izrađuje 3D projekt?',
        en: 'Who creates the 3D project?'
      },
      ani: {
        hr: "Treba mi Ani's Interijeri 3D projekt",
        en: "I need Ani's Interijeri to create the 3D project"
      },
      aniDescription: {
        hr: 'Ti radiš kompletan 3D projekt u RC Corpusu.',
        en: 'You create the full 3D project in RC Corpus.'
      },
      carpenter: {
        hr: 'Već imam gotov 3D projekt',
        en: 'I already have a finished 3D project'
      },
      carpenterDescription: {
        hr: 'Koristim RC Corpus ili drugi 3D alat i mogu poslati eksport.',
        en: 'I use RC Corpus or another 3D tool and can send an export.'
      },
      usesCorpus: {
        hr: 'Ovaj projekt je rađen u RC Corpusu',
        en: 'This project was created in RC Corpus'
      },
      uploadFile: {
        hr: 'Upload 3D datoteke (OBJ, FBX, SKP...)',
        en: 'Upload 3D file (OBJ, FBX, SKP...)'
      },
      uploadFileFormats: {
        hr: 'Podržani formati: OBJ, FBX, SKP ili slični 3D formati iz RC Corpusa.',
        en: 'Supported formats: OBJ, FBX, SKP or similar 3D exports from RC Corpus.'
      },
      uploadFileNote: {
        hr: 'TODO: Datoteka će se kasnije spremiti u project_files storage',
        en: 'TODO: File will be saved to project_files storage later'
      }
    },
    vr: {
      wantsVr: {
        hr: 'Želim VR obilazak prostora za svog klijenta',
        en: 'I want VR walkthrough for my client'
      },
      clientsPerYear: {
        hr: 'Za koliko klijenata godišnje bi ti otprilike trebao VR?',
        en: 'For how many clients per year would you approximately need VR?'
      },
      needsTitle: {
        hr: 'Što trebaš od mene?',
        en: 'What do you need from me?'
      }
    }
  }

  function handleChange(
    field: keyof CarpenterProjectFormValues,
    value: CarpenterProjectFormValues[typeof field]
  ) {
    setValues(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user changes it
    if (errors[field]) {
      setErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: _, ...rest } = prev
        return rest
      })
    }
  }

  function handleToggleMulti(field: keyof CarpenterProjectFormValues, option: string) {
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

  const handleCarpenterExportFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files) {
      setExportFiles([])
      return
    }

    const fileArray = Array.from(files)
    setExportFiles(fileArray)
  }

  const handleKitchenSketchFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files) {
      setKitchenSketchFiles([])
      return
    }

    const fileArray = Array.from(files)
    setKitchenSketchFiles(fileArray)
  }

  function validate(values: CarpenterProjectFormValues): { isValid: boolean; errors: Record<string, string>; firstErrorField: string | null } {
    const newErrors: Record<string, string> = {}

    if (!values.companyName.trim()) {
      newErrors.companyName = translations.errors.companyNameRequired[language]
    }

    if (!values.contactName.trim()) {
      newErrors.contactName = translations.errors.contactNameRequired[language]
    }

    if (!values.email.trim()) {
      newErrors.email = translations.errors.emailRequired[language]
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(values.email.trim())) {
        newErrors.email = translations.errors.emailInvalid[language]
      }
    }

    if (!values.phone.trim()) {
      newErrors.phone = translations.errors.phoneRequired[language]
    }

    if (!values.projectType) {
      newErrors.projectType = translations.errors.projectTypeRequired[language]
    }

    if (!values.drawnByOption) {
      newErrors.drawnByOption = translations.errors.drawnByRequired[language]
    }

    if (!values.boards.trim()) {
      newErrors.boards = translations.errors.boardsRequired[language]
    }

    if (!values.worktops.trim()) {
      newErrors.worktops = translations.errors.worktopsRequired[language]
    }

    if (!values.fronts.trim()) {
      newErrors.fronts = translations.errors.frontsRequired[language]
    }

    if (!values.monthlyCapacity.trim()) {
      newErrors.monthlyCapacity = translations.errors.monthlyCapacityRequired[language]
    }

    if (!values.averageProductionTime.trim()) {
      newErrors.averageProductionTime = translations.errors.averageProductionTimeRequired[language]
    }

    if (!values.contactPreference) {
      newErrors.contactPreference = translations.errors.contactPreferenceRequired[language]
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
      // Parse area_m2
      let areaM2: number | null = null
      if (values.areaM2) {
        const parsed = parseFloat(values.areaM2.replace(/[^\d.,]/g, '').replace(',', '.'))
        if (!isNaN(parsed) && parsed > 0) {
          areaM2 = parsed
        }
      }

      // Parse budget
      let budget: number | null = null
      if (values.budget) {
        const parsed = parseFloat(values.budget.replace(/[^\d.,]/g, '').replace(',', '.'))
        if (!isNaN(parsed) && parsed > 0) {
          budget = parsed
        }
      }

      // Parse vrForClientsPerYear
      let vrForClientsPerYear: number | null = null
      if (values.wantsVr && values.vrForClientsPerYear) {
        const parsed = parseInt(values.vrForClientsPerYear, 10)
        if (!isNaN(parsed) && parsed > 0) {
          vrForClientsPerYear = parsed
        }
      }

      // Determine VR package preference from vrNeeds
      let vrPackagePreference: VrPackagePreference = null
      if (values.wantsVr && values.vrNeeds.length > 0) {
        if (values.vrNeeds.includes('Online 3D/VR link za tvog klijenta')) {
          vrPackagePreference = '3d_vr_online'
        } else {
          vrPackagePreference = '3d_vr'
        }
      }

      // Build notes string including all profile information
      let notesParts: string[] = []
      if (values.location.trim()) {
        notesParts.push(`Lokacija: ${values.location.trim()}`)
      }
      if (values.website.trim()) {
        notesParts.push(`Website: ${values.website.trim()}`)
      }
      if (values.oib.trim()) {
        notesParts.push(`OIB: ${values.oib.trim()}`)
      }
      
      // Project types
      if (values.projectTypes.length > 0) {
        notesParts.push(`Tipovi projekata: ${values.projectTypes.join(', ')}`)
      }
      
      // Materials
      if (values.boards.trim()) {
        notesParts.push(`Ploče: ${values.boards.trim()}`)
      }
      if (values.worktops.trim()) {
        notesParts.push(`Radne ploče: ${values.worktops.trim()}`)
      }
      if (values.fronts.trim()) {
        notesParts.push(`Frontovi: ${values.fronts.trim()}`)
      }
      
      // Hardware
      if (values.hardwareBrands.length > 0) {
        notesParts.push(`Okovi/brendovi: ${values.hardwareBrands.join(', ')}`)
      }
      if (values.hardwareOther.trim()) {
        notesParts.push(`Ostali okovi: ${values.hardwareOther.trim()}`)
      }
      
      // Capacity and deadlines
      if (values.monthlyCapacity.trim()) {
        notesParts.push(`Mjesečni kapacitet: ${values.monthlyCapacity.trim()}`)
      }
      if (values.averageProductionTime.trim()) {
        notesParts.push(`Prosječan rok izrade: ${values.averageProductionTime.trim()}`)
      }
      if (values.deadlineNotes.trim()) {
        notesParts.push(`Napomene o rokovima: ${values.deadlineNotes.trim()}`)
      }
      
      // Collaboration preferences
      if (values.wantsCompleteDrawings) {
        notesParts.push('Želi kompletne nacrte i krojne liste')
      }
      if (values.usesPartialSolutions) {
        notesParts.push('Koristi dijelove rješenja (djelomična izrada)')
      }
      if (values.collaborationNotes.trim()) {
        notesParts.push(`Napomene za suradnju: ${values.collaborationNotes.trim()}`)
      }
      
      // Contact preferences
      if (values.contactPreference) {
        notesParts.push(`Način kontaktiranja: ${values.contactPreference}`)
      }
      if (values.bestContactTime.trim()) {
        notesParts.push(`Najbolje vrijeme za kontakt: ${values.bestContactTime.trim()}`)
      }
      
      // Project notes
      if (values.notes.trim()) {
        notesParts.push(`Napomene o projektu: ${values.notes.trim()}`)
      }
      
      const combinedNotes = notesParts.length > 0 ? notesParts.join('\n\n') : null

      // Create carpenter
      const carpenter = await createCarpenter({
        company_name: values.companyName.trim(),
        contact_name: values.contactName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        uses_corpus: values.usesCorpus,
        estimated_vr_projects_per_year: vrForClientsPerYear,
        notes: combinedNotes,
      })

      // Create project
      const project = await createProject({
        title: `Projekt za ${values.companyName.trim()} – ${values.projectType || 'Nepoznato'}`,
        user_type: 'carpenter',
        client_id: null,
        carpenter_id: carpenter.id,
        drawn_by: values.drawnByOption as DrawnBy,
        uses_corpus: values.usesCorpus,
        wants_vr: values.wantsVr,
        vr_location_preference: values.wantsVr ? 'studio' : null, // Default to studio for carpenters
        vr_package_preference: vrPackagePreference,
        status: 'inquiry',
        space_type: values.spaceType || values.projectType || null,
        area_m2: areaM2,
        budget: budget,
        notes: values.notes.trim() || null,
      })

      // Upload 3D eksport fajlova stolara (OBJ/FBX...) u Storage + project_files
      try {
        if (exportFiles.length > 0) {
          await Promise.all(
            exportFiles.map((file) =>
              uploadProjectFileToStorage(
                project.id,
                file,
                "carpenter_3d_export"
              )
            )
          )
        }

        if (kitchenSketchFiles.length > 0) {
          await Promise.all(
            kitchenSketchFiles.map((file) =>
              uploadProjectFileToStorage(
                project.id,
                file,
                "kitchen_sketch"
              )
            )
          )
        }
      } catch (error) {
        console.error(
          "[InteriorsCarpenterForm] Error uploading project files:",
          error
        )
        // ne rušimo submit – projekt je već kreiran
      }

      // Mark as submitted
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setValues(INITIAL_VALUES)
        setIsSubmitted(false)
        setExportFiles([])
        setKitchenSketchFiles([])
      }, 3000)
    } catch (error) {
      console.error('Error submitting carpenter form:', error)
      setSubmitError(translations.error[language])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Naslov i podnaslov */}
      <div className="space-y-2 text-center mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {translations.title[language]}
        </h2>
        <p className="text-sm text-slate-600">
          {translations.description[language]}
        </p>
      </div>

      {/* Sekcija 1: Podaci o stolaru / studiju */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">
          {translations.sections.carpenterDetails[language]}
        </legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Naziv firme / obrta *</span>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className={`${inputClass} ${errors.companyName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.companyName}
              onChange={e => handleChange('companyName', e.target.value)}
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
              id="contactName"
              name="contactName"
              className={`${inputClass} ${errors.contactName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.contactName}
              onChange={e => handleChange('contactName', e.target.value)}
            />
          </label>
          {errors.contactName && (
            <p className="text-xs text-red-500 mt-1">{errors.contactName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <span>{translations.fields.phone[language]}</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`${inputClass} ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                value={values.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            </label>
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>{translations.fields.location[language]}</span>
              <input
                type="text"
                id="location"
                name="location"
                className={inputClass}
                value={values.location}
                onChange={e => handleChange('location', e.target.value)}
                placeholder={language === 'hr' ? 'npr. Rijeka' : 'e.g. Rijeka'}
              />
            </label>
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>{translations.fields.website[language]}</span>
              <input
                type="url"
                id="website"
                name="website"
                className={inputClass}
                value={values.website}
                onChange={e => handleChange('website', e.target.value)}
                placeholder={language === 'hr' ? 'npr. https://example.com' : 'e.g. https://example.com'}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>OIB</span>
            <input
              type="text"
              id="oib"
              name="oib"
              className={inputClass}
              value={values.oib}
              onChange={e => handleChange('oib', e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      {/* Sekcija 2: Upit za projekt */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">
          {translations.sections.projectInquiry[language]}
        </legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Tip projekta *</span>
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Površina (m²)</span>
              <input
                type="text"
                className={inputClass}
                value={values.areaM2}
                onChange={e => handleChange('areaM2', e.target.value)}
                placeholder="npr. 15.5"
              />
              <span className="text-xs text-slate-500">Približna površina prostora za projekt</span>
            </label>
          </div>

          <div>
            <label className="block space-y-1 text-sm sm:text-base text-slate-800">
              <span>Budžet (€)</span>
              <input
                type="text"
                className={inputClass}
                value={values.budget}
                onChange={e => handleChange('budget', e.target.value)}
                placeholder="npr. 5000"
              />
              <span className="text-xs text-slate-500">Okvirni budžet za projekt</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Napomene</span>
            <textarea
              className={textareaClass}
              value={values.notes}
              onChange={e => handleChange('notes', e.target.value)}
              rows={4}
              placeholder="Dodatne napomene o projektu..."
            />
          </label>
        </div>
      </fieldset>

      {/* Tipovi projekata koje rade */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Tipovi projekata koje rade</legend>

        <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
          Tipovi projekata koje radite
        </p>
        <p className="text-xs text-slate-500 mb-3">
          Odaberite sve tipove projekata koje standardno izrađujete. Ovo nam pomaže razumjeti vašu specijalizaciju.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
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
      </fieldset>

      {/* Materijali i debljine */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Materijali i debljine koje standardno koriste</legend>
        <p className="text-xs text-slate-500 mb-3">
          Navedite materijale i debljine koje standardno koristite u svojoj proizvodnji. Ovo nam pomaže prilagoditi projekt vašim mogućnostima.
        </p>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Ploče (npr. 18mm, 19mm, 36mm...) *</span>
            <input
              type="text"
              className={`${inputClass} ${errors.boards ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.boards}
              onChange={e => handleChange('boards', e.target.value)}
              placeholder="npr. 18mm, 19mm, 36mm..."
            />
            <span className="text-xs text-slate-500">Navedite debljine ploča koje standardno koristite</span>
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
              className={`${inputClass} ${errors.worktops ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.worktops}
              onChange={e => handleChange('worktops', e.target.value)}
              placeholder="npr. kvarc, granit, laminat..."
            />
            <span className="text-xs text-slate-500">Navedite materijale radnih ploča koje standardno koristite</span>
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
              className={`${inputClass} ${errors.fronts ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.fronts}
              onChange={e => handleChange('fronts', e.target.value)}
              placeholder="npr. MDF, HPL, melamin..."
            />
            <span className="text-xs text-slate-500">Navedite materijale i finiše frontova koje standardno koristite</span>
          </label>
          {errors.fronts && (
            <p className="text-xs text-red-500 mt-1">{errors.fronts}</p>
          )}
        </div>
      </fieldset>

      {/* Okovi / brendovi */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Okovi / brendovi</legend>

        <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
          Okovi / brendovi koje koristite
        </p>
        <p className="text-xs text-slate-500 mb-3">
          Odaberite brendove okova koje standardno koristite. Ako koristite druge brendove, navedite ih u polju ispod.
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

      {/* Kapacitet i rokovi */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Kapacitet i rokovi</legend>
        <p className="text-xs text-slate-500 mb-3">
          Ove informacije nam pomažu planirati suradnju i razumjeti vaše mogućnosti izrade.
        </p>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Koliko projekata mjesečno mogu realno preuzeti? *</span>
            <input
              type="text"
              className={`${inputClass} ${errors.monthlyCapacity ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.monthlyCapacity}
              onChange={e => handleChange('monthlyCapacity', e.target.value)}
              placeholder="npr. 3-5 projekata"
            />
            <span className="text-xs text-slate-500">Realna procjena vašeg mjesečnog kapaciteta</span>
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
              className={`${inputClass} ${errors.averageProductionTime ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              value={values.averageProductionTime}
              onChange={e => handleChange('averageProductionTime', e.target.value)}
              placeholder="npr. 4-6 tjedana"
            />
            <span className="text-xs text-slate-500">Prosječno vrijeme potrebno za izradu jednog projekta</span>
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

      {/* Suradnja s Ani's Studiom */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Suradnja s Ani's Studiom / Corpus</legend>
        <p className="text-xs text-slate-500 mb-3">
          Odaberite način suradnje koji vam najviše odgovara. Možete kombinirati različite opcije ovisno o projektu.
        </p>

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
          <p className="text-xs text-slate-500 ml-6 mt-1">Ani će pripremiti sve potrebne nacrte i krojne liste za izradu</p>
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
          <p className="text-xs text-slate-500 ml-6 mt-1">Izrađujete samo određene dijelove prema nacrtu, ne cijeli projekt</p>
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

      {/* Kontakt preferencije */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">Kontakt preferencije</legend>

        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Način kontaktiranja *</span>
            <select
              className={`${selectClass} ${errors.contactPreference ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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

      {/* Tko crta projekt */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">{translations.drawnBy.title[language]}</legend>

        <div id="drawnByOption">
          <div className={`flex flex-col gap-2 ${errors.drawnByOption ? 'border border-red-300 rounded-xl bg-red-50/40 px-3 py-2' : ''}`}>
            <label className="inline-flex items-start gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="drawnByOption"
                value="ani"
                className="accent-violet-500 mt-1"
                checked={values.drawnByOption === 'ani'}
                onChange={() => handleChange('drawnByOption', 'ani')}
              />
              <div>
                <div>{translations.drawnBy.ani[language]}</div>
                <p className="text-xs text-slate-500 mt-1">
                  {translations.drawnBy.aniDescription[language]}
                </p>
              </div>
            </label>
            <label className="inline-flex items-start gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="drawnByOption"
                value="carpenter"
                className="accent-violet-500 mt-1"
                checked={values.drawnByOption === 'carpenter'}
                onChange={() => handleChange('drawnByOption', 'carpenter')}
              />
              <div>
                <div>{translations.drawnBy.carpenter[language]}</div>
                <p className="text-xs text-slate-500 mt-1">
                  {translations.drawnBy.carpenterDescription[language]}
                </p>
              </div>
            </label>
          </div>
        </div>
        {errors.drawnByOption && (
          <p className="text-xs text-red-500 mt-1">{errors.drawnByOption}</p>
        )}

        {values.drawnByOption === 'carpenter' && (
          <div>
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 accent-violet-500"
                checked={values.usesCorpus}
                onChange={e => handleChange('usesCorpus', e.target.checked)}
              />
              <span>{translations.drawnBy.usesCorpus[language]}</span>
            </label>
          </div>
        )}
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
              <label className="block space-y-1 text-sm sm:text-base text-slate-800">
                <span>{translations.vr.clientsPerYear[language]}</span>
                <input
                  type="number"
                  className={inputClass}
                  value={values.vrForClientsPerYear}
                  onChange={e => handleChange('vrForClientsPerYear', e.target.value)}
                  placeholder="npr. 10"
                  min="1"
                />
              </label>
            </div>

            <div>
              <p className="text-sm sm:text-base font-medium text-slate-800 mb-2">
                {translations.vr.needsTitle[language]}
              </p>
              <div className="grid gap-2 sm:grid-cols-1">
                {VR_NEEDS_OPTIONS.map(option => (
                  <label key={option} className="flex items-start gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="mt-1 accent-violet-500"
                      checked={values.vrNeeds.includes(option)}
                      onChange={() => handleToggleMulti('vrNeeds', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </fieldset>

      {/* Datoteke za projekt */}
      <fieldset className="space-y-4 rounded-2xl bg-white/70 p-4 sm:p-6 shadow-sm ring-1 ring-slate-100">
        <legend className="text-lg font-semibold mb-2 text-slate-800">
          Datoteke za projekt
        </legend>

        {/* Skice kuhinje */}
        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>Skice kuhinje (PDF, slika...)</span>
            <div className="flex items-center gap-3 mt-2">
              <label className="inline-flex cursor-pointer items-center rounded-full bg-violet-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-violet-600">
                Odaberi datoteke
                <input
                  type="file"
                  accept=".pdf,image/*"
                  multiple
                  className="hidden"
                  onChange={handleKitchenSketchFilesChange}
                />
              </label>
              {kitchenSketchFiles.length > 0 && (
                <span className="text-xs text-slate-500">
                  Odabrano datoteka: {kitchenSketchFiles.length}
                </span>
              )}
            </div>
            {kitchenSketchFiles.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {kitchenSketchFiles.map((file, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <span className="font-medium">{file.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </label>
        </div>

        {/* 3D export stolara */}
        <div>
          <label className="block space-y-1 text-sm sm:text-base text-slate-800">
            <span>3D export (npr. .fbx, .obj, .zip)</span>
            <div className="flex items-center gap-3 mt-2">
              <label className="inline-flex cursor-pointer items-center rounded-full bg-violet-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-violet-600">
                Odaberi datoteke
                <input
                  type="file"
                  accept=".fbx,.obj,.zip,.3ds,.skp"
                  multiple
                  className="hidden"
                  onChange={handleCarpenterExportFilesChange}
                />
              </label>
              {exportFiles.length > 0 && (
                <span className="text-xs text-slate-500">
                  Odabrano datoteka: {exportFiles.length}
                </span>
              )}
            </div>
            {exportFiles.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {exportFiles.map((file, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <span className="font-medium">{file.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </label>
        </div>
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
          {isSubmitting ? (language === 'hr' ? 'Šaljem...' : 'Sending...') : (language === 'hr' ? 'Pošalji upit za projekt' : 'Send project inquiry')}
        </button>
      </div>
    </form>
  )
}

