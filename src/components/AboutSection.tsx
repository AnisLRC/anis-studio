import { Link } from 'react-router-dom'
import { useSettings } from '../hooks/useSettings'
import { DecorativeSkyBackdrop } from './DecorativeSkyBackdrop'

interface AboutSectionProps {
  language: 'hr' | 'en'
}

export default function AboutSection({ language }: AboutSectionProps) {
  const { settings } = useSettings()
  const aboutBadgeVisibility = {
    lrc: settings?.lrc_public_visible ?? false,
    interiors: settings?.interiors_public_visible ?? true,
    webAtelier: settings?.web_atelier_public_visible ?? false,
  }

  const translations = {
    title: {
      hr: "✨ O meni",
      en: "✨ About Me"
    },
    authorName: {
      hr: 'Anamarija Vincetić',
      en: 'Anamarija Vincetić'
    },
    bio: {
      hr: [
        "Kreativka iz Županje koja spaja ručni rad, dizajn i suvremenu tehnologiju.",
        "Iza mene je 17 godina iskustva u 3D modeliranju i dizajnu, kao i obrazovanje koje povezuje tehničku preciznost s kreativnim pristupom. Upravo ta kombinacija omogućuje mi da svakom projektu pristupim promišljeno, detaljno i s jasnim osjećajem za estetiku, funkcionalnost i osobnost.",
        "Uz širu kreativnu pozadinu u ručnoj izradi i digitalnim alatima, danas je javni fokus na vizualnoj prezentaciji prostora: 3D prikazi interijera i kuhinja prije izvedbe — od rasporeda i materijala do atmosfere u prostoru.",
        "Vjerujem da najljepši rezultati nastaju kada se spoje znanje, osjećaj za prostor i jasna vizualna priča. Zato radim na tome da prije gradnje ili montaže vidite prostor onako kako ga zamislite — s kontrolom nad detaljima koji donose mir u odlukama."
      ],
      en: [
        "A creator from Županja, Croatia, who combines handcraft with digital design and technology.",
        "With a degree in mechanical engineering and education in teaching physics, technical culture, and informatics, I blend technical expertise with creativity. My 17 years of experience in 3D modeling and design enable me to create precise, innovative solutions for every project.",
        "Alongside a broader creative background in handcraft and digital tools, the public focus today is on visualizing spaces: photorealistic interiors and kitchens before execution — from layout and materials to the feeling of the room.",
        "I believe the best outcomes come from combining technical clarity, spatial intuition, and a visual story you can trust. My goal is for you to see the space as it will live — before building or install — so decisions feel calmer and more confident."
      ]
    },
    skills: {
      hr: [
        {
          icon: "⚙️",
          title: "Strojarski tehničar",
          desc: "Tehnička preciznost u svakom projektu"
        },
        {
          icon: "👩‍🏫",
          title: "Profesor fizike i informatike",
          desc: "Edukacija i prenošenje znanja"
        },
        {
          icon: "🎨",
          title: "17 godina u 3D modeliranju",
          desc: "Od ideje do realizacije"
        },
        {
          icon: "🔧",
          title: "Strast prema strojevima",
          desc: "Mehanika i preciznost kao inspiracija"
        },
        {
          icon: "💡",
          title: "Zaljubljenik u učenje",
          desc: "Kontinuirano razvijam nove vještine"
        }
      ],
      en: [
        {
          icon: "⚙️",
          title: "Mechanical Technician",
          desc: "Technical precision in every project"
        },
        {
          icon: "👩‍🏫",
          title: "Physics & IT Teacher",
          desc: "Education and knowledge sharing"
        },
        {
          icon: "🎨",
          title: "17 years in 3D modeling",
          desc: "From idea to realization"
        },
        {
          icon: "🔧",
          title: "Passion for Machines",
          desc: "Mechanics and precision as inspiration"
        },
        {
          icon: "💡",
          title: "Passionate Learner",
          desc: "Continuously developing new skills"
        }
      ]
    },
    badges: {
      hr: [
        { 
          key: 'lrc' as const,
          title: "Ručno izrađeno",
          section: "LRC",
          to: "/lrc"
        },
        { 
          key: 'interiors' as const,
          title: "Personalizirano",
          section: "Interijeri",
          to: "/interijeri"
        },
        { 
          key: 'webAtelier' as const,
          title: "Sigurna kupnja",
          section: "Web Atelier",
          to: "/web-atelier"
        }
      ],
      en: [
        { 
          key: 'lrc' as const,
          title: "Handmade",
          section: "LRC",
          to: "/lrc"
        },
        { 
          key: 'interiors' as const,
          title: "Personalized",
          section: "Interiors",
          to: "/interijeri"
        },
        { 
          key: 'webAtelier' as const,
          title: "Secure Purchase",
          section: "Web Atelier",
          to: "/web-atelier"
        }
      ]
    }
  }

  const visibleBadges = translations.badges[language].filter(
    (badge) => aboutBadgeVisibility[badge.key],
  )

  return (
    <section id="about" className="Section fade-in relative section-with-bg">
      {/* Background wrapper */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <DecorativeSkyBackdrop priority="lazy" />
        {/* Overlay for readability */}
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>
      
      <div className="relative z-10 mx-auto w-full max-w-6xl min-w-0">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-3xl md:text-[1.85rem] md:leading-snug">
            {translations.title[language]}
          </h2>
        </div>

        {/* Main Content: Bio + Photo */}
        <div className="mb-14 flex flex-col items-stretch gap-10 sm:mb-16 sm:gap-12 lg:flex-row lg:items-start lg:gap-14">
          {/* Bio Text - Left Side (60%) */}
          <div className="order-2 flex-1 lg:order-1 lg:w-[58%]">
            <div className="mx-auto max-w-[42rem] space-y-5 text-base leading-[1.7] text-plum/85 dark:text-pearl/80 sm:space-y-6 lg:mx-0 lg:max-w-[40rem]">
              <p
                className="fade-in mb-5 text-center text-[2.05rem] leading-[1.05] tracking-[0.01em] text-[--color-primary] antialiased dark:text-lavender sm:mb-6 sm:text-[2.35rem] lg:text-left lg:text-[2.5rem]"
                aria-label={translations.authorName[language]}
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                {(() => {
                  const full = translations.authorName[language].trim()
                  const parts = full.split(/\s+/)
                  if (parts.length < 2) {
                    return full
                  }
                  const firstName = parts[0]
                  const lastName = parts[parts.length - 1]
                  return (
                    <>
                      <span className="inline-block align-baseline">
                        <span
                          className="inline-block translate-y-px bg-gradient-to-br from-[#5A32E8] via-[#6E44FF] to-[#8B6FFF] bg-clip-text pr-[0.12em] text-[1.48em] leading-none text-transparent drop-shadow-[0_1px_1px_rgba(110,68,255,0.12)] dark:from-[#E8DEFF] dark:via-[#D4C7FF] dark:to-[#BDA6FF] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
                        >
                          {firstName[0]}
                        </span>
                        <span className="text-[0.98em] opacity-95 dark:opacity-90">
                          {firstName.slice(1)}
                        </span>
                      </span>
                      <span className="inline-block w-[0.28em]" />
                      <span className="inline-block align-baseline">
                        <span className="inline-block pr-[0.08em] text-[1.18em] leading-none text-[--color-primary] opacity-95 dark:text-lavender dark:opacity-95">
                          {lastName[0]}
                        </span>
                        <span className="text-[0.98em] opacity-95 dark:opacity-90">{lastName.slice(1)}</span>
                      </span>
                    </>
                  )
                })()}
              </p>
              {translations.bio[language].map((paragraph, index) => (
                <p 
                  key={index}
                  className="fade-in text-pretty"
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    opacity: 0
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Photo - Right Side (40%) */}
          <div className="order-1 flex justify-center lg:order-2 lg:w-[42%] lg:justify-end lg:sticky lg:top-28">
            <div 
              className="relative w-56 h-56 rounded-full bg-gradient-to-br from-[rgba(189,166,255,0.3)] to-[rgba(110,68,255,0.2)] p-1.5 shadow-2xl hover:shadow-[0_0_40px_rgba(110,68,255,0.4)] transition-all duration-500 animate-float"
              style={{ animationDuration: '3s' }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#BDA6FF] to-[#6E44FF] flex items-center justify-center relative overflow-hidden group hover:scale-105 transition-transform duration-500">
                <span className="text-6xl font-bold text-white relative z-10">AV</span>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Cards */}
        <div className="border-t border-[rgba(110,68,255,0.1)] pt-10 dark:border-lavender/15 sm:pt-12">
        <div className="mb-10 grid grid-cols-2 gap-4 sm:mb-12 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-4">
          {translations.skills[language].map((skill, index) => (
            <div
              key={index}
              className="group relative cursor-pointer rounded-xl border border-[rgba(110,68,255,0.15)] bg-[rgba(248,246,255,0.72)] p-4 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[rgba(110,68,255,0.35)] hover:shadow-md dark:border-lavender/15 dark:bg-white/8 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] dark:hover:border-lavender/35 dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)] sm:p-5 fade-in"
              style={{ 
                animationDelay: `${0.6 + index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              {/* Icon */}
              <div className="mb-3 inline-block text-3xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {skill.icon}
              </div>

              {/* Title */}
              <h4 className="mb-2 font-heading text-[11px] font-bold leading-snug text-[--color-primary] sm:text-xs">
                {skill.title}
              </h4>

              {/* Description */}
              <p className="text-[11px] leading-snug text-plum/78 dark:text-pearl/65 sm:text-xs sm:leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
        </div>
        
        {/* Badges — service navigation */}
        <nav
          className="mt-10 flex flex-wrap justify-center gap-4 border-t border-[rgba(110,68,255,0.1)] pt-10 dark:border-lavender/15 sm:mt-12 sm:gap-5 sm:pt-12"
          aria-label={language === 'hr' ? 'Usluge' : 'Services'}
        >
          {visibleBadges.map((badge) => (
            <Link
              key={badge.key}
              to={badge.to}
              className="pill px-6 py-3 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer text-plum/90 dark:text-pearl"
              style={{
                background: 'linear-gradient(135deg, rgba(189, 166, 255, 0.15) 0%, rgba(110, 68, 255, 0.1) 100%)',
                borderColor: 'rgba(110, 68, 255, 0.3)'
              }}
            >
              <span className="font-semibold">{badge.section}</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}