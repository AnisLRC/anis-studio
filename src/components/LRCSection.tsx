import { useState } from 'react'
import { sampleProducts, productTags } from '../data/products'
import { addToCart, type CartItem } from '../lib/cart'

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
    <>
      {/* Section Header */}
      <div className="section-header">
        <h2>{translations.title[language]}</h2>
        <p className="section-subtitle" style={{ whiteSpace: 'pre-line' }}>
          {translations.subtitle[language]}
        </p>
        
        {/* Feature Chips */}
        <div className="feature-chips">
          <span className="feature-chip">Laser graviranje</span>
          <span className="feature-chip">Epoksi smola</span>
          <span className="feature-chip">Ručno izrađeno</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="lrc-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder={translations.searchPlaceholder[language]}
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="tag-filters">
          {productTags.map(tag => (
            <button
              key={tag.id}
              className={`tag-chip ${selectedTag === tag.id ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag.id)}
            >
              {tag.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="cards-grid">
        {filteredProducts.map(product => (
          <article key={product.id} className="card">
            <div className="card-body">
              <div className="product-image">
                <span>🎨</span>
              </div>
              <h3 className="product-name">{language === 'hr' ? product.nameHr : product.name}</h3>
              <div className="product-tags">
                {product.tags.map(tag => (
                  <span key={tag} className="product-tag">{tag}</span>
                ))}
              </div>
              <div className="product-price">{product.price}€</div>
              <button 
                className="btn btn-primary btn-small w-full mt-4"
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: language === 'hr' ? product.nameHr : product.name,
                    price: product.price,
                    image: product.image,
                    tags: product.tags
                  });
                  // Trigger cart update event
                  window.dispatchEvent(new Event('cartUpdated'));
                }}
              >
                {translations.addToCart[language]}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Process Steps */}
      <div className="section-header">
        <h3>{translations.processes[language]}</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {processSteps.map((process, index) => (
          <div key={index} className="glass-panel text-center">
            <div className="text-4xl mb-4">{process.icon}</div>
            <h4 className="text-primary mb-4">
              {process.title[language]}
            </h4>
            <div>
              {process.steps[language].map((step, stepIndex) => (
                <div key={stepIndex} className="text-sm text-light mb-2">
                  {stepIndex + 1}. {step}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Personalization Banner */}
      <div className="glass-panel text-center" style={{ marginTop: 'var(--space-3xl)' }}>
        <h3 className="text-primary mb-4">
          {translations.personalization[language]}
        </h3>
        <p className="text-light mb-6">
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
    </>
  )
}