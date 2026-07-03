'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { WHY_ICONS } from '@/lib/constants';
import { Layers, ShieldCheck, Timer, Boxes } from '@/components/icons';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  layers: Layers,
  'shield-check': ShieldCheck,
  timer: Timer,
  boxes: Boxes,
};

function WhyCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>(delay);
  const Icon = ICON_MAP[icon];

  return (
    <div
      ref={ref}
      className="reveal-target border-line hover:border-accent/40 rounded-[14px] border bg-white px-6 pt-6.5 pb-6 transition-all duration-350 hover:-translate-y-1"
    >
      <span className="bg-accent/12 text-accent mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[11px]">
        <Icon size={24} />
      </span>
      <h3 className="font-archivo text-ink m-0 text-[19px] font-bold">
        {title}
      </h3>
      <p className="text-ink-2 mt-2.5 text-[14.5px] leading-[1.55]">{desc}</p>
    </div>
  );
}

export function WhyUs() {
  const t = useTranslations('why');
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="why"
      className="border-line bg-panel border-t border-b py-[clamp(64px,9vw,118px)]"
    >
      <Container>
        <div ref={headerRef} className="reveal-target max-w-160">
          <SectionEyebrow label={t('eyebrow')} />
          <SectionHeading title={t('h2')} subtitle={t('sub')} />
        </div>

        <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          {WHY_ICONS.map((icon, i) => (
            <WhyCard
              key={icon}
              icon={icon}
              title={t(`items.${i}.title`)}
              desc={t(`items.${i}.desc`)}
              delay={i * 90}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
