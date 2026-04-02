import { useState } from 'react'
import { DecorativeSkyBackdrop } from '../components/DecorativeSkyBackdrop'

export type FaqCategory = 'lrc' | 'interiors' | 'web' | 'global'

interface FAQSectionProps {
  language: 'hr' | 'en'
  categories?: FaqCategory[]
  items?: FAQItem[]
  hideTitle?: boolean
  /** Layout tuned for the dedicated /faq page only (does not affect embedded FAQ on other pages). */
  standalonePage?: boolean
}

export interface FAQItem {
  id: number
  category: FaqCategory
  question: {
    hr: string
    en: string
  }
  answer: {
    hr: string
    en: string
  }
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    category: 'lrc',
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
    category: 'lrc',
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
    category: 'lrc',
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
    category: 'lrc',
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
    category: 'web',
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

export default function FAQSection({
  language,
  categories,
  items,
  hideTitle = false,
  standalonePage = false,
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const translations = {
    title: {
      hr: "Česta pitanja",
      en: "Frequently Asked Questions"
    },
    subtitle: {
      hr: "Pronađite odgovore na najčešća pitanja",
      en: "Find answers to common questions"
    }
  }

  // Use provided items or filter FAQ_ITEMS by categories
  const displayItems = items || (categories 
    ? FAQ_ITEMS.filter(item => categories.includes(item.category))
    : FAQ_ITEMS)

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  return (
    <section id="faq" className="Section fade-in relative section-with-bg">
      {/* Background wrapper */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <DecorativeSkyBackdrop priority={standalonePage ? 'high' : 'lazy'} />
        {/* Overlay for readability */}
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>
      
      <div
        className={
          standalonePage
            ? 'relative z-10 mx-auto min-w-0 max-w-3xl px-1 py-6 sm:px-2 sm:py-8 md:py-10 lg:py-12'
            : 'relative z-10 mx-auto min-w-0 max-w-3xl py-8 sm:py-10 lg:py-12'
        }
      >
        {/* Section Header */}
        {!hideTitle && (
          <header
            className={
              standalonePage
                ? 'mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12'
                : 'mb-6 text-center sm:mb-8'
            }
          >
            <div
              className={
                standalonePage
                  ? 'mb-3 flex flex-col items-center gap-2 sm:mb-4 sm:flex-row sm:justify-center sm:gap-3'
                  : 'mb-2 inline-flex items-center gap-2'
              }
            >
              <span className="text-2xl text-pink-500" aria-hidden>
                ❓
              </span>
              <h2
                className={
                  standalonePage
                    ? 'font-heading text-3xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-4xl md:text-[2.25rem] md:leading-tight'
                    : 'font-heading text-2xl font-bold tracking-tight text-balance text-plum dark:text-pearl sm:text-3xl'
                }
              >
                {translations.title[language]}
              </h2>
            </div>
            <p
              className={
                standalonePage
                  ? 'mx-auto max-w-xl text-pretty text-base leading-relaxed text-plum/78 dark:text-pearl/75 sm:text-lg'
                  : 'mx-auto max-w-2xl px-1 text-sm leading-relaxed text-plum/75 dark:text-pearl/75 sm:text-base'
              }
            >
              {translations.subtitle[language]}
            </p>
          </header>
        )}

        {/* FAQ Items */}
        <div className={standalonePage ? 'space-y-3 sm:space-y-4' : 'space-y-4'}>
          {displayItems.length === 0 ? (
            <p className="text-center text-plum/80 dark:text-pearl/80 py-8">
              {language === 'hr' ? 'Nema dostupnih pitanja.' : 'No questions available.'}
            </p>
          ) : (
            displayItems.map((item, index) => {
            const isOpen = openItems.includes(item.id)
            return (
              <div
                key={item.id}
                className="rounded-xl bg-[rgba(248,246,255,0.74)] dark:bg-white/8 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] dark:border-lavender/15 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)] transition-all duration-200 overflow-hidden fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left sm:gap-4 sm:px-5 sm:py-4 hover:bg-[rgba(110,68,255,0.05)] dark:hover:bg-[rgba(189,166,255,0.1)] transition-colors duration-200"
                >
                  <span className="min-w-0 flex-1 font-semibold text-base text-plum/90 dark:text-pearl">
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
                    isOpen ? 'max-h-[min(70vh,28rem)] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="max-h-[min(65vh,26rem)] overflow-y-auto px-4 pb-4 pt-0 text-sm leading-relaxed text-plum/75 dark:text-pearl/70 sm:px-5">
                    {item.answer[language]}
                  </div>
                </div>
              </div>
            )
          }))}
        </div>
      </div>
    </section>
  )
}

