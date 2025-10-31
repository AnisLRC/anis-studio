import { useState } from 'react'

interface PortfolioSectionProps {
  language: 'hr' | 'en'
}

export default function PortfolioSection({ language }: PortfolioSectionProps) {
  const translations = {
    title: {
      hr: "Naši najbolji radovi",
      en: "Our Best Work"
    },
    subtitle: {
      hr: "Pogledajte izbor naših kreativnih projekata",
      en: "Browse through a selection of our creative projects"
    },
    categories: {
      hr: ['Svi', 'LRC', 'Interijeri', 'Web Atelier'],
      en: ['All', 'LRC', 'Interiors', 'Web Atelier']
    },
    placeholder: {
      hr: "Fotografija dolazi uskoro",
      en: "Photo coming soon"
    }
  }

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'lrc' | 'interiors' | 'web-atelier'>('all')

  // Placeholder portfolio items - kasnije će se zamijeniti sa stvarnim slikama
  const portfolioItems = [
    { id: 1, category: 'lrc', title: language === 'hr' ? 'Personalizirani poklon' : 'Customized Gift' },
    { id: 2, category: 'lrc', title: language === 'hr' ? 'Epoksi umjetničko djelo' : 'Epoxy Art Piece' },
    { id: 3, category: 'interiors', title: language === 'hr' ? 'Moderna kuhinja' : 'Modern Kitchen' },
    { id: 4, category: 'interiors', title: language === 'hr' ? 'Ugradni ormar' : 'Built-in Wardrobe' },
    { id: 5, category: 'web-atelier', title: language === 'hr' ? 'Landing stranica' : 'Landing Page' },
    { id: 6, category: 'lrc', title: language === 'hr' ? 'Laser graviranje' : 'Laser Engraving' },
    { id: 7, category: 'interiors', title: language === 'hr' ? 'Radni prostor' : 'Workspace' },
    { id: 8, category: 'web-atelier', title: language === 'hr' ? 'E-commerce stranica' : 'E-commerce Site' },
    { id: 9, category: 'lrc', title: language === 'hr' ? 'Makrame ukras' : 'Macrame Decoration' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <section id="portfolio" className="Section fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg text-[#5A4A6B] max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(['all', 'lrc', 'interiors', 'web-atelier'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`pill transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] border-[--color-primary] text-[--color-primary] font-semibold'
                  : 'hover:bg-[rgba(110,68,255,0.1)]'
              }`}
            >
              {translations.categories[language][category === 'all' ? 0 : category === 'lrc' ? 1 : category === 'interiors' ? 2 : 3]}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] fade-in cursor-pointer group"
            >
              {/* Placeholder Image */}
              <div
                className="aspect-square bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{
                  borderBottom: '2px solid rgba(110, 68, 255, 0.2)'
                }}
              >
                <div className="text-center p-6">
                  <div className="text-5xl mb-3 opacity-70">🎨</div>
                  <p className="text-sm text-[#5A4A6B] font-medium">
                    {translations.placeholder[language]}
                  </p>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#2E2447] mb-2">
                  {item.title}
                </h3>
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[rgba(110,68,255,0.1)] text-[--color-primary] border border-[rgba(110,68,255,0.2)]">
                  {translations.categories[language][item.category === 'lrc' ? 1 : item.category === 'interiors' ? 2 : 3]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#5A4A6B] text-lg">
              {language === 'hr' ? 'Nema projekata u ovoj kategoriji.' : 'No projects in this category.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

