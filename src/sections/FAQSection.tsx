import { useState } from 'react'

interface FAQSectionProps {
  language: 'hr' | 'en'
}

interface FAQItem {
  id: number
  category: string
  question: {
    hr: string
    en: string
  }
  answer: {
    hr: string
    en: string
  }
}

export default function FAQSection({ language }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const translations = {
    title: {
      hr: "❓ Česta pitanja",
      en: "❓ Frequently Asked Questions"
    },
    subtitle: {
      hr: "Pronađite odgovore na najčešća pitanja",
      en: "Find answers to common questions"
    }
  }

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: 'orders',
      question: {
        hr: 'Kako mogu naručiti proizvod?',
        en: 'How can I order a product?'
      },
      answer: {
        hr: 'Možete naručiti proizvod direktno preko web stranice dodavanjem u košaricu, ili možete kontaktirati nas putem kontakt formulara za personalizirane narudžbe.',
        en: 'You can order a product directly through the website by adding it to your cart, or you can contact us through the contact form for personalized orders.'
      }
    },
    {
      id: 2,
      category: 'delivery',
      question: {
        hr: 'Koliko vremena traje isporuka?',
        en: 'How long does delivery take?'
      },
      answer: {
        hr: 'Standardna isporuka traje 5-7 radnih dana za gotove proizvode. Za personalizirane narudžbe, vrijeme isporuke je 2-3 tjedna ovisno o složenosti proizvoda.',
        en: 'Standard delivery takes 5-7 business days for ready-made products. For personalized orders, delivery time is 2-3 weeks depending on product complexity.'
      }
    },
    {
      id: 3,
      category: 'personalization',
      question: {
        hr: 'Mogu li personalizirati proizvod?',
        en: 'Can I personalize a product?'
      },
      answer: {
        hr: 'Da! Većina naših proizvoda može biti personalizirana. Možete dodati imena, datume, poruke ili prilagoditi boje i dizajn prema vašim željama. Kontaktirajte nas za više detalja.',
        en: 'Yes! Most of our products can be personalized. You can add names, dates, messages, or customize colors and design according to your wishes. Contact us for more details.'
      }
    },
    {
      id: 4,
      category: 'payment',
      question: {
        hr: 'Koje načine plaćanja prihvaćate?',
        en: 'What payment methods do you accept?'
      },
      answer: {
        hr: 'Prihvaćamo plaćanja karticom putem Stripe-a, te možete kontaktirati nas za druge opcije plaćanja ako je potrebno.',
        en: 'We accept card payments via Stripe, and you can contact us for other payment options if needed.'
      }
    },
    {
      id: 5,
      category: 'interiors',
      question: {
        hr: 'Kako funkcionira usluga 3D renderiranja interijera?',
        en: 'How does the 3D interior rendering service work?'
      },
      answer: {
        hr: 'Nakon što nam pošaljete dimenzije prostora i svoje ideje, kreiramo 2D skicu i zatim 3D render koji prikazuje kako će izgledati vaš interijer. Možete vidjeti boje, materijale i raspored prije nego što odlučite.',
        en: 'After you send us the room dimensions and your ideas, we create a 2D sketch and then a 3D render showing how your interior will look. You can see colors, materials, and layout before you decide.'
      }
    },
    {
      id: 6,
      category: 'web-atelier',
      question: {
        hr: 'Što je uključeno u Web Atelier paket?',
        en: 'What is included in the Web Atelier package?'
      },
      answer: {
        hr: 'Web Atelier paket uključuje dizajn, razvoj, osnovnu SEO optimizaciju, kontakt formular i Google Analytics integraciju. Za detalje pogledajte cjenovni plan u Web Atelier sekciji.',
        en: 'The Web Atelier package includes design, development, basic SEO optimization, contact form, and Google Analytics integration. For details, see the pricing plan in the Web Atelier section.'
      }
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  return (
    <section id="faq" className="Section fade-in">
      <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:py-16">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-base text-[#5A4A6B]">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openItems.includes(item.id)
            return (
              <div
                key={item.id}
                className="rounded-xl bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[rgba(110,68,255,0.05)] transition-colors duration-200"
                >
                  <span className="font-semibold text-[#2E2447] text-base flex-1">
                    {item.question[language]}
                  </span>
                  <span
                    className={`text-[--color-primary] text-xl font-bold transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-4 text-sm text-[#5A4A6B] leading-relaxed">
                    {item.answer[language]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

