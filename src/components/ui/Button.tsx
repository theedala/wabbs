import Link from "next/link";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "ghost"; className?: string };

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent-cyan text-bg hover:bg-accent-cyan/90"
      : "border border-border text-text hover:border-accent-cyan hover:text-accent-cyan";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
