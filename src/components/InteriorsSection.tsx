import { useState } from 'react'

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
      hr: "Realistični 2D skice i 3D renderi na temelju vaših dimenzija i ideja",
      en: "Realistic 2D sketches and 3D renders based on your dimensions and ideas"
    },
    subtitle: {
      hr: "Usluga dostupna diljem Hrvatske",
      en: "Service available across Croatia"
    },
    orderForm: {
      hr: "Naručite svoj interijer",
      en: "Order Your Interior"
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
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg text-[#5A4A6B]">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Order Form */}
        <div className="glass-morphism rounded-2xl p-6 sm:p-8 lg:p-10">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.orderForm[language]}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tip namještaja i Broj zidova */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="furnitureType" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                  {translations.formLabels[language].furnitureType} *
                </label>
                <select
                  id="furnitureType"
                  name="furnitureType"
                  value={formData.furnitureType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-[#2E2447] ${
                    errors.furnitureType 
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20'
                  }`}
                  required
                >
                  <option value="">{translations.formOptions[language].selectType}</option>
                  {translations.formOptions[language].furnitureTypes.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.furnitureType && (
                  <p className="mt-1 text-sm text-red-600">{errors.furnitureType}</p>
                )}
              </div>

              <div>
                <label htmlFor="wallCount" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                  {translations.formLabels[language].wallCount}
                </label>
                <select
                  id="wallCount"
                  name="wallCount"
                  value={formData.wallCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                >
                  <option value="">{translations.formOptions[language].selectNumber}</option>
                  {translations.formOptions[language].wallCounts.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dimenzije prostora */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#2E2447]">
                {language === 'hr' ? 'Dimenzije prostora' : 'Room Dimensions'} *
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="length" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                    {translations.formLabels[language].length}
                  </label>
                  <input
                    type="number"
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    min="1"
                    step="0.1"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-[#2E2447] ${
                      errors.length 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20'
                    }`}
                    placeholder="cm"
                    required
                  />
                  {errors.length && (
                    <p className="mt-1 text-sm text-red-600">{errors.length}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="width" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                    {translations.formLabels[language].width}
                  </label>
                  <input
                    type="number"
                    id="width"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    min="1"
                    step="0.1"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-[#2E2447] ${
                      errors.width 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20'
                    }`}
                    placeholder="cm"
                    required
                  />
                  {errors.width && (
                    <p className="mt-1 text-sm text-red-600">{errors.width}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="height" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                    {translations.formLabels[language].height}
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    min="1"
                    step="0.1"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-[#2E2447] ${
                      errors.height 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20'
                    }`}
                    placeholder="cm"
                    required
                  />
                  {errors.height && (
                    <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="depth" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                    {translations.formLabels[language].depth}
                  </label>
                  <input
                    type="number"
                    id="depth"
                    name="depth"
                    value={formData.depth}
                    onChange={handleInputChange}
                    min="1"
                    step="0.1"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-[#2E2447] ${
                      errors.depth 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20'
                    }`}
                    placeholder="cm"
                    required
                  />
                  {errors.depth && (
                    <p className="mt-1 text-sm text-red-600">{errors.depth}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tip ručki - Radio buttons */}
            <div>
              <label className="block mb-3 text-sm font-semibold text-[#2E2447]">
                {translations.formLabels[language].handleType} *
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-[rgba(110,68,255,0.05)]"
                  style={{
                    borderColor: formData.handleType === 'ugradbene' ? 'var(--color-primary)' : 'rgba(110,68,255,0.2)',
                    background: formData.handleType === 'ugradbene' ? 'rgba(110,68,255,0.1)' : 'transparent'
                  }}
                >
                  <input
                    type="radio"
                    name="handleType"
                    value="ugradbene"
                    checked={formData.handleType === 'ugradbene'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20"
                    required
                  />
                  <span className="text-[#2E2447] font-medium">
                    {translations.formOptions[language].handleTypes.ugradbene}
                  </span>
                </label>
                
                <label className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-[rgba(110,68,255,0.05)]"
                  style={{
                    borderColor: formData.handleType === 'obicne' ? 'var(--color-primary)' : 'rgba(110,68,255,0.2)',
                    background: formData.handleType === 'obicne' ? 'rgba(110,68,255,0.1)' : 'transparent'
                  }}
                >
                  <input
                    type="radio"
                    name="handleType"
                    value="obicne"
                    checked={formData.handleType === 'obicne'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20"
                    required
                  />
                  <span className="text-[#2E2447] font-medium">
                    {translations.formOptions[language].handleTypes.obicne}
                  </span>
                </label>
              </div>
              {errors.handleType && (
                <p className="mt-2 text-sm text-red-600">{errors.handleType}</p>
              )}
            </div>

            {/* Posebne karakteristike prostora */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#2E2447]">
                {translations.formLabels[language].specialFeatures}
              </h4>
              <div className="space-y-4">
                {/* Kosina */}
                <div className="p-4 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/50">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasSlope"
                      checked={formData.hasSlope}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 text-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-[#2E2447]">
                        {translations.formLabels[language].slope}
                      </span>
                      {formData.hasSlope && (
                        <input
                          type="text"
                          name="slopeDescription"
                          value={formData.slopeDescription}
                          onChange={handleInputChange}
                          placeholder={translations.formLabels[language].slopeDescription}
                          className="mt-2 w-full px-4 py-2 rounded-lg border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                        />
                      )}
                    </div>
                  </label>
                </div>

                {/* Stup */}
                <div className="p-4 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/50">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasColumn"
                      checked={formData.hasColumn}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 text-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-[#2E2447]">
                        {translations.formLabels[language].column}
                      </span>
                      {formData.hasColumn && (
                        <input
                          type="text"
                          name="columnDimensions"
                          value={formData.columnDimensions}
                          onChange={handleInputChange}
                          placeholder={translations.formLabels[language].columnDimensions}
                          className="mt-2 w-full px-4 py-2 rounded-lg border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                        />
                      )}
                    </div>
                  </label>
                </div>

                {/* Greda */}
                <div className="p-4 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/50">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasBeam"
                      checked={formData.hasBeam}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 text-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-[#2E2447]">
                        {translations.formLabels[language].beam}
                      </span>
                      {formData.hasBeam && (
                        <input
                          type="text"
                          name="beamDimensions"
                          value={formData.beamDimensions}
                          onChange={handleInputChange}
                          placeholder={translations.formLabels[language].beamDimensions}
                          className="mt-2 w-full px-4 py-2 rounded-lg border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Ostalo što treba naglasiti */}
            <div>
              <label htmlFor="otherNotes" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                {translations.formLabels[language].otherNotes}
              </label>
              <textarea
                id="otherNotes"
                name="otherNotes"
                value={formData.otherNotes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none resize-vertical text-[#2E2447]"
                placeholder={language === 'hr' ? "Opišite sve što treba naglasiti..." : "Describe anything else that needs to be highlighted..."}
              />
            </div>

            {/* Upload skica */}
            <div>
              <label htmlFor="sketches" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                {translations.formLabels[language].sketches}
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  id="sketches"
                  name="sketches"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,application/pdf"
                  multiple
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[rgba(110,68,255,0.1)] file:text-[--color-primary] hover:file:bg-[rgba(110,68,255,0.2)] cursor-pointer"
                />
                <p className="text-sm text-[#5A4A6B]">
                  {translations.formLabels[language].sketchesHelp} {language === 'hr' ? '(možete odabrati više datoteka)' : '(you can select multiple files)'}
                </p>
                
                {/* Preview svih slika */}
                {formData.sketches.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.sketches.map((file, index) => {
                      const preview = sketchPreviews[index]?.preview || null
                      const isImage = file.type.startsWith('image/')
                      
                      return (
                        <div key={`${file.name}-${file.size}-${index}`} className="relative group">
                          {isImage && preview ? (
                            <div className="relative">
                              <img 
                                src={preview} 
                                alt={`Sketch ${index + 1}`} 
                                className="w-full h-48 object-cover rounded-lg border border-[rgba(110,68,255,0.2)] shadow-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeSketch(index)}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label={language === 'hr' ? 'Ukloni sliku' : 'Remove image'}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="p-4 rounded-lg border border-[rgba(110,68,255,0.2)] bg-white/50 relative group">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-[rgba(110,68,255,0.1)] flex items-center justify-center flex-shrink-0">
                                  📄
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-[#2E2447] text-sm truncate" title={file.name}>
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-[#5A4A6B]">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeSketch(index)}
                                className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label={language === 'hr' ? 'Ukloni datoteku' : 'Remove file'}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
                
                {errors.sketches && (
                  <p className="mt-2 text-sm text-red-600">{errors.sketches}</p>
                )}
              </div>
            </div>

            {/* Napomene */}
            <div>
              <label htmlFor="notes" className="block mb-2 text-sm font-semibold text-[#2E2447]">
                {translations.formLabels[language].notes}
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.otherNotes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none resize-vertical text-[#2E2447]"
                placeholder={language === 'hr' ? "Opišite svoje želje i zahtjeve..." : "Describe your wishes and requirements..."}
              />
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="btn btn-primary w-full sm:w-auto min-w-[200px] mx-auto block"
              >
                {translations.submitButton[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
