export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-full border border-border bg-bg-subtle px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
      {children}
    </span>
  );
}
