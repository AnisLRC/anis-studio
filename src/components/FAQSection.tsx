import { useState } from 'react'

interface FAQSectionProps {
  language: 'hr' | 'en'
}

export default function FAQSection({ language }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const translations = {
    title: {
      hr: "Često postavljana pitanja",
      en: "Frequently Asked Questions"
    },
    subtitle: {
      hr: "Odgovori na najčešća pitanja o našim proizvodima i uslugama",
      en: "Answers to the most common questions about our products and services"
    },
    categories: {
      hr: ["Svi", "LRC Proizvodi", "Interijeri", "Web Atelier", "Plaćanje i dostava"],
      en: ["All", "LRC Products", "Interiors", "Web Atelier", "Payment & Delivery"]
    },
    faqs: {
      hr: [
        {
          category: "LRC Proizvodi",
          question: "Mogu li personalizirati proizvode?",
          answer: "Apsolutno! Svi naši LRC proizvodi mogu biti personalizirani prema vašim željama. Možete dodati imena, datume, posebne poruke ili čak vlastiti dizajn. Kontaktirajte nas s vašom idejom i mi ćemo je pretvoriti u stvarnost."
        },
        {
          category: "LRC Proizvodi",
          question: "Koliko traje izrada personaliziranog proizvoda?",
          answer: "Standardno vrijeme izrade je 5-7 radnih dana, ovisno o složenosti dizajna. Za hitne narudžbe nudimo uslugu ekspresne izrade (2-3 dana) uz dodatnu naknadu. Uvijek ćemo vas obavijestiti o točnom roku nakon razgovora o vašim zahtjevima."
        },
        {
          category: "Interijeri",
          question: "Kako funkcionira proces dizajniranja interijera?",
          answer: "Proces se sastoji od 5 koraka: 1) Brief razgovor o vašim željama, 2) Prikupljanje mjerenja prostora, 3) Izrada 2D koncepta, 4) Kreiranje fotorealističnog 3D rendera, 5) Finalna ponuda s cijenom. Uključeni ste u svaki korak i možete tražiti izmjene."
        },
        {
          category: "Interijeri",
          question: "Da li nudite i izradu namještaja ili samo dizajn?",
          answer: "Mi nudimo kompletnu uslugu 3D vizualizacije i dizajna. Nakon što dobijete rendere i tehničke crteže, možete ih odnijeti bilo kojem proizvođaču namještaja. Na zahtev, možemo preporučiti provjerene partnere za izradu."
        },
        {
          category: "Web Atelier",
          question: "Što je uključeno u Web Atelier pakete?",
          answer: "Svi paketi uključuju responzivni dizajn, osnovnu SEO optimizaciju, kontakt formular i Google Analytics. Pro i Premium paketi dodaju napredne animacije, detaljnu analitiku, email integracije, a Premium uključuje i mini branding paket (logo + brand guidelines)."
        },
        {
          category: "Web Atelier",
          question: "Koliko traje izrada web stranice?",
          answer: "Standardna izrada jednostraničnog web sitea traje 10-14 dana od prihvaćanja brief-a do live verzije. Start paket može biti završen i brže (7 dana), dok Premium paket zbog dodatnog brandinga može trajati do 3 tjedna."
        },
        {
          category: "Plaćanje i dostava",
          question: "Koje načine plaćanja prihvaćate?",
          answer: "Prihvaćamo plaćanja putem Stripe-a (kartice), bankovni transfer i PayPal. Za web projekte i interijere obično radimo po modelu 50% avansa prije početka rada i 50% prije finalne isporuke."
        },
        {
          category: "Plaćanje i dostava",
          question: "Dostavljate li proizvode diljem Hrvatske?",
          answer: "Da! Dostavljamo naše LRC proizvode diljem Hrvatske putem HP-a i GLS-a. Troškovi dostave su 5-7€ ovisno o težini i lokaciji. Za narudžbe iznad 100€ dostava je besplatna. Interijerni dizajni i web projekti se isporučuju digitalno."
        }
      ],
      en: [
        {
          category: "LRC Products",
          question: "Can I customize products?",
          answer: "Absolutely! All our LRC products can be personalized to your wishes. You can add names, dates, special messages or even your own design. Contact us with your idea and we'll turn it into reality."
        },
        {
          category: "LRC Products",
          question: "How long does it take to make a custom product?",
          answer: "Standard production time is 5-7 business days, depending on design complexity. For urgent orders, we offer express production service (2-3 days) with an additional fee. We will always inform you of the exact deadline after discussing your requirements."
        },
        {
          category: "Interiors",
          question: "How does the interior design process work?",
          answer: "The process consists of 5 steps: 1) Brief discussion about your wishes, 2) Collecting space measurements, 3) Creating 2D concept, 4) Creating photorealistic 3D render, 5) Final quote with price. You're involved in every step and can request changes."
        },
        {
          category: "Interiors",
          question: "Do you also manufacture furniture or just design?",
          answer: "We offer complete 3D visualization and design services. Once you receive the renders and technical drawings, you can take them to any furniture manufacturer. On request, we can recommend trusted partners for production."
        },
        {
          category: "Web Atelier",
          question: "What's included in Web Atelier packages?",
          answer: "All packages include responsive design, basic SEO optimization, contact form and Google Analytics. Pro and Premium packages add advanced animations, detailed analytics, email integrations, and Premium includes a mini branding package (logo + brand guidelines)."
        },
        {
          category: "Web Atelier",
          question: "How long does website creation take?",
          answer: "Standard creation of a one-page website takes 10-14 days from brief acceptance to live version. The Start package can be completed even faster (7 days), while the Premium package may take up to 3 weeks due to additional branding."
        },
        {
          category: "Payment & Delivery",
          question: "What payment methods do you accept?",
          answer: "We accept payments via Stripe (cards), bank transfer and PayPal. For web projects and interiors, we usually work on a 50% advance before starting work and 50% before final delivery model."
        },
        {
          category: "Payment & Delivery",
          question: "Do you deliver products throughout Croatia?",
          answer: "Yes! We deliver our LRC products throughout Croatia via HP and GLS. Shipping costs are 5-7€ depending on weight and location. For orders over 100€, shipping is free. Interior designs and web projects are delivered digitally."
        }
      ]
    }
  }

  const [selectedCategory, setSelectedCategory] = useState(translations.categories[language][0])

  const filteredFaqs = selectedCategory === translations.categories[language][0]
    ? translations.faqs[language]
    : translations.faqs[language].filter(faq => faq.category === selectedCategory)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="Section">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            {translations.title[language]}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {translations.categories[language].map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`pill ${selectedCategory === category ? 'bg-purple-100 border-purple-400' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="glass-panel overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="pill text-xs py-1 px-3">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ 
                      background: openIndex === index 
                        ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-600))' 
                        : 'rgba(110, 68, 255, 0.1)'
                    }}
                  >
                    <span className={openIndex === index ? 'text-white' : 'text-purple-600'}>
                      ▼
                    </span>
                  </div>
                </div>
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-panel p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-3">
            {language === 'hr' ? 'Niste pronašli odgovor?' : "Didn't find your answer?"}
          </h3>
          <p className="text-slate-600 mb-6">
            {language === 'hr' 
              ? 'Slobodno nas kontaktirajte i rado ćemo odgovoriti na sva vaša pitanja.'
              : 'Feel free to contact us and we\'ll be happy to answer all your questions.'}
          </p>
          <a href="#contact" className="btn btn-primary">
            {language === 'hr' ? 'Kontaktirajte nas' : 'Contact us'}
          </a>
        </div>
      </div>
    </section>
  )
}



