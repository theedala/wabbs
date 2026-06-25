# ATW shelve.cloud-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the ATW marketing site in shelve.cloud's light, typographic, animated design language using ATW's own content.

**Architecture:** Next.js App Router + Tailwind v4 (CSS-first `@theme`). New light design tokens + three fonts (Geist/Newsreader/Space Mono) drive a set of small reusable primitives; pages are composed from section components that mirror shelve's skeleton.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS v4, `next/font/google`, Framer-free CSS/IntersectionObserver animations (reuse existing `Reveal`, `CountUp`).

## Global Constraints

- This repo's Next.js may differ from training data — consult `node_modules/next/dist/docs/` before using any unfamiliar Next API.
- Light theme only. Background `#ffffff`, accent indigo `#4f46e5`.
- Fonts: Geist (sans/UI), Newsreader (serif accent, italic), Space Mono (mono labels/code).
- All motion gated behind `prefers-reduced-motion` (global rule already in `globals.css`).
- Show real prices: Consulting $2,000; AI IDS/IPS $5,000–$15,000; Forensics "Contact for quote".
- Do not copy shelve's text, logo, or images — design language only.
- Commit after each task. Run `npm run build` before committing section tasks.

---

### Task 1: Design tokens + fonts

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: CSS theme tokens `--color-bg`, `--color-bg-subtle`, `--color-ink`, `--color-muted`, `--color-border`, `--color-accent`, `--color-accent-ink`; font vars `--font-geist`, `--font-serif`, `--font-mono`. Tailwind utilities: `bg-bg`, `bg-bg-subtle`, `text-ink`, `text-muted`, `border-border`, `bg-accent`, `text-accent`.

- [ ] **Step 1:** In `layout.tsx`, replace font imports with:
```ts
import { Geist, Newsreader, Space_Mono } from "next/font/google";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["italic", "normal"], variable: "--font-serif", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });
```
Update `<html className={`${geist.variable} ${serif.variable} ${mono.variable}`}>`.

- [ ] **Step 2:** Rewrite `globals.css` `@theme` to light tokens:
```css
@theme {
  --color-bg: #ffffff;
  --color-bg-subtle: #fafafa;
  --color-ink: #0a0a0a;
  --color-muted: #6b7280;
  --color-border: #ececec;
  --color-accent: #4f46e5;
  --color-accent-ink: #ffffff;
  --font-sans: var(--font-geist);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);
}
```
Set `body { background: var(--color-bg); color: var(--color-ink); font-family: var(--font-sans); }`. Headings use `--font-sans`. Add helper classes `.mono-label` (uppercase, `font-mono`, `tracking-[0.15em]`, `text-xs`, `text-muted`) and `.serif-accent` (`font-serif`, `italic`). Keep the reduced-motion block. Add `@keyframes marquee` and `@keyframes caret`.

- [ ] **Step 3:** `npm run build`. Expected: success (site renders light, fonts load). Some existing dark utility classes (`bg-bg`, `text-text`, `accent-cyan`) will look wrong — that's expected; later tasks replace them.

- [ ] **Step 4:** Commit `git add -A && git commit -m "feat: light design tokens + Geist/Newsreader/Space Mono fonts"`.

---

### Task 2: Content data

**Files:**
- Modify: `src/lib/content.ts`
- Modify/Create test: `src/lib/content.test.ts`

**Interfaces:**
- Produces: `products: Product[]` (`{title, blurb, icon}`), updated `services: Service[]` (6 items), `pricing: PricingTier[]` (`{name, price, blurb, features, highlight}`), `faqs: {q,a}[]`, updated `contact` (with `address`), updated `socials` (facebook/linkedin/tiktok/whatsapp), `siteMeta`.

- [ ] **Step 1:** Add `products`:
```ts
export type Product = { title: string; blurb: string; icon: "radar" | "hardhat" | "fraud" };
export const products: Product[] = [
  { title: "AI Intrusion Detection & Prevention", blurb: "Spots suspicious activity, raises instant alerts, and blocks intrusions before they cause damage.", icon: "radar" },
  { title: "AI Mining Safety System", blurb: "AI monitoring that flags hazardous conditions on mining sites and protects workers in real time.", icon: "hardhat" },
  { title: "AI Fraud Detection", blurb: "Detects fraudulent transactions and anomalous behaviour across financial systems as they happen.", icon: "fraud" },
];
```

