# ATW Technologies & Forensics — Website Design Spec

**Date:** 2026-06-24
**Status:** Approved design, pending spec review
**Source material:** `CN65 ALEXANDRA WABATAGORE ATW Technologies and Forensics.pptx` (company pitch deck)

---

## 1. Purpose & Goals

A dark, "security-operations" brochure website for ATW Technologies and Forensics — an
AI-driven cybersecurity and digital-forensics startup based in Harare, Zimbabwe.

The site does two jobs equally:

- **Credibility** — make ATW look legitimate and capable to investors and partners.
- **Lead generation** — convert target institutions (universities/schools, healthcare,
  online payment platforms) into enquiries.

Success looks like: a visitor understands what ATW does within 10 seconds, trusts the team,
and has an obvious, low-friction path to enquire.

## 2. Audience

- **Primary:** decision-makers at universities/schools, healthcare institutions, and online
  money-transfer / payment platforms in Zimbabwe.
- **Secondary:** investors and potential partners/brokers evaluating the company.

## 3. Tech Stack

- **Framework:** Next.js (App Router) + TypeScript.
- **Styling:** Tailwind CSS.
- **Animation:** Framer Motion — restrained scroll reveals and hover states only.
- **Icons:** lucide-react.
- **Contact delivery:** Next.js route handler (`/api/contact`) using **Resend** to email
  `alexandrawabbs@gmail.com`. API key stored in `RESEND_API_KEY` env var. Includes a honeypot
  field and server-side validation. No database.
- **Hosting:** Vercel free tier. Domain pointed post-launch.
- **Fonts:** Space Grotesk (display) + Inter (body) + JetBrains Mono (accents/stats/labels),
  served via `next/font`.

## 4. Brand System

Derived directly from the existing ATW logo (cloud + circuit motif, cyan→blue gradient on black,
tagline "You got it solved!").

**Palette**

| Token | Value | Use |
|-------|-------|-----|
| `bg` | `#070B14` | Page canvas (near-black) |
| `surface` | `#0F1626` | Raised cards / sections |
| `surface-2` | `#16203A` | Hover / nested surfaces |
| `accent-cyan` | `#22D3EE` | Primary accent, CTAs |
| `accent-blue` | `#2563EB` | Gradient partner, links |
| `text` | `#E5E7EB` | Primary text |
| `muted` | `#94A3B8` | Secondary text |
| `border` | `#1E293B` | Hairline dividers |

- Signature gradient: `linear-gradient(90deg, #22D3EE, #2563EB)` on headings accents, buttons,
  and the logo glow.
- One accent only — cyan is the single bright CTA color, used sparingly for high contrast.

**Motif:** the logo's circuit/network lines, reused as faint background textures, section
dividers, and a drifting animated graph behind the hero.

**Tone:** clarity over drama. Calm, confident, professional. No skulls, matrix rain, or
hacker-cliché imagery (per 2026 best-practice — see Inspiration).

**Assets from the deck (to be extracted from `ppt/media/`):**
- `image2.png` → logo
- `image9.jpeg` → Alexandra Wabatagore (CEO/Founder)
- `image7.jpeg`, `image8.jpeg` → team headshots (Wayne Mureverwi, Tarbaby Banda)
- `image1.jpeg` → abstract network texture (optional hero/section backdrop)

## 5. Information Architecture

Hybrid: a rich single-page Home plus three dedicated pages.

```
/            Home (long scroll)
/product     The AI Intrusion Detection & Prevention System
/services    Consulting, IDS/IPS, Forensics + pricing
/contact     Enquiry form + contact details
```

Global: sticky top nav (logo + links + "Request a quote" button), footer (contact, quick
links, social placeholders, copyright).

## 6. Page Content

All copy is drafted from the deck and lightly rewritten (typos fixed, wording tightened).
Pricing is shown publicly.

### Home
1. **Hero** — split layout. Left: logo, headline (≤6 words), tagline "You got it solved!",
   primary CTA "Request a quote" + secondary "See how it works." Right: animated network graph.
2. **The Problem** — large mono stat callouts: *96% of financial transactions are conducted
   online*; the *Harare Institute of Technology lost ~$24M* after its payment system was hacked
   by an insider developer. Frames the local cyber-fraud threat.
