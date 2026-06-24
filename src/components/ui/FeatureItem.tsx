import { Check } from "lucide-react";

export function FeatureItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-cyan/10 text-accent-cyan">
        <Check className="h-4 w-4" />
      </span>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-muted">{body}</p>
      </div>
    </div>
  );
}
