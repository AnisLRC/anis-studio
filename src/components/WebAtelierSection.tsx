import { WebProjectForm } from './WebProjectForm'

interface WebAtelierSectionProps {
  language: 'hr' | 'en'
}

export default function WebAtelierSection({ language }: WebAtelierSectionProps) {
  const translations = {
    title: {
      hr: "💻 Ani's Web Atelier",
      en: "💻 Ani's Web Atelier"
    },
    subtitle: {
      hr: "Custom Landing Pages",
      en: "Custom Landing Pages"
    },
    description: {
      hr: "Vaša web stranica koja radi za Vas — više klijenata, manje komplikacija",
      en: "Your website that works for you — more customers, less hassle"
    },
    description2: {
      hr: "Sve u jednom paketu — Vi odlučujete, mi izvodimo.",
      en: "Everything in one package — You decide, we execute."
    },
    stepsTitle: {
      hr: "Kako do svoje landing stranice",
      en: "How to get your landing page"
    },
    step1: {
      title: { hr: "Kontaktirajte nas", en: "Contact us" },
      desc: { hr: "Opišite što trebate i za koju industriju", en: "Describe what you need and for which industry" }
    },
    step2: {
      title: { hr: "Odaberite paket", en: "Choose package" },
      desc: { hr: "Start, Pro ili Premium prema potrebama", en: "Start, Pro or Premium based on your needs" }
    },
    step3: {
      title: { hr: "Pošaljite materijale", en: "Send materials" },
      desc: { hr: "Logo, slike, tekstove i boje Vašeg branda", en: "Logo, images, texts and colors of your brand" }
    },
    step4: {
      title: { hr: "Pregledajte dizajn", en: "Review design" },
      desc: { hr: "Dajemo Vam revizije prema odabranom paketu", en: "We provide revisions according to your chosen package" }
    },
    step5: {
      title: { hr: "Vaša stranica je spremna", en: "Your page is ready" },
      desc: { hr: "Objavljujemo i podešavamo sve za Vas", en: "We publish and configure everything for you" }
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
        description: "Vaša web stranica koja donosi klijente — brzo, jednostavno i efektno.",
        button: "Zatraži ponudu",
        paymentNote: "Plaćanja karticom putem Stripe-a."
      },
      en: {
        title: "Ready for your landing page?",
        description: "Your website that brings customers — fast, simple and effective.",
        button: "Request a Landing Page Quote",
        paymentNote: "Card payments via Stripe."
      }
    }
  }

  const landingPageSteps = [
    {
      number: 1,
      icon: '📞',
      title: translations.step1.title,
      desc: translations.step1.desc
    },
    {
      number: 2,
      icon: '💼',
      title: translations.step2.title,
      desc: translations.step2.desc
    },
    {
      number: 3,
      icon: '📤',
      title: translations.step3.title,
      desc: translations.step3.desc
    },
    {
      number: 4,
      icon: '👀',
      title: translations.step4.title,
      desc: translations.step4.desc
    },
    {
      number: 5,
      icon: '🚀',
      title: translations.step5.title,
      desc: translations.step5.desc
    }
  ]

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="web-atelier" className="Section fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg sm:text-xl italic text-[#6E44FF] mb-3 font-medium">
            {translations.subtitle[language]}
          </p>
          <p className="text-lg sm:text-xl italic text-[#5A4A6B] mb-3 font-medium">
            {translations.description[language]}
          </p>
          <p className="text-base text-[#5A4A6B] mb-8">
            {translations.description2[language]}
          </p>
        </div>

        {/* Landing Page Steps */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.stepsTitle[language]}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {landingPageSteps.map((step) => (
            <div 
              key={step.number}
              className="relative rounded-xl p-4 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center fade-in"
            >
              {/* Step Number Badge */}
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#6E44FF] to-[#BDA6FF] text-white font-bold text-sm flex items-center justify-center shadow-md">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-3 mt-4">{step.icon}</div>

              {/* Title */}
              <h4 className="text-xs font-bold text-[--color-primary] mb-1.5">
                {step.title[language]}
              </h4>

              {/* Description */}
              <p className="text-[10px] text-[#5A4A6B] leading-tight">
                {step.desc[language]}
              </p>
            </div>
          ))}
        </div>

        {/* Showcase Gallery */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
              {language === 'hr' ? '💻 Primjeri naših radova' : '💻 Examples of Our Work'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] fade-in"
              >
                <div
                  className="aspect-video bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] flex items-center justify-center"
                  style={{
                    borderBottom: '2px solid rgba(110, 68, 255, 0.2)'
                  }}
                >
                  <div className="text-center p-4">
                    <div className="text-4xl mb-3 opacity-80">💻</div>
                    <p className="text-xs text-[#5A4A6B] font-medium opacity-80">
                      {language === 'hr' ? 'Fotografija dolazi uskoro' : 'Photo coming soon'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {translations.pricingPlans[language].map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-6 bg-white/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 fade-in ${
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
              <h3 className="text-xl font-bold text-center mb-2 text-[#2E2447]">{plan.name}</h3>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-[--color-primary]">{plan.price}</span>
              </div>
              <p className="text-center text-[#5A4A6B] mb-4">{plan.description}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="text-[--color-primary] font-bold mt-0.5">✓</span>
                    <span className="text-xs text-[#2E2447]">{feature}</span>
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
        <div className="rounded-2xl p-5 sm:p-8 text-center bg-gradient-to-br from-[rgba(189,166,255,0.15)] to-[rgba(110,68,255,0.1)] border border-[rgba(110,68,255,0.2)] shadow-lg fade-in">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-[--color-primary]">
            {translations.cta[language].title}
          </h3>
          <p className="text-sm text-[#5A4A6B] mb-6 max-w-2xl mx-auto">
            {translations.cta[language].description}
          </p>
          <button 
            className="btn btn-primary mb-4"
            onClick={scrollToContact}
          >
            {translations.cta[language].button}
          </button>
          <p className="text-xs text-[#5A4A6B]">
            {translations.cta[language].paymentNote}
          </p>
        </div>

        {/* Web Project Form (test zona) */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Upit za web projekt
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            Ispunite osnovne informacije o web stranici koju želite, a ja ću na temelju toga pripremiti prijedlog strukture, dizajna i daljnje korake.
          </p>
          <WebProjectForm />
        </div>
      </div>
    </section>
  )
}