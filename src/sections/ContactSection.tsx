import { Link } from 'react-router-dom'
import { Mail, Phone, MessageCircle, Zap, Users } from 'lucide-react'

interface ContactSectionProps {
  language?: 'hr' | 'en'
}

export default function ContactSection({ language = 'hr' }: ContactSectionProps) {
  const translations = {
    title: {
      hr: 'Spremni za suradnju?',
      en: 'Ready to collaborate?'
    },
    subtitle: {
      hr: 'Pošaljite nam upit ili se javite direktno – odgovorimo brzo!',
      en: 'Send us an inquiry or contact us directly – we respond quickly!'
    },
    ctaButton: {
      hr: 'Kontaktiraj nas',
      en: 'Contact us'
    },
    email: {
      hr: 'Email',
      en: 'Email'
    },
    phone: {
      hr: 'Telefon',
      en: 'Phone'
    },
    message: {
      hr: 'Poruka',
      en: 'Message'
    },
    socialProof: {
      projects: {
        hr: '50+ projekata',
        en: '50+ projects'
      },
      response: {
        hr: 'Odgovor u 24h',
        en: 'Response in 24h'
      }
    }
  }

  return (
    <section id="kontakt" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      {/* Animated glow pulse keyframes */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(110,68,255,0.4), 0 18px 50px rgba(110,68,255,0.35); }
          50% { box-shadow: 0 0 35px rgba(110,68,255,0.6), 0 22px 60px rgba(110,68,255,0.45); }
        }
      `}</style>

      {/* Background gradient pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amethyst/5 to-amethyst/10 dark:via-lavender/5 dark:to-lavender/8" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amethyst/10 dark:bg-lavender/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lavender/10 dark:bg-amethyst/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-plum/90 dark:text-pearl">
            {translations.title[language]}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-plum/80 dark:text-pearl/70 max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Email Card */}
          <a
            href="mailto:info.anilrc@gmail.com"
            className="group rounded-2xl p-6 text-center
              bg-white/70 dark:bg-white/15 backdrop-blur-xl
              border border-amethyst/15 dark:border-lavender/25
              shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              hover:shadow-[0_15px_40px_rgba(110,68,255,0.15)] dark:hover:shadow-[0_15px_40px_rgba(189,166,255,0.12)]
              hover:-translate-y-2
              transition-all duration-300"
          >
            {/* Icon container with gradient */}
            <div className="flex justify-center">
              <div className="
                w-16 h-16 rounded-2xl flex items-center justify-center
                bg-gradient-to-br from-amethyst/20 to-lavender/20 
                dark:from-amethyst/40 dark:to-lavender/35
                group-hover:from-amethyst/30 group-hover:to-lavender/30
                transition-all duration-300
              ">
                <Mail className="w-7 h-7 text-amethyst dark:text-lavender" />
              </div>
            </div>
            <div className="mt-4 text-sm font-semibold text-plum/80 dark:text-pearl/80">
              {translations.email[language]}
            </div>
            <div className="mt-1 text-base font-bold text-plum/90 dark:text-white break-all group-hover:text-amethyst dark:group-hover:text-lavender transition-colors">
              info.anilrc@gmail.com
            </div>
          </a>

          {/* Phone Card */}
          <a
            href="tel:+385955526625"
            className="group rounded-2xl p-6 text-center
              bg-white/70 dark:bg-white/15 backdrop-blur-xl
              border border-amethyst/15 dark:border-lavender/25
              shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              hover:shadow-[0_15px_40px_rgba(110,68,255,0.15)] dark:hover:shadow-[0_15px_40px_rgba(189,166,255,0.12)]
              hover:-translate-y-2
              transition-all duration-300"
          >
            {/* Icon container with gradient */}
            <div className="flex justify-center">
              <div className="
                w-16 h-16 rounded-2xl flex items-center justify-center
                bg-gradient-to-br from-amethyst/20 to-lavender/20 
                dark:from-amethyst/40 dark:to-lavender/35
                group-hover:from-amethyst/30 group-hover:to-lavender/30
                transition-all duration-300
              ">
                <Phone className="w-7 h-7 text-amethyst dark:text-lavender" />
              </div>
            </div>
            <div className="mt-4 text-sm font-semibold text-plum/80 dark:text-pearl/80">
              {translations.phone[language]}
            </div>
            <div className="mt-1 text-base font-bold text-plum/90 dark:text-white group-hover:text-amethyst dark:group-hover:text-lavender transition-colors">
              095 552 6625
            </div>
          </a>

          {/* Message Card */}
          <Link
            to="/kontakt"
            className="group rounded-2xl p-6 text-center
              bg-white/70 dark:bg-white/15 backdrop-blur-xl
              border border-amethyst/15 dark:border-lavender/25
              shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              hover:shadow-[0_15px_40px_rgba(110,68,255,0.15)] dark:hover:shadow-[0_15px_40px_rgba(189,166,255,0.12)]
              hover:-translate-y-2
              transition-all duration-300"
          >
            {/* Icon container with gradient */}
            <div className="flex justify-center">
              <div className="
                w-16 h-16 rounded-2xl flex items-center justify-center
                bg-gradient-to-br from-amethyst/20 to-lavender/20 
                dark:from-amethyst/40 dark:to-lavender/35
                group-hover:from-amethyst/30 group-hover:to-lavender/30
                transition-all duration-300
              ">
                <MessageCircle className="w-7 h-7 text-amethyst dark:text-lavender" />
              </div>
            </div>
            <div className="mt-4 text-sm font-semibold text-plum/80 dark:text-pearl/80">
              {translations.message[language]}
            </div>
            <div className="mt-1 text-base font-bold text-plum/90 dark:text-white group-hover:text-amethyst dark:group-hover:text-lavender transition-colors">
              {translations.ctaButton[language]}
            </div>
          </Link>
        </div>

        {/* CTA Button with glow pulse */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center rounded-2xl px-10 py-5 font-semibold text-white text-lg
              bg-amethyst
              hover:translate-y-[-2px]
              active:translate-y-0 
              transition-transform duration-200"
            style={{
              animation: 'glowPulse 3s ease-in-out infinite'
            }}
          >
            {translations.ctaButton[language]}
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="flex items-center gap-2 text-plum/70 dark:text-pearl/90">
            <div className="w-10 h-10 rounded-full bg-amethyst/10 dark:bg-lavender/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-amethyst dark:text-lavender" />
            </div>
            <span className="text-sm sm:text-base font-medium">
              {translations.socialProof.projects[language]}
            </span>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-amethyst/20 dark:bg-lavender/30" />
          
          <div className="flex items-center gap-2 text-plum/70 dark:text-pearl/90">
            <div className="w-10 h-10 rounded-full bg-amethyst/10 dark:bg-lavender/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amethyst dark:text-lavender" />
            </div>
            <span className="text-sm sm:text-base font-medium">
              {translations.socialProof.response[language]}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
