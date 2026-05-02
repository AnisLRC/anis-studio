import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DecorativeSkyBackdrop } from '../components/DecorativeSkyBackdrop'
import { usePortfolioItems } from '../hooks/usePortfolioItems'

interface PortfolioSectionProps {
  language: 'hr' | 'en'
}

export default function PortfolioSection({ language }: PortfolioSectionProps) {
  const translations = {
    title: {
      hr: 'Pregled rada kroz tri kreativna smjera studija.',
      en: "A look at work across the studio's three creative directions.",
    },
    subtitle: {
      hr: 'Prikaz kroz tri smjera — sadržaj i fotografije dopunjuju se kako radovi postaju dostupni.',
      en: 'A view across three directions — images and project details are added as work becomes available.',
    },
    categories: {
      hr: ['Svi', 'LRC', 'Interijeri', 'Web Atelier'],
      en: ['All', 'LRC', 'Interiors', 'Web Atelier']
    },
    placeholder: {
      hr: "Uskoro",
      en: "Coming soon"
    },
    portfolioCta: {
      heading: {
        hr: 'Sviđa vam se što vidite?',
        en: 'Like what you see?'
      },
      subline: {
        hr: 'Javite nam se kratkim upitom — pričamo o vašem projektu i sljedećim koracima.',
        en: "Send a short message — we'll talk about your project and next steps."
      },
      button: {
        hr: 'Pokreni projekt',
        en: "Let's start a project"
      }
    }
  }

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'lrc' | 'interiors' | 'web-atelier'>('all')

  const { items: portfolioItems, resolvedKind } = usePortfolioItems(language)
  const portfolioLoading = resolvedKind === 'loading'

  // Category icons
  const categoryIcons: Record<string, string> = {
    'lrc': '🎁',
    'interiors': '🏠',
    'web-atelier': '💻'
  }

  const filteredItems = useMemo(() => {
    const list =
      selectedCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === selectedCategory)
    const useFallbackLimits =
      list.length === 0 || portfolioItems.every((item) => item.key.startsWith('fallback-'))
    return useFallbackLimits ? list.slice(0, 10) : list
  }, [portfolioItems, selectedCategory])

  const isFallbackGallery = useMemo(
    () =>
      portfolioItems.length > 0 &&
      portfolioItems.every((item) => item.key.startsWith('fallback-')),
    [portfolioItems]
  )

  const gridClasses = isFallbackGallery
    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 transition-opacity duration-300'
    : 'mx-auto grid w-full max-w-[68rem] grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 md:gap-8 transition-opacity duration-300'

  return (
    <section id="portfolio" className="section-with-bg relative overflow-x-clip px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16">
      {/* Background wrapper */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <DecorativeSkyBackdrop priority="lazy" />
        {/* Overlay for readability */}
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>
      
      <div className="max-w-7xl mx-auto min-w-0 relative z-10">
        {/* Section Header */}
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mb-3 font-heading text-2xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:mb-3.5 sm:text-3xl md:text-4xl">
            {translations.title[language]}
          </h2>
          <p className="mx-auto max-w-2xl px-1 text-base leading-relaxed text-plum/80 dark:text-pearl/75 sm:text-lg">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Category Filters - with glow on active */}
        <div className="mb-6 flex flex-wrap justify-center gap-2.5 sm:mb-8 sm:gap-3">
          {(['all', 'lrc', 'interiors', 'web-atelier'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium
                transition-all duration-300 border
                ${selectedCategory === category
                  ? 'bg-amethyst text-white border-amethyst shadow-[0_0_20px_rgba(110,68,255,0.4)] dark:shadow-[0_0_25px_rgba(189,166,255,0.35)]'
                  : 'bg-white/60 dark:bg-white/8 border-amethyst/20 dark:border-lavender/15 text-plum/90 dark:text-pearl hover:bg-amethyst/10 dark:hover:bg-lavender/10 hover:text-plum dark:hover:text-pearl'
                }
              `}
            >
              {translations.categories[language][category === 'all' ? 0 : category === 'lrc' ? 1 : category === 'interiors' ? 2 : 3]}
            </button>
          ))}
        </div>

        {/* Portfolio Grid — single column on narrow phones */}
        <div
          className={`${gridClasses} ${
            portfolioLoading ? 'opacity-95' : 'opacity-100'
          }`}
          aria-busy={portfolioLoading}
        >
          {filteredItems.map((item, index) => {
            const isFallbackItem = item.key.startsWith('fallback-')

            return (
              <div
                key={item.key}
                className={`
                  group flex h-full flex-col overflow-hidden cursor-pointer rounded-2xl border border-amethyst/18 backdrop-blur-xl
                  bg-[rgba(248,246,255,0.76)] shadow-[0_4px_16px_rgba(46,36,71,0.07)]
                  hover:shadow-[0_16px_40px_rgba(110,68,255,0.12)] dark:bg-white/8 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] dark:border-lavender/15
                  dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)]
                  transition-all duration-300
                  ${isFallbackItem ? 'hover:scale-[1.02] hover:-translate-y-1 sm:hover:scale-105' : 'hover:-translate-y-0.5 sm:hover:-translate-y-1'}`
                }
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {isFallbackItem ? (
                  <>
                    {/* Fallback: thumbnail-style square placeholders (unchanged look) */}
                    <div className="relative aspect-square overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.imageAlt ?? ''}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-amethyst/20 to-lavender/30 dark:from-lavender/15 dark:via-amethyst/10 dark:to-lavender/15" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="mb-2 text-4xl opacity-60 transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
                              {categoryIcons[item.category]}
                            </div>
                            <p className="text-xs font-medium text-plum/70 dark:text-pearl/50">
                              {translations.placeholder[language]}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4">
                      <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-plum/90 transition-colors dark:text-pearl group-hover:text-amethyst dark:group-hover:text-lavender sm:text-base">
                        {item.title}
                      </h3>
                      <span className="mt-auto inline-flex max-w-full w-fit items-center gap-1 rounded-full border border-amethyst/20 bg-gradient-to-r from-amethyst/15 to-lavender/15 px-2.5 py-1 text-[10px] font-semibold text-amethyst dark:border-lavender/20 dark:from-amethyst/25 dark:to-lavender/20 dark:text-lavender sm:text-xs">
                        <span className="shrink-0 text-xs">{categoryIcons[item.category]}</span>
                        <span className="truncate">
                          {
                            translations.categories[language][
                              item.category === 'lrc' ? 1 : item.category === 'interiors' ? 2 : 3
                            ]
                          }
                        </span>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Real Supabase: full board in frame */}
                    <div className="relative aspect-[4/3] w-full shrink-0 border-b border-amethyst/[0.14] bg-white/[0.94] dark:border-lavender/10 dark:bg-slate-950/45">
                      {item.imageUrl ? (
                        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5 lg:p-6">
                          <img
                            src={item.imageUrl}
                            alt={item.imageAlt ?? ''}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-amethyst/20 to-lavender/30 dark:from-lavender/15 dark:via-amethyst/10 dark:to-lavender/15" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="mb-2 text-4xl opacity-55 transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
                              {categoryIcons[item.category]}
                            </div>
                            <p className="text-xs font-medium text-plum/70 dark:text-pearl/50">
                              {translations.placeholder[language]}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col gap-2 p-4 sm:p-5">
                      <h3 className="line-clamp-3 text-base font-semibold leading-snug text-plum/90 dark:text-pearl transition-colors group-hover:text-amethyst dark:group-hover:text-lavender sm:text-lg">
                        {item.title}
                      </h3>
                      {item.description ? (
                        <p className="line-clamp-3 text-sm leading-relaxed text-plum/[0.84] dark:text-pearl/[0.74]">
                          {item.description}
                        </p>
                      ) : null}
                      <span className="mt-auto inline-flex max-w-full w-fit items-center gap-1 rounded-full border border-amethyst/20 bg-gradient-to-r from-amethyst/15 to-lavender/15 px-2.5 py-1 text-[11px] font-semibold text-amethyst dark:border-lavender/20 dark:from-amethyst/25 dark:to-lavender/20 dark:text-lavender sm:text-xs">
                        <span className="shrink-0 text-xs">{categoryIcons[item.category]}</span>
                        <span className="truncate">
                          {
                            translations.categories[language][
                              item.category === 'lrc' ? 1 : item.category === 'interiors' ? 2 : 3
                            ]
                          }
                        </span>
                      </span>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-plum/80 dark:text-pearl/60 text-lg">
              {language === 'hr' ? 'Nema projekata u ovoj kategoriji.' : 'No projects in this category.'}
            </p>
          </div>
        )}

        {/* Conversion CTA — after portfolio grid */}
        <div className="mx-auto mt-10 max-w-xl sm:mt-12" aria-labelledby="portfolio-cta-heading">
          <div className="rounded-2xl border border-[rgba(110,68,255,0.12)] bg-white/50 p-6 text-center shadow-[0_8px_40px_rgba(46,36,71,0.06)] backdrop-blur-md dark:border-lavender/12 dark:bg-white/[0.04] dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)] sm:p-8">
            <h3
              id="portfolio-cta-heading"
              className="font-heading text-xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-2xl"
            >
              {translations.portfolioCta.heading[language]}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:mt-4 sm:text-[0.9375rem] sm:leading-relaxed">
              {translations.portfolioCta.subline[language]}
            </p>
            <Link
              to="/kontakt"
              className="btn btn-primary mt-6 inline-flex min-h-[48px] w-full max-w-sm items-center justify-center px-8 py-3 text-base font-semibold shadow-md transition-all duration-300 hover:shadow-lg sm:mt-7 sm:w-auto sm:px-10 sm:py-3.5"
            >
              {translations.portfolioCta.button[language]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
