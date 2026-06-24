import Image from "next/image";

// React Bits "ProfileCard" style: framed headshot with name/role and a cyan
// glow on hover. CSS-only interaction (no client JS needed).
export function ProfileCard({ name, role, imageUrl }: { name: string; role: string; imageUrl: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent-cyan/60">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-bold">{name}</h3>
      <p className="mt-1 font-mono text-sm text-accent-cyan">{role}</p>
    </div>
  );
}
