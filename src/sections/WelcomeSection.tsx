import { Link } from 'react-router-dom'
import SparklesCanvas from '../components/SparklesCanvas'

interface WelcomeSectionProps {
  language?: 'hr' | 'en'
}

export default function WelcomeSection({ language = 'hr' }: WelcomeSectionProps) {
  const translations = {
    headline: {
      hr: 'Svaka ideja je bitna.',
      en: 'Every idea matters.'
    },
    subtitle: {
      hr: 'Od ručnih kreacija do interijera i web projekata po mjeri.',
      en: 'From handmade creations to interiors and custom web projects.'
    },
    ctaPrimary: {
      hr: 'Započnimo projekt',
      en: "Let's start a project"
    },
    ctaSecondary: {
      hr: 'Pogledaj radove',
      en: 'View our work'
    },
    cardsTitle: {
      hr: 'Što te zanima danas?',
      en: 'What interests you today?'
    },
    cards: {
      lrc: {
        title: { hr: 'Želim poklon', en: 'I want a gift' },
        subtitle: { hr: 'LRC Shop', en: 'LRC Shop' },
        description: { hr: 'Ručno rađeni pokloni i dekoracije', en: 'Handmade gifts and decorations' }
      },
      interiors: {
        title: { hr: 'Želim urediti prostor', en: 'I want to design a space' },
        subtitle: { hr: 'Interijeri', en: 'Interiors' },
        description: { hr: '3D vizualizacije i nacrti po mjeri', en: '3D renders and custom designs' }
      },
      webAtelier: {
        title: { hr: 'Trebam web stranicu', en: 'I need a website' },
        subtitle: { hr: 'Web Atelier', en: 'Web Atelier' },
        description: { hr: 'Web koji radi za tebe – i izgleda odlično.', en: 'A website that works for you – and looks great.' }
      }
    }
  }

  return (
    <section className="relative min-h-[78vh] [isolation:isolate]">
      {/* CLIP WRAPPER - contains only visual background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora gradient layer - Light mode */}
        <div className="pointer-events-none absolute inset-0 z-[1] dark:hidden">
          <div style={{
            position: "absolute",
            inset: "-35%",
            filter: "blur(52px) saturate(1.15)",
            opacity: 0.9,
            background: "radial-gradient(70% 55% at 50% 22%, rgba(110,68,255,0.26), transparent 62%), radial-gradient(50% 45% at 18% 55%, rgba(189,166,255,0.20), transparent 64%), radial-gradient(48% 42% at 82% 62%, rgba(120,220,255,0.12), transparent 64%), radial-gradient(55% 50% at 70% 85%, rgba(255,180,220,0.10), transparent 65%), linear-gradient(180deg, rgba(255,255,255,0.94), rgba(249,247,251,0.86))"
          }} />
        </div>

        {/* Aurora gradient layer - Dark mode */}
        <div className="pointer-events-none absolute inset-0 z-[1] hidden dark:block">
          <div style={{
            position: "absolute",
            inset: "-35%",
            filter: "blur(56px) saturate(1.5)",
            background: "radial-gradient(70% 55% at 50% 22%, rgba(110,68,255,0.45), transparent 62%), radial-gradient(50% 45% at 18% 55%, rgba(255,140,200,0.18), transparent 64%), radial-gradient(48% 42% at 82% 62%, rgba(120,220,255,0.14), transparent 64%), radial-gradient(55% 50% at 70% 85%, rgba(189,166,255,0.12), transparent 65%), linear-gradient(180deg, rgba(10,10,22,0.92), rgba(7,8,18,0.98))"
          }} />
        </div>

        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.10] mix-blend-overlay dark:opacity-[0.12] dark:mix-blend-soft-light"
          style={{ backgroundImage: "url(/noise.svg)", backgroundSize: "260px 260px" }}
        />

        {/* Canvas sparkles */}
        <SparklesCanvas className="pointer-events-none absolute inset-0 z-[3] h-full w-full opacity-70" />

        {/* Bottom fade to page background (light & dark) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-40"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))'
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-40 hidden dark:block"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,8,18,0), rgba(7,8,18,1))'
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-24 pb-16 text-center">
        {/* Subtle glow behind heading */}
        <div 
          className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 z-[9] h-40 w-[520px] rounded-full blur-2xl dark:hidden"
          style={{
            background: 'radial-gradient(circle, rgba(110,68,255,0.22), transparent 60%)'
          }}
        />
        <div 
          className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 z-[9] h-40 w-[520px] rounded-full blur-2xl hidden dark:block"
          style={{
            background: 'radial-gradient(circle, rgba(189,166,255,0.14), transparent 60%)'
          }}
        />

        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight
          text-plum dark:text-pearl drop-shadow-[0_14px_40px_rgba(110,68,255,0.18)]">
          {translations.headline[language]}
          <span className="ml-3 align-middle">✨</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-plum/80 dark:text-pearl/80">
          {translations.subtitle[language]}
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center rounded-2xl px-8 py-4 font-semibold text-white
              bg-amethyst shadow-[0_18px_50px_rgba(110,68,255,0.35)]
              hover:translate-y-[-1px] hover:shadow-[0_24px_70px_rgba(110,68,255,0.45)]
              active:translate-y-0 transition will-change-transform">
            {translations.ctaPrimary[language]}
          </a>

          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-2xl px-8 py-4 font-semibold
              text-plum dark:text-pearl border border-amethyst/25 dark:border-lavender/20
              bg-white/55 dark:bg-white/8 backdrop-blur-2xl
              shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              hover:bg-white/70 dark:hover:bg-white/12 transition">
            {translations.ctaSecondary[language]}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex justify-center">
          <a href="#portfolio" className="group inline-flex flex-col items-center justify-center gap-2">
            <span className="h-10 w-7 rounded-full border border-amethyst/25 dark:border-lavender/20 bg-white/20 dark:bg-white/5 backdrop-blur-md
              flex items-start justify-center p-2">
              <span className="h-2 w-1 rounded-full bg-amethyst/60 dark:bg-lavender/60 animate-bounce" />
            </span>
            <span className="text-xs text-amethyst/40 dark:text-lavender/40">↓</span>
          </a>
        </div>

        {/* Cards Section */}
        <h2 className="mt-16 text-2xl sm:text-3xl font-bold text-plum dark:text-pearl">
          {translations.cardsTitle[language]}
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LRC Shop Card */}
          <Link to="/lrc" className="group rounded-[2rem] p-8 text-center
            bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(255,255,255,0.40))]
            dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))]
            backdrop-blur-2xl
            border border-amethyst/15 dark:border-lavender/10
            shadow-[0_20px_60px_rgba(0,0,0,0.10)]
            hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(0,0,0,0.14)]
            transition-all duration-300 will-change-transform">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4" role="img" aria-label="Gift">
                🎁
              </div>
              <div>
                <div className="text-lg font-bold text-plum dark:text-pearl">{translations.cards.lrc.title[language]}</div>
                <div className="mt-1 text-sm font-semibold text-plum/70 dark:text-pearl/70">{translations.cards.lrc.subtitle[language]}</div>
                <p className="mt-3 text-xs text-plum/60 dark:text-pearl/60">
                  {translations.cards.lrc.description[language]}
                </p>
              </div>
            </div>
          </Link>

          {/* Interijeri Card */}
          <Link to="/interijeri" className="group rounded-[2rem] p-8 text-center
            bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(255,255,255,0.40))]
            dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))]
            backdrop-blur-2xl
            border border-amethyst/15 dark:border-lavender/10
            shadow-[0_20px_60px_rgba(0,0,0,0.10)]
            hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(0,0,0,0.14)]
            transition-all duration-300 will-change-transform">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4" role="img" aria-label="House">
                🏠
              </div>
              <div>
                <div className="text-lg font-bold text-plum dark:text-pearl">{translations.cards.interiors.title[language]}</div>
                <div className="mt-1 text-sm font-semibold text-plum/70 dark:text-pearl/70">{translations.cards.interiors.subtitle[language]}</div>
                <p className="mt-3 text-xs text-plum/60 dark:text-pearl/60">
                  {translations.cards.interiors.description[language]}
                </p>
              </div>
            </div>
          </Link>

          {/* Web Atelier Card */}
          <Link to="/web-atelier" className="group rounded-[2rem] p-8 text-center
            bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(255,255,255,0.40))]
            dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))]
            backdrop-blur-2xl
            border border-amethyst/15 dark:border-lavender/10
            shadow-[0_20px_60px_rgba(0,0,0,0.10)]
            hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(0,0,0,0.14)]
            transition-all duration-300 will-change-transform">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4" role="img" aria-label="Laptop">
                💻
              </div>
              <div>
                <div className="text-lg font-bold text-plum dark:text-pearl">{translations.cards.webAtelier.title[language]}</div>
                <div className="mt-1 text-sm font-semibold text-plum/70 dark:text-pearl/70">{translations.cards.webAtelier.subtitle[language]}</div>
                <p className="mt-3 text-xs text-plum/60 dark:text-pearl/60">
                  {translations.cards.webAtelier.description[language]}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
