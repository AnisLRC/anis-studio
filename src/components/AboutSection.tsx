interface AboutSectionProps {
  language: 'hr' | 'en'
}

export default function AboutSection({ language }: AboutSectionProps) {
  const translations = {
    title: {
      hr: "O meni",
      en: "About"
    },
    bio: {
      hr: [
        "Ja sam Ani — multidisciplinarna kreativka iz Županje, Hrvatska. Spajam tehnike ručnog rada (laser, epoksi, svilka) s modernim dizajnerskim alatima i AI-jem. Svaki projekt, fizički ili digitalni, dobiva istu pažnju i emociju.",
        "Moja misija je stvaranje jedinstvenih proizvoda koji kombiniraju tradiciju i inovaciju, pružajući vam personalizirana rješenja koja odražavaju vašu osobnost i potrebe."
      ],
      en: [
        "I'm Ani — a multidisciplinary creator from Županja, Croatia. I blend handcraft techniques (laser, epoxy, silk) with modern design tools and AI. Every project, physical or digital, gets the same care and emotion.",
        "My mission is creating unique products that combine tradition and innovation, providing you with personalized solutions that reflect your personality and needs."
      ]
    },
    badges: {
      hr: ["Ručno izrađeno", "Personalizirano", "Sigurna kupnja"],
      en: ["Handmade", "Personalized", "Secure Purchase"]
    }
  }

  return (
    <section id="about" className="Section fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <div className="space-y-4 text-lg text-[#5A4A6B] leading-relaxed">
            {translations.bio[language].map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {translations.badges[language].map((badge, index) => (
            <span 
              key={index} 
              className="pill px-6 py-3 text-base font-medium"
              style={{
                background: 'linear-gradient(135deg, rgba(189, 166, 255, 0.15) 0%, rgba(110, 68, 255, 0.1) 100%)',
                borderColor: 'rgba(110, 68, 255, 0.3)',
                color: '#2E2447'
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}