interface FooterProps {
  language: 'hr' | 'en'
}

export default function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const translations = {
    copyright: {
      hr: `© ${currentYear} Ani's Studio. Sva prava pridržana.`,
      en: `© ${currentYear} Ani's Studio. All rights reserved.`
    },
    social: {
      hr: "Pratite nas",
      en: "Follow us"
    },
    links: {
      hr: {
        privacy: "Privatnost",
        terms: "Uvjeti",
        contact: "Kontakt"
      },
      en: {
        privacy: "Privacy",
        terms: "Terms",
        contact: "Contact"
      }
    }
  }

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:ani@anisstudio.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="glass-panel" style={{ 
      marginTop: 'var(--space-4xl)',
      borderRadius: 0,
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div className="container" style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-md)' }}>
              <img 
                src="/crystal.svg" 
                alt="Ani's Studio" 
                className="w-8 h-8"
              />
              <span className="font-heading text-xl font-semibold text-primary">
                Ani's Studio
              </span>
            </div>
            <p style={{ 
              color: 'var(--clr-text-light)', 
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '300px'
            }}>
              {language === 'hr' 
                ? "Ručno izrađena umjetnost, interijeri i digitalni dizajn na jednom mjestu."
                : "Handmade art, interiors & digital design in one place."
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 style={{ 
              fontSize: 'var(--text-base)', 
              fontWeight: '600',
              marginBottom: 'var(--space-md)',
              color: 'var(--clr-text)'
            }}>
              {language === 'hr' ? 'Brzi linkovi' : 'Quick Links'}
            </h3>
            <div className="footer-links">
              <button 
                onClick={scrollToContact}
                style={{ 
                  background: 'none',
                  border: 'none',
                  color: 'var(--clr-text-light)',
                  fontSize: 'var(--text-sm)',
                  cursor: 'pointer',
                  padding: 'var(--space-xs) 0',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--clr-primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--clr-text-light)'}
              >
                {translations.links[language].contact}
              </button>
              <a 
                href="#privacy" 
                style={{ 
                  color: 'var(--clr-text-light)',
                  fontSize: 'var(--text-sm)',
                  display: 'block',
                  padding: 'var(--space-xs) 0',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--clr-primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--clr-text-light)'}
              >
                {translations.links[language].privacy}
              </a>
              <a 
                href="#terms"
                style={{ 
                  color: 'var(--clr-text-light)',
                  fontSize: 'var(--text-sm)',
                  display: 'block',
                  padding: 'var(--space-xs) 0',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--clr-primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--clr-text-light)'}
              >
                {translations.links[language].terms}
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h3 style={{ 
              fontSize: 'var(--text-base)', 
              fontWeight: '600',
              marginBottom: 'var(--space-md)',
              color: 'var(--clr-text)'
            }}>
              {translations.social[language]}
            </h3>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(110, 68, 255, 0.1)',
                    color: 'var(--clr-primary)',
                    transition: 'all var(--transition-fast)',
                    marginRight: 'var(--space-sm)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--clr-primary)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(110, 68, 255, 0.1)'
                    e.currentTarget.style.color = 'var(--clr-primary)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          marginTop: 'var(--space-3xl)',
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'var(--clr-text-light)', 
            fontSize: 'var(--text-sm)' 
          }}>
            {translations.copyright[language]}
          </p>
        </div>
      </div>
    </footer>
  )
}

