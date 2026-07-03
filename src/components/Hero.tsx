'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AccentButton } from '@/components/ui/AccentButton';
import { OutlineButton } from '@/components/ui/OutlineButton';
import { Workflow } from '@/components/icons';

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

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(24,27,32,.9)] via-[rgba(24,27,32,.74)] to-[rgba(24,27,32,.5)]" />

      <div className="relative z-[2] mx-auto max-w-[1180px] px-6 py-[clamp(72px,9vw,124px)]">
        <div ref={revealRef} className="reveal-target max-w-[720px]">
          {/* Accent lines */}
          <div className="mb-[26px] flex flex-col gap-1.5">
            <div
              className="h-[5px] w-[132px] rounded-[3px]"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-accent) 0 42%, #f6cf95 50%, var(--color-accent) 58% 100%)',
                backgroundSize: '220% 100%',
                animation: 'acc-sweep 3.6s linear infinite',
              }}
            />
            <div
              className="h-[5px] w-[98px] rounded-[3px]"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-accent) 0 42%, #f6cf95 50%, var(--color-accent) 58% 100%)',
                backgroundSize: '220% 100%',
                animation: 'acc-sweep 3.6s linear infinite 0.5s',
              }}
            />
          </div>

          <p className="mb-[18px] text-[13.5px] font-semibold uppercase tracking-[.14em] text-accent">
            {t('eyebrow')}
          </p>

          <h1 className="m-0 font-archivo text-[clamp(34px,5vw,58px)] font-extrabold leading-[1.03] tracking-[-0.02em] text-white [text-wrap:balance]">
            {t('h1')}
          </h1>

          <p className="mt-6 max-w-[560px] text-[clamp(16px,1.7vw,18.5px)] leading-relaxed text-[#c9cdd2]">
            {t('sub')}
          </p>

          <div className="mt-[34px] flex flex-wrap gap-3.5">
            <AccentButton href="#contact">{t('cta')}</AccentButton>
            <OutlineButton href="#cycle">{t('secondary')}</OutlineButton>
          </div>

          {/* Badge */}
          <div className="mt-[34px] inline-flex items-center gap-3 rounded-xl border border-white/[.16] bg-white/[.08] px-[18px] py-3.5 backdrop-blur-[6px]">
            <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-accent/20 text-accent">
              <Workflow size={20} />
            </span>
            <span className="text-[14.5px] font-bold leading-[1.25] text-white">
              {t('badgeTop')}{' '}
              <span className="font-medium text-[#c2c6cc]">
                {t('badgeBottom')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
