'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const LANGS = [
  { code: 'ru', label: 'РУ' },
  { code: 'uz', label: 'UZ' },
  { code: 'en', label: 'EN' },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(code: string) {
    const segments = pathname.split('/');
    segments[1] = code;
    router.push(segments.join('/'));
  }

  return (
    <div className="flex gap-[3px] rounded-[9px] border border-line bg-panel p-[3px]">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => switchLocale(l.code)}
          className={`cursor-pointer rounded-md px-[11px] py-1.5 font-manrope text-[12.5px] font-bold tracking-[.03em] transition-all duration-[180ms] ${
            locale === l.code
              ? 'bg-accent text-white'
              : 'bg-transparent text-ink-2 hover:text-ink'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
