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
    madeWith: {
      hr: "Napravljeno s",
      en: "Made with"
    },
    and: {
      hr: "i",
      en: "and"
    }
  }

  return (
    <footer style={{
      background: 'var(--clr-glass)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      padding: 'var(--space-2xl) 0',
      marginTop: 'var(--space-4xl)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-xl)',
          marginBottom: 'var(--space-2xl)'
        }}>
          {/* Brand */}
          <div>
            <h3 style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--clr-primary)', 
              marginBottom: 'var(--space-md)',
              fontSize: 'var(--text-xl)'
            }}>
              Ani's Studio
            </h3>
            <p style={{ 
              color: 'var(--clr-text-light)', 
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-relaxed)'
            }}>
              {language === 'hr' 
                ? 'Ručno izrađena umjetnost, interijeri i digitalni dizajn'
                : 'Handmade art, interiors & digital design'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontWeight: '600', 
              marginBottom: 'var(--space-md)',
              fontSize: 'var(--text-base)'
            }}>
              {language === 'hr' ? 'Brzi linkovi' : 'Quick Links'}
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-sm)'
            }}>
              <li>
                <a 
                  href="#lrc" 
                  style={{ 
                    color: 'var(--clr-text-light)', 
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--clr-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--clr-text-light)'}
                >
                  LRC
                </a>
              </li>
              <li>
                <a 
                  href="#interiors"
                  style={{ 
                    color: 'var(--clr-text-light)', 
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--clr-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--clr-text-light)'}
                >
                  {language === 'hr' ? 'Interijeri' : 'Interiors'}
                </a>
              </li>
              <li>
                <a 
                  href="#web-atelier"
                  style={{ 
                    color: 'var(--clr-text-light)', 
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--clr-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--clr-text-light)'}
                >
                  Web Atelier
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 style={{ 
              fontWeight: '600', 
              marginBottom: 'var(--space-md)',
              fontSize: 'var(--text-base)'
            }}>
              {language === 'hr' ? 'Društvene mreže' : 'Social Media'}
            </h4>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--clr-glass)',
                  color: 'var(--clr-primary)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--clr-primary)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--clr-glass)'
                  e.currentTarget.style.color = 'var(--clr-primary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--clr-glass)',
                  color: 'var(--clr-primary)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--clr-primary)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--clr-glass)'
                  e.currentTarget.style.color = 'var(--clr-primary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="mailto:contact@anisstudio.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--clr-glass)',
                  color: 'var(--clr-primary)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--clr-primary)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--clr-glass)'
                  e.currentTarget.style.color = 'var(--clr-primary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(110, 68, 255, 0.1)',
          paddingTop: 'var(--space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-md)'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: 'var(--text-sm)', 
            color: 'var(--clr-text-light)' 
          }}>
            {translations.copyright[language]}
          </p>
          <p style={{ 
            margin: 0, 
            fontSize: 'var(--text-sm)', 
            color: 'var(--clr-text-light)' 
          }}>
            {translations.madeWith[language]} <span style={{ color: 'var(--clr-primary)' }}>♥</span> {translations.and[language]} ☕
          </p>
        </div>
      </div>
    </footer>
  )
}

