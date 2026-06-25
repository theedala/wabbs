type Props = {
  children: React.ReactNode;
  label?: string;
  className?: string;
};

export function BrowserFrame({ children, label, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-bg shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-bg-subtle px-4 py-3">
        <span className="h-3 w-3 rounded-full border border-border bg-bg" />
        <span className="h-3 w-3 rounded-full border border-border bg-bg" />
        <span className="h-3 w-3 rounded-full border border-border bg-bg" />
        {label && (
          <span className="ml-3 truncate font-mono text-xs text-muted">{label}</span>
        )}
      </div>
      <div className="bg-bg">{children}</div>
    </div>
  );
}