- [ ] **Step 2:** Replace `services` with the six real services (keep `Service` type, drop per-item price since pricing now lives in `pricing`):
```ts
export const services: Service[] = [
  { title: "Forensic investigation services", description: "...", icon: "search" },
  { title: "Cyber security awareness training", description: "...", icon: "shield" },
  { title: "Installation of security applications & systems", description: "...", icon: "shield" },
  { title: "Cyber security consultancy", description: "...", icon: "shield" },
  { title: "Software development", description: "...", icon: "radar" },
  { title: "Digital forensics & cyber security certifications", description: "...", icon: "search" },
];
```
(Write real one-line descriptions for each.)

- [ ] **Step 3:** Add pricing + faqs:
```ts
export type PricingTier = { name: string; price: string; blurb: string; features: string[]; highlight?: boolean };
export const pricing: PricingTier[] = [
  { name: "Cybersecurity Consulting", price: "$2,000", blurb: "Assessment & hardening of your security posture.", features: ["Full posture assessment","Risk report","Remediation roadmap"] },
  { name: "AI Intrusion Detection & Prevention", price: "$5,000–$15,000", blurb: "Our flagship AI system, deployed for your org.", features: ["Real-time detection & blocking","Evasion-resistant AI","Alerting & dashboards","Local support"], highlight: true },
  { name: "Digital Forensics", price: "Contact for quote", blurb: "Investigation & evidence recovery after an incident.", features: ["Incident investigation","Evidence recovery","Expert reporting"] },
];
export const faqs = [ /* 4-5 {q,a} entries about AI IDS, forensics, pricing discounts, local support */ ];
```

- [ ] **Step 4:** Update `contact` to add `address: "Stand 233 Charlotte Brooke, Borrowdale, Harare"`. Replace `socials` with:
```ts
export type SocialIconName = "facebook" | "linkedin" | "tiktok" | "whatsapp";
export const socials: Social[] = [
  { label: "Facebook", href: "https://www.facebook.com/alexandra.wabatagore", icon: "facebook" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alexandra-wabatagore-0169a1224", icon: "linkedin" },
  { label: "TikTok", href: "https://vm.tiktok.com/ZS966pSLVNYpF-xSdMC/", icon: "tiktok" },
  { label: "WhatsApp", href: "https://wa.me/263771127760", icon: "whatsapp" },
];
```

- [ ] **Step 5:** Test in `content.test.ts`:
```ts
import { products, services, pricing, socials } from "./content";
test("content shape", () => {
  expect(products).toHaveLength(3);
  expect(services).toHaveLength(6);
  expect(pricing.filter(p => p.highlight)).toHaveLength(1);
  expect(socials.map(s => s.icon)).toEqual(["facebook","linkedin","tiktok","whatsapp"]);
});
```
Run `npx vitest run src/lib/content.test.ts`. Expected: PASS. Commit.

---

### Task 3: Core primitives

**Files:**
- Create: `src/components/ui/MonoLabel.tsx`, `src/components/ui/SerifAccent.tsx`, `src/components/ui/HairlineCard.tsx`, `src/components/ui/BrowserFrame.tsx`
- Modify: `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Container.tsx`, `src/components/ui/SectionHeading.tsx`

**Interfaces:**
- Produces: `<MonoLabel>{text}</MonoLabel>`; `<SerifAccent>{word}</SerifAccent>`; `<HairlineCard className? hover?>{children}</HairlineCard>`; `<BrowserFrame label?>{children}</BrowserFrame>`; restyled `Button` (`variant: "primary" | "ghost"`, optional `arrow?: boolean`).

- [ ] **Step 1:** `MonoLabel`: `<span className="mono-label">`. `SerifAccent`: `<span className="font-serif italic">`.
- [ ] **Step 2:** `HairlineCard`: `<div className="rounded-xl border border-border bg-bg p-6 transition-shadow hover:shadow-[0_1px_20px_rgba(0,0,0,0.06)]">`.
- [ ] **Step 3:** `BrowserFrame`: bordered container with a top bar (three dots + optional mono `label`), body holds `children`. Rounded `rounded-xl border border-border overflow-hidden bg-bg-subtle`.
- [ ] **Step 4:** Restyle `Button`: primary = `bg-accent text-accent-ink hover:bg-accent/90`; ghost = `border border-border text-ink hover:border-ink`. Rounded `rounded-lg`. When `arrow`, append `→` span with translate-on-hover.
- [ ] **Step 5:** Update `Badge`/`Container`/`SectionHeading` to light tokens + Geist. `SectionHeading` should accept a `MonoLabel` eyebrow + headline that can contain `SerifAccent`.
- [ ] **Step 6:** `npm run build`. Commit "feat: shelve-style UI primitives".

---

### Task 4: Nav + announcement pill

**Files:**
- Modify: `src/components/layout/Nav.tsx`
- Create: `src/components/layout/AnnouncementBar.tsx`

**Interfaces:**
- Consumes: `nav`, `siteMeta` from content; `Button`.
- Produces: `<AnnouncementBar />`, restyled `<Nav />`.

