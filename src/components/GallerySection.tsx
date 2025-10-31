import { useState } from 'react'

interface GallerySectionProps {
  language: 'hr' | 'en'
}

export default function GallerySection({ language }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)

  const translations = {
    title: {
      hr: "Galerija radova",
      en: "Portfolio Gallery"
    },
    subtitle: {
      hr: "Pogled na neke od naših najdražih projekata",
      en: "A glimpse of some of our favorite projects"
    },
    categories: {
      hr: ["Sve", "LRC Proizvodi", "3D Interijeri", "Web Projekti"],
      en: ["All", "LRC Products", "3D Interiors", "Web Projects"]
    },
    items: {
      hr: [
        {
          id: 1,
          category: "LRC Proizvodi",
          title: "Epoksi poklon set",
          description: "Personalizirani poklon set s laser gravurom",
          aspect: "square"
        },
        {
          id: 2,
          category: "3D Interijeri",
          title: "Moderna kuhinja",
          description: "3D vizualizacija kuhinje s inline dizajnom",
          aspect: "landscape"
        },
        {
          id: 3,
          category: "LRC Proizvodi",
          title: "Makrame ukras",
          description: "Ručno pleten makrame za dnevni boravak",
          aspect: "portrait"
        },
        {
          id: 4,
          category: "Web Projekti",
          title: "Landing stranica",
          description: "Moderna landing page za startup",
          aspect: "landscape"
        },
        {
          id: 5,
          category: "LRC Proizvodi",
          title: "Laser gravura",
          description: "Personalizirani drveni poklon",
          aspect: "square"
        },
        {
          id: 6,
          category: "3D Interijeri",
          title: "Ugradni ormar",
          description: "3D render ugradnog ormara za spavaću sobu",
          aspect: "portrait"
        },
        {
          id: 7,
          category: "LRC Proizvodi",
          title: "Epoksi nakit",
          description: "Ručno rađeni epoksi privjesak",
          aspect: "square"
        },
        {
          id: 8,
          category: "Web Projekti",
          title: "Portfolio site",
          description: "Minimalistički portfolio za umjetnicu",
          aspect: "landscape"
        },
        {
          id: 9,
          category: "3D Interijeri",
          title: "Radni prostor",
          description: "Dizajn home office-a s custom policama",
          aspect: "landscape"
        }
      ],
      en: [
        {
          id: 1,
          category: "LRC Products",
          title: "Epoxy gift set",
          description: "Personalized gift set with laser engraving",
          aspect: "square"
        },
        {
          id: 2,
          category: "3D Interiors",
          title: "Modern kitchen",
          description: "3D visualization of inline kitchen design",
          aspect: "landscape"
        },
        {
          id: 3,
          category: "LRC Products",
          title: "Macrame decoration",
          description: "Hand-woven macrame for living room",
          aspect: "portrait"
        },
        {
          id: 4,
          category: "Web Projects",
          title: "Landing page",
          description: "Modern landing page for startup",
          aspect: "landscape"
        },
        {
          id: 5,
          category: "LRC Products",
          title: "Laser engraving",
          description: "Personalized wooden gift",
          aspect: "square"
        },
        {
          id: 6,
          category: "3D Interiors",
          title: "Built-in wardrobe",
          description: "3D render of bedroom wardrobe",
          aspect: "portrait"
        },
        {
          id: 7,
          category: "LRC Products",
          title: "Epoxy jewelry",
          description: "Handmade epoxy pendant",
          aspect: "square"
        },
        {
          id: 8,
          category: "Web Projects",
          title: "Portfolio site",
          description: "Minimalist portfolio for artist",
          aspect: "landscape"
        },
        {
          id: 9,
          category: "3D Interiors",
          title: "Workspace",
          description: "Home office design with custom shelves",
          aspect: "landscape"
        }
      ]
    },
    viewImage: {
      hr: "Pogledaj sliku",
      en: "View image"
    }
  }

  const items = translations.items[language]
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => {
        const categoryMap: Record<string, string> = {
          'LRC Proizvodi': translations.categories[language][1],
          'LRC Products': translations.categories[language][1],
          '3D Interijeri': translations.categories[language][2],
          '3D Interiors': translations.categories[language][2],
          'Web Projekti': translations.categories[language][3],
          'Web Projects': translations.categories[language][3]
        }
        return categoryMap[item.category] === selectedCategory
      })

  const openLightbox = (index: number) => {
    setLightboxImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(null)
  }

  const getAspectClass = (aspect: string) => {
    switch (aspect) {
      case 'square':
        return 'aspect-square'
      case 'landscape':
        return 'aspect-video'
      case 'portrait':
        return 'aspect-[3/4]'
      default:
        return 'aspect-square'
    }
  }

  const getCategoryColor = (category: string) => {
    if (category.includes('LRC') || category.includes('Proizvodi') || category.includes('Products')) {
      return 'from-purple-400 to-pink-400'
    }
    if (category.includes('Interijeri') || category.includes('Interiors')) {
      return 'from-blue-400 to-cyan-400'
    }
    if (category.includes('Web')) {
      return 'from-green-400 to-emerald-400'
    }
    return 'from-purple-400 to-pink-400'
  }

  return (
    <section id="gallery" className="Section">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            {translations.title[language]}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`pill ${selectedCategory === 'all' ? 'bg-purple-100 border-purple-400' : ''}`}
          >
            {translations.categories[language][0]}
          </button>
          {translations.categories[language].slice(1).map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`pill ${selectedCategory === category ? 'bg-purple-100 border-purple-400' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="glass-panel p-4 hover:scale-105 transition-transform duration-300">
                {/* Image Placeholder */}
                <div className={`${getAspectClass(item.aspect)} rounded-xl bg-gradient-to-br ${getCategoryColor(item.category)} relative overflow-hidden mb-4`}>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <span className="text-2xl">👁️</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center space-y-2">
                      <div className="text-4xl">
                        {item.category.includes('LRC') || item.category.includes('Proizvodi') || item.category.includes('Products') ? '🎨' : 
                         item.category.includes('Interijeri') || item.category.includes('Interiors') ? '🏠' : '💻'}
                      </div>
                      <p className="text-sm font-medium px-4">{item.title}</p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <span className="pill text-xs py-1 px-3">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && lightboxImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
              onClick={closeLightbox}
            >
              <span className="text-2xl">×</span>
            </button>
            
            <div className="max-w-4xl w-full">
              <div className="glass-panel p-8">
                <div className={`${getAspectClass(filteredItems[lightboxImage].aspect)} rounded-xl bg-gradient-to-br ${getCategoryColor(filteredItems[lightboxImage].category)} relative overflow-hidden mb-6`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center space-y-4">
                      <div className="text-8xl">
                        {filteredItems[lightboxImage].category.includes('LRC') || filteredItems[lightboxImage].category.includes('Proizvodi') || filteredItems[lightboxImage].category.includes('Products') ? '🎨' : 
                         filteredItems[lightboxImage].category.includes('Interijeri') || filteredItems[lightboxImage].category.includes('Interiors') ? '🏠' : '💻'}
                      </div>
                      <p className="text-xl font-medium">{filteredItems[lightboxImage].title}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="pill">{filteredItems[lightboxImage].category}</span>
                  <h3 className="text-2xl font-bold">{filteredItems[lightboxImage].title}</h3>
                  <p className="text-slate-600">{filteredItems[lightboxImage].description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-600 mb-4">
            {language === 'hr' 
              ? 'Želite vidjeti svoj projekt ovdje?'
              : 'Want to see your project here?'}
          </p>
          <a href="#contact" className="btn btn-primary">
            {language === 'hr' ? 'Započnite projekt' : 'Start a project'}
          </a>
        </div>
      </div>
    </section>
  )
}


