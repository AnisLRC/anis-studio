import { useState } from 'react'

interface TestimonialsSectionProps {
  language: 'hr' | 'en'
}

export default function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const translations = {
    title: {
      hr: "Što kažu naši kupci",
      en: "What Our Customers Say"
    },
    subtitle: {
      hr: "Zadovoljstvo naših kupaca je naš najveći uspjeh",
      en: "Customer satisfaction is our greatest success"
    },
    testimonials: {
      hr: [
        {
          name: "Marija K.",
          location: "Zagreb",
          rating: 5,
          text: "Naručila sam personalizirani poklon za vjenčanje i bila sam oduševljena kvalitetom! Ani je prenijela našu priču u prelijep dizajn. Definitivno preporučujem!",
          product: "Epoksi poklon set"
        },
        {
          name: "Petar M.",
          location: "Split",
          rating: 5,
          text: "Napravio sam 3D vizualizaciju kuhinje prije nego što sam išao kod stručnjaka. Uštedjelo mi je puno vremena i novca. Profesionalna usluga od početka do kraja.",
          product: "3D render kuhinje"
        },
        {
          name: "Ana S.",
          location: "Rijeka",
          rating: 5,
          text: "Landing stranica koju je Ani napravila za moj mali biznis je jednostavno savršena. Brza, moderna i točno ono što sam tražila. Hvala!",
          product: "Web Atelier - Pro paket"
        },
        {
          name: "Ivan T.",
          location: "Osijek",
          rating: 5,
          text: "Laser gravirani poklon za godišnjicu braka bio je hit! Moja supruga je plakala od sreće. Nevjerojatna pažnja prema detaljima.",
          product: "Personalizirani laser poklon"
        },
        {
          name: "Lucija B.",
          location: "Dubrovnik",
          rating: 5,
          text: "Makrame ukras za dječju sobu je prelijep! Kvaliteta izrade je vrhunska, a cijene su više nego fer. Vratit ću se sigurno!",
          product: "Makrame dekoracija"
        }
      ],
      en: [
        {
          name: "Maria K.",
          location: "Zagreb",
          rating: 5,
          text: "I ordered a personalized wedding gift and was absolutely amazed by the quality! Ani captured our story in a beautiful design. Definitely recommend!",
          product: "Epoxy gift set"
        },
        {
          name: "Peter M.",
          location: "Split",
          rating: 5,
          text: "I had a 3D kitchen visualization done before going to professionals. It saved me a lot of time and money. Professional service from start to finish.",
          product: "3D kitchen render"
        },
        {
          name: "Anna S.",
          location: "Rijeka",
          rating: 5,
          text: "The landing page Ani created for my small business is simply perfect. Fast, modern and exactly what I was looking for. Thank you!",
          product: "Web Atelier - Pro package"
        },
        {
          name: "John T.",
          location: "Osijek",
          rating: 5,
          text: "The laser engraved anniversary gift was a hit! My wife cried tears of joy. Incredible attention to detail.",
          product: "Personalized laser gift"
        },
        {
          name: "Lucy B.",
          location: "Dubrovnik",
          rating: 5,
          text: "The macrame decoration for the kids' room is beautiful! The craftsmanship is top-notch, and the prices are more than fair. I'll definitely be back!",
          product: "Macrame decoration"
        }
      ]
    }
  }

  const testimonials = translations.testimonials[language]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ))
  }

  return (
    <section id="testimonials" className="Section">
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

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12">
            <div className="text-center space-y-6">
              {/* Stars */}
              <div className="flex justify-center text-3xl">
                {renderStars(testimonials[activeIndex].rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-slate-700 italic leading-relaxed">
                "{testimonials[activeIndex].text}"
              </blockquote>

              {/* Author Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonials[activeIndex].location}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                  {testimonials[activeIndex].product}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Previous testimonial"
          >
            <span className="text-2xl" style={{ color: 'var(--color-primary)' }}>‹</span>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Next testimonial"
          >
            <span className="text-2xl" style={{ color: 'var(--color-primary)' }}>›</span>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex 
                  ? 'w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              style={index === activeIndex ? { background: 'var(--color-primary)' } : {}}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* All Testimonials Grid (Small Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="glass-panel p-6 space-y-4 hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveIndex(index)}>
              <div className="flex text-xl">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-slate-600 text-sm line-clamp-3">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-slate-600">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



