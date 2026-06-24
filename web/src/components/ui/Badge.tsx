export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs tracking-widest text-muted">
      {children}
    </span>
  );
}
