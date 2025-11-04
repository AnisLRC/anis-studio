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
      hr: "💬 Što kažu naši kupci",
      en: "💬 What Our Customers Say"
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
    }
  }

  // Recenzije kupaca - 9 testimonijala, svi za LRC kategoriju
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
        style={{ fontSize: '1.2rem' }}
      >
        ★
      </span>
    ))
  }

  return (
    <section id="testimonials" className="Section fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-base text-[#5A4A6B] max-w-2xl mx-auto mb-6">
            {translations.subtitle[language]}
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 items-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`pill transition-all duration-200 h-11 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] border-[--color-primary] text-[--color-primary] font-semibold'
                  : 'hover:bg-[rgba(110,68,255,0.1)]'
              }`}
            >
              {translations.filters.all[language]}
            </button>
            <button
              onClick={() => setSelectedCategory('lrc')}
              className={`pill transition-all duration-200 h-11 ${
                selectedCategory === 'lrc'
                  ? 'bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] border-[--color-primary] text-[--color-primary] font-semibold'
                  : 'hover:bg-[rgba(110,68,255,0.1)]'
              }`}
            >
              {translations.filters.lrc[language]}
            </button>
            <button
              onClick={() => setSelectedCategory('interiors')}
              className={`pill transition-all duration-200 h-11 ${
                selectedCategory === 'interiors'
                  ? 'bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] border-[--color-primary] text-[--color-primary] font-semibold'
                  : 'hover:bg-[rgba(110,68,255,0.1)]'
              }`}
            >
              {translations.filters.interiors[language]}
            </button>
            <button
              onClick={() => setSelectedCategory('web-atelier')}
              className={`pill transition-all duration-200 h-11 ${
                selectedCategory === 'web-atelier'
                  ? 'bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] border-[--color-primary] text-[--color-primary] font-semibold'
                  : 'hover:bg-[rgba(110,68,255,0.1)]'
              }`}
            >
              {translations.filters.webAtelier[language]}
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="scroll-fade-in-stagger rounded-xl p-5 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] fade-in"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-2 mb-3">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm text-[#2E2447] mb-4 leading-relaxed italic">
                "{testimonial.text[language]}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-base flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                    boxShadow: '0 3px 8px rgba(110,68,255,0.25)'
                  }}
                >
                  {getInitials(testimonial.name)}
                </div>

                {/* Name and Location */}
                <div>
                  <div className="font-semibold text-sm text-[#2E2447]">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-[#5A4A6B]">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

