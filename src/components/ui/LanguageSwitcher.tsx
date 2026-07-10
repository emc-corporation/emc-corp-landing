'use client';

import { useLocaleSwitch } from '@/components/LocaleProvider';

const LANGS = [
  { code: 'ru', label: 'РУ' },
  { code: 'uz', label: 'UZ' },
  { code: 'en', label: 'EN' },
] as const;

export function LanguageSwitcher() {
  const { locale, switchLocale } = useLocaleSwitch();

  return (
    <div className="border-line bg-panel flex gap-0.75 rounded-[9px] border p-0.75">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => switchLocale(l.code)}
          className={`font-manrope cursor-pointer rounded-md px-2.75 py-1.5 text-[12.5px] font-bold tracking-[.03em] transition-all duration-180 ${
            locale === l.code
              ? 'bg-accent text-white'
              : 'text-ink-2 hover:text-ink bg-transparent'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