- [ ] **Step 1:** `AnnouncementBar`: centered full-width strip, `bg-bg-subtle border-b border-border`, mono text `NEW · AI intrusion detection now live →` linking to `/product`.
- [ ] **Step 2:** Rewrite `Nav`: white, `border-b border-border`, `backdrop-blur` + shadow once scrolled (client `useState` + scroll listener, reduced-motion safe). Left `ATW` wordmark (Geist bold), center nav links (muted → ink on hover), right `Button` "Get protected" → `/contact`. Mobile: hamburger → slide-down panel.
- [ ] **Step 3:** In `layout.tsx`, render `<AnnouncementBar />` above `<Nav />`.
- [ ] **Step 4:** `npm run build`. Commit.

---

### Task 5: Hero

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `hero` content, `MonoLabel`, `SerifAccent`, `Button`, `BrowserFrame`, `Reveal`.

- [ ] **Step 1:** Build hero: centered column — `MonoLabel` eyebrow (hero.eyebrow), big Geist headline ~`text-5xl md:text-7xl` with one word wrapped in `SerifAccent` ("Stop intrusions *before* they strike."), muted sub-body, two CTAs ("Get protected" primary+arrow → /contact, "See the products" ghost → /product).
- [ ] **Step 2:** Below, a `BrowserFrame` label `atw — intrusion monitor` containing a styled mock dashboard (CSS only: a sidebar, a list of mock "alerts" rows with status dots, a small bar/spark graphic). No real data.
- [ ] **Step 3:** Wrap pieces in `Reveal` for staggered fade-in. `npm run build`. Commit.

---

### Task 6: Trust strip (marquee)

**Files:**
- Create: `src/components/sections/TrustStrip.tsx`

- [ ] **Step 1:** Mono caption "Trusted by institutions across Zimbabwe". Row of 5–6 placeholder wordmark pills (schools/clinics/banks generic labels) in a `marquee` animation (duplicated track, `animation: marquee 30s linear infinite`), edge fade mask. Reduced-motion: static wrap.
- [ ] **Step 2:** Build + commit.

---

### Task 7: Animated bento grid

**Files:**
- Create: `src/components/sections/Bento.tsx`, `src/components/ui/BentoTile.tsx`

**Interfaces:**
- Produces: `<Bento />` — responsive grid (e.g. 4-col desktop, varied spans) of `BentoTile`s.

- [ ] **Step 1:** `BentoTile` = `HairlineCard` with a `MonoLabel` title, short blurb, and a `visual` slot. Hover lift.
- [ ] **Step 2:** Five tiles mapped to ATW capabilities: `DETECT INTRUSION` (animated scanning line), `BLOCK IN REAL TIME` (toggle/shield pulse), `TRACE THE BREACH` (forensic node graph), `ALERT YOUR TEAM` (toast appearing), `HARDEN POSTURE` (checklist filling). Visuals are CSS/SVG keyframe animations, reduced-motion safe.
- [ ] **Step 3:** Arrange with bento spans (one large feature tile + smaller ones). Build + commit.

---

### Task 8: Feature rows (products)

**Files:**
- Create: `src/components/sections/ProductFeatures.tsx`

**Interfaces:**
- Consumes: `products`, `BrowserFrame`, `MonoLabel`, `SerifAccent`, `Reveal`.

- [ ] **Step 1:** For each of the 3 products, an alternating (text left/right) row: `MonoLabel` kicker, Geist sub-headline w/ serif accent, blurb, a bulleted "what it does" list, and a `BrowserFrame` mock visual on the other side. Alternate order per index.
- [ ] **Step 2:** `Reveal` on scroll. Build + commit.

---

### Task 9: Stats band

**Files:**
- Modify/replace: `src/components/sections/Problem.tsx` → rename concept to `Stats.tsx` (or repurpose Problem).

**Interfaces:**
- Consumes: `problemStats`, `CountUp`, `MonoLabel`.

- [ ] **Step 1:** Full-width `bg-bg-subtle` band, `border-y border-border`. Two/three big Space-Mono numbers via `CountUp` (`96%`, `$24M`) with muted captions. Mono section label.
- [ ] **Step 2:** Build + commit.

---

### Task 10: Why ATW

**Files:**
- Modify: `src/components/sections/WhyATW.tsx`

- [ ] **Step 1:** `MonoLabel` eyebrow + heading with serif accent. Three `HairlineCard`s from `whyATW.features` (icon, title, body). Build + commit.

---

### Task 11: Terminal showcase

**Files:**
- Create: `src/components/sections/Terminal.tsx`

