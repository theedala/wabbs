import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", arrow = false, className = "" }: Props) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-ink hover:bg-accent/90"
      : "border border-border text-ink hover:border-ink";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {arrow && (
        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      )}
    </Link>
  );
}
