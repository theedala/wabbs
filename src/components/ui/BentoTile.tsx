import { MonoLabel } from "./MonoLabel";

type Props = {
  label: string;
  title: React.ReactNode;
  blurb: string;
  visual: React.ReactNode;
  className?: string;
};

export function BentoTile({ label, title, blurb, visual, className = "" }: Props) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div className="relative flex-1 overflow-hidden border-b border-border bg-bg-subtle">
        {visual}
      </div>
      <div className="p-6">
        <MonoLabel className="text-accent">{label}</MonoLabel>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-1.5 text-sm text-muted">{blurb}</p>
      </div>
    </div>
  );
}
