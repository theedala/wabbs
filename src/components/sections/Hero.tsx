import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Reveal } from "@/components/anim/Reveal";
import { hero } from "@/lib/content";

const mockAlerts = [
  { ip: "41.220.18.7", label: "IP fragmentation attack", status: "blocked" },
  { ip: "196.27.0.142", label: "Credential stuffing", status: "blocked" },
  { ip: "102.140.6.33", label: "Port scan detected", status: "flagged" },
  { ip: "10.0.4.19", label: "Privilege escalation", status: "blocked" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
        }}
      />
      <Container className="relative py-20 text-center sm:py-28">
        <Reveal>
          <MonoLabel className="text-accent">{hero.eyebrow}</MonoLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            Stop intrusions <SerifAccent>before</SerifAccent> they strike.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{hero.body}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact" arrow>
              Get protected
            </Button>
            <Button href="/product" variant="ghost">
              See the products
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 max-w-4xl">
            <BrowserFrame label="atw — intrusion monitor">
              <HeroDashboard />
            </BrowserFrame>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-[180px_1fr]">
      {/* Sidebar */}
      <div className="hidden flex-col gap-1 bg-bg-subtle p-4 sm:flex">
        {["Overview", "Live alerts", "Threats", "Forensics", "Settings"].map((item, i) => (
          <span
            key={item}
            className={`rounded-md px-3 py-2 font-mono text-xs ${
              i === 1 ? "bg-accent-soft text-accent" : "text-muted"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
      {/* Main panel */}
      <div className="bg-bg p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="mono-label">Live alerts</span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 [animation:pulse-ring_1.8s_ease-out_infinite]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            monitoring
          </span>
        </div>
        <div className="space-y-2">
          {mockAlerts.map((a) => (
            <div
              key={a.ip}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    a.status === "blocked" ? "bg-rose-500" : "bg-amber-400"
                  }`}
                />
                <span className="font-mono text-xs text-ink">{a.ip}</span>
                <span className="hidden text-xs text-muted sm:inline">{a.label}</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider ${
                  a.status === "blocked"
                    ? "bg-rose-50 text-rose-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
