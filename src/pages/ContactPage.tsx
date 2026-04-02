import { ErrorBoundary } from '../ErrorBoundary'
import ContactSection from '../components/ContactSection'
import { CONTACT_INFO } from '../config/contact'
import { AnimatedPage } from '../components/AnimatedPage'

interface ContactPageProps {
  language: 'hr' | 'en'
}

export default function ContactPage({ language }: ContactPageProps) {
  const translations = {
    introTitle: {
      hr: "📧 Javite nam se",
      en: "📧 Get in Touch"
    },
    introText: {
      hr: "Imate pitanje ili želite započeti projekt? Kontaktirajte nas putem forme ispod ili koristite kontakt podatke.",
      en: "Have a question or want to start a project? Contact us via the form below or use the contact information."
    },
    contactInfo: {
      hr: {
        email: "Email",
        phone: "Telefon"
      },
      en: {
        email: "Email",
        phone: "Phone"
      }
    }
  }

  return (
    <AnimatedPage>
      <main className="min-w-0">
      {/* Intro + contact cards */}
      <section className="Section fade-in">
        <div className="mx-auto min-w-0 max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <h1 className="mb-5 font-heading text-3xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:mb-6 sm:text-4xl md:text-[2.35rem] md:leading-tight">
            {translations.introTitle[language]}
          </h1>
          <p className="mx-auto mb-9 max-w-xl text-pretty text-base leading-[1.65] text-plum/82 dark:text-pearl/80 sm:mb-11 sm:text-lg sm:leading-relaxed">
            {translations.introText[language]}
          </p>

          <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch justify-center gap-4 sm:max-w-none sm:flex-row sm:items-stretch sm:justify-center sm:gap-5 md:gap-6">
            <div className="flex w-full items-center gap-3 rounded-2xl border border-[rgba(110,68,255,0.16)] bg-white/85 px-5 py-4 text-left shadow-md backdrop-blur-sm dark:border-lavender/18 dark:bg-white/[0.07] sm:min-w-[260px] sm:flex-1 sm:max-w-xs">
              <span className="text-2xl shrink-0" aria-hidden>
                📧
              </span>
              <div className="min-w-0">
                <div className="text-xs font-medium text-[--color-ink-muted] dark:text-pearl/70">
                  {translations.contactInfo[language].email}
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="break-all text-sm font-semibold text-[--color-primary] transition-colors hover:underline dark:text-lavender"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 rounded-2xl border border-[rgba(110,68,255,0.16)] bg-white/85 px-5 py-4 text-left shadow-md backdrop-blur-sm dark:border-lavender/18 dark:bg-white/[0.07] sm:min-w-[260px] sm:flex-1 sm:max-w-xs">
              <span className="text-2xl shrink-0" aria-hidden>
                📞
              </span>
              <div className="min-w-0">
                <div className="text-xs font-medium text-[--color-ink-muted] dark:text-pearl/70">
                  {translations.contactInfo[language].phone}
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm font-semibold text-[--color-primary] transition-colors hover:underline dark:text-lavender"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mx-auto max-w-3xl border-b border-[rgba(110,68,255,0.1)] px-4 sm:px-6 lg:px-8 dark:border-lavender/12"
          aria-hidden
        />
      </section>

      {/* Contact Form Section */}
      <ErrorBoundary name="Contact">
        <ContactSection language={language} />
      </ErrorBoundary>
    </main>
    </AnimatedPage>
  )
}




