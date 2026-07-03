'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="border-line sticky top-0 z-40 border-b bg-white/86 backdrop-blur-md">
      <Container className="flex flex-wrap items-center justify-between gap-4.5 py-3.5">
        <a href="#top" className="flex items-center">
          <Image
            src="/images/emc-logo.png"
            alt="EMC"
            width={90}
            height={30}
            className="block h-7.5 w-auto"
            priority
          />
        </a>
        <nav className="flex flex-wrap items-center gap-5">
          <a
            href="#products"
            className="text-ink-2 hover:text-accent text-[14.5px] font-semibold no-underline transition-colors"
          >
            {t('products')}
          </a>
          <a
            href="#why"
            className="text-ink-2 hover:text-accent text-[14.5px] font-semibold no-underline transition-colors"
          >
            {t('why')}
          </a>
          <a
            href="#cycle"
            className="text-ink-2 hover:text-accent text-[14.5px] font-semibold no-underline transition-colors"
          >
            {t('cycle')}
          </a>

          <LanguageSwitcher />
          <a
            href="#contact"
            className="bg-ink hover:bg-ink/90 rounded-md px-5 py-2.5 text-[14.5px] font-bold text-white no-underline transition-colors"
          >
            {t('cta')}
          </a>
        </nav>
      </Container>
    </header>
  );
}
