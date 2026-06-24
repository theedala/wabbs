import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { contact } from "@/lib/content";

export const metadata: Metadata = { title: "Contact — ATW Technologies & Forensics" };

export default function ContactPage() {
  const wa = `https://wa.me/${contact.phoneHref.replace("+", "")}`;
  return (
    <section className="py-24">
      <Container className="grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="GET IN TOUCH" title="Request a quote." />
          <p className="mt-6 text-muted">
            Tell us about your organization and what you need secured. We respond to every enquiry.
          </p>
          <div className="mt-8 space-y-4 text-muted">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-text">
              <Mail className="h-5 w-5 text-accent-cyan" />
              {contact.email}
            </a>
            <a href={`tel:${contact.phoneHref}`} className="flex items-center gap-3 hover:text-text">
              <Phone className="h-5 w-5 text-accent-cyan" />
              {contact.phone}
            </a>
            <a href={wa} className="flex items-center gap-3 hover:text-text">
              <MessageCircle className="h-5 w-5 text-accent-cyan" />
              WhatsApp us
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-accent-cyan" />
              {contact.location}
            </p>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
