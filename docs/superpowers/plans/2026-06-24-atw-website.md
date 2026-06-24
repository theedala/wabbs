# ATW Technologies & Forensics Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, "security-operations" brochure website for ATW Technologies and Forensics that establishes credibility and generates client enquiries.

**Architecture:** A Next.js (App Router) site living in `web/`. A hybrid information architecture — one long Home page plus dedicated `/product`, `/services`, and `/contact` routes. A shared dark design system (Tailwind tokens + fonts) drives a small set of focused, reusable components. Decorative motion comes from hand-written lightweight animation components plus a few React Bits pieces. The contact form posts to a Next.js route handler that emails ATW via Resend; its validation/email logic is pure and unit-tested.

**Tech Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react · Resend · Vitest + React Testing Library.

## Global Constraints

- **App location:** all application code lives in `web/`. Repo root keeps `docs/` and the source `.pptx`. Vercel "Root Directory" = `web`.
- **Palette (exact):** `bg #070B14` · `surface #0F1626` · `surface-2 #16203A` · `accent-cyan #22D3EE` · `accent-blue #2563EB` · `text #E5E7EB` · `muted #94A3B8` · `border #1E293B`. Signature gradient `linear-gradient(90deg,#22D3EE,#2563EB)`. Cyan is the only bright CTA color.
- **Fonts:** Space Grotesk (display) · Inter (body) · JetBrains Mono (accents/stats/labels) via `next/font`.
- **Single accent rule:** never introduce a second bright accent color.
- **Motion:** restrained. Every animated component MUST respect `prefers-reduced-motion` and render a sensible static fallback. Prefer DOM/SVG variants over WebGL.
- **Tagline (verbatim):** `You got it solved!`
- **Contact targets (verbatim):** email `alexandrawabbs@gmail.com` · phone/WhatsApp `+263 77 112 7760` · location `Harare, Zimbabwe`.
- **Pricing (public):** consultation `$2,000 USD`; AI IDS/IPS `$5,000–$15,000 USD`.
- **Copy:** drafted from the deck, lightly rewritten; never paste deck typos verbatim.
- **Verification gates:** presentational components are verified by `npm run typecheck`, `npm run lint`, `npm run build`, and visual QA. Logic (contact validation/email) is verified by Vitest unit tests.
- **Commit after every task** with a Conventional Commit message.

---

## File Structure

```
web/
  public/
    brand/atw-logo.png            # from media image2.png
    brand/hero-texture.jpg        # from media image1.jpeg
    team/alexandra.jpg            # from media image9.jpeg
    team/wayne.jpg                # from media image7.jpeg
    team/tarbaby.jpg              # from media image8.jpeg
    favicon.ico
  src/
    app/
      layout.tsx                  # fonts, metadata, Nav + Footer shell
      page.tsx                    # Home (assembles sections)
      globals.css                 # Tailwind + tokens + base
      product/page.tsx
      services/page.tsx
      contact/page.tsx
      api/contact/route.ts        # POST handler -> Resend
    components/
      layout/Nav.tsx
      layout/Footer.tsx
      ui/Button.tsx
      ui/Container.tsx
      ui/Badge.tsx
      ui/SectionHeading.tsx
      ui/ServiceCard.tsx
      ui/FeatureItem.tsx
      ui/TeamCard.tsx
      ui/CTABand.tsx
      ui/ContactForm.tsx
      anim/CountUp.tsx            # hand-written
      anim/ShinyText.tsx         # hand-written
      anim/GradientText.tsx      # hand-written
      anim/StarBorder.tsx        # hand-written
      anim/Reveal.tsx            # hand-written scroll reveal (framer-motion)
      reactbits/Particles.tsx     # from React Bits
      reactbits/DecryptedText.tsx # from React Bits
      reactbits/SpotlightCard.tsx # from React Bits
      reactbits/ProfileCard.tsx   # from React Bits (team)
      sections/Hero.tsx
      sections/Problem.tsx
      sections/Solution.tsx
      sections/Services.tsx
      sections/WhyATW.tsx
      sections/Team.tsx
    lib/
      contact.ts                  # pure: validateContact, buildEmail
      content.ts                  # all site copy/data in one typed place
  .env.local.example
  vitest.config.ts
  vitest.setup.ts
  package.json
  tsconfig.json
```

---

### Task 1: Scaffold the Next.js app

**Files:**
- Create: `web/` (entire scaffold via CLI)
- Modify: `web/package.json` (add scripts)
- Create: `web/.env.local.example`

- [ ] **Step 1: Generate the app**

Run from repo root (`C:/Users/cni.alad/Desktop/Wabbs`):

```bash
npx --yes create-next-app@latest web --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Accept defaults for any remaining prompts.

- [ ] **Step 2: Add scripts and deps**

```bash
cd web
npm install framer-motion lucide-react resend
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

Edit `web/package.json` `"scripts"` to include:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

- [ ] **Step 3: Add env example**

Create `web/.env.local.example`:

