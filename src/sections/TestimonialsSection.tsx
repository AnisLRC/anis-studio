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
  const translations = {
    title: {
      hr: "Što kažu naši kupci",
      en: "What Our Customers Say"
    },
    subtitle: {
      hr: "Povjerenje naših kupaca je naš najveći uspjeh",
      en: "Our customers' trust is our greatest success"
    }
  }

  // Recenzije kupaca - možete dodati svoje stvarne recenzije ovdje
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
      name: 'Ivan P.',
      location: language === 'hr' ? 'Split' : 'Split',
      rating: 5,
      category: 'interiors',
      text: {
        hr: '3D render moje kuhinje je bio savršen! Ani je razumjela moje ideje i pretvorila ih u predivan dizajn.',
        en: 'The 3D render of my kitchen was perfect! Ani understood my ideas and turned them into a beautiful design.'
      }
    },
    {
      id: 3,
      name: 'Ana M.',
      location: language === 'hr' ? 'Rijeka' : 'Rijeka',
      rating: 5,
      category: 'web-atelier',
      text: {
        hr: 'Landing stranica koju je Ani napravila je prekrasna i već vidim pozitivan odgovor od klijenata. Profesionalno i brzo!',
        en: 'The landing page Ani created is beautiful and I\'m already seeing positive response from clients. Professional and fast!'
      }
    },
    {
      id: 4,
      name: 'Tomislav L.',
      location: language === 'hr' ? 'Osijek' : 'Osijek',
      rating: 5,
      category: 'lrc',
      text: {
        hr: 'Epoksi umjetničko djelo premašilo je moja očekivanja. Svaki detalj je pažljivo osmišljen i izrađen.',
        en: 'The epoxy art piece exceeded my expectations. Every detail was carefully thought out and crafted.'
      }
    }
  ]

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl p-6 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] fade-in"
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-2 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#2E2447] mb-6 leading-relaxed italic">
                "{testimonial.text[language]}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                    boxShadow: '0 3px 8px rgba(110,68,255,0.25)'
                  }}
                >
                  {getInitials(testimonial.name)}
                </div>

                {/* Name and Location */}
                <div>
                  <div className="font-semibold text-[#2E2447]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[#5A4A6B]">
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

