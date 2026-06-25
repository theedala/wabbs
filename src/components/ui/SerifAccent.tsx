export function SerifAccent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`serif-accent font-normal ${className}`}>{children}</span>;
}
