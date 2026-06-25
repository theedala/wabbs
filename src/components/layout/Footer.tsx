import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { nav, siteMeta, contact, socials, legalLinks } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr] lg:gap-12">
          {/* Brand + socials */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center" aria-label={siteMeta.name}>
              <Image
                src="/brand/new_logo.png"
                alt={siteMeta.name}
                width={500}
                height={500}
                className="h-16 w-16 object-contain"
              />
            </Link>
            <p className="mt-4 font-mono text-sm text-accent">{siteMeta.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              AI-driven intrusion detection, cybersecurity consulting, and digital forensics — built
              in Harare, Zimbabwe.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <p className="mono-label">Explore</p>
            <ul className="mt-4 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="mono-label">Get in touch</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 transition-colors hover:text-ink"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-ink"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{contact.address}</span>
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
              <Link key={l.label} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
