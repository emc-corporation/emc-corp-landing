export function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle: string;
  light?: boolean;
}) {
  return (
    <>
      <h2
        className={`mt-3.5 font-archivo text-[clamp(28px,3.8vw,46px)] font-extrabold leading-[1.05] tracking-[-0.015em] ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-[clamp(16px,1.6vw,18px)] leading-relaxed ${
          light ? 'text-[#b7bcc2]' : 'text-ink-2'
        }`}
      >
        {subtitle}
      </p>
    </>
  );
}