3. **Our Solution** — the AI IDS/IPS: detects suspicious activity, raises alerts, prevents
   intrusions.
4. **Services** — three cards: Cybersecurity Consulting · AI IDS/IPS · Digital Forensics.
5. **Why ATW** (lighter band) — AI defence against evasion techniques (obfuscation/encoding,
   IP fragmentation, DoS, application & account hijacking); locally-based support &
   troubleshooting; discounts for schools, universities, and healthcare in remote/under-resourced
   areas.
6. **Team** — three members with photos, names, roles.
7. **CTA band** — closing "Secure your organization" prompt → Contact.

### /product
Deep-dive on the AI Intrusion Detection & Prevention System: what it does, the specific evasion
techniques it stops, how detection/alerting/prevention works, and who it's for. CTA to Contact.

### /services
The three offerings in detail with transparent pricing:
- Cybersecurity & forensic consultation — **$2,000 USD**
- AI Intrusion Detection & Prevention System — **$5,000–$15,000 USD**
- Digital forensics services
Plus the discount commitment for under-resourced institutions. CTA to Contact.

### /contact
- Enquiry form: name, organization, email, service of interest (select), message.
- Direct details: email `alexandrawabbs@gmail.com`, phone/WhatsApp `+263 77 112 7760`,
  location Harare, Zimbabwe.
- Prominent WhatsApp and call quick-actions alongside the form.

## 7. Contact Form Data Flow

1. User fills form → client-side validation (required fields, email format).
2. Hidden honeypot field; if filled, silently drop.
3. POST to `/api/contact` (Next.js route handler).
4. Server validates, then calls Resend to send a formatted enquiry email to ATW.
5. Return success/error JSON → inline success message or error feedback to the user.

No persistence; email is the system of record.

## 8. Component Breakdown

Each component has one clear purpose and a typed props interface:

- `Nav` — sticky header, mobile drawer, quote CTA.
- `Footer` — contact + links.
- `Hero` — split hero with animated `NetworkGraph` backdrop.
- `StatCallout` — large mono number + label (Problem section).
- `SectionHeading` — gradient-accent eyebrow + title.
- `ServiceCard` — icon, title, description, optional price.
- `FeatureItem` — icon + heading + text (Why ATW, Product).
- `TeamCard` — photo, name, role.
- `CTABand` — full-width gradient prompt.
- `ContactForm` — fields, validation, submit state.
- `NetworkGraph` — animated SVG/canvas circuit-line motif (decorative, reduced-motion aware).

Shared UI primitives: `Button`, `Container`, `Badge`.

## 9. Responsiveness & Accessibility

- Mobile-first; split layouts stack on small screens.
- Respect `prefers-reduced-motion` — disable the drifting graph and reveals.
- WCAG AA contrast on all text (verify cyan/blue on dark meets ratios).
- Semantic HTML, keyboard-navigable nav and form, visible focus states, alt text on images.

## 10. Design Inspiration (applied)

From a review of leading cybersecurity sites (Darktrace, CrowdStrike, Priam Cyber AI, Astra,
Redline, Fingerprint) and 2026 design roundups:

- **Dark base + single bright CTA** (Priam/Redline) → cyan CTA on near-black.
- **Clarity over drama** (2026 trend) → no hacker clichés; calm and readable.
- **Split-screen hero** (Astra/Fingerprint) → copy left, visual right.
- **Problem-led, stat-driven** (Redline) → big mono stat callouts before the pitch.
- **Theming choreography** (CrowdStrike) → mostly dark, one lighter trust band.
- **Controlled motion** (Darktrace) → fades/hover/drift only.
- **Layered CTAs** → primary "Request a quote" + soft "See how it works."
- **Trust without client logos** → ATW substitutes team credentials/photos, local presence,
  named threats stopped, transparent pricing, and the discount commitment.

## 11. Out of Scope (YAGNI)

Blog/CMS, client login/dashboard, live chat, multi-language, analytics dashboards, e-commerce,
online payments. All addable later given the stack; excluded from this build.

## 12. Open Questions / Assumptions

- **Assumption:** pricing is public (flagged with user; can switch to "request a quote" gating).
- **Assumption:** copy is lightly rewritten from the deck, not verbatim.
- Domain name and Resend account to be provisioned before launch.
- Exact hero headline wording to be finalized during implementation.
