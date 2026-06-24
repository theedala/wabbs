export function SectionHeading({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-gradient font-mono text-xs font-semibold tracking-[0.2em]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}
