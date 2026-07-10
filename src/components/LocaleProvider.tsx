'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { NextIntlClientProvider } from 'next-intl';

type Locale = 'ru' | 'uz' | 'en';
type AllMessages = Record<Locale, Record<string, unknown>>;

type LocaleContextValue = {
  locale: Locale;
  switchLocale: (code: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocaleSwitch() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocaleSwitch must be used within LocaleProvider');
  return ctx;
}

export function LocaleProvider({
  initialLocale,
  allMessages,
  children,
}: {
  initialLocale: Locale;
  allMessages: AllMessages;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const switchLocale = useCallback(
    (code: Locale) => {
      setLocale(code);
      const path = window.location.pathname;
      const segments = path.split('/');
      segments[1] = code;
      window.history.replaceState(null, '', segments.join('/'));
      document.documentElement.lang = code;
    },
    [],
  );

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      <NextIntlClientProvider locale={locale} messages={allMessages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
