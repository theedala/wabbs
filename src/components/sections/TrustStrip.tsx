import { Container } from "@/components/ui/Container";

const institutions = [
  "Universities",
  "Healthcare providers",
  "Financial services",
  "Mining operations",
  "Government agencies",
  "Schools",
];

export function TrustStrip() {
  // Duplicated track so the marquee loops seamlessly.
  const track = [...institutions, ...institutions];

  return (
    <section className="border-b border-border bg-bg py-10">
      <Container>
        <p className="mono-label text-center">Trusted by institutions across Zimbabwe</p>
      </Container>
      <div
        className="relative mt-6 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max [animation:marquee_32s_linear_infinite]">
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-5 whitespace-nowrap font-mono text-sm font-bold uppercase tracking-wider text-ink/30"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
