import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Language = 'hr' | 'en'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  hr: {
    'nav.lrc': 'LRC',
    'nav.interiors': 'Interijeri',
    'nav.webAtelier': 'Web Atelier',
    'nav.about': 'O nama',
    'nav.contact': 'Kontakt',
    'hero.title': "Ani's Studio — Ručno izrađena umjetnost, interijeri i digitalni dizajn na jednom mjestu.",
    'hero.subtitle': 'Fuzija zanatskih vještina i moderne tehnologije',
    'footer.copyright': 'Sva prava pridržana.',
    'footer.madeWith': 'Napravljeno s',
    'footer.and': 'i'
  },
  en: {
    'nav.lrc': 'LRC',
    'nav.interiors': 'Interiors',
    'nav.webAtelier': 'Web Atelier',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': "Ani's Studio — Handmade art, interiors & digital design in one place.",
    'hero.subtitle': 'A fusion of craftsmanship and modern technology',
    'footer.copyright': 'All rights reserved.',
    'footer.madeWith': 'Made with',
    'footer.and': 'and'
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    // SSR-safe: only access localStorage in browser
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'hr'
    }
    return 'hr'
  })

  useEffect(() => {
    // Only run in browser
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }, [lang])

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations['hr']] || key
  }

  const setLang = (newLang: Language) => {
    setLangState(newLang)
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

