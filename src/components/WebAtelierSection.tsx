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
    <section id="web-atelier" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="text-center">{translations.title[language]}</h2>
          <p className="section-subtitle text-center">
            {translations.subtitle[language]}
          </p>
        </div>

        <div className="web-content">
          {/* Features List */}
          <div className="features-list">
            {translations.features[language].map((feature, index) => (
              <div key={index} className="feature-item glass-panel">
                <span style={{color: 'var(--clr-primary)'}}>✓</span> {feature}
              </div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="pricing-cards">
            {translations.pricingPlans[language].map((plan, index) => (
              <div 
                key={index} 
                className={`pricing-card glass-panel ${plan.popular ? 'border-2 border-primary' : ''}`}
                style={{padding: 'var(--space-xl)'}}
              >
                {plan.popular && (
                  <div className="text-center" style={{marginBottom: 'var(--space-md)'}}>
                    <span className="badge">{translations.popular[language]}</span>
                  </div>
                )}
                <h3 className="text-center">{plan.name}</h3>
                <div className="text-center" style={{marginBottom: 'var(--space-md)'}}>
                  <span style={{fontSize: 'var(--text-4xl)', fontWeight: '700', color: 'var(--clr-primary)'}}>{plan.price}</span>
                </div>
                <p className="text-center" style={{color: 'var(--clr-text-light)', marginBottom: 'var(--space-lg)'}}>{plan.description}</p>
                <ul style={{marginBottom: 'var(--space-xl)'}}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)'}}>
                      <span style={{color: 'var(--clr-primary)'}}>✓</span>
                      <span style={{fontSize: 'var(--text-sm)'}}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className="btn btn-primary"
                  style={{width: '100%'}}
                  onClick={scrollToContact}
                >
                  {translations.requestQuote[language]}
                </button>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="web-cta">
            <div className="glass-panel text-center" style={{padding: 'var(--space-xl)'}}>
              <h3 style={{color: 'var(--clr-primary)', marginBottom: 'var(--space-md)'}}>{translations.cta[language].title}</h3>
              <p style={{color: 'var(--clr-text-light)', marginBottom: 'var(--space-lg)'}}>
                {translations.cta[language].description}
              </p>
              <button 
                className="btn btn-primary"
                onClick={scrollToContact}
              >
                {translations.cta[language].button}
              </button>
              <p className="payment-note" style={{marginTop: 'var(--space-md)'}}>
                {translations.cta[language].paymentNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}