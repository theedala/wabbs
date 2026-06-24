import Link from "next/link";
import { nav, siteMeta, contact } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <Container className="grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display font-bold">{siteMeta.name}</p>
          <p className="mt-2 font-mono text-sm text-accent-cyan">{siteMeta.tagline}</p>
        </div>
        <div className="flex flex-col gap-2">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted hover:text-text">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="text-sm text-muted">
          <p>{contact.location}</p>
          <a href={`mailto:${contact.email}`} className="block hover:text-text">
            {contact.email}
          </a>
          <a href={`tel:${contact.phoneHref}`} className="block hover:text-text">
            {contact.phone}
          </a>
        </div>
      </Container>
      <Container className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteMeta.name}. All rights reserved.
      </Container>
    </footer>
  );
}
