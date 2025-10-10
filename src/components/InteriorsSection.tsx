import { useState } from 'react'

interface InteriorsSectionProps {
  language: 'hr' | 'en'
}

export default function InteriorsSection({ language }: InteriorsSectionProps) {
  const [formData, setFormData] = useState({
    furnitureType: '',
    wallCount: '',
    handleType: '',
    width: '',
    height: '',
    depth: '',
    slantedCeiling: false,
    notes: '',
    sketches: null as File | null
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const translations = {
    title: {
      hr: "Realistični 2D skice i 3D renderi na temelju vaših dimenzija i ideja — usluga dostupna diljem Hrvatske",
      en: "Realistic 2D sketches and 3D renders based on your dimensions and ideas — service available across Croatia"
    },
    categories: {
      hr: ['Ugradni ormari', 'Kuhinje', 'Niskogradnja', 'Radni prostori', 'Dječje sobe', 'Dnevni boravci'],
      en: ['Built-in Wardrobes', 'Kitchens', 'Sideboards', 'Workspaces', 'Kids\' Rooms', 'Living Rooms']
    },
    process: {
      hr: "Naš proces",
      en: "Our Process"
    },
    processSteps: {
      hr: [
        { number: 1, title: 'Brief', description: 'Razgovor o vašim željama' },
        { number: 2, title: 'Mjerenja', description: 'Mjerenja od vas' },
        { number: 3, title: '2D Koncept', description: 'Prvi nacrt' },
        { number: 4, title: '3D Render', description: 'Realističan prikaz' },
        { number: 5, title: 'Ponuda', description: 'Konačna cijena' }
      ],
      en: [
        { number: 1, title: 'Brief', description: 'Discussion about your wishes' },
        { number: 2, title: 'Measurements', description: 'Measurements from you' },
        { number: 3, title: '2D Concept', description: 'First draft' },
        { number: 4, title: '3D Render', description: 'Realistic visualization' },
        { number: 5, title: 'Estimate', description: 'Final cost' }
      ]
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
        width: "Širina (cm)",
        height: "Visina (cm)",
        depth: "Dubina (cm)",
        slantedCeiling: "Kos strop",
        sketches: "Učitaj skice (slika/PDF)",
        notes: "Napomene"
      },
      en: {
        furnitureType: "Furniture type",
        wallCount: "Number of walls",
        handleType: "Handle type",
        width: "Width (cm)",
        height: "Height (cm)",
        depth: "Depth (cm)",
        slantedCeiling: "Slanted ceiling",
        sketches: "Upload sketches (image/PDF)",
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
        handleTypes: [
          { value: "ugradne", label: "Ugradne" },
          { value: "standardne", label: "Standardne" }
        ]
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
        handleTypes: [
          { value: "ugradne", label: "Built-in" },
          { value: "standardne", label: "Standard" }
        ]
      }
    },
    submitButton: {
      hr: "Pošalji narudžbu",
      en: "Submit Order"
    },
    consultationCta: {
      hr: "Zakaži besplatnu konzultaciju",
      en: "Book a Free Consultation"
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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, sketches: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
        width: '',
        height: '',
        depth: '',
        slantedCeiling: false,
        notes: '',
        sketches: null
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <section id="interiors" className="section">
        <div className="container">
          <div className="glass-panel text-center" style={{padding: 'var(--space-3xl)'}}>
            <h2 style={{color: 'var(--clr-primary)', marginBottom: 'var(--space-lg)'}}>{translations.successMessage[language].title}</h2>
            <p style={{fontSize: 'var(--text-lg)', color: 'var(--clr-text-light)'}}>{translations.successMessage[language].description}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="interiors" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="text-center">{translations.title[language]}</h2>
        </div>

        {/* Categories */}
        <div className="interiors-content">
          <div className="categories-grid">
            {translations.categories[language].map((category, index) => (
              <div key={index} className="category-card glass-panel text-center">
                <h3>{category}</h3>
              </div>
            ))}
          </div>

          {/* Process Timeline */}
          <div className="process-timeline">
            <h3 className="text-center" style={{marginBottom: 'var(--space-lg)'}}>{translations.process[language]}</h3>
            <div className="timeline">
              {translations.processSteps[language].map((step) => (
                <div key={step.number} className="timeline-step">
                  <div className="step-number">{step.number}</div>
                  <div className="step-content">
                    <strong>{step.title}</strong><br />
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Form */}
          <div className="glass-panel" style={{padding: 'var(--space-xl)'}}>
            <h3 className="text-center" style={{marginBottom: 'var(--space-lg)'}}>{translations.orderForm[language]}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="furnitureType">{translations.formLabels[language].furnitureType}</label>
                <select
                  id="furnitureType"
                  name="furnitureType"
                  value={formData.furnitureType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{translations.formOptions[language].selectType}</option>
                  {translations.formOptions[language].furnitureTypes.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="wallCount">{translations.formLabels[language].wallCount}</label>
                <select
                  id="wallCount"
                  name="wallCount"
                  value={formData.wallCount}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{translations.formOptions[language].selectNumber}</option>
                  {translations.formOptions[language].wallCounts.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="handleType">{translations.formLabels[language].handleType}</label>
                <select
                  id="handleType"
                  name="handleType"
                  value={formData.handleType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{translations.formOptions[language].selectType}</option>
                  {translations.formOptions[language].handleTypes.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="width">{translations.formLabels[language].width}</label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="height">{translations.formLabels[language].height}</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="depth">{translations.formLabels[language].depth}</label>
                <input
                  type="number"
                  id="depth"
                  name="depth"
                  value={formData.depth}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group lg:col-span-2">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="slantedCeiling"
                    checked={formData.slantedCeiling}
                    onChange={handleInputChange}
                  />
                  {translations.formLabels[language].slantedCeiling}
                </label>
              </div>

              <div className="form-group lg:col-span-2">
                <label htmlFor="sketches">{translations.formLabels[language].sketches}</label>
                <input
                  type="file"
                  id="sketches"
                  name="sketches"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
              </div>

              <div className="form-group lg:col-span-2">
                <label htmlFor="notes">{translations.formLabels[language].notes}</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={language === 'hr' ? "Opišite svoje želje i zahtjeve..." : "Describe your wishes and requirements..."}
                />
              </div>

              <div className="lg:col-span-2 text-center">
                <button type="submit" className="btn btn-primary">
                  {translations.submitButton[language]}
                </button>
              </div>
            </form>
          </div>

          {/* CTA */}
          <div className="consultation-cta">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                const contactSection = document.querySelector('#contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {translations.consultationCta[language]}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}