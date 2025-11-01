import { useState } from 'react'
import { sampleProducts, productTags } from '../data/products'
import { cartActions } from '../lib/cart.store'

interface LRCSectionProps {
  language: 'hr' | 'en'
}

export default function LRCSection({ language }: LRCSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [formData, setFormData] = useState({
    product: '',
    description: '',
    name: '',
    email: '',
    phone: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'all' || product.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const translations = {
    title: {
      hr: "🌸 Ani's LRC",
      en: "🌸 Ani's LRC"
    },
    subtitle: {
      hr: "Laser Resin Crafting",
      en: "Laser Resin Crafting"
    },
    description: {
      hr: "Kreativna radionica jedinstvenih suvenira i funkcionalnih uporabnih predmeta",
      en: "A creative workshop of unique souvenirs & functional items"
    },
    techniques: {
      hr: "🔥 Lasersko rezanje · Lasersko graviranje · Epoksidna smola · Svila · Mandela\n🎨 Ručno izrađeno s ljubavlju i preciznošću",
      en: "🔥 Laser cutting · Laser engraving · Epoxy resin · Silk · Mandala\n🎨 Handmade with love and precision"
    },
    searchPlaceholder: {
      hr: "Pretraži proizvod...",
      en: "Search product..."
    },
    addToCart: {
      hr: "Dodaj u košaricu",
      en: "Add to cart"
    },
    customizationTitle: {
      hr: "Kako personalizirati proizvod",
      en: "How to customize your product"
    },
    step1: {
      title: { hr: "Odaberi proizvod", en: "Choose product" },
      desc: { hr: "Pregledaj našu ponudu i odaberi proizvod koji ti se sviđa", en: "Browse our selection and choose a product you like" }
    },
    step2: {
      title: { hr: "Opiši svoju želju", en: "Describe your wish" },
      desc: { hr: "Detaljno nam opiši kako želiš personalizirati proizvod", en: "Tell us in detail how you want to customize the product" }
    },
    step3: {
      title: { hr: "Dodaj slike/inspiraciju", en: "Add images/inspiration" },
      desc: { hr: "Priloži slike ili reference koje će nam pomoći razumjeti tvoju viziju", en: "Attach images or references to help us understand your vision" }
    },
    step4: {
      title: { hr: "Pošalji upit", en: "Send inquiry" },
      desc: { hr: "Pošalji nam upit i javit ćemo ti se u najkraćem roku", en: "Send us your inquiry and we'll get back to you soon" }
    },
    formTitle: {
      hr: "Personaliziraj svoj proizvod",
      en: "Customize your product"
    },
    formDesc: {
      hr: "Ispuni formu i pošalji nam svoju ideju",
      en: "Fill out the form and send us your idea"
    },
    selectProductLabel: {
      hr: "Odaberi proizvod",
      en: "Choose product"
    },
    selectProductPlaceholder: {
      hr: "Odaberi proizvod...",
      en: "Choose a product..."
    },
    descriptionLabel: {
      hr: "Opiši svoju želju",
      en: "Describe your wish"
    },
    descriptionPlaceholder: {
      hr: "Detaljno opiši što želiš personalizirati...",
      en: "Describe in detail what you want to customize..."
    },
    addImagesLabel: {
      hr: "Dodaj slike (opciono, max 5)",
      en: "Add images (optional, max 5)"
    },
    nameLabel: {
      hr: "Tvoje ime",
      en: "Your name"
    },
    emailLabel: {
      hr: "Email",
      en: "Email"
    },
    phoneLabel: {
      hr: "Telefon (opciono)",
      en: "Phone (optional)"
    },
    submitButton: {
      hr: "Pošalji upit za personalizaciju",
      en: "Send customization inquiry"
    },
    successMessage: {
      hr: "Upit uspješno poslan! Javit ćemo ti se uskoro.",
      en: "Inquiry sent successfully! We'll get back to you soon."
    }
  }

  const customizationSteps = [
    {
      number: 1,
      icon: '🛍️',
      title: translations.step1.title,
      desc: translations.step1.desc
    },
    {
      number: 2,
      icon: '✍️',
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
      icon: '📤',
      title: translations.step4.title,
      desc: translations.step4.desc
    }
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files).slice(0, 5 - uploadedFiles.length)
      setUploadedFiles(prev => [...prev, ...fileArray])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validacija
    if (!formData.product || !formData.description || !formData.name || !formData.email) {
      alert(language === 'hr' ? 'Molimo ispunite sva obavezna polja' : 'Please fill in all required fields')
      return
    }

    // Log podataka (kasnije backend integracija)
    console.log('Customization inquiry:', {
      ...formData,
      files: uploadedFiles.map(f => f.name)
    })

    // Prikaži success message
    setShowSuccess(true)

    // Reset forme
    setFormData({
      product: '',
      description: '',
      name: '',
      email: '',
      phone: ''
    })
    setUploadedFiles([])

    // Auto-hide success nakon 5s
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <section id="lrc" className="Section fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg sm:text-xl italic text-[#6E44FF] mb-3 font-medium">
            {translations.subtitle[language]}
          </p>
          <p className="text-lg sm:text-xl italic text-[#5A4A6B] mb-3 font-medium">
            {translations.description[language]}
          </p>
          <p className="text-base text-[#5A4A6B] mb-8 whitespace-pre-line">
            {translations.techniques[language]}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-5">
          <div className="max-w-md mx-auto">
            <label className="block text-xl font-bold text-[#2E2447] mb-2 text-center">
              {language === 'hr' ? 'WEBSHOP' : 'WEBSHOP'}
            </label>
            <input
              type="text"
              placeholder={translations.searchPlaceholder[language]}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447] placeholder:text-[#5A4A6B] placeholder:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 items-center">
            {productTags.map(tag => (
              <button
                key={tag.id}
                className={`pill transition-all duration-200 h-11 ${
                  selectedTag === tag.id 
                    ? 'bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] border-[--color-primary] text-[--color-primary] font-semibold' 
                    : 'hover:bg-[rgba(110,68,255,0.1)]'
                }`}
                onClick={() => setSelectedTag(tag.id)}
              >
                {tag.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
          {filteredProducts.map(product => (
            <article 
              key={product.id} 
              className="rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] fade-in"
            >
              {/* Thumb */}
              <div className="aspect-square bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                {/* Decorative circles */}
                <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(110,68,255,0.2)] to-[rgba(189,166,255,0.3)] blur-xl" />
                <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] blur-lg" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center p-3 sm:p-4">
                  <div className="text-center">
                    {/* Product Icon based on tags */}
                    <div className="text-4xl sm:text-5xl mb-2 animate-float">
                      {product.tags.includes('epoxy') ? '💎' :
                       product.tags.includes('wood') || product.tags.includes('laser') ? '🪵' :
                       product.tags.includes('macrame') ? '🪢' :
                       product.tags.includes('ceramic') ? '☕' :
                       product.tags.includes('silk') ? '🧣' :
                       product.tags.includes('jewelry') ? '💍' : '🎨'}
                    </div>
                    
                    {/* Badge */}
                    <div className="inline-block px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.3)] shadow-md">
                      <p className="text-[10px] text-[#6E44FF] font-semibold uppercase tracking-wider">
                        {language === 'hr' ? 'Fotografija uskoro' : 'Coming Soon'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-bold mb-1.5 text-[#2E2447] line-clamp-2">
                  {language === 'hr' ? product.nameHr : product.name}
                </h3>
                <div className="text-lg sm:text-xl font-bold mb-2 text-[--color-primary]">€{product.price}</div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[rgba(110,68,255,0.1)] text-[--color-primary] border border-[rgba(110,68,255,0.2)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button 
                  className="btn btn-primary w-full text-xs sm:text-sm py-2"
                  onClick={() => {
                    cartActions.addItem({
                      id: product.id,
                      title: language === 'hr' ? product.nameHr : product.name,
                      price: product.price,
                      imageUrl: product.image,
                      tags: product.tags
                    });
                  }}
                >
                  {translations.addToCart[language]}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Customization Steps */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.customizationTitle[language]}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {customizationSteps.map((step) => (
            <div 
              key={step.number} 
              className="relative rounded-2xl p-6 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center fade-in"
            >
              {/* Step Number Badge */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#6E44FF] to-[#BDA6FF] text-white font-bold text-lg flex items-center justify-center shadow-md">
                {step.number}
              </div>
              
              {/* Icon */}
              <div className="text-5xl mb-4 mt-6">{step.icon}</div>
              
              {/* Title */}
              <h4 className="text-base font-bold text-[--color-primary] mb-2">
                {step.title[language]}
              </h4>
              
              {/* Description */}
              <p className="text-sm text-[#5A4A6B]">
                {step.desc[language]}
              </p>
            </div>
          ))}
        </div>

        {/* Personalization Form */}
        <div className="rounded-2xl p-5 sm:p-8 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.2)] shadow-lg fade-in">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[--color-primary]">
              {translations.formTitle[language]}
            </h3>
            <p className="text-sm text-[#5A4A6B]">
              {translations.formDesc[language]}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-[#2E2447] mb-1.5">
                {translations.selectProductLabel[language]} *
              </label>
              <select
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
              >
                <option value="">{translations.selectProductPlaceholder[language]}</option>
                {sampleProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {language === 'hr' ? product.nameHr : product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#2E2447] mb-1.5">
                {translations.descriptionLabel[language]} *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder={translations.descriptionPlaceholder[language]}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447] placeholder:text-[#5A4A6B] resize-none"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-[#2E2447] mb-1.5">
                {translations.addImagesLabel[language]}
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploadedFiles.length >= 5}
                className="w-full px-3 py-2 text-sm rounded-xl border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447] file:mr-3 file:py-1.5 file:px-3 file:text-sm file:rounded-full file:border-0 file:bg-[rgba(110,68,255,0.1)] file:text-[--color-primary] file:font-semibold hover:file:bg-[rgba(110,68,255,0.2)] file:cursor-pointer"
              />
              
              {/* File Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg border border-[rgba(110,68,255,0.2)]"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#2E2447] mb-1.5">
                  {translations.nameLabel[language]} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#2E2447] mb-1.5">
                  {translations.emailLabel[language]} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#2E2447] mb-1.5">
                  {translations.phoneLabel[language]}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-[rgba(110,68,255,0.2)] bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="btn btn-primary px-12 py-4 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                style={{ letterSpacing: '0.02em' }}
              >
                {translations.submitButton[language]}
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-center text-sm animate-fade-in">
                {translations.successMessage[language]}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}