# ATW Website Redesign — shelve.cloud visual language

**Date:** 2026-06-25
**Status:** Approved (design)

## Goal

Rebuild the ATW Technologies & Forensics marketing site so it adopts the
**look, feel, structure, and animations of [shelve.cloud](https://www.shelve.cloud/)**,
applied to ATW's own brand and content. This is a faithful clone of shelve's
*design language and section skeleton* — not its copy, logo, or proprietary
graphics.

Confirmed decisions:
- **Structure:** full clone of shelve's section skeleton, ATW content inside it.
- **Theme:** light‑first (white), like shelve.
- **Type:** Geist (sans) + Newsreader (serif accent) + Space Mono (mono).
- **Accent:** deep indigo `#4f46e5`.
- **Pricing:** show real prices publicly.
- **Animations:** recreate shelve's motion patterns.

## Design System

### Typography
- **Geist** — UI, nav, headings, body. Loaded via `next/font` (Google) or local.
- **Newsreader** — serif, used italic for one accent word per major heading and
  for pull‑quotes. Loaded via `next/font/google`.
- **Space Mono** — eyebrow micro‑labels (uppercase, letter‑spaced), stat numbers,
  terminal/code blocks, button affordance glyphs (`→`). `next/font/google`.

### Color tokens (CSS variables in `globals.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#ffffff` | page background |
| `--bg-subtle` | `#fafafa` | alternating section surface |
| `--ink` | `#0a0a0a` | primary text |
| `--muted` | `#6b7280` | secondary text |
| `--border` | `#ececec` | hairline borders (shelve signature) |
| `--accent` | `#4f46e5` | indigo — CTAs, active states, highlights |
| `--accent-ink` | `#ffffff` | text on accent |

Flat cards with `1px` hairline borders, generous whitespace, minimal/no heavy
shadows (subtle elevation only on hover).

### Reusable components
- `MonoLabel` — uppercase Space Mono eyebrow.
- `SerifAccent` — wraps a word in Newsreader italic.
- `HairlineCard` — bordered flat card, hover lift.
- `BrowserFrame` — bordered "app window" wrapper for product mockups.
- Restyle existing `Button`, `Badge`, `Container`, `SectionHeading`.

## Content Mapping (new content from client)

### Products (`/product` + homepage)
1. **AI Intrusion Detection & Prevention System** (flagship)
2. **AI Mining Safety System**
3. **AI Fraud Detection System**

### Services (`/services`)
1. Forensic investigation services
2. Cyber security awareness training
3. Installation of cyber security applications & systems
4. Cyber security consultancy
5. Software development
6. Digital forensics & cyber security certifications

### Pricing (real)
- Cybersecurity Consulting — **$2,000 USD**
- AI Intrusion Detection & Prevention — **$5,000–$15,000 USD**
- Digital Forensics — **Contact for quote**

### Contact
- Email: `alexandrawabbs@gmail.com`
- Phone / WhatsApp: `+263 77 112 7760`
- Address: **Stand 233 Charlotte Brooke, Borrowdale, Harare**
- Location label: Harare, Zimbabwe

### Socials (real links; drop unused placeholders)
- Facebook — https://www.facebook.com/alexandra.wabatagore
- LinkedIn — https://www.linkedin.com/in/alexandra-wabatagore-0169a1224
- TikTok — https://vm.tiktok.com/ZS966pSLVNYpF-xSdMC/
- WhatsApp — via phone number
- (Remove X and Instagram placeholders — no accounts.)

### Team
- Alexandra Wabatagore — CEO & Founder · Digital Forensic Scientist.

## Homepage Section Skeleton (clone of shelve)

1. **Announcement pill** — centered mono pill: `NEW · AI intrusion detection now live →`
2. **Sticky nav** — `ATW` wordmark · Product / Services / Company / Contact · "Get protected" CTA. Hairline bottom border, blur on scroll.
3. **Hero** — mono eyebrow, large Geist headline with one Newsreader‑italic accent word ("Stop intrusions *before* they strike."), sub‑body, primary + secondary CTA, then a `BrowserFrame` product mockup (stylized intrusion‑detection dashboard).
4. **Trust strip** — mono "Trusted by institutions across Zimbabwe" + placeholder marks, subtle marquee.
5. **Animated bento grid** — shelve's centerpiece. Tiles: `Detect intrusion`, `Block in real time`, `Trace the breach`, `Alert your team`, `Harden posture` — each a mini animated UI demo.
6. **Alternating feature rows** — text + mockup, one per flagship product.
7. **Stats band** — Space Mono big numbers (`96%`, `$24M`) on `--bg-subtle`, count‑up animation.
8. **Why ATW** — three hairline cards (AI defeats evasion / local support / accessible pricing).
9. **Terminal / CLI showcase** — Space Mono terminal block with typing animation, sample alert log.
10. **Pricing** — three hairline cards, accent‑highlighted middle tier.
11. **FAQ accordion** — hairline rows, expand animation.
12. **Final CTA band** + **newsletter** ("Stay updated" mono input) + **footer** — mono link columns, social icons (incl. TikTok), legal, address.

## Other Pages (full reskin on same system)
- `/product` — three product deep‑dive blocks.
- `/services` — six‑service grid.
- `/contact` — keep existing working form + `/api/contact` route, restyled; show address + map block.

## Animations (recreate shelve's motion)
- Scroll reveal (fade + translate) via existing `Reveal`.
- Bento tiles: hover lift + a looping micro‑animation per tile (pulse/scan/log‑append).
- Trust strip: slow horizontal marquee.
- Stats: count‑up on enter (existing `CountUp`).
- Terminal: typed‑line animation.
- Nav: blur/border on scroll.
- All gated behind `prefers-reduced-motion`.

## Out of Scope
- Backend changes beyond keeping the contact API working.
- Real product screenshots (use styled mockups/placeholders).
- Auth, dashboards, or any app functionality (marketing site only).

## Testing
- `content.ts` shape stays type‑checked; existing `contact.test.ts` keeps passing.
- `npm run build` succeeds; `npm run lint` clean.
- Manual visual pass at mobile / tablet / desktop; reduced‑motion check.
