import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DecorativeSkyBackdrop } from './DecorativeSkyBackdrop'
import { sampleProducts, productTags } from '../data/products'
import { cartActions } from '../lib/cart.store'

interface LRCSectionProps {
  language?: 'hr' | 'en'
  isFormEnabled?: boolean
}

export default function LRCSection({ language = 'hr', isFormEnabled = true }: LRCSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'all' || product.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const translations = {
    title: {
      hr: "🌸 Ani's LRC",
      en: "🌸 Ani's LRC"
    },
    subtitle: {
      hr: "Laser Resin Crafting",
      en: "Laser Resin Crafting"
    },
    description: {
      hr: "Kreativna radionica jedinstvenih suvenira i funkcionalnih uporabnih predmeta",
      en: "A creative workshop of unique souvenirs & functional items"
    },
    techniques: {
      hr: "🔥 Lasersko rezanje · Lasersko graviranje · Epoksidna smola · Svila · Mandala\n🎨 Ručno izrađeno s ljubavlju i preciznošću",
      en: "🔥 Laser cutting · Laser engraving · Epoxy resin · Silk · Mandala\n🎨 Handmade with love and precision"
    },
    personalizedGiftsTitle: {
      hr: "Personalizirani pokloni i ručno rađene dekoracije",
      en: "Personalized gifts and handmade decorations"
    },
    personalizedGiftsDesc: {
      hr: "Svaki komad nastaje ručno, u malim serijama ili kao unikat. Ovdje možeš naručiti personalizirane poklone, dekoracije za dom ili posebne prilike – uz dizajn prilagođen tvojoj priči.",
      en: "Each piece is created by hand, in small series or as a unique item. Here you can order personalized gifts, home decorations or special occasions – with a design tailored to your story."
    },
    searchPlaceholder: {
      hr: "Pretraži proizvod...",
      en: "Search product..."
    },
    addToCart: {
      hr: "Dodaj u košaricu",
      en: "Add to cart"
    },
    customizationTitle: {
      hr: "Kako personalizirati proizvod",
      en: "How to customize your product"
    },
    step1: {
      title: { hr: "Odaberi proizvod", en: "Choose product" },
      desc: { hr: "Pregledaj našu ponudu i odaberi proizvod koji ti se sviđa", en: "Browse our selection and choose a product you like" }
    },
    step2: {
      title: { hr: "Opiši svoju želju", en: "Describe your wish" },
      desc: { hr: "Detaljno nam opiši kako želiš personalizirati proizvod", en: "Tell us in detail how you want to customize the product" }
    },
    step3: {
      title: { hr: "Dodaj slike/inspiraciju", en: "Add images/inspiration" },
      desc: { hr: "Priloži slike ili reference koje će nam pomoći razumjeti tvoju viziju", en: "Attach images or references to help us understand your vision" }
    },
    step4: {
      title: { hr: "Pošalji upit", en: "Send inquiry" },
      desc: { hr: "Pošalji nam upit i javit ćemo ti se u najkraćem roku", en: "Send us your inquiry and we'll get back to you soon" }
    },
    formCtaTitle: {
      hr: 'Pošaljite upit za personalizaciju',
      en: 'Send a personalization inquiry'
    },
    formCtaText: {
      hr: 'Imate ideju za personalizirani proizvod, poklon ili dekoraciju? Otvorite formu i pošaljite nam svoj upit.',
      en: 'Have an idea for a personalized product, gift, or decoration? Open the form and send us your request.'
    },
    formCtaButton: {
      hr: 'Otvori formu',
      en: 'Open form'
    },
    formDisabledTitle: {
      hr: "LRC radionice",
      en: "LRC Workshops"
    },
    formDisabledMessage: {
      hr: "Trenutno nema otvorenih prijava za LRC radionice.",
      en: "Currently there are no open applications for LRC workshops."
    },
    formDisabledAdditional: {
      hr: "Ako želite da vam javimo kad otvorimo nove termine, javite nam se na info.anilrc@gmail.com ili nas pratite na društvenim mrežama.",
      en: "If you would like us to notify you when we open new dates, contact us at info.anilrc@gmail.com or follow us on social media."
    }
  }

  const customizationSteps = [
    {
      number: 1,
      icon: '🛍️',
      title: translations.step1.title,
      desc: translations.step1.desc
    },
    {
      number: 2,
      icon: '✍️',
      title: translations.step2.title,
      desc: translations.step2.desc
    },
    {
      number: 3,
      icon: '📸',
      title: translations.step3.title,
      desc: translations.step3.desc
    },
    {
      number: 4,
      icon: '📤',
      title: translations.step4.title,
      desc: translations.step4.desc
    }
  ]

  return (
    <section id="lrc" className="Section fade-in relative section-with-bg">
      {/* Background wrapper */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <DecorativeSkyBackdrop priority="high" />
        {/* Overlay for readability */}
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>
      
      <div className="max-w-7xl mx-auto min-w-0 relative z-10">
        {/* Section Header */}
        <div className="mb-8 pt-10 text-center sm:mb-10 sm:pt-12">
          <div className="mx-auto flex max-w-[min(100%,26rem)] flex-col items-center px-4 sm:max-w-xl sm:px-5">
            <h2 className="mb-1.5 font-heading text-2xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:mb-2 sm:text-3xl">
              {translations.title[language]}
            </h2>
            <p className="mb-1.5 text-lg font-semibold italic text-amethyst dark:text-lavender sm:mb-2 sm:text-xl">
              {translations.subtitle[language]}
            </p>
            <p className="mb-3 text-base font-medium italic leading-relaxed text-plum/80 dark:text-pearl/75 sm:mb-4 sm:text-lg">
              {translations.description[language]}
            </p>
            <div className="w-full max-w-md space-y-2 sm:space-y-2.5">
              {translations.techniques[language].split('\n').map((line, i) => (
                <p
                  key={i}
                  className="text-center text-[0.9375rem] leading-relaxed text-plum/75 dark:text-pearl/65 sm:text-base"
                >
                  {line.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Personalizirani pokloni sekcija */}
          <div className="mt-7 mb-8 sm:mt-8 sm:mb-10">
            <h3 className="mb-2.5 font-heading text-lg font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:mb-3 sm:text-xl md:text-2xl">
              {translations.personalizedGiftsTitle[language]}
            </h3>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-plum/80 dark:text-pearl/80 md:text-base">
              {language === 'hr' 
                ? <>Svaki komad nastaje ručno, u malim serijama ili kao unikat. Ovdje možeš naručiti personalizirane poklone, dekoracije za dom ili posebne prilike –<br />uz dizajn prilagođen tvojoj priči.</>
                : translations.personalizedGiftsDesc[language]
              }
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 space-y-4 sm:mb-12">
          <div className="mx-auto max-w-md">
            <label className="mb-3 block text-center font-heading text-xs font-bold uppercase tracking-[0.2em] text-[--color-primary] dark:text-lavender sm:text-sm">
              {language === 'hr' ? 'WEBSHOP' : 'WEBSHOP'}
            </label>
            <input
              type="text"
              placeholder={translations.searchPlaceholder[language]}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] dark:border-lavender/20 bg-white/90 dark:bg-white/10 focus:bg-white dark:focus:bg-white/15 focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-plum/90 dark:text-pearl placeholder:text-plum/60 dark:placeholder:text-pearl/50 placeholder:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {productTags.map(tag => (
              <button
                type="button"
                key={tag.id}
                className={`pill transition-all duration-200 h-11 ${
                  selectedTag === tag.id 
                    ? 'bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] border-[--color-primary] text-[--color-primary] font-semibold' 
                    : 'hover:bg-[rgba(110,68,255,0.1)]'
                }`}
                onClick={() => setSelectedTag(tag.id)}
              >
                {tag.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-10 sm:mb-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
          {filteredProducts.map(product => (
            <article 
              key={product.id} 
              className="flex h-full flex-col overflow-hidden rounded-xl bg-white/80 dark:bg-white/8 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] dark:border-lavender/15 shadow-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-lg dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)] transition-all duration-300 hover:scale-[1.02] fade-in"
            >
              {/* Thumb */}
              <div className="w-full aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-b from-violet-100/80 to-violet-50/80 relative">
                {/* Decorative circles */}
                <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(110,68,255,0.2)] to-[rgba(189,166,255,0.3)] blur-xl" />
                <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] blur-lg" />
                
                {/* Content */}
                <div className="flex h-full w-full items-center justify-center relative z-10 p-3 sm:p-4">
                  <div className="text-center">
                    {/* Product Icon based on tags */}
                    <div className="text-4xl sm:text-5xl mb-2 animate-float">
                      {product.tags.includes('epoxy') ? '💎' :
                       product.tags.includes('wood') || product.tags.includes('laser') ? '🪵' :
                       product.tags.includes('macrame') ? '🪢' :
                       product.tags.includes('ceramic') ? '☕' :
                       product.tags.includes('silk') ? '🧣' :
                       product.tags.includes('jewelry') ? '💍' : '🎨'}
                    </div>
                    
                    {/* Badge */}
                    <div className="inline-block px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.3)] shadow-md">
                      <p className="text-[10px] text-[#6E44FF] font-semibold uppercase tracking-wider">
                        {language === 'hr' ? 'Fotografija uskoro' : 'Coming Soon'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col space-y-2 p-3.5 sm:p-5">
                <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-plum/90 dark:text-pearl sm:text-base">
                  {language === 'hr' ? product.nameHr : product.name}
                </h3>
                <div className="mb-1 text-lg font-bold text-[--color-primary] sm:text-xl">€{product.price}</div>

                <div className="mb-1 flex flex-wrap gap-1.5">
                  {product.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[rgba(110,68,255,0.1)] text-[--color-primary] border border-[rgba(110,68,255,0.2)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="btn btn-primary mt-auto w-full text-xs sm:text-sm py-2"
                  onClick={() => {
                    cartActions.addItem({
                      id: product.id,
                      title: language === 'hr' ? product.nameHr : product.name,
                      price: product.price,
                      imageUrl: product.image,
                      tags: product.tags
                    });
                  }}
                >
                  {translations.addToCart[language]}
                </button>
              </div>
            </article>
          ))}
        </div>
        </div>

        {/* Message when form is disabled */}
        {!isFormEnabled && (
          <div className="fade-in mb-10 rounded-2xl border border-[rgba(110,68,255,0.2)] bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm dark:border-lavender/20 dark:bg-white/8 sm:mb-12 sm:p-8">
            <h3 className="mb-3 font-heading text-xl font-bold text-balance text-plum/90 dark:text-pearl sm:mb-4 sm:text-2xl">
              {translations.formDisabledTitle[language]}
            </h3>
            <p className="mb-3 text-base leading-relaxed text-plum/85 dark:text-pearl/85 sm:text-lg">
              {translations.formDisabledMessage[language]}
            </p>
            <p className="text-sm leading-relaxed text-[--color-ink-muted] dark:text-pearl/70 sm:text-base">
              {translations.formDisabledAdditional[language]}
            </p>
          </div>
        )}

        {/* Customization Steps - only show if form is enabled */}
        {isFormEnabled && (
          <>
            <div className="mb-6 text-center sm:mb-8">
              <h3 className="font-heading text-xl font-bold text-plum/90 dark:text-pearl sm:text-2xl">
                {translations.customizationTitle[language]}
              </h3>
            </div>
            
            <div className="mb-0 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {customizationSteps.map((step) => (
                <div 
                  key={step.number} 
                  className="relative flex h-full min-h-[200px] flex-col rounded-2xl border border-[rgba(110,68,255,0.15)] bg-white/80 p-5 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-lavender/15 dark:bg-white/8 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)] sm:hover:scale-105 sm:p-6 fade-in"
                >
                  {/* Step Number Badge */}
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#6E44FF] to-[#BDA6FF] text-lg font-bold text-white shadow-md">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-3 mt-6 text-5xl">{step.icon}</div>
                  
                  {/* Title */}
                  <h4 className="mb-2 font-heading text-sm font-bold text-[--color-primary] sm:text-base">
                    {step.title[language]}
                  </h4>
                  
                  {/* Description */}
                  <p className="mt-auto text-sm leading-relaxed text-plum/70 dark:text-pearl/65">
                    {step.desc[language]}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA — full form na /lrc/upit */}
            <div className="fade-in mx-auto mt-10 w-full max-w-4xl sm:mt-12">
              <div className="rounded-3xl border border-[rgba(110,68,255,0.12)] bg-white/50 p-6 shadow-[0_8px_40px_rgba(46,36,71,0.06)] backdrop-blur-md dark:border-lavender/12 dark:bg-white/[0.04] dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)] sm:p-8 md:p-10">
                <div className="mx-auto max-w-2xl space-y-4 text-center sm:space-y-5">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-plum/95 dark:text-pearl sm:text-2xl">
                    {translations.formCtaTitle[language]}
                  </h3>
                  <p className="text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:text-[0.9375rem] sm:leading-relaxed">
                    {translations.formCtaText[language]}
                  </p>
                  <Link
                    to="/lrc/upit"
                    className="btn btn-primary inline-flex min-h-[48px] w-full max-w-md items-center justify-center px-8 py-3 text-base font-semibold shadow-md transition-all duration-300 hover:shadow-lg sm:w-auto sm:px-12 sm:py-4"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    {translations.formCtaButton[language]}
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}