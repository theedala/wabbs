import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { BentoTile } from "@/components/ui/BentoTile";
import { Reveal } from "@/components/anim/Reveal";

export function Bento() {
  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What ATW does"
            title={
              <>
                One platform to <SerifAccent>watch</SerifAccent>, alert, and block.
              </>
            }
            className="max-w-2xl"
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BentoTile
              className="lg:col-span-2 lg:row-span-2"
              label="Detect intrusion"
              title="AI that sees the attack forming"
              blurb="Continuous monitoring spots suspicious activity the moment it appears on your network."
              visual={<DetectVisual />}
            />
            <BentoTile
              label="Block in real time"
              title="Stopped before damage"
              blurb="Threats are blocked automatically, not after the breach."
              visual={<BlockVisual />}
            />
            <BentoTile
              label="Alert your team"
              title="Instant notifications"
              blurb="Your people know the second something is wrong."
              visual={<AlertVisual />}
            />
            <BentoTile
              className="lg:col-span-2"
              label="Trace the breach"
              title="Digital forensics, built in"
              blurb="Reconstruct exactly what happened and recover the evidence."
              visual={<TraceVisual />}
            />
            <BentoTile
              label="Harden posture"
              title="Close the gaps"
              blurb="Consultancy that fixes weaknesses before attackers find them."
              visual={<HardenVisual />}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function DetectVisual() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-accent/30 to-transparent [animation:scanline_3s_linear_infinite]" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 [animation:pulse-ring_2s_ease-out_infinite]" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
      </div>
    </div>
  );
}

function BlockVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg viewBox="0 0 48 48" className="h-16 w-16 text-accent">
        <path
          d="M24 4l16 6v10c0 9.5-6.4 17.6-16 20-9.6-2.4-16-10.5-16-20V10l16-6z"
          fill="var(--color-accent-soft)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M17 24l5 5 9-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-30 [animation:pulse-ring_2.4s_ease-out_infinite]"
        />
      </svg>
    </div>
  );
}

function AlertVisual() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
      {["Threat blocked", "New alert"].map((t, i) => (
        <div
          key={t}
          className="flex w-full items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2 shadow-sm"
          style={{ animation: `caret 3s ease-in-out ${i * 0.6}s infinite` }}
        >
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span className="font-mono text-xs text-ink">{t}</span>
        </div>
      ))}
    </div>
  );
}

function TraceVisual() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 200 120" className="h-full w-full text-accent">
        <g stroke="currentColor" strokeWidth="1" className="opacity-40">
          <line x1="40" y1="60" x2="100" y2="30" />
          <line x1="40" y1="60" x2="100" y2="90" />
          <line x1="100" y1="30" x2="160" y2="60" />
          <line x1="100" y1="90" x2="160" y2="60" />
          <line x1="100" y1="30" x2="100" y2="90" />
        </g>
        {[
          [40, 60],
          [100, 30],
          [100, 90],
          [160, 60],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            fill="var(--color-bg)"
            stroke="currentColor"
            strokeWidth="2"
            style={{ animation: `caret 2.4s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
      </svg>
    </div>
  );
}

function HardenVisual() {
  const items = ["Firewall rules", "Access policy", "Patch level"];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 px-5">
      {items.map((t, i) => (
        <div key={t} className="flex items-center gap-2" style={{ animation: `caret 3s ease-in-out ${i * 0.5}s infinite` }}>
          <span className="grid h-4 w-4 place-items-center rounded-full bg-accent text-[0.5rem] text-accent-ink">
            ✓
          </span>
          <span className="font-mono text-[0.7rem] text-muted">{t}</span>
        </div>
      ))}
    </div>
  );
}
