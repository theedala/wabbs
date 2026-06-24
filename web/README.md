# ATW Technologies & Forensics — Website

Next.js (App Router) brochure site for ATW Technologies and Forensics.

## Local development

```bash
cd web
cp .env.local.example .env.local   # fill in RESEND_API_KEY
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm test` — Vitest unit tests

## Environment variables

- `RESEND_API_KEY` — from https://resend.com (required for the contact form to send)
- `CONTACT_TO` — destination inbox (default `alexandrawabbs@gmail.com`)
- `CONTACT_FROM` — verified Resend sender (default `onboarding@resend.dev`)

## Deploy (Vercel)

1. Import the repo into Vercel.
2. Set **Root Directory** to `web`.
3. Add the env vars above in Project Settings.
4. Deploy, then point the custom domain and update the `metadataBase` in
   `src/app/layout.tsx` and the base URLs in `src/app/sitemap.ts` / `src/app/robots.ts`.

## Confirm before launch

- **Team photos:** verify the Wayne/Tarbaby headshot mapping in `public/team/`.
- **Domain:** replace `https://atwtechnologies.example` everywhere once chosen.
- **Resend:** create an account and verify a sender domain for production email.
