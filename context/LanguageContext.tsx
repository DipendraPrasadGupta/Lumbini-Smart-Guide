import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Translations, TranslationKeys } from '../constants/Translations';

type Language = 'en' | 'ne';

interface LanguageContextType {
  locale: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Language>('en');

  const t = (key: TranslationKeys): string => {
    return Translations[locale][key] || Translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ locale, setLanguage: setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
