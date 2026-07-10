'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { PRODUCT_IMAGES } from '@/lib/constants';

function ProductCard({
  name,
  tag,
  desc,
  image,
  delay,
}: {
  name: string;
  tag: string;
  desc: string;
  image: string;
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>(delay);

  return (
    <div
      ref={ref}
      className="reveal-target border-line hover:border-accent/50 overflow-hidden rounded-[14px] border bg-white transition-all duration-380 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.75 hover:shadow-[0_28px_50px_-26px_rgba(30,34,40,.32)]"
    >
      <div className="relative h-50 overflow-hidden bg-[#20242a]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-[20px] bg-[rgba(24,27,32,.55)] px-2.25 py-1 font-mono text-[11px] tracking-[.04em] text-white backdrop-blur-xs">
          {tag}
        </span>
      </div>
      <div className="px-5.5 pt-5.5 pb-6">
        <h3 className="font-manrope text-ink m-0 text-[21px] font-semibold tracking-[-0.005em]">
          {name}
        </h3>
        <p className="text-ink-2 mt-2.25 text-[14.5px] leading-[1.55]">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function Products() {
  const t = useTranslations('prod');
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="products" className="py-[clamp(64px,9vw,118px)]">
      <Container>
        <div ref={headerRef} className="reveal-target max-w-160">
          <SectionEyebrow label={t('eyebrow')} />
          <SectionHeading title={t('h2')} subtitle={t('sub')} />
        </div>

        <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5.5">
          {[0, 1, 2, 3].map((i) => (
            <ProductCard
              key={i}
              name={t(`items.${i}.name`)}
              tag={t(`items.${i}.tag`)}
              desc={t(`items.${i}.desc`)}
              image={PRODUCT_IMAGES[i]}
              delay={i * 90}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
