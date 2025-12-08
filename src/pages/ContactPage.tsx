import { ErrorBoundary } from '../ErrorBoundary'
import ContactSection from '../components/ContactSection'

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
    },
    email: "info.anilrc@gmail.com",
    phone: "+385 XX XXX XXXX"
  }

  return (
    <main>
      {/* Intro Section */}
      <section className="Section fade-in">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-12 lg:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
              {translations.introTitle[language]}
            </h1>
            <p className="text-base text-[#5A4A6B] max-w-2xl mx-auto mb-8">
              {translations.introText[language]}
            </p>
            
            {/* Contact Info Block */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-md">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="text-xs text-[#5A4A6B] font-medium">
                    {translations.contactInfo[language].email}
                  </div>
                  <a 
                    href={`mailto:${translations.email}`}
                    className="text-sm font-semibold text-[--color-primary] hover:underline"
                  >
                    {translations.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-md">
                <span className="text-2xl">📞</span>
                <div>
                  <div className="text-xs text-[#5A4A6B] font-medium">
                    {translations.contactInfo[language].phone}
                  </div>
                  <a 
                    href={`tel:${translations.phone}`}
                    className="text-sm font-semibold text-[--color-primary] hover:underline"
                  >
                    {translations.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ErrorBoundary name="Contact">
        <ContactSection language={language} />
      </ErrorBoundary>
    </main>
  )
}

