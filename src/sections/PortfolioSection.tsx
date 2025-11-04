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
    { id: 2, category: 'lrc', title: language === 'hr' ? 'Epoksidno umjetničko djelo' : 'Epoxy Art Piece' },
    { id: 3, category: 'interiors', title: language === 'hr' ? 'Moderna kuhinja' : 'Modern Kitchen' },
    { id: 4, category: 'interiors', title: language === 'hr' ? 'Ugradni ormar' : 'Built-in Wardrobe' },
    { id: 5, category: 'web-atelier', title: language === 'hr' ? 'Landing stranica' : 'Landing Page' },
    { id: 6, category: 'lrc', title: language === 'hr' ? 'Laser graviranje' : 'Laser Engraving' },
    { id: 7, category: 'interiors', title: language === 'hr' ? 'Radni prostor' : 'Workspace' },
    { id: 8, category: 'web-atelier', title: language === 'hr' ? 'E-commerce stranica' : 'E-commerce Site' },
    { id: 9, category: 'lrc', title: language === 'hr' ? 'Makrame ukras' : 'Macrame Decoration' },
    { id: 10, category: 'interiors', title: language === 'hr' ? 'Dnevni boravak' : 'Living Room' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems.slice(0, 10) // Maksimalno 10 items
    : portfolioItems.filter(item => item.category === selectedCategory).slice(0, 10)

  return (
    <section id="portfolio" className="Section fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-base text-[#5A4A6B] max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 items-center">
          {(['all', 'lrc', 'interiors', 'web-atelier'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`pill transition-all duration-200 h-11 ${
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`scroll-fade-in-stagger rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] card-hover cursor-pointer group`}
            >
              {/* Placeholder Image */}
              <div
                className="aspect-square bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{
                  borderBottom: '2px solid rgba(110, 68, 255, 0.2)'
                }}
              >
                <div className="text-center p-3 sm:p-4">
                  <div className="text-3xl sm:text-4xl mb-2 opacity-70">🎨</div>
                  <p className="text-xs text-[#5A4A6B] font-medium">
                    {translations.placeholder[language]}
                  </p>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-[#2E2447] mb-1.5 line-clamp-2">
                  {item.title}
                </h3>
                <span className="inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full bg-[rgba(110,68,255,0.1)] text-[--color-primary] border border-[rgba(110,68,255,0.2)]">
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

