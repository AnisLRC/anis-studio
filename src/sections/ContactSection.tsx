import { Link } from 'react-router-dom'

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
    quickContact: {
      hr: 'Brzi kontakt',
      en: 'Quick contact'
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
    }
  }

  return (
    <section id="kontakt" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-amethyst/5 to-transparent dark:via-lavender/5" />

      <div className="relative z-10 mx-auto max-w-5xl px-5">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-plum dark:text-pearl">
            {translations.title[language]}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-plum/70 dark:text-pearl/70 max-w-2xl mx-auto">
            {translations.subtitle[language]}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Email Card */}
          <a
            href="mailto:info.anilrc@gmail.com"
            className="group rounded-2xl p-6 text-center
              bg-white/45 dark:bg-white/6 backdrop-blur-xl
              border border-amethyst/20 dark:border-lavender/15
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              transition will-change-transform"
          >
            <div className="flex justify-center">
              <div className="text-4xl" role="img" aria-label="Email">
                📧
              </div>
            </div>
            <div className="mt-4 text-sm font-semibold text-plum/70 dark:text-pearl/70">{translations.email[language]}</div>
            <div className="mt-1 text-base font-bold text-plum dark:text-pearl break-all">info.anilrc@gmail.com</div>
          </a>

          {/* Phone Card */}
          <a
            href="tel:+385955526625"
            className="group rounded-2xl p-6 text-center
              bg-white/45 dark:bg-white/6 backdrop-blur-xl
              border border-amethyst/20 dark:border-lavender/15
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              transition will-change-transform"
          >
            <div className="flex justify-center">
              <div className="text-4xl" role="img" aria-label="Phone">
                📞
              </div>
            </div>
            <div className="mt-4 text-sm font-semibold text-plum/70 dark:text-pearl/70">{translations.phone[language]}</div>
            <div className="mt-1 text-base font-bold text-plum dark:text-pearl">0955526625</div>
          </a>

          {/* Message Card */}
          <Link
            to="/kontakt"
            className="group rounded-2xl p-6 text-center
              bg-white/45 dark:bg-white/6 backdrop-blur-xl
              border border-amethyst/20 dark:border-lavender/15
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              transition will-change-transform"
          >
            <div className="flex justify-center">
              <div className="text-4xl" role="img" aria-label="Message">
                💬
              </div>
            </div>
            <div className="mt-4 text-sm font-semibold text-plum/70 dark:text-pearl/70">{translations.message[language]}</div>
            <div className="mt-1 text-base font-bold text-plum dark:text-pearl">{translations.ctaButton[language]}</div>
          </Link>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center rounded-2xl px-10 py-5 font-semibold text-white text-lg
              bg-amethyst shadow-[0_18px_50px_rgba(110,68,255,0.35)]
              hover:translate-y-[-1px] hover:shadow-[0_24px_70px_rgba(110,68,255,0.45)]
              active:translate-y-0 transition will-change-transform"
          >
            {translations.ctaButton[language]}
          </Link>
        </div>
      </div>
    </section>
  )
}