```bash
# Resend API key for the contact form (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
# Verified sender + destination
CONTACT_TO=alexandrawabbs@gmail.com
CONTACT_FROM=ATW Website <onboarding@resend.dev>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build completes with no errors (default starter page).

- [ ] **Step 5: Commit**

```bash
git add web .gitignore
git commit -m "chore: scaffold Next.js app in web/"
```

---

### Task 2: Extract brand assets from the deck

**Files:**
- Create: `web/public/brand/*`, `web/public/team/*`

**Interfaces:**
- Produces: image paths `/brand/atw-logo.png`, `/brand/hero-texture.jpg`, `/team/alexandra.jpg`, `/team/wayne.jpg`, `/team/tarbaby.jpg`.

- [ ] **Step 1: Unpack the pptx media (if not already present)**

Run from repo root:

```bash
rm -rf _unpack && mkdir _unpack && unzip -q *.pptx -d _unpack
```

- [ ] **Step 2: Copy and rename assets**

```bash
mkdir -p web/public/brand web/public/team
cp _unpack/ppt/media/image2.png  web/public/brand/atw-logo.png
cp _unpack/ppt/media/image1.jpeg web/public/brand/hero-texture.jpg
cp _unpack/ppt/media/image9.jpeg web/public/team/alexandra.jpg
cp _unpack/ppt/media/image7.jpeg web/public/team/wayne.jpg
cp _unpack/ppt/media/image8.jpeg web/public/team/tarbaby.jpg
```

> **ASSUMPTION (confirm with client):** image9 = Alexandra (founder, confirmed). image7/image8 are the two male team members; the Wayne/Tarbaby mapping is a guess. Easy to swap the two files if wrong.

- [ ] **Step 3: Verify**

Run: `ls web/public/brand web/public/team`
Expected: five files listed as above.

- [ ] **Step 4: Commit**

```bash
git add web/public
git commit -m "assets: add ATW logo and team photos from deck"
```

---

### Task 3: Design tokens, fonts, and global styles

**Files:**
- Modify: `web/src/app/globals.css`
- Modify: `web/src/app/layout.tsx`

**Interfaces:**
- Produces: CSS custom properties + Tailwind theme tokens `bg, surface, surface-2, accent-cyan, accent-blue, text, muted, border`; font CSS vars `--font-display, --font-body, --font-mono`; utility class `.text-gradient`.

- [ ] **Step 1: Write `globals.css`**

Replace `web/src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-bg: #070B14;
  --color-surface: #0F1626;
  --color-surface-2: #16203A;
  --color-accent-cyan: #22D3EE;
  --color-accent-blue: #2563EB;
  --color-text: #E5E7EB;
  --color-muted: #94A3B8;
  --color-border: #1E293B;
  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
}

html { scroll-behavior: smooth; }

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 { font-family: var(--font-display), system-ui, sans-serif; }

.text-gradient {
  background-image: linear-gradient(90deg, #22D3EE, #2563EB);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 2: Wire fonts + metadata in `layout.tsx`**

Replace `web/src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: "ATW Technologies & Forensics — AI Cybersecurity in Zimbabwe",
  description:
    "AI-driven intrusion detection and prevention, cybersecurity consulting, and digital forensics for institutions across Zimbabwe. You got it solved!",
  metadataBase: new URL("https://atwtechnologies.example"),
  openGraph: { title: "ATW Technologies & Forensics", description: "AI cybersecurity and digital forensics in Harare, Zimbabwe.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

> Note: `layout.tsx` imports `Nav`/`Footer`, created in Task 6. Until then `npm run build` will fail on this task — that is expected; build verification for this task is deferred to Task 6. Run `npm run typecheck` is also deferred. Verify CSS only via Step 3.

- [ ] **Step 3: Verify CSS parses**

Temporarily comment the `Nav`/`Footer` imports and usage, run `npm run dev`, confirm the page renders on the dark background with no console errors, then restore the imports.

- [ ] **Step 4: Commit**

```bash
git add web/src/app/globals.css web/src/app/layout.tsx
git commit -m "feat: add dark design tokens, fonts, and global styles"
```

---

### Task 4: Site content module

**Files:**
- Create: `web/src/lib/content.ts`

**Interfaces:**
- Produces: typed exports `nav`, `hero`, `problemStats`, `solution`, `services`, `whyATW`, `team`, `contact`, `siteMeta`. Shapes below are consumed by every section component.

- [ ] **Step 1: Write the content module**

Create `web/src/lib/content.ts`:

```ts
export const siteMeta = {
  name: "ATW Technologies and Forensics",
  shortName: "ATW",
  tagline: "You got it solved!",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "AI-POWERED CYBERSECURITY · HARARE, ZIMBABWE",
  headline: "Stop intrusions before they strike.",
  tagline: siteMeta.tagline,
  body:
    "ATW Technologies and Forensics builds AI-driven intrusion detection, cybersecurity consulting, and digital forensics for institutions across Zimbabwe.",
};

export type Stat = { value: number; prefix?: string; suffix?: string; label: string };

export const problemStats: Stat[] = [
  { value: 96, suffix: "%", label: "of financial transactions are now conducted online." },
  { value: 24, prefix: "$", suffix: "M", label: "lost by the Harare Institute of Technology after its payment system was breached by an insider developer." },
];

export const solution = {
  eyebrow: "OUR SOLUTION",
  title: "An AI that watches, alerts, and blocks.",
  body:
    "Our intrusion detection and prevention system uses artificial intelligence to spot suspicious activity, raise instant alerts, and stop intrusions before they cause damage.",
};

export type Service = { title: string; description: string; price?: string; icon: "shield" | "radar" | "search" };

export const services: Service[] = [
  { title: "Cybersecurity Consulting", description: "Expert assessment and hardening of your organization's security posture.", price: "$2,000 USD", icon: "shield" },
  { title: "AI Intrusion Detection & Prevention", description: "Our flagship AI system that detects and blocks attacks in real time.", price: "$5,000–$15,000 USD", icon: "radar" },
  { title: "Digital Forensics", description: "Investigation and evidence recovery after a security incident.", icon: "search" },
];

export const whyATW = {
  eyebrow: "WHY ATW",
  title: "Security built for how attacks really happen.",
  features: [
    { title: "AI that defeats evasion", body: "Stops obfuscation, IP fragmentation, denial-of-service, and application & account hijacking — the techniques attackers use to slip past traditional controls." },
    { title: "Local support you can reach", body: "Based in Harare for fast, hands-on troubleshooting whenever you need it." },
    { title: "Accessible to everyone", body: "Significant discounts for schools, universities, and healthcare institutions in remote and under-resourced areas." },
  ],
};

export const team = [
  { name: "Alexandra Wabatagore", role: "CEO & Founder · Digital Forensic Scientist", photo: "/team/alexandra.jpg" },
  { name: "Wayne Mureverwi", role: "Digital Forensic Scientist & Software Developer", photo: "/team/wayne.jpg" },
  { name: "Tarbaby Banda", role: "Senior Software Engineer", photo: "/team/tarbaby.jpg" },
];

export const contact = {
  email: "alexandrawabbs@gmail.com",
  phone: "+263 77 112 7760",
  phoneHref: "+263771127760",
  location: "Harare, Zimbabwe",
};
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: no errors (this file is self-contained).

- [ ] **Step 3: Commit**

```bash
git add web/src/lib/content.ts
git commit -m "feat: add typed site content module"
```

---

### Task 5: UI primitives (Button, Container, Badge, SectionHeading)

**Files:**
- Create: `web/src/components/ui/Container.tsx`, `Button.tsx`, `Badge.tsx`, `SectionHeading.tsx`

**Interfaces:**
- Produces:
  - `Container({children, className?})` → centered max-w wrapper.
  - `Button({href, variant?: "primary"|"ghost", children, className?})` → renders `next/link`.
  - `Badge({children})` → mono pill.
  - `SectionHeading({eyebrow, title, className?})` → gradient eyebrow + display title.

- [ ] **Step 1: Container**

Create `web/src/components/ui/Container.tsx`:

```tsx
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: Button**

Create `web/src/components/ui/Button.tsx`:

```tsx
import Link from "next/link";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "ghost"; className?: string };

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent-cyan text-bg hover:bg-accent-cyan/90"
      : "border border-border text-text hover:border-accent-cyan hover:text-accent-cyan";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: Badge**

Create `web/src/components/ui/Badge.tsx`:

```tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs tracking-widest text-muted">
      {children}
    </span>
  );
}
```

- [ ] **Step 4: SectionHeading**

Create `web/src/components/ui/SectionHeading.tsx`:

```tsx
export function SectionHeading({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-gradient font-mono text-xs font-semibold tracking-[0.2em]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/ui
git commit -m "feat: add UI primitives (Button, Container, Badge, SectionHeading)"
```

---

### Task 6: Layout shell — Nav and Footer

**Files:**
- Create: `web/src/components/layout/Nav.tsx`, `web/src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `nav`, `siteMeta`, `contact` from `@/lib/content`; `Button`, `Container`.
- Produces: `Nav`, `Footer` (used in `layout.tsx`).

- [ ] **Step 1: Nav (sticky, mobile drawer)**

Create `web/src/components/layout/Nav.tsx`:

```tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, siteMeta } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/brand/atw-logo.png" alt={siteMeta.name} width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="font-display text-sm font-bold">{siteMeta.shortName}</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-text">{l.label}</Link>
          ))}
          <Button href="/contact">Request a quote</Button>
        </nav>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </Container>
      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {nav.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted hover:text-text">{l.label}</Link>
            ))}
            <Button href="/contact" className="w-full">Request a quote</Button>
          </Container>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Footer**

Create `web/src/components/layout/Footer.tsx`:

```tsx
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
            <Link key={l.href} href={l.href} className="text-sm text-muted hover:text-text">{l.label}</Link>
          ))}
        </div>
        <div className="text-sm text-muted">
          <p>{contact.location}</p>
          <a href={`mailto:${contact.email}`} className="block hover:text-text">{contact.email}</a>
          <a href={`tel:${contact.phoneHref}`} className="block hover:text-text">{contact.phone}</a>
        </div>
      </Container>
      <Container className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteMeta.name}. All rights reserved.
      </Container>
    </footer>
  );
}
```

- [ ] **Step 3: Verify build (layout now resolves)**

Run: `npm run build`
Expected: build succeeds (Home is still the default starter page — replaced in Task 13).

- [ ] **Step 4: Commit**

```bash
git add web/src/components/layout
git commit -m "feat: add sticky Nav and Footer layout shell"
```

---

### Task 7: Hand-written animation primitives

**Files:**
- Create: `web/src/components/anim/CountUp.tsx`, `ShinyText.tsx`, `GradientText.tsx`, `StarBorder.tsx`, `Reveal.tsx`

**Interfaces:**
- Produces:
  - `CountUp({end, prefix?, suffix?, durationMs?})` — counts from 0 → end when scrolled into view; reduced-motion shows final value immediately.
  - `ShinyText({text, className?})` — metallic sweep on text.
  - `GradientText({children, className?})` — animated cyan→blue gradient text.
  - `StarBorder({href, children})` — button with animated gradient border (primary CTA).
  - `Reveal({children, delay?})` — fade/translate-in on scroll via framer-motion.

- [ ] **Step 1: CountUp**

Create `web/src/components/anim/CountUp.tsx`:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function CountUp({ end, prefix = "", suffix = "", durationMs = 1400 }: { end: number; prefix?: string; suffix?: string; durationMs?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setValue(end); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / durationMs, 1);
          setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, durationMs]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}
```

- [ ] **Step 2: ShinyText**

Create `web/src/components/anim/ShinyText.tsx`:

```tsx
export function ShinyText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: "linear-gradient(110deg,#94A3B8 35%,#FFFFFF 50%,#94A3B8 65%)",
        backgroundSize: "200% 100%",
        animation: "atw-shine 3s linear infinite",
      }}
    >
      {text}
      <style>{`@keyframes atw-shine{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </span>
  );
}
```

- [ ] **Step 3: GradientText**

Create `web/src/components/anim/GradientText.tsx`:

```tsx
export function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg,#22D3EE,#2563EB,#22D3EE)",
        backgroundSize: "200% 100%",
        animation: "atw-gradient 6s linear infinite",
      }}
    >
      {children}
      <style>{`@keyframes atw-gradient{0%{background-position:0% 0}100%{background-position:200% 0}}`}</style>
    </span>
  );
}
```

- [ ] **Step 4: StarBorder**

Create `web/src/components/anim/StarBorder.tsx`:

```tsx
import Link from "next/link";

export function StarBorder({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative inline-flex overflow-hidden rounded-full p-[1.5px]">
      <span
        className="absolute inset-[-1000%] animate-[atw-spin_4s_linear_infinite]"
        style={{ backgroundImage: "conic-gradient(from 90deg at 50% 50%,#070B14 0%,#22D3EE 50%,#070B14 100%)" }}
      />
      <span className="relative inline-flex items-center rounded-full bg-bg px-6 py-3 text-sm font-medium text-text transition-colors group-hover:text-accent-cyan">
        {children}
      </span>
      <style>{`@keyframes atw-spin{to{transform:rotate(360deg)}}`}</style>
    </Link>
  );
}
```

- [ ] **Step 5: Reveal**

Create `web/src/components/anim/Reveal.tsx`:

```tsx
"use client";
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Verify**

Run: `npm run typecheck && npm run build`
Expected: success.

- [ ] **Step 7: Commit**

```bash
git add web/src/components/anim
git commit -m "feat: add hand-written animation primitives"
```

---

### Task 8: Import React Bits components

**Files:**
- Create: `web/src/components/reactbits/Particles.tsx`, `DecryptedText.tsx`, `SpotlightCard.tsx`, `ProfileCard.tsx`

**Interfaces:**
- Produces: `Particles` (full-bleed animated background), `DecryptedText({text, className?})`, `SpotlightCard({children, className?})`, `ProfileCard({name, role, imageUrl})`.

- [ ] **Step 1: Add each component from reactbits.dev**

For each component below, open its page on https://reactbits.dev, select the **React + Tailwind + TS** variant, and copy the source into the matching file path. Use the jsrepo CLI shown on each page if available, e.g.:

```bash
cd web
npx --yes jsrepo add @react-bits/backgrounds/particles
npx --yes jsrepo add @react-bits/text-animations/decrypted-text
npx --yes jsrepo add @react-bits/components/spotlight-card
npx --yes jsrepo add @react-bits/components/profile-card
```

Then move/rename the generated files to:
- `src/components/reactbits/Particles.tsx`
- `src/components/reactbits/DecryptedText.tsx`
- `src/components/reactbits/SpotlightCard.tsx`
- `src/components/reactbits/ProfileCard.tsx`

- [ ] **Step 2: Theme + reduced-motion pass**

In each file: set default colors to the ATW palette (`#22D3EE`, `#2563EB`, particle color `#22D3EE` on transparent). In `Particles.tsx` and `DecryptedText.tsx`, add at the top of the animation effect:

```ts
if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

so the effect no-ops (static fallback) under reduced motion.

- [ ] **Step 3: Add `"use client"`**

Ensure each React Bits file begins with `"use client";` (they use hooks/canvas).

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run build`
Expected: success. Fix any import-path or prop-type mismatches surfaced by `tsc`.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/reactbits package.json package-lock.json
git commit -m "feat: add themed React Bits components (Particles, DecryptedText, SpotlightCard, ProfileCard)"
```

---

### Task 9: Hero section

**Files:**
- Create: `web/src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `hero` content; `Particles`, `DecryptedText`, `ShinyText`, `Button`, `StarBorder`, `Badge`, `Container`.

- [ ] **Step 1: Build the Hero**

Create `web/src/components/sections/Hero.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarBorder } from "@/components/anim/StarBorder";
import { ShinyText } from "@/components/anim/ShinyText";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import { Particles } from "@/components/reactbits/Particles";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <Particles />
      </div>
      <Container className="relative grid min-h-[80vh] items-center py-20">
        <div className="max-w-2xl">
          <Badge>{hero.eyebrow}</Badge>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
            <DecryptedText text={hero.headline} />
          </h1>
          <p className="mt-4 font-mono text-lg">
            <ShinyText text={hero.tagline} />
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted">{hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Request a quote</Button>
            <StarBorder href="/product">See how it works</StarBorder>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify in isolation**

Temporarily set `web/src/app/page.tsx` to `export default function Home(){return <Hero/>}` (import it), run `npm run dev`, confirm: particle backdrop animates, headline does the decrypt reveal, tagline shimmers, both CTAs render. Then revert page.tsx (final assembly is Task 13).

- [ ] **Step 3: Commit**

```bash
git add web/src/components/sections/Hero.tsx
git commit -m "feat: add hero section"
```

---

### Task 10: Problem & Solution sections

**Files:**
- Create: `web/src/components/sections/Problem.tsx`, `web/src/components/sections/Solution.tsx`

**Interfaces:**
- Consumes: `problemStats`, `solution`; `CountUp`, `SectionHeading`, `Reveal`, `Container`, `Badge`.

- [ ] **Step 1: Problem**

Create `web/src/components/sections/Problem.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { CountUp } from "@/components/anim/CountUp";
import { problemStats } from "@/lib/content";

export function Problem() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="THE PROBLEM" title="Cyber fraud is rising in Harare." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {problemStats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-surface p-8">
                <p className="font-mono text-5xl font-bold text-gradient sm:text-6xl">
                  <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-4 text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

> Note: add optional `prefix`/`suffix` already supported by `CountUp`; `problemStats[1]` provides `prefix:"$"`, `suffix:"M"`.

- [ ] **Step 2: Solution**

Create `web/src/components/sections/Solution.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { solution } from "@/lib/content";

export function Solution() {
  return (
    <section className="border-y border-border bg-surface py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={solution.eyebrow} title={solution.title} />
          <p className="mt-6 max-w-2xl text-lg text-muted">{solution.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add web/src/components/sections/Problem.tsx web/src/components/sections/Solution.tsx
git commit -m "feat: add problem (animated stats) and solution sections"
```

---

### Task 11: Services, WhyATW, Team sections + their cards

**Files:**
- Create: `web/src/components/ui/ServiceCard.tsx`, `FeatureItem.tsx`, `TeamCard.tsx`
- Create: `web/src/components/sections/Services.tsx`, `WhyATW.tsx`, `Team.tsx`

**Interfaces:**
- Consumes: `services`, `whyATW`, `team`; `SpotlightCard`, `ProfileCard`, `SectionHeading`, `Reveal`, `Container`, lucide icons.
- Produces: `ServiceCard({service})`, `FeatureItem({title, body, index})`, `TeamCard({member})`.

- [ ] **Step 1: ServiceCard**

Create `web/src/components/ui/ServiceCard.tsx`:

```tsx
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
      {service.price && <p className="mt-5 font-mono text-sm text-accent-cyan">{service.price}</p>}
    </SpotlightCard>
  );
}
```

- [ ] **Step 2: FeatureItem**

Create `web/src/components/ui/FeatureItem.tsx`:

```tsx
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
```

- [ ] **Step 3: TeamCard**

Create `web/src/components/ui/TeamCard.tsx`:

```tsx
import { ProfileCard } from "@/components/reactbits/ProfileCard";

export function TeamCard({ member }: { member: { name: string; role: string; photo: string } }) {
  return <ProfileCard name={member.name} role={member.role} imageUrl={member.photo} />;
}
```

> If the imported `ProfileCard` prop names differ, adapt this wrapper to map `member` → the actual props. Keep `TeamCard`'s own signature stable.

- [ ] **Step 4: Services section**

Create `web/src/components/sections/Services.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="WHAT WE DO" title="Cybersecurity, end to end." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: WhyATW section (lighter band)**

Create `web/src/components/sections/WhyATW.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { whyATW } from "@/lib/content";

export function WhyATW() {
  return (
    <section className="border-y border-border bg-surface py-24">
      <Container>
        <SectionHeading eyebrow={whyATW.eyebrow} title={whyATW.title} />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {whyATW.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <FeatureItem title={f.title} body={f.body} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Team section**

Create `web/src/components/sections/Team.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { TeamCard } from "@/components/ui/TeamCard";
import { team } from "@/lib/content";

export function Team() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="MANAGEMENT TEAM" title="The people behind ATW." />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npm run typecheck && npm run build`
Expected: success.

- [ ] **Step 8: Commit**

```bash
git add web/src/components/ui/ServiceCard.tsx web/src/components/ui/FeatureItem.tsx web/src/components/ui/TeamCard.tsx web/src/components/sections/Services.tsx web/src/components/sections/WhyATW.tsx web/src/components/sections/Team.tsx
git commit -m "feat: add services, why-ATW, and team sections"
```

---

### Task 12: CTABand + assemble Home page

**Files:**
- Create: `web/src/components/ui/CTABand.tsx`
- Modify: `web/src/app/page.tsx`

**Interfaces:**
- Consumes: all sections; `Button`, `Container`.
- Produces: `CTABand({title, href, cta})`.

- [ ] **Step 1: CTABand**

Create `web/src/components/ui/CTABand.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTABand({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <section className="py-24">
      <Container>
        <div
          className="rounded-3xl border border-border p-12 text-center"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(34,211,238,0.12), rgba(37,99,235,0.12))" }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <div className="mt-8 flex justify-center">
            <Button href={href}>{cta}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Assemble Home**

Replace `web/src/app/page.tsx` with:

```tsx
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { WhyATW } from "@/components/sections/WhyATW";
import { Team } from "@/components/sections/Team";
import { CTABand } from "@/components/ui/CTABand";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <WhyATW />
      <Team />
      <CTABand title="Secure your organization today." href="/contact" cta="Request a quote" />
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build` then `npm run dev`; load `/` and scroll the full page. Confirm every section renders in order with no console errors.

- [ ] **Step 4: Commit**

```bash
git add web/src/components/ui/CTABand.tsx web/src/app/page.tsx
git commit -m "feat: assemble home page with CTA band"
```

---

### Task 13: Contact validation + email logic (TDD)

**Files:**
- Create: `web/src/lib/contact.ts`
- Create: `web/src/lib/contact.test.ts`
- Create: `web/vitest.config.ts`, `web/vitest.setup.ts`

**Interfaces:**
- Produces:
  - `type ContactInput = { name: string; org: string; email: string; service: string; message: string; honeypot?: string }`
  - `validateContact(input: Partial<ContactInput>): { ok: true; data: ContactInput } | { ok: false; errors: string[] }`
  - `buildEmail(data: ContactInput): { subject: string; text: string }`

- [ ] **Step 1: Vitest config**

Create `web/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"], globals: true },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
```

Create `web/vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 2: Write the failing test**

Create `web/src/lib/contact.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { validateContact, buildEmail } from "./contact";

const valid = { name: "Jane", org: "HIT", email: "jane@hit.ac.zw", service: "Consulting", message: "We need a security audit." };

describe("validateContact", () => {
  it("accepts a complete valid submission", () => {
    const r = validateContact(valid);
    expect(r.ok).toBe(true);
  });

  it("rejects when required fields are missing", () => {
    const r = validateContact({ name: "", org: "", email: "", service: "", message: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.length).toBeGreaterThan(0);
  });

  it("rejects an invalid email", () => {
    const r = validateContact({ ...valid, email: "not-an-email" });
    expect(r.ok).toBe(false);
  });

  it("rejects a too-short message", () => {
    const r = validateContact({ ...valid, message: "hi" });
    expect(r.ok).toBe(false);
  });

  it("treats a filled honeypot as invalid (spam)", () => {
    const r = validateContact({ ...valid, honeypot: "bot" });
    expect(r.ok).toBe(false);
  });
});

describe("buildEmail", () => {
  it("produces a subject and body containing the org and message", () => {
    const r = buildEmail(valid);
    expect(r.subject).toContain("HIT");
    expect(r.text).toContain("We need a security audit.");
    expect(r.text).toContain("jane@hit.ac.zw");
  });
});
```

- [ ] **Step 3: Run test — verify it fails**

Run: `npm test`
Expected: FAIL — `validateContact`/`buildEmail` not found.

- [ ] **Step 4: Implement**

Create `web/src/lib/contact.ts`:

```ts
export type ContactInput = {
  name: string;
  org: string;
  email: string;
  service: string;
  message: string;
  honeypot?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(
  input: Partial<ContactInput>
): { ok: true; data: ContactInput } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (input.honeypot) errors.push("spam");
  const name = (input.name ?? "").trim();
  const org = (input.org ?? "").trim();
  const email = (input.email ?? "").trim();
  const service = (input.service ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name) errors.push("Name is required.");
  if (!org) errors.push("Organization is required.");
  if (!EMAIL_RE.test(email)) errors.push("A valid email is required.");
  if (!service) errors.push("Please select a service.");
  if (message.length < 10) errors.push("Message must be at least 10 characters.");

  if (errors.length) return { ok: false, errors };
  return { ok: true, data: { name, org, email, service, message } };
}

export function buildEmail(data: ContactInput): { subject: string; text: string } {
  return {
    subject: `New enquiry from ${data.org}`,
    text:
      `New website enquiry\n\n` +
      `Name: ${data.name}\n` +
      `Organization: ${data.org}\n` +
      `Email: ${data.email}\n` +
      `Service of interest: ${data.service}\n\n` +
      `Message:\n${data.message}\n`,
  };
}
```

- [ ] **Step 5: Run test — verify it passes**

Run: `npm test`
Expected: PASS (all cases).

- [ ] **Step 6: Commit**

```bash
git add web/src/lib/contact.ts web/src/lib/contact.test.ts web/vitest.config.ts web/vitest.setup.ts
git commit -m "feat: add tested contact validation and email builder"
```

---

### Task 14: Contact API route (Resend)

**Files:**
- Create: `web/src/app/api/contact/route.ts`

**Interfaces:**
- Consumes: `validateContact`, `buildEmail`; env `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
- Produces: `POST /api/contact` → `{ ok: true }` (200) or `{ ok: false, errors }` (400) or `{ ok: false }` (500).

- [ ] **Step 1: Implement the route**

Create `web/src/app/api/contact/route.ts`:

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact, buildEmail } from "@/lib/contact";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid request."] }, { status: 400 });
  }

  const result = validateContact(body as Record<string, string>);
  if (!result.ok) {
    // Honeypot spam: pretend success so bots get no signal.
    if (result.errors.includes("spam")) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, errors: ["Email is not configured."] }, { status: 500 });

  const { subject, text } = buildEmail(result.data);
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "ATW Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? "alexandrawabbs@gmail.com",
      replyTo: result.data.email,
      subject,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, errors: ["Could not send your message. Please try again."] }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: route compiles. (Live send requires `RESEND_API_KEY` in `.env.local`; without it the route returns the 500 "not configured" path, which is correct.)

- [ ] **Step 3: Commit**

```bash
git add web/src/app/api/contact/route.ts
git commit -m "feat: add contact API route with Resend delivery"
```

---

### Task 15: ContactForm + /contact page

**Files:**
- Create: `web/src/components/ui/ContactForm.tsx`
- Create: `web/src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `services`, `contact`; posts to `/api/contact`.

- [ ] **Step 1: ContactForm**

Create `web/src/components/ui/ContactForm.tsx`:

```tsx
"use client";
import { useState } from "react";
import { services } from "@/lib/content";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors([]);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setErrors(json.errors ?? ["Something went wrong."]);
      }
    } catch {
      setStatus("error");
      setErrors(["Network error. Please try again."]);
    }
  }

  const field = "w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-muted focus:border-accent-cyan focus:outline-none";

  if (status === "ok") {
    return <p className="rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 p-6 text-accent-cyan">Thank you — your enquiry has been sent. We&apos;ll be in touch shortly.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input name="name" placeholder="Your name" required className={field} />
      <input name="org" placeholder="Organization" required className={field} />
      <input name="email" type="email" placeholder="Email address" required className={field} />
      <select name="service" required defaultValue="" className={field}>
        <option value="" disabled>Service of interest…</option>
        {services.map((s) => (<option key={s.title} value={s.title}>{s.title}</option>))}
      </select>
      <textarea name="message" placeholder="How can we help?" required rows={5} className={field} />
      {status === "error" && (
        <ul className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          {errors.map((er, i) => (<li key={i}>{er}</li>))}
        </ul>
      )}
      <button type="submit" disabled={status === "sending"} className="rounded-full bg-accent-cyan px-6 py-3 font-medium text-bg transition-colors hover:bg-accent-cyan/90 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: /contact page**

Create `web/src/app/contact/page.tsx`:

```tsx
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
          <p className="mt-6 text-muted">Tell us about your organization and what you need secured. We respond to every enquiry.</p>
          <div className="mt-8 space-y-4 text-muted">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-text"><Mail className="h-5 w-5 text-accent-cyan" />{contact.email}</a>
            <a href={`tel:${contact.phoneHref}`} className="flex items-center gap-3 hover:text-text"><Phone className="h-5 w-5 text-accent-cyan" />{contact.phone}</a>
            <a href={wa} className="flex items-center gap-3 hover:text-text"><MessageCircle className="h-5 w-5 text-accent-cyan" />WhatsApp us</a>
            <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-accent-cyan" />{contact.location}</p>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build && npm run dev`; submit the form with empty fields (expect inline errors), then valid fields (without a Resend key, expect the configured-error message; with a key, expect success).

- [ ] **Step 4: Commit**

```bash
git add web/src/components/ui/ContactForm.tsx web/src/app/contact/page.tsx
git commit -m "feat: add contact form and contact page"
```

---

### Task 16: /product and /services pages

**Files:**
- Create: `web/src/app/product/page.tsx`, `web/src/app/services/page.tsx`

**Interfaces:**
- Consumes: `services`, `solution`; `Container`, `SectionHeading`, `ServiceCard`, `FeatureItem`, `CTABand`, `Reveal`.

- [ ] **Step 1: /product page**

Create `web/src/app/product/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/anim/Reveal";

export const metadata: Metadata = { title: "AI Intrusion Detection & Prevention — ATW" };

const stops = [
  { title: "Obfuscation & encoding", body: "Detects payloads hidden behind encoding tricks meant to bypass signature-based tools." },
  { title: "IP fragmentation", body: "Reassembles and inspects fragmented traffic attackers use to evade inspection." },
  { title: "Denial of service", body: "Identifies and throttles abnormal traffic patterns before services go down." },
  { title: "Application & account hijacking", body: "Flags suspicious session and credential behavior to stop takeovers early." },
];

export default function ProductPage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="THE PRODUCT" title="AI Intrusion Detection & Prevention System." />
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Our flagship system uses artificial intelligence to continuously watch your network, detect suspicious
            activity, raise instant alerts, and actively prevent intrusions — not just log them after the fact.
          </p>
          <div className="mt-16">
            <h2 className="text-2xl font-bold">Evasion techniques it shuts down</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {stops.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}><FeatureItem title={s.title} body={s.body} /></Reveal>
              ))}
            </div>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              { h: "Detect", p: "AI models flag anomalies in real time across your traffic and systems." },
              { h: "Alert", p: "Instant, prioritized alerts so your team knows what matters first." },
              { h: "Prevent", p: "Automated responses block intrusions before they cause damage." },
            ].map((c) => (
              <div key={c.h} className="rounded-2xl border border-border bg-surface p-8">
                <h3 className="font-mono text-accent-cyan">{c.h}</h3>
                <p className="mt-3 text-muted">{c.p}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTABand title="See the system protect your network." href="/contact" cta="Request a demo" />
    </>
  );
}
```

- [ ] **Step 2: /services page**

Create `web/src/app/services/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/anim/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Services & Pricing — ATW Technologies & Forensics" };

export default function ServicesPage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="SERVICES & PRICING" title="Transparent pricing, serious protection." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}><ServiceCard service={s} /></Reveal>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-border bg-surface p-8">
            <h2 className="text-xl font-bold">Discounts for under-resourced institutions</h2>
            <p className="mt-3 text-muted">
              Schools, universities, and healthcare institutions — especially those in remote and under-developed areas —
              qualify for significant discounts. Tell us about your organization and we&apos;ll tailor a quote.
            </p>
          </div>
        </Container>
      </section>
      <CTABand title="Ready to protect your organization?" href="/contact" cta="Request a quote" />
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build && npm run dev`; visit `/product` and `/services`, confirm content, pricing, and CTAs render correctly.

- [ ] **Step 4: Commit**

```bash
git add web/src/app/product/page.tsx web/src/app/services/page.tsx
git commit -m "feat: add product and services pages"
```

---

### Task 17: Favicon, SEO polish, and final QA

**Files:**
- Create: `web/src/app/icon.png` (favicon from logo)
- Create: `web/src/app/sitemap.ts`, `web/src/app/robots.ts`

- [ ] **Step 1: Favicon from the logo**

```bash
cp web/public/brand/atw-logo.png web/src/app/icon.png
```

(Next.js auto-serves `src/app/icon.png` as the favicon.)

- [ ] **Step 2: Sitemap + robots**

Create `web/src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://atwtechnologies.example";
  return ["", "/product", "/services", "/contact"].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
}
```

Create `web/src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://atwtechnologies.example/sitemap.xml" };
}
```

> Replace `atwtechnologies.example` with the real domain once known (also in `layout.tsx` `metadataBase`).

- [ ] **Step 3: Full verification sweep**

Run, expecting success at each gate:
```bash
npm run lint
npm run typecheck
npm test
npm run build
```

- [ ] **Step 4: Visual QA (subagent, fresh eyes)**

Run `npm run dev`, then dispatch a subagent (or manually) to inspect `/`, `/product`, `/services`, `/contact` at mobile (375px) and desktop (1280px) widths. Check: no overlap/overflow, contrast of cyan/blue on dark meets AA, animations run once and respect reduced motion (toggle OS setting), nav drawer works on mobile, footer links resolve. Fix any issues and re-verify.

- [ ] **Step 5: Commit**

```bash
git add web/src/app/icon.png web/src/app/sitemap.ts web/src/app/robots.ts
git commit -m "feat: add favicon, sitemap, robots, and final polish"
```

---

### Task 18: Deployment config

**Files:**
- Create: `web/README.md`

- [ ] **Step 1: README with deploy + env instructions**

Create `web/README.md`:

```markdown
# ATW Technologies & Forensics — Website

Next.js (App Router) brochure site.

## Local development
```bash
cd web
cp .env.local.example .env.local   # fill in RESEND_API_KEY
npm install
npm run dev
```

## Environment variables
- `RESEND_API_KEY` — from https://resend.com
- `CONTACT_TO` — destination inbox (default alexandrawabbs@gmail.com)
- `CONTACT_FROM` — verified Resend sender

## Deploy (Vercel)
1. Import the repo into Vercel.
2. Set **Root Directory** to `web`.
3. Add the env vars above in Project Settings.
4. Deploy. Point the custom domain and update `metadataBase`/`sitemap`/`robots` URLs.
```

- [ ] **Step 2: Commit**

```bash
git add web/README.md
git commit -m "docs: add deployment and env setup readme"
```

---

## Self-Review

**Spec coverage check:**
- Goals (credibility + leads) → Hero, trust sections, contact (Tasks 9–15). ✓
- Tech stack (Next.js/TS/Tailwind/Framer/lucide/Resend) → Tasks 1, 7, 13–14. ✓
- Brand system (palette/fonts/motif/tagline/assets) → Tasks 2, 3. ✓
- IA (Home + /product + /services + /contact) → Tasks 12, 15, 16. ✓
- Page content from deck → Task 4 content module + section/page tasks. ✓
- Contact data flow (validation → honeypot → Resend → feedback) → Tasks 13–15. ✓
- Component breakdown → Tasks 5–12. ✓
- Responsiveness & a11y (reduced-motion, AA, semantic, keyboard) → Tasks 3, 7, 8, 17. ✓
- React Bits mapping (§11) → Particles/DecryptedText/SpotlightCard/ProfileCard (Task 8); hand-written CountUp/ShinyText/GradientText/StarBorder (Task 7); AnimatedContent→`Reveal`. ✓
- Out of scope respected (no blog/CMS/auth/payments). ✓

**Placeholder scan:** No "TODO/TBD"; the two `atwtechnologies.example` and the Wayne/Tarbaby photo mapping are explicitly flagged as confirm-before-launch items, not silent gaps.

**Type consistency:** `Service` type defined in `content.ts` (Task 4) and consumed by `ServiceCard` (Task 11). `ContactInput`/`validateContact`/`buildEmail` defined in Task 13 and consumed by the API route (Task 14) and form data shape (Task 15). `CountUp` prefix/suffix props defined in Task 7 and used in Task 10. Consistent.

## Notes / confirm-before-launch
1. **Team photo mapping** (Wayne vs Tarbaby) — confirm which headshot is whom.
2. **Domain** — replace `atwtechnologies.example` everywhere once chosen.
3. **Resend** — create account + verify sender; for production "from" use a domain address once the domain exists.
4. **React Bits source** — components are copied from reactbits.dev at implementation time; exact prop names may need the small adapter noted in Task 11/Task 8.
