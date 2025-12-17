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
      hr: "Uskoro",
      en: "Coming soon"
    }
  }

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'lrc' | 'interiors' | 'web-atelier'>('all')

  // Category icons
  const categoryIcons: Record<string, string> = {
    'lrc': '🎁',
    'interiors': '🏠',
    'web-atelier': '💻'
  }

  // Placeholder portfolio items
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
    ? portfolioItems.slice(0, 10)
    : portfolioItems.filter(item => item.category === selectedCategory).slice(0, 10)

  return (
    <section id="portfolio" className="py-16 sm:py-20 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-plum/90 dark:text-pearl">
            {translations.title[language]}
          </h2>
          <p className="text-base sm:text-lg text-plum/80 dark:text-pearl/70 max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Category Filters - with glow on active */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(['all', 'lrc', 'interiors', 'web-atelier'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium
                transition-all duration-300 border
                ${selectedCategory === category
                  ? 'bg-amethyst text-white border-amethyst shadow-[0_0_20px_rgba(110,68,255,0.4)] dark:shadow-[0_0_25px_rgba(189,166,255,0.35)]'
                  : 'bg-white/60 dark:bg-white/8 border-amethyst/20 dark:border-lavender/15 text-plum/90 dark:text-pearl hover:bg-amethyst/10 dark:hover:bg-lavender/10 hover:text-plum dark:hover:text-pearl'
                }
              `}
            >
              {translations.categories[language][category === 'all' ? 0 : category === 'lrc' ? 1 : category === 'interiors' ? 2 : 3]}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden cursor-pointer
                bg-white/85 dark:bg-white/8 backdrop-blur-xl
                border border-amethyst/15 dark:border-lavender/15
                shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                hover:shadow-[0_20px_50px_rgba(110,68,255,0.15)] dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)]
                hover:scale-105 hover:-translate-y-1
                transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Shimmer Placeholder Image */}
              <div className="aspect-square relative overflow-hidden">
                {/* Shimmer animation background */}
                <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-amethyst/20 to-lavender/30 dark:from-lavender/15 dark:via-amethyst/10 dark:to-lavender/15" />
                
                {/* Shimmer sweep effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                
                {/* Centered icon + text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl sm:text-5xl mb-2 opacity-60 group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[item.category]}
                  </div>
                  <p className="text-xs text-plum/70 dark:text-pearl/50 font-medium">
                    {translations.placeholder[language]}
                  </p>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-plum/90 dark:text-pearl mb-2 line-clamp-2 group-hover:text-amethyst dark:group-hover:text-lavender transition-colors">
                  {item.title}
                </h3>
                
                {/* Category Badge */}
                <span className="
                  inline-flex items-center gap-1 px-2.5 py-1 
                  text-[10px] sm:text-xs font-semibold rounded-full
                  bg-gradient-to-r from-amethyst/15 to-lavender/15 
                  dark:from-amethyst/25 dark:to-lavender/20
                  text-amethyst dark:text-lavender
                  border border-amethyst/20 dark:border-lavender/20
                ">
                  <span className="text-xs">{categoryIcons[item.category]}</span>
                  {translations.categories[language][item.category === 'lrc' ? 1 : item.category === 'interiors' ? 2 : 3]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-plum/80 dark:text-pearl/60 text-lg">
              {language === 'hr' ? 'Nema projekata u ovoj kategoriji.' : 'No projects in this category.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
