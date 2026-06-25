import { Shield, Radar, Search } from "lucide-react";
import { HairlineCard } from "@/components/ui/HairlineCard";
import type { Service } from "@/lib/content";

const icons = { shield: Shield, radar: Radar, search: Search };

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <HairlineCard className="h-full">
      <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-bg-subtle text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
    </HairlineCard>
  );
}
