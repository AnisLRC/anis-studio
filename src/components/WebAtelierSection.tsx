interface WebAtelierSectionProps {
  language: 'hr' | 'en'
}

export default function WebAtelierSection({ language }: WebAtelierSectionProps) {
  const translations = {
    title: {
      hr: "Ani's Web Atelier",
      en: "Ani's Web Atelier"
    },
    subtitle: {
      hr: "Prilagođene, jednostranične landing stranice izgrađene za jasnoću, eleganciju i konverziju — dizajn, sadržaj i isporuka u jednom kreativnom radnom toku.",
      en: "Custom, one-page landing sites built for clarity, elegance and conversion — design, content and delivery in one creative workflow."
    },
    features: {
      hr: [
        'Moderni responzivni dizajn',
        'Brza brzina učitavanja',
        'Osnovna SEO postavka',
        'Integrirani formular i analitika',
        'Podrška za copywriting i brand ton'
      ],
      en: [
        'Modern responsive design',
        'Fast load speed',
        'Basic SEO setup',
        'Integrated form & analytics',
        'Copywriting and brand tone support'
      ]
    },
    pricingPlans: {
      hr: [
        {
          name: 'Start',
          price: '299€',
          description: 'Osnovna jednostranična stranica',
          features: [
            'Responzivni dizajn',
            'Osnovna SEO optimizacija',
            'Kontakt formular',
            'Google Analytics',
            '1 revizija dizajna'
          ],
          popular: false
        },
        {
          name: 'Pro',
          price: '499€',
          description: 'Dodatne animacije i analitika',
          features: [
            'Sve iz Start paketa',
            'Napredne animacije',
            'Detaljna analitika',
            '2 revizije dizajna',
            'Email integracija'
          ],
          popular: true
        },
        {
          name: 'Premium',
          price: '799€',
          description: 'Mini branding paket',
          features: [
            'Sve iz Pro paketa',
            'Logo dizajn',
            'Brand guidelines',
            '3 revizije dizajna',
            'Prioritetna podrška'
          ],
          popular: false
        }
      ],
      en: [
        {
          name: 'Start',
          price: '299€',
          description: 'Essential one-pager',
          features: [
            'Responsive design',
            'Basic SEO optimization',
            'Contact form',
            'Google Analytics',
            '1 design revision'
          ],
          popular: false
        },
        {
          name: 'Pro',
          price: '499€',
          description: 'Extra animations & analytics',
          features: [
            'Everything from Start',
            'Advanced animations',
            'Detailed analytics',
            '2 design revisions',
            'Email integration'
          ],
          popular: true
        },
        {
          name: 'Premium',
          price: '799€',
          description: 'Mini branding package',
          features: [
            'Everything from Pro',
            'Logo design',
            'Brand guidelines',
            '3 design revisions',
            'Priority support'
          ],
          popular: false
        }
      ]
    },
    popular: {
      hr: "Najpopularniji",
      en: "Most Popular"
    },
    requestQuote: {
      hr: "Zatraži ponudu",
      en: "Request Quote"
    },
    cta: {
      hr: {
        title: "Spremni za svoju landing stranicu?",
        description: "Landing stranice fokusirane na konverziju s čistim dizajnom, jasnim porukama i brzom isporukom.",
        button: "Zatraži ponudu za landing stranicu",
        paymentNote: "Plaćanja karticom putem Stripe-a."
      },
      en: {
        title: "Ready for your landing page?",
        description: "Conversion-focused landing pages with clean design, clear messaging and fast delivery.",
        button: "Request a Landing Page Quote",
        paymentNote: "Card payments via Stripe."
      }
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="web-atelier" className="Section fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg text-[#5A4A6B] max-w-3xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {translations.features[language].map((feature, index) => (
            <div 
              key={index} 
              className="rounded-xl p-4 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 fade-in"
            >
              <span className="text-[--color-primary] font-bold mr-2">✓</span>
              <span className="text-sm text-[#2E2447]">{feature}</span>
            </div>
          ))}
        </div>

        {/* Showcase Gallery */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {language === 'hr' ? 'Primjeri naših radova' : 'Examples of Our Work'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] fade-in"
              >
                <div
                  className="aspect-video bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] flex items-center justify-center"
                  style={{
                    borderBottom: '2px solid rgba(110, 68, 255, 0.2)'
                  }}
                >
                  <div className="text-center p-6">
                    <div className="text-5xl mb-3 opacity-70">💻</div>
                    <p className="text-sm text-[#5A4A6B] font-medium">
                      {language === 'hr' ? 'Fotografija dolazi uskoro' : 'Photo coming soon'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {translations.pricingPlans[language].map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-8 bg-white/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 fade-in ${
                plan.popular 
                  ? 'border-2 border-[--color-primary] ring-2 ring-[--color-primary]/20' 
                  : 'border-[rgba(110,68,255,0.15)]'
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span 
                    className="pill px-4 py-1 text-xs font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    {translations.popular[language]}
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-center mb-2 text-[#2E2447]">{plan.name}</h3>
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-[--color-primary]">{plan.price}</span>
              </div>
              <p className="text-center text-[#5A4A6B] mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="text-[--color-primary] font-bold mt-0.5">✓</span>
                    <span className="text-sm text-[#2E2447]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className="btn btn-primary w-full"
                onClick={scrollToContact}
              >
                {translations.requestQuote[language]}
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl p-8 sm:p-12 text-center bg-gradient-to-br from-[rgba(189,166,255,0.15)] to-[rgba(110,68,255,0.1)] border border-[rgba(110,68,255,0.2)] shadow-lg fade-in">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[--color-primary]">
            {translations.cta[language].title}
          </h3>
          <p className="text-lg text-[#5A4A6B] mb-6 max-w-2xl mx-auto">
            {translations.cta[language].description}
          </p>
          <button 
            className="btn btn-primary mb-4"
            onClick={scrollToContact}
          >
            {translations.cta[language].button}
          </button>
          <p className="text-sm text-[#5A4A6B]">
            {translations.cta[language].paymentNote}
          </p>
        </div>
      </div>
    </section>
  )
}