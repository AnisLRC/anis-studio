import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = "HR" | "EN";

interface I18nContextType {
  lang: Lang;
  toggle: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }): JSX.Element {
  const [lang, setLang] = useState<Lang>("HR");

  useEffect(() => {
    // SSR-safe localStorage access
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang') as Lang;
      if (stored === 'HR' || stored === 'EN') {
        setLang(stored);
      }
    }
  }, []);

  const toggle = () => {
    const newLang: Lang = lang === 'HR' ? 'EN' : 'HR';
    setLang(newLang);
    
    // SSR-safe localStorage access
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
      window.dispatchEvent(new CustomEvent('lang:changed', { detail: newLang }));
    }
  };

  return (
    <I18nContext.Provider value={{ lang, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = (): { lang: Lang; toggle: () => void } => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
