import { MonoLabel } from "./MonoLabel";

export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <MonoLabel className="text-accent">{eyebrow}</MonoLabel>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