- [ ] **Step 1:** `BrowserFrame`-style terminal (dark inner panel acceptable as accent, or light with mono). Typed-line animation appending sample alert log lines (`[ALERT] blocked IP 41.x.x.x — fragmentation attack`, etc.) with a blinking caret (`@keyframes caret`). Reduced-motion: show full text immediately.
- [ ] **Step 2:** Build + commit.

---

### Task 12: Pricing

**Files:**
- Create: `src/components/sections/Pricing.tsx`

**Interfaces:**
- Consumes: `pricing`, `HairlineCard`, `Button`, `MonoLabel`.

- [ ] **Step 1:** Three `HairlineCard`s; the `highlight` tier gets `border-accent` + a mono "POPULAR" pill + subtle accent tint. Each: name, big price (Space Mono), blurb, feature list with check glyphs, `Button` → /contact.
- [ ] **Step 2:** Build + commit.

---

### Task 13: FAQ accordion

**Files:**
- Create: `src/components/sections/FAQ.tsx`

- [ ] **Step 1:** Client component; hairline rows from `faqs`, each a `<button>` toggling an answer with height/opacity transition and a rotating `+`/`→` glyph. Build + commit.

---

### Task 14: CTA + newsletter + footer

**Files:**
- Modify: `src/components/ui/CTABand.tsx`, `src/components/layout/Footer.tsx`, `src/components/ui/SocialIcon.tsx`
- Create: `src/components/sections/Newsletter.tsx`

**Interfaces:**
- Consumes: `socials`, `contact`, `legalLinks`, `siteMeta`.

- [ ] **Step 1:** Restyle `CTABand` to light: big serif-accented headline, sub, primary CTA, on `bg-bg-subtle` with hairline.
- [ ] **Step 2:** `Newsletter`: mono "Stay updated" label, email input + subscribe button (non-functional/inert or mailto). Hairline framed.
- [ ] **Step 3:** Add `tiktok` icon to `SocialIcon` and remove `x`/`instagram` cases. Rewrite `Footer` to shelve style: brand blurb column + mono link columns (Product, Services, Company), social icons row (FB/LinkedIn/TikTok/WhatsApp), address line, legal links, copyright. Light tokens.
- [ ] **Step 4:** Build + commit.

---

### Task 15: Compose homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1:** Order: `Hero`, `TrustStrip`, `Bento`, `ProductFeatures`, `Stats`, `WhyATW`, `Terminal`, `Pricing`, `FAQ`, `CTABand`, `Newsletter`. (Footer/Nav already in layout.) Remove now-unused `Solution`/`Services`/`Team` imports from homepage if superseded, or keep `Team` as a small "Company" strip if desired.
- [ ] **Step 2:** `npm run build`. Commit.

---

### Task 16: /product page

**Files:**
- Modify: `src/app/product/page.tsx`

- [ ] **Step 1:** Hero-lite header + `ProductFeatures` (all 3 products in depth) + Pricing + CTA. Build + commit.

---

### Task 17: /services page

**Files:**
- Modify: `src/app/services/page.tsx`

- [ ] **Step 1:** Header + six-service grid (`HairlineCard` each, icon + title + description) + CTA. Build + commit.

---

### Task 18: /contact page restyle

**Files:**
- Modify: `src/app/contact/page.tsx`, `src/components/ui/ContactForm.tsx`

**Interfaces:**
- Consumes: existing `/api/contact` route (unchanged).

- [ ] **Step 1:** Restyle to light: left column = mono labels with email/phone/WhatsApp/address; right column = restyled `ContactForm` (hairline inputs, accent button). Keep form logic + API intact; verify `npx vitest run` still passes for `contact.test.ts`.
- [ ] **Step 2:** Build + commit.

---

### Task 19: Final verification

- [ ] **Step 1:** `npm run lint` → clean (fix any unused imports/`accent-cyan` leftovers).
- [ ] **Step 2:** `npm run build` → success.
- [ ] **Step 3:** `npx vitest run` → all pass.
- [ ] **Step 4:** Run the app, screenshot homepage + each page at desktop & mobile; check reduced-motion. Fix visual regressions.
- [ ] **Step 5:** Final commit; offer PR via finishing-a-development-branch.

## Self-Review Notes
- Spec coverage: design system (T1, T3), content incl. new products/services/socials/address (T2, T14), all 12 homepage sections (T4–T15), other pages (T16–T18), animations (T5–T13), pricing real values (T12), verification/testing (T2, T18, T19). ✓
- Icons: new `tiktok` + `hardhat`/`fraud` product icons must be added where icon maps live (SocialIcon T14; product icon map in ProductFeatures T8 / Bento). ✓
- Removed dark `accent-cyan`/`text-text` utilities are swept in T19 lint. ✓
