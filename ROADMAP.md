# ROADMAP — Cosmetic Laser Professionals (better version) prototype

**Who we are building for**
- **Clinic/site**: Cosmetic Laser Professionals (better version) prototype
- **Reference**: `https://www.cosmeticlaserprofessionals.com`
- **Niche**: Med spa
- **Location**: Miami

**Real business data (locked)**
- Address: 8501 SW 124th Ave #212a, Miami, Florida 33183
- Phone: 305-456-1170
- Email: NewMe@CLPMedSpa.com
- Hours: Mon–Fri 10am–7pm · Sat 11am–3pm · Sun Closed
- Booking platform: PatientNow
- Financing: Cherry Financing · CareCredit
- Social: Instagram @clp_medspa · Facebook CLP.med.spa
- Operating since: 2014

**Output we want**
- A **more premium, less generic** website than the reference (mobile-first, conversion-focused).
- A single-page marketing experience where the user can quickly: **Book, Call, Get Directions, Trust the providers**.

**Constraints**
- **No cream or gray** as dominant neutrals — ever.
- Make it **dynamic without breaking elegance** (subtle effects; respect reduced motion).
- **Languages**: EN primary + ES toggle (simple data-en/data-es attribute swap via JS — no i18n library).

---

## Design system (locked before coding)

### Color tokens
| Token | Value | Usage |
|---|---|---|
| `--navy` | `#0A0E1A` | Base background |
| `--navy-deep` | `#060810` | Deeper alternate sections |
| `--teal` | `#0D3D4A` | Alternate section tint |
| `--gold` | `#C9A96E` | Primary accent — labels, borders, highlights |
| `--gold-light` | `#DFC08A` | Hover / lighter gold |
| `--rose` | `#E8748A` | Secondary accent — primary CTAs |
| `--white` | `#FFFFFF` | Body text |
| `--white-70` | `rgba(255,255,255,0.7)` | Secondary text |
| `--white-40` | `rgba(255,255,255,0.4)` | Tertiary / captions |
| `--gold-10` | `rgba(201,169,110,0.1)` | Subtle card tints |

> **No violet. No cream. No gray fills as primary surfaces.**

### Typography
- **Display / Headings**: Cormorant Garamond (Google Fonts) — weights 400, 600, 700 italic
- **Body / UI**: DM Sans (Google Fonts) — weights 300, 400, 500, 600
- Fluid sizing with `clamp()` — no hard px breakpoints for type
- Section labels: 0.75rem · DM Sans · uppercase · letter-spacing 0.15em · gold
- H1: clamp(3rem, 8vw, 7rem)
- H2: clamp(2rem, 4vw, 3.5rem)

### Layout rhythm
- Sections alternate: `--navy` → `--navy-deep` → `--teal` (never two teal in a row)
- Consistent vertical padding: `clamp(5rem, 10vw, 9rem)` per section
- Not everything centered — mix left-aligned and centered layouts
- **No repetitive card grid everywhere**: each section gets a distinct layout type (see per-section notes)

---

## Section order (locked)

```
Header/Nav
  └─ Sticky · simplified anchors · EN/ES toggle · Book / Call CTAs

Hero
  └─ Full-viewport · headline · proof hint · 2 CTAs

Why CLP — trust strip  ← NEW (between hero and social proof)
  └─ Horizontal band of 5 icon callouts (differentiators)

Promotions banner  ← NEW
  └─ Current special offer card (dismissible)

Social proof
  └─ Star rating block + rotating testimonials

Popular treatments (card grid — justified for scannability)
  └─ 8 cards · expandable inline drawer on click

Gallery — Before / After
  └─ CSS grid · lightbox viewer · consent + disclaimer

Team / Providers
  └─ Horizontal scroll rail (mobile) · 3-col grid (desktop)

Location & Hours
  └─ Map embed + hours grid + address + parking note

Booking  ← PatientNow link (not SalonRunner/Rosy)
  └─ Big CTA · financing badges · "Not sure? Book a free consult" fallback

Contact
  └─ Quick form + click-to-call + email

FAQ  ← NEW
  └─ Accordion — pre-booking objections

Policies
  └─ Collapsed accordion by default

Footer
  └─ Social + hours + address + legal
```

---

## Sections checklist (Phase 1 — must-have)

- [ ] **Header / Nav**
  - [ ] Sticky header, transparent → solid on scroll
  - [ ] Anchors: Services · Gallery · Team · Location
  - [ ] Primary CTAs: **Book** (rose) · **Call** (ghost)
  - [ ] EN/ES toggle — visible, obvious, top-right
  - [ ] Mobile: hamburger + full-screen slide menu

- [ ] **Hero**
  - [ ] Full viewport height
  - [ ] Animated gradient orbs background (CSS-only, no JS)
  - [ ] Headline: "Where Miami Gets Its Glow"
  - [ ] Subline: provider credentials + location
  - [ ] CTAs: Book Your Visit · Call Us
  - [ ] Proof hint: ★ 4.9 · 500+ Reviews · Since 2014
  - [ ] Scroll indicator

- [ ] **Why CLP — trust strip**
  - [ ] 5 horizontal callouts with icons:
    - Medical Director on Staff
    - Since 2014 — 10+ Years
    - Pain-Free Sapphire Laser
    - Bilingual Team (EN/ES)
    - Cherry & CareCredit Financing
  - [ ] Background: `--teal`

