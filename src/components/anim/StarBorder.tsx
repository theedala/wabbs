import Link from "next/link";

export function StarBorder({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative inline-flex overflow-hidden rounded-full p-[1.5px]">
      <span
        className="absolute inset-[-1000%] animate-[atw-spin_4s_linear_infinite]"
        style={{ backgroundImage: "conic-gradient(from 90deg at 50% 50%,#070B14 0%,#22D3EE 50%,#070B14 100%)" }}
      />
      <span className="relative inline-flex items-center rounded-full bg-bg px-6 py-3 text-sm font-medium text-text transition-colors group-hover:text-accent-cyan">
        {children}
      </span>
      <style>{`@keyframes atw-spin{to{transform:rotate(360deg)}}`}</style>
    </Link>
  );
}
