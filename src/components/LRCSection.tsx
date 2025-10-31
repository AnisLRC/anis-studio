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
      hr: "🔥 Lasersko graviranje · Epoksidna smola · Svilka · Graviranje\n🎨 Ručno izrađeno s ljubavlju i preciznošću",
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
      hr: "Svaki proizvod može biti prilagođen vašim željama",
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
        hr: 'Lasersko rezanje',
        en: 'Laser Cutting'
      },
      steps: {
        hr: [],
        en: []
      }
    },
    {
      icon: '🎨',
      title: {
        hr: 'Lasersko graviranje',
        en: 'Laser Engraving'
      },
      steps: {
        hr: [],
        en: []
      }
    },
    {
      icon: '💎',
      title: {
        hr: 'Epoksidna smola',
        en: 'Epoxy Resin'
      },
      steps: {
        hr: [],
        en: []
      }
    },
    {
      icon: '🪢',
      title: {
        hr: 'Svila',
        en: 'Silk'
      },
      steps: {
        hr: [],
        en: []
      }
    }
  ]

  return (
    <section id="lrc" className="Section fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-base text-[#5A4A6B] mb-5 whitespace-pre-line">
            {translations.subtitle[language]}
          </p>
          
          {/* Feature Chips */}
          <div className="flex flex-wrap justify-center gap-3 items-center">
            <span className="pill h-11">Lasersko graviranje</span>
            <span className="pill h-11">Epoksidna smola</span>
            <span className="pill h-11">Ručno izrađeno</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-5">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder={translations.searchPlaceholder[language]}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447] placeholder:text-[#5A4A6B]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map(product => (
            <article 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] fade-in"
            >
              {/* Thumb */}
              <div className="aspect-square bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-[rgba(110,68,255,0.2)] to-[rgba(189,166,255,0.3)] blur-2xl" />
                <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] blur-xl" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    {/* Product Icon based on tags */}
                    <div className="text-6xl mb-4 animate-float">
                      {product.tags.includes('epoxy') ? '💎' :
                       product.tags.includes('wood') || product.tags.includes('laser') ? '🪵' :
                       product.tags.includes('macrame') ? '🪢' :
                       product.tags.includes('ceramic') ? '☕' :
                       product.tags.includes('silk') ? '🧣' :
                       product.tags.includes('jewelry') ? '💍' : '🎨'}
                    </div>
                    
                    {/* Badge */}
                    <div className="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.3)] shadow-lg">
                      <p className="text-xs text-[#6E44FF] font-semibold uppercase tracking-wider">
                        {language === 'hr' ? 'Fotografija uskoro' : 'Coming Soon'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
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
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.processes[language]}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {processSteps.map((process, index) => (
            <div 
              key={index} 
              className="rounded-2xl p-5 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center fade-in"
            >
              <div className="text-4xl mb-3">{process.icon}</div>
              <h4 className="text-base font-bold text-[--color-primary]">
                {process.title[language]}
              </h4>
            </div>
          ))}
        </div>

        {/* Personalization Banner */}
        <div className="rounded-2xl p-6 sm:p-10 text-center bg-gradient-to-br from-[rgba(189,166,255,0.15)] to-[rgba(110,68,255,0.1)] border border-[rgba(110,68,255,0.2)] shadow-lg fade-in">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[--color-primary]">
            {translations.personalization[language]}
          </h3>
          <p className="text-base text-[#5A4A6B] mb-6">
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