import { useState } from 'react'
import { sampleProducts, productTags } from '../data/products'
import { cartActions } from '../lib/cart.store'

interface LRCSectionProps {
  language: 'hr' | 'en'
}

export default function LRCSection({ language }: LRCSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'all' || product.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const translations = {
    title: {
      hr: "🌸 Ani's LRC — kreativna radionica jedinstvenih suvenira i funkcionalnih umjetničkih djela",
      en: "🌸 Ani's LRC — a creative workshop of unique souvenirs & functional art pieces"
    },
    subtitle: {
      hr: "🔥 Laser graviranje · Epoksi smola · Svilka · Graviranje\n🎨 Ručno izrađeno s ljubavlju i preciznošću",
      en: "🔥 Laser cutting · Epoxy resin · Silk · Engraving\n🎨 Handmade with love and precision"
    },
    searchPlaceholder: {
      hr: "Pretraži proizvode...",
      en: "Search products..."
    },
    addToCart: {
      hr: "Dodaj u košaricu",
      en: "Add to cart"
    },
    processes: {
      hr: "Naši procesi",
      en: "Our Techniques"
    },
    personalization: {
      hr: "Personaliziraj svoj poklon — imena, datumi, poruke",
      en: "Customize your gift — names, dates, messages"
    },
    personalizationDesc: {
      hr: "Svaki proizvod može biti prilagođen tvojim željama",
      en: "Every product can be customized to your wishes"
    },
    sendInquiry: {
      hr: "Pošalji upit",
      en: "Send Inquiry"
    }
  }

  const processSteps = [
    {
      icon: '⚡',
      title: {
        hr: 'Laser Graviranje',
        en: 'Laser Engraving'
      },
      steps: {
        hr: ['Priprema dizajna', 'Graviranje', 'Završna obrada'],
        en: ['Design prep', 'Engrave', 'Finish']
      }
    },
    {
      icon: '🎨',
      title: {
        hr: 'Akrilno Ručno Slikanje',
        en: 'Acrylic Hand Painting'
      },
      steps: {
        hr: ['Skica', 'Slikanje', 'Zaštita'],
        en: ['Sketch', 'Paint', 'Seal']
      }
    },
    {
      icon: '💎',
      title: {
        hr: 'Epoksi Lijevanje',
        en: 'Epoxy Casting'
      },
      steps: {
        hr: ['Priprema kalupa', 'Miješanje i lijevanje', 'Brušenje i poliranje'],
        en: ['Mold prep', 'Mix & pour', 'Sand & polish']
      }
    },
    {
      icon: '🪢',
      title: {
        hr: 'Makrame Pletenje',
        en: 'Macrame Weaving'
      },
      steps: {
        hr: ['Odabir uzorka', 'Pletenje', 'Završna obrada'],
        en: ['Pattern choice', 'Knotting', 'Final finish']
      }
    }
  ]

  return (
    <section id="lrc" className="Section fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg text-[#5A4A6B] mb-6 whitespace-pre-line">
            {translations.subtitle[language]}
          </p>
          
          {/* Feature Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="pill">Laser graviranje</span>
            <span className="pill">Epoksi smola</span>
            <span className="pill">Ručno izrađeno</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 space-y-6">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder={translations.searchPlaceholder[language]}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447] placeholder:text-[#5A4A6B]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {productTags.map(tag => (
              <button
                key={tag.id}
                className={`pill transition-all duration-200 ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProducts.map(product => (
            <article 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] fade-in"
            >
              {/* Thumb */}
              <div className="aspect-square bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-5xl mb-3 opacity-70">🎨</div>
                  <p className="text-sm text-[#5A4A6B] font-medium">
                    {language === 'hr' ? 'Fotografija dolazi uskoro' : 'Photo coming soon'}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#2E2447]">
                  {language === 'hr' ? product.nameHr : product.name}
                </h3>
                <div className="text-2xl font-bold mb-4 text-[--color-primary]">€{product.price}</div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[rgba(110,68,255,0.1)] text-[--color-primary] border border-[rgba(110,68,255,0.2)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button 
                  className="btn btn-primary w-full"
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

        {/* Process Steps */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.processes[language]}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {processSteps.map((process, index) => (
            <div 
              key={index} 
              className="rounded-2xl p-6 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center fade-in"
            >
              <div className="text-5xl mb-4">{process.icon}</div>
              <h4 className="text-lg font-bold mb-4 text-[--color-primary]">
                {process.title[language]}
              </h4>
              <div className="space-y-2">
                {process.steps[language].map((step, stepIndex) => (
                  <div key={stepIndex} className="text-sm text-[#5A4A6B]">
                    {stepIndex + 1}. {step}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Personalization Banner */}
        <div className="rounded-2xl p-8 sm:p-12 text-center bg-gradient-to-br from-[rgba(189,166,255,0.15)] to-[rgba(110,68,255,0.1)] border border-[rgba(110,68,255,0.2)] shadow-lg fade-in">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[--color-primary]">
            {translations.personalization[language]}
          </h3>
          <p className="text-lg text-[#5A4A6B] mb-8">
            {translations.personalizationDesc[language]}
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              const contactSection = document.querySelector('#contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            {translations.sendInquiry[language]}
          </button>
        </div>
      </div>
    </section>
  )
}