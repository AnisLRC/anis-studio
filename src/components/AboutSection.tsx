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
    <section id="about" className="section">
      <div className="container">
        <div className="about-content">
          <h2>{translations.title[language]}</h2>
          <div className="about-text">
            {translations.bio[language].map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="badges">
            {translations.badges[language].map((badge, index) => (
              <span key={index} className="badge">{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}