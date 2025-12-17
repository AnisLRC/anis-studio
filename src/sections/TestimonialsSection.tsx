import { useState } from 'react'

interface TestimonialsSectionProps {
  language: 'hr' | 'en'
}

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: {
    hr: string
    en: string
  }
  category: 'lrc' | 'interiors' | 'web-atelier'
}

export default function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'lrc' | 'interiors' | 'web-atelier'>('all')

  const translations = {
    title: {
      hr: "Što kažu naši kupci",
      en: "What Our Customers Say"
    },
    subtitle: {
      hr: "Povjerenje naših kupaca je naš najveći uspjeh",
      en: "Our customers' trust is our greatest success"
    },
    filters: {
      all: { hr: "Sve", en: "All" },
      lrc: { hr: "LRC", en: "LRC" },
      interiors: { hr: "Interijeri", en: "Interiors" },
      webAtelier: { hr: "Web Atelier", en: "Web Atelier" }
    },
    verified: {
      hr: "Verificirano",
      en: "Verified"
    }
  }

  // Recenzije kupaca
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Danijel Kordić',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Odlični radovi za svaku prigodu........Sve pohvale',
        en: 'Excellent works for every occasion........All praise'
      }
    },
    {
      id: 2,
      name: 'Ivica Biškup',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Predobra "kola za vino" Odrađeno za čistu 10 Preporučujem svima!!',
        en: 'Too good "wine cart" Done for a pure 10 I recommend to everyone!!'
      }
    },
    {
      id: 3,
      name: 'Martina Damjanović',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Odlično odrađeno, svake pohvale i preporuke svima, nećete pogriješiti ❤️❤️❤️❤️',
        en: 'Excellent work, all praise and recommendations to everyone, you won\'t go wrong ❤️❤️❤️❤️'
      }
    },
    {
      id: 4,
      name: 'Sanja Mlinek Vučković',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Najviše od svega mi se sviđa posvećenost poslu. Veliki + od mene. Izašli u susret što me jako razveselilo ❤️',
        en: 'Most of all, I like the dedication to work. Big + from me. They went out of their way to help, which made me very happy ❤️'
      }
    },
    {
      id: 5,
      name: 'Danijel Drmić',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Radovi za svaku preporuku čista desetka',
        en: 'Works for every recommendation, a pure ten'
      }
    },
    {
      id: 6,
      name: 'Katarina Ronto',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Ono što mene posebno oduševljava posvećenost je ovome poslu. Entuzijazam koji "pršti" iz radova, energija uložena u detalje te ljubav najvažniji su "začini" ove priče. I u mom domu svoje je mjesto našao jedan takav rad! Preporučujem svakome od srca uživanje u čaroliji Ani\'s LRC! ❤️❤️❤️',
        en: 'What particularly delights me is the dedication to this work. The enthusiasm that "sparkles" from the works, the energy invested in details, and love are the most important "ingredients" of this story. And in my home, one such work has found its place! I wholeheartedly recommend everyone to enjoy the magic of Ani\'s LRC! ❤️❤️❤️'
      }
    },
    {
      id: 7,
      name: 'Đanela Novljaković',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Predivni radovi, moj sin oduševljen s poklonom ❤️ Inovatovno i kreativno, za svaku preporuku ✨',
        en: 'Wonderful works, my son is delighted with the gift ❤️ Innovative and creative, for every recommendation ✨'
      }
    },
    {
      id: 8,
      name: 'Branka Brana',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Izvrsno! Oduševljena šahom koji je kombinacija rada lasera i epoxy smole. Uredno, precizno, pedantno i uz to šah je personaliziran sa imenom. Svaka čast na idejama i kreativnosti!!!!',
        en: 'Excellent! Delighted with the chess set which is a combination of laser work and epoxy resin. Neat, precise, meticulous, and additionally, the chess set is personalized with a name. Kudos to the ideas and creativity!!!!'
      }
    },
    {
      id: 9,
      name: 'Damir Pejić',
      location: language === 'hr' ? 'Hrvatska' : 'Croatia',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Proizvodi su kvalitetni i praktični. Posebno mi se sviđa jer možeš sudjelovati u kreiranju određenog proizvoda i tako ga prilagoditi svojim potrebama. Jako sam zadovoljan tako da moje preporuke. 😊',
        en: 'The products are high quality and practical. I particularly like that you can participate in creating a specific product and thus adapt it to your needs. I am very satisfied, so my recommendations. 😊'
      }
    }
  ]

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory)

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // Gradient colors for avatars
  const avatarGradients = [
    'from-amethyst to-purple-600',
    'from-lavender to-amethyst',
    'from-pink-400 to-amethyst',
    'from-blue-400 to-amethyst',
    'from-amethyst to-pink-500',
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`
          inline-block transition-all duration-300
          ${index < rating 
            ? 'text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]' 
            : 'text-gray-300 dark:text-gray-600'
          }
        `}
        style={{ 
          fontSize: '1rem',
          animation: index < rating ? `starPulse 2s ease-in-out ${index * 0.1}s infinite` : 'none'
        }}
      >
        ★
      </span>
    ))
  }

  return (
    <section id="testimonials" className="py-16 sm:py-20 px-5">
      {/* Star pulse animation */}
      <style>{`
        @keyframes starPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-plum/90 dark:text-pearl">
            <span className="mr-2">💬</span>
            {translations.title[language]}
          </h2>
          <p className="text-base sm:text-lg text-plum/80 dark:text-pearl/70 max-w-2xl mx-auto mb-8">
            {translations.subtitle[language]}
          </p>

          {/* Filter Buttons - matching Portfolio style */}
          <div className="flex flex-wrap justify-center gap-3">
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
                {category === 'all' ? translations.filters.all[language] :
                 category === 'lrc' ? translations.filters.lrc[language] :
                 category === 'interiors' ? translations.filters.interiors[language] :
                 translations.filters.webAtelier[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="
                group relative rounded-2xl p-6
                bg-white/80 dark:bg-white/8 backdrop-blur-xl
                border border-amethyst/20 dark:border-lavender/10
                shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                hover:shadow-[0_15px_40px_rgba(110,68,255,0.12)] dark:hover:shadow-[0_15px_40px_rgba(189,166,255,0.1)]
                hover:-translate-y-1
                transition-all duration-300
              "
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Quote mark decoration */}
              <div className="absolute top-4 right-4 text-4xl text-amethyst/15 dark:text-lavender/20 font-serif pointer-events-none">
                "
              </div>

              {/* Verified badge for 5-star */}
              {testimonial.rating === 5 && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold
                    bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400
                    border border-green-200 dark:border-green-800">
                    <span>✓</span>
                    {translations.verified[language]}
                  </span>
                </div>
              )}

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4 mt-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm sm:text-base text-plum/90 dark:text-pearl/90 mb-5 leading-relaxed line-clamp-4">
                "{testimonial.text[language]}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-amethyst/10 dark:border-lavender/10">
                {/* Avatar with gradient */}
                <div
                  className={`
                    w-11 h-11 rounded-full flex items-center justify-center 
                    text-white font-bold text-sm flex-shrink-0
                    bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]}
                    shadow-[0_4px_12px_rgba(110,68,255,0.3)]
                    group-hover:shadow-[0_6px_16px_rgba(110,68,255,0.4)]
                    transition-shadow duration-300
                  `}
                >
                  {getInitials(testimonial.name)}
                </div>

                {/* Name and Location */}
                <div>
                  <div className="font-semibold text-sm text-plum/90 dark:text-pearl">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-plum/70 dark:text-pearl/60">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-plum/80 dark:text-pearl/60 text-lg">
              {language === 'hr' ? 'Nema recenzija u ovoj kategoriji.' : 'No reviews in this category.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
