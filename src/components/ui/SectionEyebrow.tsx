export function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="h-0.5 w-7 bg-accent" />
      <span className="text-[13px] font-semibold uppercase tracking-[.14em] text-accent">
        {label}
      </span>
    </div>
  );
}
