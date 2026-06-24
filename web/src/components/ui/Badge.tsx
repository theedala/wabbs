export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block max-w-full rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.65rem] tracking-wider text-muted sm:text-xs sm:tracking-widest">
      {children}
    </span>
  );
}
