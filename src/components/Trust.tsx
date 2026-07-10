'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>(delay);

  return (
    <div
      ref={ref}
      className="reveal-target border-line hover:border-accent/40 rounded-[14px] border bg-white px-6 py-7 text-center transition-all duration-350 hover:-translate-y-1"
    >
      <span className="font-archivo text-accent text-[clamp(32px,4vw,44px)] font-extrabold leading-none">
        {value}
      </span>
      <p className="text-ink-2 mt-2.5 text-[15px]">{label}</p>
    </div>
  );
}

export function Trust() {
  const t = useTranslations('trust');
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-panel border-line border-t border-b py-[clamp(64px,9vw,118px)]">
      <Container>
        <div ref={headerRef} className="reveal-target max-w-160">
          <SectionEyebrow label={t('eyebrow')} />
          <SectionHeading title={t('h2')} subtitle={t('sub')} />
        </div>

        <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-2 gap-5 min-[600px]:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <StatCard
              key={i}
              value={t(`stats.${i}.value`)}
              label={t(`stats.${i}.label`)}
              delay={i * 90}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
