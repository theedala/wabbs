import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { nav, siteMeta, contact, socials, legalLinks } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      {/* subtle cyan accent line */}
      <div
        className="h-px w-full"
        style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(34,211,238,0.45), transparent)" }}
      />

      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr] lg:gap-12">
          {/* Brand + socials */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/brand/atw-logo.png" alt={siteMeta.name} width={36} height={36} className="h-9 w-9 object-contain" />
              <span className="font-display font-bold">{siteMeta.shortName}</span>
            </Link>
            <p className="mt-3 font-mono text-sm text-accent-cyan">{siteMeta.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              AI-driven intrusion detection, cybersecurity consulting, and digital forensics — built in Harare, Zimbabwe.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="font-mono text-xs tracking-widest text-muted">EXPLORE</h3>
            <ul className="mt-4 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent-cyan">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs tracking-widest text-muted">GET IN TOUCH</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 transition-colors hover:text-text">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phoneHref}`} className="flex items-start gap-3 transition-colors hover:text-text">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteMeta.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((l) => (
              <Link key={l.label} href={l.href} className="transition-colors hover:text-text">
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
