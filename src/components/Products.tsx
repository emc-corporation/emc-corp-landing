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
      className="reveal-target overflow-hidden rounded-[14px] border border-line bg-white transition-all duration-[380ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[7px] hover:border-accent/50 hover:shadow-[0_28px_50px_-26px_rgba(30,34,40,.32)]"
    >
      <div className="relative h-[200px] overflow-hidden bg-[#20242a]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-[20px] bg-[rgba(24,27,32,.55)] px-[9px] py-1 font-mono text-[11px] tracking-[.04em] text-white backdrop-blur-[4px]">
          {tag}
        </span>
      </div>
      <div className="px-[22px] pt-[22px] pb-6">
        <h3 className="m-0 font-manrope text-[21px] font-semibold tracking-[-0.005em] text-ink">
          {name}
        </h3>
        <p className="mt-[9px] text-[14.5px] leading-[1.55] text-ink-2">
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
        <div ref={headerRef} className="reveal-target max-w-[640px]">
          <SectionEyebrow label={t('eyebrow')} />
          <SectionHeading title={t('h2')} subtitle={t('sub')} />
        </div>

        <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[22px]">
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
