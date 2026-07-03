'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useChainReveal } from '@/hooks/useChainReveal';
import { STAGE_META } from '@/lib/constants';
import { Factory, Stamp, BadgeCheck, Package, Truck } from '@/components/icons';
import type { LucideIcon } from 'lucide-react';

const STAGE_ICONS: Record<string, LucideIcon> = {
  factory: Factory,
  stamp: Stamp,
  'badge-check': BadgeCheck,
  package: Package,
  truck: Truck,
};

export function FullCycle() {
  const t = useTranslations();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const { containerRef, isRevealed } = useChainReveal();

  return (
    <section id="cycle" className="py-[clamp(64px,9vw,118px)]">
      <Container>
        <div ref={headerRef} className="reveal-target max-w-170">
          <SectionEyebrow label={t('cycle.eyebrow')} />
          <SectionHeading title={t('cycle.h2')} subtitle={t('cycle.sub')} />
        </div>

        <div ref={containerRef} className="relative mt-[clamp(44px,6vw,68px)]">
          {/* Background line */}
          <div className="bg-line absolute top-8.5 right-[6%] left-[6%] h-0.5" />

          {/* Animated fill line */}
          <div
            className={`chain-fill bg-accent absolute top-8.5 left-[6%] h-0.5 ${isRevealed ? 'revealed' : ''}`}
          />

          {/* Stage nodes */}
          <div className="relative flex flex-wrap justify-between gap-x-3 gap-y-6">
            {STAGE_META.map((stage, i) => {
              const Icon = STAGE_ICONS[stage.icon];
              return (
                <div
                  key={stage.n}
                  className={`chain-node flex max-w-52.5 flex-1 basis-42 flex-col items-center text-center ${isRevealed ? 'revealed' : ''}`}
                  style={{
                    transitionDelay: isRevealed ? `${180 + i * 260}ms` : '0ms',
                  }}
                >
                  <div className="border-accent text-accent relative z-2 flex h-17.5 w-17.5 items-center justify-center rounded-full border-2 bg-white shadow-[0_10px_24px_-12px_rgba(226,118,28,.6)]">
                    <Icon size={24} />
                  </div>
                  <span className="text-accent mt-2 font-mono text-[11px] tracking-[.08em]">
                    {stage.n}
                  </span>
                  <h3 className="font-manrope text-ink mt-1.5 text-[17.5px] font-semibold tracking-[-0.005em]">
                    {t(`stages.${i}.title`)}
                  </h3>
                  <p className="text-ink-2 mt-2 text-[13px] leading-normal">
                    {t(`stages.${i}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
