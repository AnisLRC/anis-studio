import { Link } from 'react-router-dom'

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
        button: "Pogledaj pakete",
        paymentNote: "Plaćanja karticom putem Stripe-a."
      },
      en: {
        title: "Ready for your landing page?",
        description: "Your website that brings customers — fast, simple and effective.",
        button: "View packages",
        paymentNote: "Card payments via Stripe."
      }
    },
    formInquiryCta: {
      title: {
        hr: 'Pošaljite upit za web projekt',
        en: 'Send a web project inquiry'
      },
      text: {
        hr: 'Ispunite kratku formu s osnovnim informacijama o web stranici koju želite, a ja ću pripremiti prijedlog strukture, dizajna i sljedećih koraka.',
        en: 'Fill out a short form with basic information about the website you want, and I will prepare a proposed structure, design, and next steps.'
      },
      button: {
        hr: 'Pošalji upit',
        en: 'Send Inquiry'
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

  return (
    <section id="web-atelier" className="Section fade-in relative section-with-bg">
      {/* Background wrapper */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Light mode image */}
        <div
          className="absolute inset-0 dark:hidden transition-opacity duration-500"
          style={{
            backgroundImage: "url(/hero-sky-light.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark mode image */}
        <div
          className="absolute inset-0 hidden dark:block transition-opacity duration-500"
          style={{
            backgroundImage: "url(/hero-sky-dark.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>
      
      <div className="relative z-10 mx-auto w-full max-w-6xl min-w-0">
        {/* Section Header */}
        <div className="mx-auto mb-7 max-w-3xl text-center sm:mb-8">
          <h2 className="mb-2 font-heading text-2xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:mb-2.5 sm:text-3xl">
            {translations.title[language]}
          </h2>
          <p className="mb-2 text-lg font-semibold italic text-amethyst dark:text-lavender sm:text-xl">
            {translations.subtitle[language]}
          </p>
          <p className="mb-2 text-lg font-medium italic text-plum/80 dark:text-pearl/75 sm:text-xl">
            {translations.description[language]}
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-plum/75 dark:text-pearl/65">
            {translations.description2[language]}
          </p>
        </div>

        {/* Landing Page Steps */}
        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h3 className="font-heading text-xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:text-2xl">
            {translations.stepsTitle[language]}
          </h3>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-4 md:gap-5">
          {landingPageSteps.map((step) => (
            <div 
              key={step.number}
              className="relative flex h-full min-h-[148px] flex-col rounded-xl p-4 text-center bg-white/80 dark:bg-white/8 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] dark:border-lavender/15 shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-xl dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)] transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 fade-in"
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
              <p className="mt-auto text-[11px] leading-snug text-plum/75 dark:text-pearl/60 sm:text-[10px] sm:leading-tight">
                {step.desc[language]}
              </p>
            </div>
          ))}
        </div>

        {/* Showcase Gallery */}
        <div className="mx-auto mb-10 max-w-6xl sm:mb-12">
          <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
            <h3 className="mb-4 font-heading text-xl font-bold text-balance text-plum dark:text-pearl sm:mb-6 sm:text-2xl">
              {language === 'hr' ? '💻 Primjeri naših radova' : '💻 Examples of Our Work'}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] dark:bg-white/8 fade-in"
              >
                <div
                  className="aspect-video bg-gradient-to-br from-[rgba(189,166,255,0.2)] to-[rgba(110,68,255,0.15)] flex items-center justify-center"
                  style={{
                    borderBottom: '2px solid rgba(110, 68, 255, 0.2)'
                  }}
                >
                  <div className="text-center p-4">
                    <div className="text-4xl mb-3 opacity-80">💻</div>
                    <p className="text-xs font-medium text-[--color-ink-muted] opacity-80 dark:text-pearl/70">
                      {language === 'hr' ? 'Fotografija dolazi uskoro' : 'Photo coming soon'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          id="web-atelier-pricing"
          className="mx-auto mb-10 grid w-full max-w-6xl scroll-mt-28 grid-cols-1 gap-5 sm:mb-12 sm:scroll-mt-32 md:grid-cols-3 md:gap-6"
        >
          {translations.pricingPlans[language].map((plan, index) => (
            <div 
              key={index} 
              className={`flex h-full flex-col rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-white/8 backdrop-blur-sm border shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] fade-in ${
                plan.popular 
                  ? 'border-2 border-[--color-primary] ring-2 ring-[--color-primary]/20' 
                  : 'border-[rgba(110,68,255,0.15)] dark:border-lavender/15'
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
              <h3 className="mb-2 text-center text-xl font-bold text-plum dark:text-pearl">{plan.name}</h3>
              <div className="mb-4 text-center">
                <span className="text-3xl font-bold text-[--color-primary]">{plan.price}</span>
              </div>
              <p className="mb-4 text-center text-sm text-[--color-ink-muted] dark:text-pearl/75">{plan.description}</p>
              <ul className="mb-6 flex-1 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="text-[--color-primary] font-bold mt-0.5 shrink-0">✓</span>
                    <span className="text-xs text-plum dark:text-pearl/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/web-atelier/upit?paket=${(['start', 'pro', 'premium'] as const)[index]}`}
                className="btn btn-primary mt-auto inline-flex w-full min-h-[48px] touch-manipulation items-center justify-center"
              >
                {translations.requestQuote[language]}
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section — aligned with inquiry CTA below */}
        <div className="fade-in mx-auto w-full max-w-4xl">
          <div className="flex flex-col items-center rounded-2xl border border-[rgba(110,68,255,0.2)] bg-gradient-to-br from-[rgba(189,166,255,0.15)] to-[rgba(110,68,255,0.1)] p-5 text-center shadow-lg sm:p-8">
            <h3 className="mb-3 max-w-2xl font-heading text-lg font-bold text-[--color-primary] sm:mb-4 sm:text-xl">
              {translations.cta[language].title}
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-plum/80 dark:text-pearl/75 sm:text-base">
              {translations.cta[language].description}
            </p>
            <a
              href="#web-atelier-pricing"
              className="btn btn-primary mb-4 inline-flex min-h-[48px] w-full max-w-sm touch-manipulation items-center justify-center sm:w-auto"
            >
              {translations.cta[language].button}
            </a>
            <p className="mx-auto max-w-md text-xs text-plum/65 dark:text-pearl/60">
              {translations.cta[language].paymentNote}
            </p>
          </div>
        </div>

        {/* CTA — web project form na /web-atelier/upit */}
        <div className="mx-auto mt-10 flex w-full max-w-4xl justify-center sm:mt-12">
          <div className="w-full rounded-3xl border border-[rgba(110,68,255,0.12)] bg-white/50 p-6 shadow-[0_8px_40px_rgba(46,36,71,0.06)] backdrop-blur-md dark:border-lavender/12 dark:bg-white/[0.04] dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)] sm:p-8 md:p-10">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-4 text-center sm:space-y-5">
              <h3 className="w-full font-heading text-xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-2xl">
                {translations.formInquiryCta.title[language]}
              </h3>
              <p className="w-full text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:text-[0.9375rem] sm:leading-relaxed">
                {translations.formInquiryCta.text[language]}
              </p>
              <Link
                to="/web-atelier/upit"
                className="btn btn-primary inline-flex min-h-[48px] w-full max-w-md items-center justify-center px-8 py-3 text-base font-semibold shadow-md transition-all duration-300 hover:shadow-lg sm:w-auto sm:px-12 sm:py-4"
                style={{ letterSpacing: '0.02em' }}
              >
                {translations.formInquiryCta.button[language]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}