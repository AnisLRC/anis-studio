interface AboutSectionProps {
  language: 'hr' | 'en'
}

export default function AboutSection({ language }: AboutSectionProps) {
  const translations = {
    title: {
      hr: "✨ O meni",
      en: "✨ About Me"
    },
    bio: {
      hr: [
        "Anamarija Vincetić — kreativka iz Županje, Hrvatska, koja spaja ručni rad s digitalnim dizajnom i tehnologijom.",
        "Sa završenom školom za strojarskog tehničara i obrazovanjem profesora fizike, tehničke kulture i informatike, spajam tehničko znanje s kreativnošću. Mojih 17 godina iskustva u 3D modeliranju i dizajnu omogućava mi da stvorim precizna, inovativna rješenja za svaki projekt.",
        "Kombiniram tradiciju ručnog rada (lasersko rezanje i graviranje, epoksidna smola, svila) s modernim dizajnerskim alatima i AI tehnologijama. Svaki projekt, fizički ili digitalan, dobiva istu pažnju, strast i emociju.",
        "Moja misija je stvaranje jedinstvenih proizvoda koji spajaju tradiciju i inovaciju, pružajući vam personalizirana rješenja koja odražavaju vašu osobnost i potrebe."
      ],
      en: [
        "Anamarija Vincetić — a creator from Županja, Croatia, who combines handcraft with digital design and technology.",
        "With a degree in mechanical engineering and education in teaching physics, technical culture, and informatics, I blend technical expertise with creativity. My 17 years of experience in 3D modeling and design enable me to create precise, innovative solutions for every project.",
        "I combine traditional handcraft (laser cutting and engraving, epoxy resin, silk) with modern design tools and AI technologies. Every project, physical or digital, receives the same care, passion, and emotion.",
        "My mission is creating unique products that merge tradition and innovation, providing you with personalized solutions that reflect your personality and needs."
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
          title: "Ručno izrađeno",
          section: "LRC",
          scrollTo: "lrc"
        },
        { 
          title: "Personalizirano",
          section: "Interijeri",
          scrollTo: "interiors"
        },
        { 
          title: "Sigurna kupnja",
          section: "Web Atelier",
          scrollTo: "web-atelier"
        }
      ],
      en: [
        { 
          title: "Handmade",
          section: "LRC",
          scrollTo: "lrc"
        },
        { 
          title: "Personalized",
          section: "Interiors",
          scrollTo: "interiors"
        },
        { 
          title: "Secure Purchase",
          section: "Web Atelier",
          scrollTo: "web-atelier"
        }
      ]
    }
  }

  return (
    <section id="about" className="Section fade-in relative section-with-bg">
      {/* Background wrapper */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Light mode image */}
        <div
          className="absolute inset-0 dark:hidden transition-opacity duration-500"
          style={{
            backgroundImage: "url(/hero-sky-light.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark mode image */}
        <div
          className="absolute inset-0 hidden dark:block transition-opacity duration-500"
          style={{
            backgroundImage: "url(/hero-sky-dark.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-plum/90 dark:text-pearl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
        </div>

        {/* Main Content: Bio + Photo */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          {/* Bio Text - Left Side (60%) */}
          <div className="flex-1 lg:w-[60%] order-2 lg:order-1">
            <div className="space-y-6 text-base text-plum/80 dark:text-pearl/70 leading-relaxed">
              {translations.bio[language].map((paragraph, index) => (
                <p 
                  key={index}
                  className="fade-in"
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
          <div className="lg:w-[40%] flex justify-center lg:justify-end order-1 lg:order-2 lg:sticky lg:top-24">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {translations.skills[language].map((skill, index) => (
            <div
              key={index}
              className="group relative rounded-xl p-4 bg-white/80 dark:bg-white/8 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] dark:border-lavender/15 shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-xl dark:hover:shadow-[0_20px_50px_rgba(189,166,255,0.12)] hover:border-[rgba(110,68,255,0.4)] dark:hover:border-lavender/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-center fade-in cursor-pointer"
              style={{ 
                animationDelay: `${0.6 + index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              {/* Icon */}
              <div className="text-3xl mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ display: 'inline-block' }}>
                {skill.icon}
              </div>

              {/* Title */}
              <h4 className="text-xs font-bold text-[--color-primary] mb-1.5">
                {skill.title}
              </h4>

              {/* Description */}
              <p className="text-[10px] text-plum/75 dark:text-pearl/60 leading-tight">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {translations.badges[language].map((badge, index) => {
            const handleClick = () => {
              const section = document.querySelector(`#${badge.scrollTo}`)
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
              }
            }

            return (
              <button
                key={index}
                onClick={handleClick}
                className="pill px-6 py-3 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer text-plum/90 dark:text-pearl"
                style={{
                  background: 'linear-gradient(135deg, rgba(189, 166, 255, 0.15) 0%, rgba(110, 68, 255, 0.1) 100%)',
                  borderColor: 'rgba(110, 68, 255, 0.3)'
                }}
              >
                <span className="font-semibold">{badge.section}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}