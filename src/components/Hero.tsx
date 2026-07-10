'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AccentButton } from '@/components/ui/AccentButton';
import { OutlineButton } from '@/components/ui/OutlineButton';

export function Hero() {
  const t = useTranslations('hero');
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="top" className="relative overflow-hidden bg-[#20242a]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-1 bg-linear-to-r from-[rgba(24,27,32,.9)] via-[rgba(24,27,32,.74)] to-[rgba(24,27,32,.5)]" />

      <div className="relative z-2 mx-auto max-w-295 px-6 py-[clamp(72px,9vw,124px)]">
        <div ref={revealRef} className="reveal-target max-w-180">
          {/* Accent lines */}
          <div className="mb-6.5 flex flex-col gap-1.5">
            <div
              className="h-1.25 w-33 rounded-[3px]"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-accent) 0 42%, #f6cf95 50%, var(--color-accent) 58% 100%)',
                backgroundSize: '220% 100%',
                animation: 'acc-sweep 3.6s linear infinite',
              }}
            />
            <div
              className="h-1.25 w-24.5 rounded-[3px]"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-accent) 0 42%, #f6cf95 50%, var(--color-accent) 58% 100%)',
                backgroundSize: '220% 100%',
                animation: 'acc-sweep 3.6s linear infinite 0.5s',
              }}
            />
          </div>

          <p className="text-accent mb-4.5 text-[13.5px] font-semibold tracking-[.14em] uppercase">
            {t('eyebrow')}
          </p>

          <h1 className="font-archivo m-0 text-[clamp(34px,5vw,58px)] leading-[1.03] font-extrabold tracking-[-0.02em] text-balance text-white">
            {t('h1')}
          </h1>

          <p className="mt-6 max-w-140 text-[clamp(16px,1.7vw,18.5px)] leading-relaxed text-[#c9cdd2]">
            {t('sub')}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-white/15 bg-white/6 px-4 py-1.5 text-[13.5px] text-[#c9cdd2]">
              {t('segment')}
            </span>
            <span className="text-accent rounded-full bg-[rgba(226,118,28,.12)] px-4 py-1.5 text-[13.5px] font-semibold">
              {t('moq')}
            </span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3.5">
            <AccentButton href="#contact">{t('cta')}</AccentButton>
            <OutlineButton href="#cycle">{t('secondary')}</OutlineButton>
          </div>
        </div>
      </div>
    </section>
  );
}
