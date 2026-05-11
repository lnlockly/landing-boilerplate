import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LandingConfig, Localized } from '../config/schema';
import ru from './ru.json';
import en from './en.json';

type Dict = Record<string, string>;

const dicts: Record<string, Dict> = { ru, en };

type I18nValue = {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  L: (input: Localized | undefined, fallback?: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function readLangFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('lang');
}

export function I18nProvider({ config, children }: { config: LandingConfig; children: ReactNode }) {
  const initial = readLangFromURL() || config.lang || 'ru';
  const [lang, setLang] = useState(initial);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nValue>(() => {
    const dict = dicts[lang] || dicts.ru;
    const fallbackDict = dicts.ru;
    return {
      lang,
      setLang,
      t(key, fallback) {
        return dict[key] || fallbackDict[key] || fallback || key;
      },
      L(input, fallback) {
        if (input == null) return fallback ?? '';
        if (typeof input === 'string') return input;
        return input[lang] || input.ru || input.en || Object.values(input)[0] || fallback || '';
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const v = useContext(I18nContext);
  if (!v) throw new Error('useI18n must be used inside <I18nProvider>');
  return v;
}
