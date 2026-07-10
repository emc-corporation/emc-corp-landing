'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useChainReveal } from '@/hooks/useChainReveal';
import { STAGE_META } from '@/lib/constants';
import { ClipboardList, Palette, Factory, CreditCard, Truck } from '@/components/icons';
import type { LucideIcon } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';

const STAGE_ICONS: Record<string, LucideIcon> = {
  'clipboard-list': ClipboardList,
  palette: Palette,
  factory: Factory,
  'credit-card': CreditCard,
  truck: Truck,
};

/*
 * Snake ordering per breakpoint:
 *   1 col (<480):  0,1,2,3,4  (no reorder)
 *   2 cols (480+):  0,1, 3,2, 4  (row 1 reversed)
 *   3 cols (600+):  0,1,2, 4,3   (row 1 reversed)
 *   5 cols (900+):  0,1,2,3,4  (single row)
 */
const SNAKE_ORDER: string[] = [
  'order-0',
  'order-1',
  'order-2 min-[480px]:order-3 min-[600px]:order-2',
  'order-3 min-[480px]:order-2 min-[600px]:order-4 min-[600px]:col-start-3 min-[900px]:col-start-4 min-[900px]:order-3',
  'order-4 min-[600px]:order-3 min-[900px]:order-4',
];

function getOffsetTo(
  el: HTMLElement,
  ancestor: HTMLElement,
): { x: number; y: number } {
  let x = 0;
  let y = 0;
  let current: HTMLElement | null = el;
  while (current && current !== ancestor) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function FullCycle() {
  const t = useTranslations();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const { containerRef, isRevealed } = useChainReveal();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState('');
  const [pathLength, setPathLength] = useState(0);

  const updatePath = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const centers: { x: number; y: number }[] = [];
    for (const el of iconRefs.current) {
      if (!el) continue;
      const pos = getOffsetTo(el, wrapper);
      centers.push({
        x: pos.x + el.offsetWidth / 2,
        y: pos.y + el.offsetHeight / 2,
      });
    }

    if (centers.length < 2) return;

    let d = `M ${centers[0].x} ${centers[0].y}`;

    for (let i = 1; i < centers.length; i++) {
      const prev = centers[i - 1];
      const curr = centers[i];
      const sameRow = Math.abs(prev.y - curr.y) < 10;

      if (sameRow) {
        d += ` L ${curr.x} ${curr.y}`;
      } else {
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
    }

    const tempPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
    );
    tempPath.setAttribute('d', d);

    setPathD(d);
    setPathLength(tempPath.getTotalLength());
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updatePath);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updatePath]);

  return (
    <section id="cycle" className="py-[clamp(64px,9vw,118px)]">
      <Container>
        <div ref={headerRef} className="reveal-target max-w-170">
          <SectionEyebrow label={t('cycle.eyebrow')} />
          <SectionHeading title={t('cycle.h2')} subtitle={t('cycle.sub')} />
        </div>

        <div ref={containerRef} className="relative mt-[clamp(44px,6vw,68px)]">
          <div ref={wrapperRef} className="relative">
            {/* SVG connector path */}
            {pathD && (
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                style={{ zIndex: 0 }}
              >
                <path d={pathD} fill="none" stroke="#e5e7eb" strokeWidth={2} />
                <path
                  d={pathD}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  strokeDasharray={pathLength || undefined}
                  strokeDashoffset={isRevealed ? 0 : pathLength}
                  style={{
                    transition: isRevealed
                      ? 'stroke-dashoffset 2.8s cubic-bezier(0.4, 0, 0.1, 1)'
                      : 'none',
                  }}
                />
              </svg>
            )}

            {/* Stage nodes */}
            <div className="relative grid grid-cols-1 gap-x-3 gap-y-10 min-[480px]:grid-cols-2 min-[600px]:grid-cols-3 min-[900px]:grid-cols-5">
              {STAGE_META.map((stage, i) => {
                const Icon = STAGE_ICONS[stage.icon];
                return (
                  <div
                    key={stage.n}
                    className={`chain-node flex flex-col items-center text-center ${SNAKE_ORDER[i]} ${isRevealed ? 'revealed' : ''}`}
                    style={{
                      transitionDelay: isRevealed
                        ? `${180 + i * 260}ms`
                        : '0ms',
                    }}
                  >
                    <div
                      ref={(el) => {
                        iconRefs.current[i] = el;
                      }}
                      className="border-accent text-accent relative z-2 flex h-17.5 w-17.5 items-center justify-center rounded-full border-2 bg-white shadow-[0_10px_24px_-12px_rgba(226,118,28,.6)]"
                    >
                      <Icon size={24} />
                    </div>
                    <div className="rounded-2xl bg-white/30 p-2 backdrop-blur-[2px]">
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
