import { Link } from 'react-router-dom'
import { DecorativeSkyBackdrop } from './DecorativeSkyBackdrop'

interface InteriorsSectionProps {
  language: 'hr' | 'en'
}

export default function InteriorsSection({ language }: InteriorsSectionProps) {

  const chooser = {
    sectionTitle: { hr: 'Odaberite vrstu upita', en: 'Choose the type of inquiry' },
    sectionIntro: {
      hr: 'Trebate 3D prikaz interijera po mjeri ili šaljete upit za suradnju? Odaberite opciju koja najbolje odgovara vašem projektu.',
      en: 'Need a bespoke 3D interior visualization or sending a collaboration inquiry? Choose the option that best fits your project.',
    },
    clientsTitle: { hr: 'Upit za klijente', en: 'Client inquiry' },
    clientsText: {
      hr: 'Za privatne klijente koji žele idejno rješenje, 2D nacrt ili 3D prikaz prostora.',
      en: 'For private clients who want a concept, 2D drawing or 3D visualization of the space.',
    },
    stolariTitle: { hr: 'Upit za stolare i studije', en: 'Inquiry for carpenters & studios' },
    stolariText: {
      hr: 'Za stolare, salone i studije namještaja koji šalju projekt, suradnju ili razradu za izradu.',
      en: 'For carpenters, showrooms and furniture studios sending a project, collaboration or production detailing.',
    },
    ctaAction: { hr: 'Zatraži ponudu', en: 'Request quote' },
  }

  const translations = {
    title: {
      hr: "🏠 Ani's Interijeri",
      en: "🏠 Ani's Interiors"
    },
    subtitle: {
      hr: "Realistični 2D crteži i 3D renderi na temelju vaših dimenzija i ideja",
      en: "Realistic 2D drawings and 3D renders based on your dimensions and ideas"
    },
    description: {
      hr: "Usluga dostupna diljem Hrvatske",
      en: "Service available across Croatia"
    },
    stepsTitle: {
      hr: "Kako do Vašeg 3D prikaza",
      en: "How to get your 3D visualization"
    },
    step1: {
      title: { hr: "Izmjerite prostor", en: "Measure the space" },
      desc: { hr: "Izmjerite duljinu, širinu i visinu prostora u kojem želite namještaj", en: "Measure the length, width and height of the space where you want furniture" }
    },
    step2: {
      title: { hr: "Skicirajte tlocrt", en: "Sketch the floor plan" },
      desc: { hr: "Nacrtajte grubu skicu tlocrta prostora kako biste prikazali raspored", en: "Draw a rough sketch of the floor plan to show the layout" }
    },
    step3: {
      title: { hr: "Dodajte reference", en: "Add references" },
      desc: { hr: "Priložite slike postojećih rješenja ili skica koje vam se sviđaju kao inspiracija", en: "Attach images of existing solutions or sketches you like as inspiration" }
    },
    step4: {
      title: { hr: "Opišite detalje", en: "Describe details" },
      desc: { hr: "Napišite na što obratiti pažnju: boje, materijale, stil, posebnosti prostora", en: "Write what to pay attention to: colors, materials, style, space specifics" }
    },
    step5: {
      title: { hr: "Pošaljite upit", en: "Send inquiry" },
      desc: { hr: "Koristite obrazac za klijente za slanje upita.", en: "Use the client inquiry form to send your request." }
    },
    step6: {
      title: { hr: "Primite prikaz", en: "Receive visualization" },
      desc: { hr: "Nakon plaćanja, šaljemo Vam realistični 3D prikaz i rendane fotografije", en: "After payment, we send you realistic 3D visualization and rendered photographs" }
    }
  }

  const visualizationSteps = [
    {
      number: 1,
      icon: '📏',
      title: translations.step1.title,
      desc: translations.step1.desc
    },
    {
      number: 2,
      icon: '✏️',
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
      icon: '📝',
      title: translations.step4.title,
      desc: translations.step4.desc
    },
    {
      number: 5,
      icon: '📤',
      title: translations.step5.title,
      desc: translations.step5.desc
    },
    {
      number: 6,
      icon: '🛋️',
      title: translations.step6.title,
      desc: translations.step6.desc
    }
  ]

  return (
    <section
      id="interiors"
      className="Section fade-in relative section-with-bg !pt-[clamp(1.5rem,2.5vw,2.75rem)] !pb-[clamp(2rem,3.5vw,3.5rem)] sm:!pb-[clamp(2.25rem,3.5vw,3.75rem)]"
    >
      {/* Background wrapper */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <DecorativeSkyBackdrop priority="high" />
        {/* Overlay for readability */}
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>
      
      <div className="relative z-10 mx-auto flex min-w-0 w-full max-w-6xl flex-col px-0">
        {/* Section Header — single centered column */}
        <div className="mx-auto mb-10 w-full max-w-3xl text-center sm:mb-12">
          <h2 className="mb-2.5 font-heading text-2xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:mb-3 sm:text-3xl">
            {translations.title[language]}
          </h2>
          <p className="mx-auto mb-2 max-w-2xl text-lg font-semibold italic leading-snug text-amethyst dark:text-lavender sm:text-xl">
            {translations.subtitle[language]}
          </p>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-plum/80 dark:text-pearl/75">
            {translations.description[language]}
          </p>
        </div>

        {/* Visualization Steps — heading + balanced grid below */}
        <div className="mx-auto mb-7 max-w-3xl text-center sm:mb-8">
          <h3 className="font-heading text-xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:text-2xl">
            {translations.stepsTitle[language]}
          </h3>
        </div>

        <div className="mx-auto mb-12 grid w-full max-w-5xl grid-cols-1 gap-4 sm:mb-14 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-5">
          {visualizationSteps.map((step) => (
            <div 
              key={step.number} 
              className="relative flex min-h-[148px] w-full max-w-md flex-col items-center rounded-xl border border-[rgba(110,68,255,0.15)] bg-[rgba(248,246,255,0.72)] p-4 pt-9 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:border-lavender/15 dark:bg-white/8 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)] sm:max-w-none sm:hover:scale-[1.02] fade-in"
            >
              {/* Step Number Badge — centered on card top */}
              <div className="absolute left-1/2 top-3 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#6E44FF] to-[#BDA6FF] text-sm font-bold text-white shadow-md">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-2 mt-1 text-3xl">{step.icon}</div>
              
              {/* Title */}
              <h4 className="mb-1.5 max-w-[14rem] text-xs font-bold leading-tight text-[--color-primary] sm:max-w-none">
                {step.title[language]}
              </h4>
              
              {/* Description */}
              <p className="mt-auto max-w-none text-[11px] leading-relaxed text-plum/75 dark:text-pearl/65 sm:text-xs">
                {step.desc[language]}
              </p>
            </div>
          ))}
        </div>

        {/* Chooser — forms on /interijeri/klijenti and /interijeri/stolari */}
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-3xl border border-[rgba(110,68,255,0.12)] bg-white/50 p-6 shadow-[0_8px_40px_rgba(46,36,71,0.06)] backdrop-blur-md dark:border-lavender/12 dark:bg-white/[0.04] dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)] sm:p-8 md:p-10">
            <header className="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
              <div className="mb-3 flex w-full justify-center">
                <p className="font-heading text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amethyst/80 dark:text-lavender/85 [text-indent:0.2em]">
                  {language === 'hr' ? 'Upit' : 'Inquiry'}
                </p>
              </div>
              <h3 className="font-heading text-xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-2xl md:text-[1.65rem]">
                {chooser.sectionTitle[language]}
              </h3>
              <p className="mx-auto mt-4 text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:text-[0.95rem] sm:leading-relaxed">
                {chooser.sectionIntro[language]}
              </p>
              <div
                className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-r from-transparent via-[rgba(110,68,255,0.35)] to-transparent dark:via-lavender/35"
                aria-hidden
              />
            </header>

            <nav
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
              aria-label={language === 'hr' ? 'Vrste upita' : 'Inquiry types'}
            >
              <Link
                to="/interijeri/klijenti"
                className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[rgba(110,68,255,0.16)] bg-[rgba(248,246,255,0.80)] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/35 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary] dark:border-lavender/18 dark:bg-white/[0.06] dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.14)] sm:p-7 sm:text-left"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(110,68,255,0.25)] to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:via-lavender/30" aria-hidden />
                <div className="mb-4 flex justify-center sm:mb-5 sm:justify-start">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6E44FF]/12 to-[#BDA6FF]/10 text-xl shadow-inner dark:from-[#6E44FF]/22 dark:to-[#BDA6FF]/12"
                    aria-hidden
                  >
                    🏠
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold leading-snug text-plum/95 dark:text-pearl sm:text-xl">
                  {chooser.clientsTitle[language]}
                </h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-plum/76 dark:text-pearl/70 sm:text-[0.9375rem]">
                  {chooser.clientsText[language]}
                </p>
                <span className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6E44FF] to-[#8B6FFF] px-4 py-3 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] duration-300 group-hover:shadow-lg group-hover:brightness-[1.03] dark:from-[#6E44FF] dark:to-[#9D7FFF] sm:w-auto sm:self-start">
                  {chooser.ctaAction[language]}
                  <span className="ml-1.5 transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </Link>

              <Link
                to="/interijeri/stolari"
                className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[rgba(110,68,255,0.16)] bg-[rgba(248,246,255,0.80)] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/35 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary] dark:border-lavender/18 dark:bg-white/[0.06] dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.14)] sm:p-7 sm:text-left"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(110,68,255,0.25)] to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:via-lavender/30" aria-hidden />
                <div className="mb-4 flex justify-center sm:mb-5 sm:justify-start">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6E44FF]/12 to-[#BDA6FF]/10 text-xl shadow-inner dark:from-[#6E44FF]/22 dark:to-[#BDA6FF]/12"
                    aria-hidden
                  >
                    🪚
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold leading-snug text-plum/95 dark:text-pearl sm:text-xl">
                  {chooser.stolariTitle[language]}
                </h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-plum/76 dark:text-pearl/70 sm:text-[0.9375rem]">
                  {chooser.stolariText[language]}
                </p>
                <span className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6E44FF] to-[#8B6FFF] px-4 py-3 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] duration-300 group-hover:shadow-lg group-hover:brightness-[1.03] dark:from-[#6E44FF] dark:to-[#9D7FFF] sm:w-auto sm:self-start">
                  {chooser.ctaAction[language]}
                  <span className="ml-1.5 transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
