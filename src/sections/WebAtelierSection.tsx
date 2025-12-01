// UNUSED DUPLICATE – safe to delete after visual verification
// Active version: src/components/WebAtelierSection.tsx
// Layout and styling differ, but content is effectively the same.

import { WebProjectForm } from '../components/WebProjectForm'

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
    <section id="web-atelier" className="Section fade-in py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            {translations.title[language]}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            {translations.subtitle[language]}
          </p>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            {translations.description[language]}
          </p>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            {translations.description2[language]}
          </p>
        </div>

        {/* Main Content Layout - Mobile: flex-col, Desktop: 2 columns */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-start mb-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-6">
            {/* Landing Page Steps */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-6 text-center md:text-left">
                {translations.stepsTitle[language]}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {landingPageSteps.map((step) => (
                  <div 
                    key={step.number}
                    className="relative rounded-3xl bg-white/80 dark:bg-slate-900/70 shadow-sm border border-slate-100/60 dark:border-slate-800/70 backdrop-blur p-5 sm:p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Step Number Badge */}
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#6E44FF] to-[#BDA6FF] text-white font-bold text-sm flex items-center justify-center shadow-md">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="text-3xl mb-3 mt-4">{step.icon}</div>

                    {/* Title */}
                    <h4 className="text-xs sm:text-sm font-semibold text-[#6E44FF] dark:text-[#BDA6FF] mb-1.5">
                      {step.title[language]}
                    </h4>

                    {/* Description */}
                    <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-tight">
                      {step.desc[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase Gallery */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-6 text-center md:text-left">
                {language === 'hr' ? '💻 Primjeri naših radova' : '💻 Examples of Our Work'}
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl overflow-hidden bg-white/80 dark:bg-slate-900/70 shadow-sm border border-slate-100/60 dark:border-slate-800/70 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div
                      className="aspect-video bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] dark:from-[rgba(110,68,255,0.2)] dark:to-[rgba(189,166,255,0.15)] flex items-center justify-center"
                      style={{
                        borderBottom: '2px solid rgba(110, 68, 255, 0.2)'
                      }}
                    >
                      <div className="text-center p-4">
                        <div className="text-4xl mb-3 opacity-80">💻</div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium opacity-80">
                          {language === 'hr' ? 'Fotografija dolazi uskoro' : 'Photo coming soon'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-3xl bg-white/80 dark:bg-slate-900/70 shadow-sm border border-slate-100/60 dark:border-slate-800/70 backdrop-blur p-5 sm:p-6 lg:p-8 text-center">
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 text-[#6E44FF] dark:text-[#BDA6FF]">
                {translations.cta[language].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                {translations.cta[language].description}
              </p>
              <button 
                className="btn btn-primary w-full sm:w-auto mb-4"
                onClick={scrollToContact}
              >
                {translations.cta[language].button}
              </button>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {translations.cta[language].paymentNote}
              </p>
            </div>
          </div>

          {/* Right Column - Pricing Cards */}
          <div className="mt-8 md:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 lg:gap-6">
              {translations.pricingPlans[language].map((plan, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col rounded-3xl bg-white/80 dark:bg-slate-900/70 shadow-sm border backdrop-blur p-5 sm:p-6 lg:p-8 transition hover:-translate-y-0.5 hover:shadow-md min-h-[10rem] ${
                    plan.popular 
                      ? 'border-2 border-[#6E44FF] dark:border-[#BDA6FF] ring-2 ring-[#6E44FF]/20 dark:ring-[#BDA6FF]/20' 
                      : 'border-slate-100/60 dark:border-slate-800/70'
                  }`}
                >
                  {plan.popular && (
                    <div className="mb-4">
                      <span 
                        className="inline-flex items-center rounded-full px-4 py-1 text-xs font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                        }}
                      >
                        {translations.popular[language]}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col items-center text-center md:items-start md:text-left gap-2">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{plan.name}</h3>
                    <div>
                      <span className="text-3xl font-bold text-[#6E44FF] dark:text-[#BDA6FF]">{plan.price}</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">{plan.description}</p>
                  </div>
                  <ul className="mt-4 space-y-2 mb-6 w-full">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <span className="text-[#6E44FF] dark:text-[#BDA6FF] font-bold mt-0.5">✓</span>
                        <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="mt-6 w-full sm:w-auto btn btn-primary"
                    onClick={scrollToContact}
                  >
                    {translations.requestQuote[language]}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Web Project Form (test zona) */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
            {language === 'hr' ? 'Upit za web projekt' : 'Web Project Inquiry'}
          </h2>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            {language === 'hr' 
              ? 'Ispunite osnovne informacije o web stranici koju želite, a ja ću na temelju toga pripremiti prijedlog strukture, dizajna i daljnje korake.'
              : 'Fill in the basic information about the website you want, and I will prepare a proposal for structure, design and next steps based on that.'}
          </p>
          <WebProjectForm />
        </div>
      </div>
    </section>
  )
}

