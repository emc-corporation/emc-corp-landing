import type { ReactNode } from 'react';

export function AccentButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="rounded-[7px] bg-accent px-[30px] py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(226,118,28,.30)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-d hover:shadow-[0_12px_30px_rgba(226,118,28,.36)]"
    >
      {children}
    </a>
  );
}
