import Link from "next/link";

export function AnnouncementBar() {
  return (
    <Link
      href="/product"
      className="group block w-full border-b border-border bg-bg-subtle"
    >
      <p className="mono-label flex items-center justify-center gap-2 py-2.5 text-center">
        <span className="rounded-full bg-accent px-2 py-0.5 text-[0.625rem] font-bold text-accent-ink">
          NEW
        </span>
        <span className="text-ink/70">AI intrusion detection now live</span>
        <span className="text-accent transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </p>
    </Link>
  );
}
