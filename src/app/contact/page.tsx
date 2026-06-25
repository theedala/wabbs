import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { ContactForm } from "@/components/ui/ContactForm";
import { contact } from "@/lib/content";

export const metadata: Metadata = { title: "Contact — ATW Technologies & Forensics" };

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <MonoLabel className="text-accent">Get in touch</MonoLabel>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Let&apos;s <SerifAccent>secure</SerifAccent> your organization.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Tell us about your organization and what you need secured. We respond to every enquiry.
          </p>
          <div className="mt-10 space-y-px overflow-hidden rounded-2xl border border-border bg-border">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 bg-bg px-5 py-4 text-ink transition-colors hover:bg-bg-subtle"
            >
              <Mail className="h-5 w-5 shrink-0 text-accent" />
              <span className="break-all text-sm">{contact.email}</span>
            </a>
            <a
              href={`tel:${contact.phoneHref}`}
              className="flex items-center gap-4 bg-bg px-5 py-4 text-ink transition-colors hover:bg-bg-subtle"
            >
              <Phone className="h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm">{contact.phone}</span>
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-bg px-5 py-4 text-ink transition-colors hover:bg-bg-subtle"
            >
              <MessageCircle className="h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm">WhatsApp us</span>
            </a>
            <div className="flex items-start gap-4 bg-bg px-5 py-4 text-ink">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm">{contact.address}</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-bg-subtle p-6 sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
