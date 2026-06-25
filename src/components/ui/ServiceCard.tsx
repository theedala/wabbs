import { Shield, Radar, Search } from "lucide-react";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import type { Service } from "@/lib/content";

const icons = { shield: Shield, radar: Radar, search: Search };

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <SpotlightCard className="h-full rounded-2xl border border-border bg-surface p-8">
      <Icon className="h-8 w-8 text-accent-cyan" />
      <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
      <p className="mt-3 text-muted">{service.description}</p>
    </SpotlightCard>
  );
}
