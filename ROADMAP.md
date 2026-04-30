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

## Section order (actual — as built)

```
Header/Nav
  └─ Sticky · simplified anchors · EN/ES toggle · Book / Call CTAs

Hero
  └─ Full-viewport · headline · proof hint · 2 CTAs

Why CLP — trust strip
  └─ Horizontal band of 5 icon callouts (differentiators)

Social proof
  └─ Star rating block + rotating testimonials

Promotions
  └─ Current special offer card

Popular treatments
  └─ 8 cards · expandable inline drawer on click

Gallery — Before / After
  └─ 48 comparison slider cards · 6 categories · filter pills

Team / Providers
  └─ 6 providers · CSS avatar placeholders · trust callout embedded

FAQ
  └─ 8-question accordion

Policies
  └─ Collapsed accordion by default

Location & Hours + Contact strip
  └─ Map embed + hours + address + click-to-call/email/social

Footer
  └─ Logo + nav + hours + social + legal

Mobile action bar (fixed)
  └─ Call · Book · Directions — persistent on mobile
```

---

## Sections checklist (Phase 1 — must-have)

- [x] **Header / Nav**
  - [x] Sticky header, transparent → solid on scroll
  - [x] Anchors: Services · Gallery · Team · Location
  - [x] Primary CTAs: **Book** (rose) · **Call** (ghost)
  - [x] EN/ES toggle — visible, obvious, top-right
  - [x] Mobile: hamburger + full-screen slide menu

- [x] **Hero**
  - [x] Full viewport height
  - [x] Animated gradient orbs background (CSS-only, no JS)
  - [x] Headline: "Where Miami Gets Its Glow"
  - [x] Subline: provider credentials + location
  - [x] CTAs: Book Your Visit · Call Us
  - [x] Proof hint: ★ 4.9 · 500+ Reviews · Since 2014
  - [x] Scroll indicator

- [x] **Why CLP — trust strip**
  - [x] 5 horizontal callouts with icons:
    - Medical Director on Staff
    - Since 2014 — 10+ Years
    - Pain-Free Sapphire Laser
    - Bilingual Team (EN/ES)
    - Cherry & CareCredit Financing
  - [ ] ~~Background: `--teal`~~ → changed to `--navy` per user direction

- [x] **Promotions**
  - [x] Slim card banner
  - [x] "20% off your first laser session — new clients only"
  - [ ] Dismissible (top promo-banner is dismissible; section card is not)

- [x] **Social proof**
  - [x] Large star rating display (4.9 / 500+ reviews)
  - [x] 6 rotating testimonials with name + service tag
  - [x] "Real results, real people" tone

- [x] **Popular treatments**
  - [x] 8 cards in responsive grid
  - [x] Each: icon · name · one-line description · expand drawer
  - [x] Drawer shows: benefits · cadence · downtime · financing note
  - [x] Footer disclaimer per card: "Results vary; consultation required."
  - [x] Treatments: Laser Hair Removal · Botox & Dysport · Dermal Fillers · Facials & PRP · Body Sculpting · Tattoo Removal · IV Therapy · Hormone Optimization

- [x] **Before / After gallery**
  - [x] 48 comparison slider cards (8 per category × 6 categories) — upgraded from original 6 pairs
  - [x] Category filter pills: Laser Hair · Botox · Lips · Facial & PRP · Body · Tattoo
  - [x] Mousemove + touch comparison slider (no click needed, instant, stays at last position)
  - [x] Disclaimer: "Results vary. Photos shared with patient consent."
  - [ ] ~~Lightbox viewer~~ → replaced by comparison slider UX

- [x] **Team / Providers**
  - [x] 6 primary providers with real names + titles:
    - Dr. Otto Marquez Mendoza — Medical Director
    - George J. Burns — Owner · Paramedic · Laser Safety Officer
    - Midy Silverio Burns — Owner · Paramedic · CME · Aesthetician
    - Yadenis Achiong — Lead APRN Nurse Practitioner
    - Giovanna Benito — Nurse Practitioner
    - Angela Hidalgo — Lead Facial Specialist & Aesthetician
  - [x] CSS avatar placeholders (initials) for prototype
  - [x] Friendly, credential-focused copy

- [x] **Trust & safety callout**
  - [x] Medical oversight / licensing language — embedded at bottom of Team section
  - [x] Pain-conscious protocol mention — in trust strip + treatment drawers

- [x] **Location & Hours**
  - [x] Google Maps iframe embed
  - [x] Address: 8501 SW 124th Ave #212a, Miami, FL 33183
  - [x] Hours grid
  - [x] Parking/arrival note

- [ ] **Booking modal** ← PENDING (replaces old Booking section)
  - [ ] Modal overlay triggered by all Book buttons (6 unique IDs already in place)
  - [ ] PatientNow link placeholder → to be confirmed
  - [ ] Financing badges: Cherry + CareCredit
  - [ ] "Not sure what to book?" consult-first option

- [x] **Contact info** ← merged into Location section + Footer
  - [x] Click-to-call: 305-456-1170
  - [x] Email: NewMe@CLPMedSpa.com
  - [x] Instagram + Facebook links
  - [ ] ~~Contact form~~ → removed per user direction

- [x] **FAQ**
  - [x] 8 questions accordion:
    - Does laser hair removal hurt?
    - How many sessions will I need?
    - Is it safe for dark skin tones?
    - How long does Botox last?
    - What is your cancellation policy?
    - Do you offer financing?
    - What should I do before my appointment?
    - Is there medical supervision on-site?

- [x] **Policies**
  - [x] 24-hour cancellation · late policy · check-in
  - [x] Collapsed by default, readable when expanded

- [x] **Footer**
  - [x] Logo + tagline
  - [x] Quick nav links
  - [x] Hours + address
  - [x] Social: Instagram + Facebook
  - [x] Legal: © 2025 CLP Med Spa · All rights reserved

---

## Conversion checklist (mobile-first)

- [x] Persistent mobile bottom bar: 📞 Call · 📅 Book · 📍 Directions
- [x] CTA repeated after: Hero → Social Proof → Treatments
- [x] Click-to-call, click-to-map, click-to-book within 1–2 taps always
- [x] Financing mention on treatment cards + trust strip

---

## Motion checklist

- [x] Respect `prefers-reduced-motion` everywhere — all animations disabled
- [x] Scroll reveals: Intersection Observer → opacity + translateY, long ease
- [x] Hero orbs: CSS `@keyframes` drift (slow, subtle, gold/rose/teal)
- [x] Testimonial rotation: opacity crossfade, 5s interval
- [x] Hover micro-interactions: lift + gold glow on cards
- [x] Accordion transitions: CSS max-height animation
- [x] Header: smooth background transition on scroll
- [x] No jarring, noisy, or distracting effects
- [x] Gallery comparison slider: instant response, no transition on clip-path

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
- [ ] Build booking modal (all 6 Book button IDs already wired: hero-book-btn, nav-book-btn, treatments-book-btn, promo-book-btn, mob-book-btn, mobile-book-btn)
- [ ] Decide if before/after gallery needs age gate (Florida regulations)
- [ ] SEO: add service subpages only if organic search becomes a goal
- [ ] Consider embedding PatientNow iframe vs. link-out (iframe adds complexity)
- [ ] Background blend between trust strip / promotions — user not satisfied yet