- [ ] **Promotions**
  - [ ] Dismissible banner or bold card
  - [ ] Placeholder: "20% off your first laser session — mention this offer"

- [ ] **Social proof**
  - [ ] Large star rating display (4.9 / 500+ reviews)
  - [ ] 6 rotating testimonials with name + service tag
  - [ ] "Real results, real people" tone

- [ ] **Popular treatments**
  - [ ] 8 cards in responsive grid
  - [ ] Each: icon · name · one-line description · expand drawer
  - [ ] Drawer shows: benefits · cadence · downtime · financing note
  - [ ] Footer disclaimer per card: "Results vary; consultation required."
  - [ ] Treatments: Laser Hair Removal · Botox & Dysport · Dermal Fillers · Facials & PRP · Body Sculpting · Tattoo Removal · IV Therapy · Hormone Optimization

- [ ] **Before / After gallery**
  - [ ] 6 before/after pairs (CSS gradient placeholders for prototype)
  - [ ] Lightbox viewer (click to expand, ESC to close)
  - [ ] Disclaimer: "Photos shared with patient consent. Results vary."

- [ ] **Team / Providers**
  - [ ] 6 primary providers with real names + titles:
    - Dr. Otto Marquez Mendoza — Medical Director
    - George J. Burns — Owner · Paramedic · Laser Safety Officer
    - Midy Silverio Burns — Owner · Paramedic · CME · Aesthetician
    - Yadenis Achiong — Lead APRN Nurse Practitioner
    - Giovanna Benito — Nurse Practitioner
    - Angela Hidalgo — Lead Facial Specialist & Aesthetician
  - [ ] CSS avatar placeholders (initials) for prototype
  - [ ] Friendly, credential-focused copy

- [ ] **Trust & safety callout**
  - [ ] Medical oversight / licensing language
  - [ ] Pain-conscious protocol mention
  - [ ] Embedded in team or booking section

- [ ] **Location & Hours**
  - [ ] Google Maps iframe embed
  - [ ] Address: 8501 SW 124th Ave #212a, Miami, FL 33183
  - [ ] Hours grid
  - [ ] Parking/arrival note

- [ ] **Booking**
  - [ ] Primary CTA → PatientNow (link placeholder — to be updated)
  - [ ] Phone fallback: 305-456-1170
  - [ ] Financing badges: Cherry + CareCredit  ← NEW
  - [ ] "Not sure what to book?" consult-first option
  - [ ] Section background: `--navy` with gold accents

- [ ] **Contact**
  - [ ] Name + Phone/Email + Message form
  - [ ] Click-to-call: 305-456-1170
  - [ ] Email: NewMe@CLPMedSpa.com
  - [ ] SMS opt-in note (optional)

- [ ] **FAQ** ← NEW
  - [ ] 8 questions accordion:
    - Does laser hair removal hurt?
    - How many sessions will I need?
    - Is it safe for dark skin tones?
    - How long does Botox last?
    - What is your cancellation policy?
    - Do you offer financing?
    - What should I do before my appointment?
    - Is there medical supervision on-site?

- [ ] **Policies**
  - [ ] 24-hour cancellation · late policy · check-in
  - [ ] Collapsed by default, readable when expanded

- [ ] **Footer**
  - [ ] Logo + tagline
  - [ ] Quick nav links
  - [ ] Hours + address
  - [ ] Social: Instagram + Facebook
  - [ ] Legal: © 2025 CLP Med Spa · All rights reserved

---

## Conversion checklist (mobile-first)

- [ ] Persistent mobile bottom bar: 📞 Call · 📅 Book · 📍 Directions
- [ ] CTA repeated after: Hero → Social Proof → Treatments → Booking
- [ ] Click-to-call, click-to-map, click-to-book within 1–2 taps always
- [ ] Financing mention on treatment cards + booking section

---

## Motion checklist

- [ ] Respect `prefers-reduced-motion` everywhere — all animations disabled
- [ ] Scroll reveals: Intersection Observer → opacity + translateY, long ease
- [ ] Hero orbs: CSS `@keyframes` drift (slow, subtle, gold/rose/teal)
- [ ] Testimonial rotation: opacity crossfade, 5s interval
- [ ] Hover micro-interactions: lift + gold glow on cards
- [ ] Accordion transitions: CSS max-height animation
- [ ] Header: smooth background transition on scroll
- [ ] No jarring, noisy, or distracting effects

---

## Tech stack (locked)

- **Plain HTML + CSS + Vanilla JS** — no framework, no build step
- Single `index.html` + `css/styles.css` + `js/main.js`
- Google Fonts via `<link>` (Cormorant Garamond + DM Sans)
- Zero external JS dependencies
- EN/ES: `data-en` / `data-es` attribute swap (JS handles it)
- Google Maps: iframe embed
- Booking: external link to PatientNow (placeholder)

---

## Open decisions (post-prototype)

- [ ] Replace CSS avatar/gallery placeholders with real clinic photos
- [ ] Confirm PatientNow booking URL and replace `#` placeholder
- [ ] Decide if before/after gallery needs age gate (Florida regulations)
- [ ] SEO: add service subpages only if organic search becomes a goal
- [ ] Consider embedding PatientNow iframe vs. link-out (iframe adds complexity)
