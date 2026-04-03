import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import { DecorativeSkyBackdrop } from './DecorativeSkyBackdrop'

interface WebAtelierSectionProps {
  language: 'hr' | 'en'
}

export default function WebAtelierSection({ language }: WebAtelierSectionProps) {
  const translations = {
    title: {
      hr: "💻 Ani's Web Atelier — Landing stranice za male obrte i poduzetnike",
      en: "💻 Ani's Web Atelier — Landing pages for small businesses and entrepreneurs",
    },
    subtitle: {
      hr: 'Web stranica koja jasno predstavlja tvoju ponudu i pomaže ti da ostaviš profesionalan dojam — bez komplikacija i bez tehničkog kaosa.',
      en: 'A website that clearly presents your offer and helps you make a professional impression — without hassle or technical chaos.',
    },
    bridge: {
      hr: "Ani's Web Atelier namijenjen je malim obrtima, poduzetnicima i brendovima kojima treba jasna, uredna i profesionalna web prisutnost. Umjesto kompliciranog procesa, dobivaš konkretan paket, jasan tijek suradnje i stranicu koja je prilagođena tvojoj priči i cilju.",
      en: "Ani's Web Atelier is for small businesses, entrepreneurs, and brands that need a clear, polished, professional web presence. Instead of a complicated process, you get a concrete package, a straightforward collaboration flow, and a page tailored to your story and goals.",
    },
    showcaseTitle: {
      hr: 'Pregled web smjera studija',
      en: 'A look at the studio’s web direction',
    },
    showcaseIntro: {
      hr: 'Primjeri i prikazi rada dopunjuju se postupno. Ovdje možeš steći dojam smjera, pristupa i vrste web stranica koje studio razvija.',
      en: 'Examples and previews are added gradually. Here you can get a sense of the direction, approach, and types of websites the studio builds.',
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
        description:
          "U kratkoj formi za upit opišite što trebate — vratit ću vam prijedlog strukture, dizajna i sljedećih koraka. Suradnja je jasna i usmjerena na stranicu koja donosi klijente, brzo i bez nepotrebnih komplikacija.",
        paymentNote: "Plaćanja karticom putem Stripe-a.",
      },
      en: {
        title: "Ready for your landing page?",
        description:
          "Use the short inquiry form to describe what you need — I'll reply with a proposed structure, design, and next steps. Clear collaboration focused on a page that brings clients, quickly and without unnecessary friction.",
        paymentNote: "Card payments via Stripe.",
      },
    },
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
        <DecorativeSkyBackdrop priority="high" />
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
          <div className="mx-auto mt-6 max-w-2xl border-t border-amethyst/10 px-2 pt-6 text-center dark:border-lavender/15 sm:mt-7 sm:px-3 sm:pt-7">
            <p className="text-sm leading-relaxed text-plum/78 dark:text-pearl/75 sm:text-[0.9375rem] sm:leading-relaxed">
              {translations.bridge[language]}
            </p>
          </div>
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

        {/* Showcase — smjer rada, sadržaj se dopunjuje */}
        <div className="mx-auto mb-10 max-w-6xl sm:mb-12">
          <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
            <h3 className="font-heading text-xl font-bold text-balance text-plum dark:text-pearl sm:text-2xl">
              {translations.showcaseTitle[language]}
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:mt-5 sm:text-[0.9375rem] sm:leading-relaxed">
              {translations.showcaseIntro[language]}
            </p>
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
                onClick={() => trackEvent('inquiry_cta_click', { source: 'web-atelier' })}
                className="btn btn-primary mt-auto inline-flex w-full min-h-[48px] touch-manipulation items-center justify-center"
              >
                {translations.requestQuote[language]}
              </Link>
            </div>
          ))}
        </div>

        {/* Završni CTA — jedan blok: što slijedi + jedan gumb na formu */}
        <div className="fade-in mx-auto w-full max-w-4xl">
          <div className="flex flex-col items-center rounded-2xl border border-[rgba(110,68,255,0.2)] bg-gradient-to-br from-[rgba(189,166,255,0.15)] to-[rgba(110,68,255,0.1)] p-5 text-center shadow-lg sm:p-8">
            <h3 className="mb-3 max-w-2xl font-heading text-lg font-bold text-[--color-primary] sm:mb-4 sm:text-xl">
              {translations.cta[language].title}
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-plum/80 dark:text-pearl/75 sm:text-base">
              {translations.cta[language].description}
            </p>
            <Link
              to="/web-atelier/upit"
              onClick={() => trackEvent('inquiry_cta_click', { source: 'web-atelier' })}
              className="btn btn-primary mb-4 inline-flex min-h-[48px] w-full max-w-sm touch-manipulation items-center justify-center sm:w-auto"
            >
              {translations.requestQuote[language]}
            </Link>
            <p className="mx-auto max-w-md text-xs text-plum/65 dark:text-pearl/60">
              {translations.cta[language].paymentNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}