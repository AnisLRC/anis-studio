import { useState } from 'react'
import { InteriorsClientForm } from './InteriorsClientForm'
import { InteriorsCarpenterForm } from './InteriorsCarpenterForm'

interface InteriorsSectionProps {
  language: 'hr' | 'en'
}

export default function InteriorsSection({ language }: InteriorsSectionProps) {
  const [formData, setFormData] = useState({
    furnitureType: '',
    wallCount: '',
    handleType: '' as 'ugradbene' | 'obicne' | '',
    length: '',
    width: '',
    height: '',
    depth: '',
    hasSlope: false,
    slopeDescription: '',
    hasColumn: false,
    columnDimensions: '',
    hasBeam: false,
    beamDimensions: '',
    otherNotes: '',
    notes: '',
    sketches: [] as File[]
  })
  const [sketchPreviews, setSketchPreviews] = useState<Array<{ preview: string | null }>>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const translations = {
    title: {
      hr: "🏠 Ani's Interijeri",
      en: "🏠 Ani's Interiors"
    },
    subtitle: {
      hr: "Realistični 2D crteži i 3D renderi na temelju vaših dimenzija i ideja",
      en: "Realistic 2D drawings and 3D renders based on your dimensions and ideas"
    },
    description: {
      hr: "Usluga dostupna diljem Hrvatske",
      en: "Service available across Croatia"
    },
    stepsTitle: {
      hr: "Kako do Vašeg 3D prikaza",
      en: "How to get your 3D visualization"
    },
    step1: {
      title: { hr: "Izmjerite prostor", en: "Measure the space" },
      desc: { hr: "Izmjerite duljinu, širinu i visinu prostora u kojem želite namještaj", en: "Measure the length, width and height of the space where you want furniture" }
    },
    step2: {
      title: { hr: "Skicirajte tlocrt", en: "Sketch the floor plan" },
      desc: { hr: "Nacrtajte grubu skicu tlocrta prostora kako biste prikazali raspored", en: "Draw a rough sketch of the floor plan to show the layout" }
    },
    step3: {
      title: { hr: "Dodajte reference", en: "Add references" },
      desc: { hr: "Priložite slike postojećih rješenja ili skica koje vam se sviđaju kao inspiracija", en: "Attach images of existing solutions or sketches you like as inspiration" }
    },
    step4: {
      title: { hr: "Opišite detalje", en: "Describe details" },
      desc: { hr: "Napišite na što obratiti pažnju: boje, materijale, stil, posebnosti prostora", en: "Write what to pay attention to: colors, materials, style, space specifics" }
    },
    step5: {
      title: { hr: "Pošaljite upit", en: "Send inquiry" },
      desc: { hr: "Ispunite formu ispod s vašim dimenzijama i opisom", en: "Fill out the form below with your dimensions and description" }
    },
    step6: {
      title: { hr: "Primite prikaz", en: "Receive visualization" },
      desc: { hr: "Nakon plaćanja, šaljemo Vam realistični 3D prikaz i rendane fotografije", en: "After payment, we send you realistic 3D visualization and rendered photographs" }
    },
    formTitle: {
      hr: "Realistični 2D skice i 3D renderi na temelju vaših dimenzija i ideja",
      en: "Realistic 2D sketches and 3D renders based on your dimensions and ideas"
    },
    orderForm: {
      hr: "Naručite svoj 3D prikaz interijera po mjeri",
      en: "Order your custom 3D interior visualization"
    },
    formDesc: {
      hr: "Ispunite formu s vašim dimenzijama, potrebama i opisom",
      en: "Fill out the form with your dimensions, needs and description"
    },
    formLabels: {
      hr: {
        furnitureType: "Tip namještaja",
        wallCount: "Broj zidova",
        handleType: "Tip ručki",
        length: "Duljina (cm)",
        width: "Širina (cm)",
        height: "Visina (cm)",
        depth: "Dubina (cm)",
        specialFeatures: "Posebne karakteristike prostora",
        slope: "Kosina",
        slopeDescription: "Opišite kosinu",
        column: "Stup",
        columnDimensions: "Dimenzije stupa (npr. 30x30cm)",
        beam: "Greda",
        beamDimensions: "Dimenzije grede (npr. 50x20cm)",
        otherNotes: "Ostalo što treba naglasiti",
        sketches: "Učitaj skice (2D/3D)",
        sketchesHelp: "Podržani formati: JPG, PNG, PDF (max 10MB)",
        notes: "Napomene"
      },
      en: {
        furnitureType: "Furniture type",
        wallCount: "Number of walls",
        handleType: "Handle type",
        length: "Length (cm)",
        width: "Width (cm)",
        height: "Height (cm)",
        depth: "Depth (cm)",
        specialFeatures: "Special room characteristics",
        slope: "Slope",
        slopeDescription: "Describe the slope",
        column: "Column",
        columnDimensions: "Column dimensions (e.g. 30x30cm)",
        beam: "Beam",
        beamDimensions: "Beam dimensions (e.g. 50x20cm)",
        otherNotes: "Other important notes",
        sketches: "Upload sketches (2D/3D)",
        sketchesHelp: "Supported formats: JPG, PNG, PDF (max 10MB)",
        notes: "Notes"
      }
    },
    formOptions: {
      hr: {
        selectType: "Odaberite tip",
        selectNumber: "Odaberite broj",
        furnitureTypes: [
          { value: "ugradni-ormar", label: "Ugradni ormar" },
          { value: "kuhinja", label: "Kuhinja" },
          { value: "niskogradnja", label: "Niskogradnja" },
          { value: "radni-prostor", label: "Radni prostor" },
          { value: "dječja-soba", label: "Dječja soba" },
          { value: "dnevni-boravak", label: "Dnevni boravak" }
        ],
        wallCounts: [
          { value: "1", label: "1 zid" },
          { value: "2", label: "2 zida" },
          { value: "3", label: "3 zida" },
          { value: "4", label: "4 zida" }
        ],
        handleTypes: {
          ugradbene: "Ugradbene ručke",
          obicne: "Obične ručke"
        }
      },
      en: {
        selectType: "Select type",
        selectNumber: "Select number",
        furnitureTypes: [
          { value: "ugradni-ormar", label: "Built-in wardrobe" },
          { value: "kuhinja", label: "Kitchen" },
          { value: "niskogradnja", label: "Sideboard" },
          { value: "radni-prostor", label: "Workspace" },
          { value: "dječja-soba", label: "Kids' room" },
          { value: "dnevni-boravak", label: "Living room" }
        ],
        wallCounts: [
          { value: "1", label: "1 wall" },
          { value: "2", label: "2 walls" },
          { value: "3", label: "3 walls" },
          { value: "4", label: "4 walls" }
        ],
        handleTypes: {
          ugradbene: "Built-in handles",
          obicne: "Standard handles"
        }
      }
    },
    submitButton: {
      hr: "Pošalji narudžbu",
      en: "Submit Order"
    },
    successMessage: {
      hr: {
        title: "Hvala vam!",
        description: "Javit ću vam se uskoro s detaljima."
      },
      en: {
        title: "Thank you!",
        description: "I'll get back to you shortly."
      }
    }
  }

  const visualizationSteps = [
    {
      number: 1,
      icon: '📏',
      title: translations.step1.title,
      desc: translations.step1.desc
    },
    {
      number: 2,
      icon: '✏️',
      title: translations.step2.title,
      desc: translations.step2.desc
    },
    {
      number: 3,
      icon: '📸',
      title: translations.step3.title,
      desc: translations.step3.desc
    },
    {
      number: 4,
      icon: '📝',
      title: translations.step4.title,
      desc: translations.step4.desc
    },
    {
      number: 5,
      icon: '📤',
      title: translations.step5.title,
      desc: translations.step5.desc
    },
    {
      number: 6,
      icon: '🛋️',
      title: translations.step6.title,
      desc: translations.step6.desc
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length === 0) return

    const maxSize = 10 * 1024 * 1024 // 10MB
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
    const newFiles: File[] = []
    const fileErrors: string[] = []

    files.forEach((file) => {
      // Validacija veličine
      if (file.size > maxSize) {
        fileErrors.push(`${file.name}: ${language === 'hr' ? 'Datoteka je prevelika (max 10MB)' : 'File too large (max 10MB)'}`)
        return
      }

      // Validacija formata
      if (!validTypes.includes(file.type)) {
        fileErrors.push(`${file.name}: ${language === 'hr' ? 'Neispravan format (samo JPG, PNG, PDF)' : 'Invalid format (only JPG, PNG, PDF)'}`)
        return
      }

      newFiles.push(file)
    })

    if (fileErrors.length > 0) {
      setErrors(prev => ({
        ...prev,
        sketches: fileErrors.join('; ')
      }))
      return
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.sketches
        return newErrors
      })
    }

    // Dodaj nove datoteke
    const updatedSketches = [...formData.sketches, ...newFiles]
    setFormData(prev => ({ ...prev, sketches: updatedSketches }))
    
    // Inicijaliziraj preview array s null vrijednostima za nove datoteke
    setSketchPreviews(prev => {
      const updated = [...prev]
      while (updated.length < updatedSketches.length) {
        updated.push({ preview: null })
      }
      return updated
    })
    
    // Generiraj preview za sve nove slike
    newFiles.forEach((file, newFileIndex) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        // Spremimo start index za ovu datoteku
        const startIndex = formData.sketches.length + newFileIndex
        reader.onloadend = () => {
          const preview = reader.result as string
          setSketchPreviews(prev => {
            const updated = [...prev]
            // Ažuriraj preview na odgovarajućem indexu
            if (startIndex >= 0 && startIndex < updated.length) {
              updated[startIndex] = { preview }
            }
            return updated
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeSketch = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sketches: prev.sketches.filter((_, i) => i !== index)
    }))
    setSketchPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.furnitureType) {
      newErrors.furnitureType = language === 'hr' ? 'Odaberite tip namještaja' : 'Select furniture type'
    }
    if (!formData.handleType) {
      newErrors.handleType = language === 'hr' ? 'Odaberite tip ručki' : 'Select handle type'
    }
    if (!formData.length || parseFloat(formData.length) <= 0) {
      newErrors.length = language === 'hr' ? 'Unesite duljinu' : 'Enter length'
    }
    if (!formData.width || parseFloat(formData.width) <= 0) {
      newErrors.width = language === 'hr' ? 'Unesite širinu' : 'Enter width'
    }
    if (!formData.height || parseFloat(formData.height) <= 0) {
      newErrors.height = language === 'hr' ? 'Unesite visinu' : 'Enter height'
    }
    if (!formData.depth || parseFloat(formData.depth) <= 0) {
      newErrors.depth = language === 'hr' ? 'Unesite dubinu' : 'Enter depth'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        furnitureType: '',
        wallCount: '',
        handleType: '',
        length: '',
        width: '',
        height: '',
        depth: '',
        hasSlope: false,
        slopeDescription: '',
        hasColumn: false,
        columnDimensions: '',
        hasBeam: false,
        beamDimensions: '',
        otherNotes: '',
        notes: '',
        sketches: []
      })
      setSketchPreviews([])
      setErrors({})
    }, 3000)
  }

  const stolars = [
    { id: '1', name: 'Stolarija Jurić (Rijeka)' },
    { id: '2', name: 'Stolarija Novak (Zagreb)' },
  ]

  if (isSubmitted) {
    return (
      <section id="interiors" className="Section fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-2xl p-8 sm:p-12 text-center">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              {translations.successMessage[language].title}
            </h2>
            <p className="text-lg text-[#5A4A6B]">
              {translations.successMessage[language].description}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="interiors" className="Section fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg sm:text-xl italic text-[#6E44FF] mb-3 font-medium">
            {translations.subtitle[language]}
          </p>
          <p className="text-base text-[#5A4A6B] mb-8">
            {translations.description[language]}
          </p>
        </div>

        {/* Visualization Steps */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.stepsTitle[language]}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {visualizationSteps.map((step) => (
            <div 
              key={step.number} 
              className="relative rounded-xl p-4 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center fade-in"
            >
              {/* Step Number Badge */}
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#6E44FF] to-[#BDA6FF] text-white font-bold text-sm flex items-center justify-center shadow-md">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-3 mt-4">{step.icon}</div>
              
              {/* Title */}
              <h4 className="text-xs font-bold text-[--color-primary] mb-1.5">
                {step.title[language]}
              </h4>
              
              {/* Description */}
              <p className="text-[10px] text-[#5A4A6B] leading-tight">
                {step.desc[language]}
              </p>
                </div>
              ))}
            </div>
        
        <InteriorsClientForm stolars={stolars} language={language} />
        
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {language === 'hr' ? 'Za stolare i studije namještaja' : 'For carpenters and furniture studios'}
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            {language === 'hr' 
              ? 'Istim obrascem šaljete i svoje podatke i konkretan upit za projekt.'
              : 'With the same form you send both your details and a specific project inquiry.'}
          </p>
          <InteriorsCarpenterForm language={language} />
        </div>
      </div>
    </section>
  )
}
