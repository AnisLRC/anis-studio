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
      name: 'Maria K.',
      location: language === 'hr' ? 'Zagreb' : 'Zagreb',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Fantastičan personalizirani poklon! Kvaliteta je izvrsna i poruka je lijepo ugravirana. Preporučujem!',
        en: 'Fantastic personalized gift! The quality is excellent and the message is beautifully engraved. Highly recommend!'
      }
    },
    {
      id: 2,
      name: 'Tomislav L.',
      location: language === 'hr' ? 'Osijek' : 'Osijek',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Epoksidno umjetničko djelo premašilo je moja očekivanja. Svaki detalj je pažljivo osmišljen i izrađen.',
        en: 'The epoxy art piece exceeded my expectations. Every detail was carefully thought out and crafted.'
      }
    },
    {
      id: 3,
      name: 'Petra M.',
      location: language === 'hr' ? 'Split' : 'Split',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Laserski ugravirani drveni nakit je prekrasan! Preciznost i kvaliteta su nevjerojatni. Bila sam oduševljena!',
        en: 'The laser engraved wooden jewelry is beautiful! The precision and quality are incredible. I was delighted!'
      }
    },
    {
      id: 4,
      name: 'Marko D.',
      location: language === 'hr' ? 'Rijeka' : 'Rijeka',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Svila sa personaliziranim printom je savršena! Kvaliteta materijala i izrada su izvrsni. Definitivno ću naručiti ponovno.',
        en: 'The silk with personalized print is perfect! The material quality and workmanship are excellent. I will definitely order again.'
      }
    },
    {
      id: 5,
      name: 'Ivana S.',
      location: language === 'hr' ? 'Zadar' : 'Zadar',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Mandela na drvenom podmetaču je stvarno umjetničko djelo! Svaki detalj je pažljivo osmišljen, a boje su živahne i prekrasne.',
        en: 'The mandala on the wooden coaster is truly a work of art! Every detail is carefully thought out, and the colors are vibrant and beautiful.'
      }
    },
    {
      id: 6,
      name: 'Andrija K.',
      location: language === 'hr' ? 'Dubrovnik' : 'Dubrovnik',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Personalizirani poklon za rodendan je bio savršen izbor! Epoksidna smola u kombinaciji s drvetom daje prekrasan rezultat.',
        en: 'The personalized birthday gift was the perfect choice! Epoxy resin combined with wood gives a beautiful result.'
      }
    },
    {
      id: 7,
      name: 'Sandra B.',
      location: language === 'hr' ? 'Zagreb' : 'Zagreb',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Lasersko graviranje na drvu je stvarno impresivno! Preciznost je izvrsna, a poruka je čitljiva i lijepa. Preporučujem svima!',
        en: 'Laser engraving on wood is truly impressive! The precision is excellent, and the message is readable and beautiful. I recommend to everyone!'
      }
    },
    {
      id: 8,
      name: 'Luka R.',
      location: language === 'hr' ? 'Pula' : 'Pula',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Kombinacija epoksidne smole i drva je stvarno jedinstvena. Proizvod je izgledao još bolje nego što sam očekivao. Odličan posao!',
        en: 'The combination of epoxy resin and wood is truly unique. The product looked even better than I expected. Great job!'
      }
    },
    {
      id: 9,
      name: 'Maja P.',
      location: language === 'hr' ? 'Varaždin' : 'Varaždin',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Svila sa ručno oslikanim detaljima je pravi užitak! Kvaliteta je izvrsna, a osobni pristup je bio izvanredan. Hvala!',
        en: 'The silk with hand-painted details is a real delight! The quality is excellent, and the personal approach was outstanding. Thank you!'
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

