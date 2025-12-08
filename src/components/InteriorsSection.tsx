import { InteriorsClientForm } from './InteriorsClientForm'
import { InteriorsCarpenterForm } from './InteriorsCarpenterForm'

interface InteriorsSectionProps {
  language: 'hr' | 'en'
}

export default function InteriorsSection({ language }: InteriorsSectionProps) {

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
      desc: { hr: "Ispunite formu ispod s vašim dimenzijama i opisom", en: "Fill out the form below with your dimensions and description" }
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

  const stolars = [
    { id: '1', name: 'Stolarija Jurić (Rijeka)' },
    { id: '2', name: 'Stolarija Novak (Zagreb)' },
  ]

  return (
    <section id="interiors" className="Section fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg sm:text-xl italic text-[#6E44FF] mb-3 font-medium">
            {translations.subtitle[language]}
          </p>
          <p className="text-base text-[#5A4A6B] mb-8">
            {translations.description[language]}
          </p>
        </div>

        {/* Visualization Steps */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.stepsTitle[language]}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {visualizationSteps.map((step) => (
            <div 
              key={step.number} 
              className="relative rounded-xl p-4 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center fade-in"
            >
              {/* Step Number Badge */}
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#6E44FF] to-[#BDA6FF] text-white font-bold text-sm flex items-center justify-center shadow-md">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-3 mt-4">{step.icon}</div>
              
              {/* Title */}
              <h4 className="text-xs font-bold text-[--color-primary] mb-1.5">
                {step.title[language]}
              </h4>
              
              {/* Description */}
              <p className="text-[10px] text-[#5A4A6B] leading-tight">
                {step.desc[language]}
              </p>
                </div>
              ))}
            </div>
        
        <InteriorsClientForm stolars={stolars} language={language} />
        
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {language === 'hr' ? 'Za stolare i studije namještaja' : 'For carpenters and furniture studios'}
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            {language === 'hr' 
              ? 'Istim obrascem šaljete i svoje podatke i konkretan upit za projekt.'
              : 'With the same form you send both your details and a specific project inquiry.'}
          </p>
          <InteriorsCarpenterForm language={language} />
        </div>
      </div>
    </section>
  )
}
