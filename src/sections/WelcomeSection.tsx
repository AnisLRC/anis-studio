interface WelcomeSectionProps {
  language?: 'hr' | 'en'
}

export default function WelcomeSection({ language = 'hr' }: WelcomeSectionProps) {
  const translations = {
    title: {
      hr: "Dobrodošli u Ani's Studio",
      en: "Welcome to Ani's Studio"
    },
    subtitle: {
      hr: "Otkrijte jedinstvene ručno izrađene proizvode koji kombiniraju tradiciju i inovaciju",
      en: "Discover unique handmade products that combine tradition and innovation"
    },
    features: {
      hr: [
        "Ručno izrađeno s ljubavlju",
        "100% personalizirano",
        "Brza isporuka",
        "Visoka kvaliteta materijala"
      ],
      en: [
        "Handmade with love",
        "100% personalized",
        "Fast delivery",
        "High-quality materials"
      ]
    },
    cta: {
      hr: {
        view: "Pogledaj ponudu",
        contact: "Zatraži ponudu"
      },
      en: {
        view: "View Offer",
        contact: "Request Quote"
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="welcome" className="Section fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Lijevo: Tekst i sadržaj */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
                {translations.title[language]}
              </h2>
              <p className="text-lg text-[#5A4A6B] leading-relaxed">
                {translations.subtitle[language]}
              </p>
            </div>

            {/* Bullet points */}
            <div className="space-y-3">
              {translations.features[language].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] flex items-center justify-center">
                    <span className="text-[--color-primary] font-bold text-sm">✓</span>
                  </div>
                  <span className="text-[#2E2447] font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA gumbovi */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#lrc" 
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('lrc')
                }}
              >
                {translations.cta[language].view}
              </a>
              <a 
                href="#contact" 
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
              >
                {translations.cta[language].contact}
              </a>
            </div>
          </div>

          {/* Desno: Vizualni element */}
          <div className="relative">
            <div 
              className="rounded-2xl w-full aspect-square shadow-[0_8px_24px_rgba(110,68,255,0.15)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(110,68,255,0.25)] hover:scale-[1.02] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(189, 166, 255, 0.2) 0%, rgba(110, 68, 255, 0.15) 100%)',
                border: '2px solid rgba(110, 68, 255, 0.2)'
              }}
            >
              <div className="text-center p-8">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-[#5A4A6B] font-medium text-lg">
                  {language === 'hr' ? 'Fotografija dolazi uskoro' : 'Photo coming soon'}
                </p>
              </div>
            </div>
            
            {/* Dekorativni badge */}
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-[rgba(110,68,255,0.2)]">
              <span className="text-sm font-semibold text-[--color-primary]">
                {language === 'hr' ? 'Ručno izrađeno' : 'Handmade'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
