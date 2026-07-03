import type { ReactNode } from 'react';

export function OutlineButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="rounded-[7px] border border-white/[.28] bg-white/[.08] px-[26px] py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-white/[.14]"
    >
      {children}
    </a>
  );
}
