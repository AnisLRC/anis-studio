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
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
          O studiju
        </h2>
        <p className="text-white/85 max-w-3xl mb-6">
          Spajamo ručni rad i moderne tehnologije: epoxy i drvene suvenire,
          3D vizualizacije interijera i web stranice s fokusom na estetiku i prodaju.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="badge">epoxy</span>
          <span className="badge">wood</span>
          <span className="badge">3D interijer</span>
          <span className="badge">web dizajn</span>
        </div>
      </div>
    </section>
  )
}