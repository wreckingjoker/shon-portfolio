# CLAUDE.md — Shon Varghese Portfolio

---

## ALWAYS DO FIRST (Every Session, No Exceptions)

1. Read the styling skill at `.claude/skills/styling/SKILL.md` before writing any frontend code
2. Read the webgl-3d skill at `.claude/skills/webgl-3d/SKILL.md` before touching any 3D component
3. Read `.claude/skills/styling/tokens-template.md` before setting up any CSS tokens
4. Read this entire CLAUDE.md before starting any task
5. Check `brand_assets/` folder for logos, colors, or fonts before designing anything
6. Never start coding without completing steps 1–5

---

## Visual Reference

- **Primary:** https://solais.ai/ — Study before every build session
- Dark, cinematic, scroll-driven, minimal but powerful
- Every section must feel like a premium agency site
- Screenshot your output, compare against solais.ai reference, fix mismatches, re-screenshot
- Do NOT stop after a single pass — iterate until it matches the reference quality

---

## Local Server & Screenshot Workflow

```bash
# Start dev server (background)
npm run dev   # runs on http://localhost:5173

# Always screenshot from localhost — NEVER from file:///
# After every major component build:
# 1. Take screenshot
# 2. Read the screenshot visually
# 3. Compare against solais.ai reference
# 4. List specific mismatches (e.g. "heading too small", "gap wrong", "color off")
# 5. Fix mismatches
# 6. Re-screenshot
# 7. Repeat until quality matches reference
```

**Screenshot checklist after every component:**

- [ ] Spacing/padding matches design tokens
- [ ] Font sizes and weights are correct
- [ ] Colors match exact hex values from design system
- [ ] Animations trigger correctly on scroll
- [ ] Mobile layout is clean and functional
- [ ] No console errors or warnings

---

## Owner Identity

- **Name:** Shon Varghese
- **Title:** AI Automation Developer & AI Creative Strategist
- **Location:** Dubai, United Arab Emirates
- **Email:** shonvarghesevenad@gmail.com
- **Phone:** +971 505513554
- **LinkedIn:** www.linkedin.com/in/shonv
- **Tone:** Confident, technical but human — no corporate fluff, no buzzword overload

---

## Tech Stack (NEVER deviate)

| Layer            | Technology                             |
| ---------------- | -------------------------------------- |
| Framework        | Vite + React + TypeScript              |
| 3D / WebGL       | React Three Fiber + @react-three/drei  |
| Scroll Animation | GSAP + ScrollTrigger                   |
| Smooth Scroll    | Lenis                                  |
| Styling          | Tailwind CSS v4 + CSS Variables        |
| Icons            | Lucide React                           |
| Fonts            | Syne (display) + DM Mono (mono/labels) |
| Deploy           | Vercel (free)                          |

---

## Design System

### Color Palette (use ONLY these — never default Tailwind colors)

```css
@theme {
  --color-bg: #050505; /* near black — page background */
  --color-surface: #0f0f0f; /* cards, panels */
  --color-elevated: #161616; /* hover states, elevated cards */
  --color-border: #1a1a1a; /* subtle borders */
  --color-primary: #00d4ff; /* electric cyan — main accent */
  --color-secondary: #7b2fff; /* deep violet — AI creative accent */
  --color-text: #f0f0f0; /* primary text */
  --color-muted: #666666; /* secondary text, labels */
  --color-dim: #333333; /* disabled, placeholders */
}
```

### Typography (never use Inter, Roboto, Arial, system-ui)

```css
@theme {
  --font-display: "Syne", sans-serif; /* all headings, hero text */
  --font-mono: "DM Mono", monospace; /* tags, labels, numbers, code */
}
/* Import in index.html:
   https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap
*/
```

### Spacing Scale (stick to this — no random Tailwind steps)

```css
@theme {
  --space-xs: 0.5rem; /*  8px */
  --space-sm: 1rem; /* 16px */
  --space-md: 2rem; /* 32px */
  --space-lg: 4rem; /* 64px */
  --space-xl: 8rem; /* 128px — section padding */
  --space-2xl: 12rem; /* 192px — hero padding */
}
```

### Animation Tokens

```css
@theme {
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
  --dur-fast: 0.4s;
  --dur-mid: 0.8s;
  --dur-slow: 1.2s;
}
```

### Shadow System (never flat shadow-md — layered tinted shadows only)

```css
/* Default card shadow */
box-shadow:
  0 4px 6px -1px rgba(0, 212, 255, 0.05),
  0 20px 40px -8px rgba(0, 212, 255, 0.08);

/* Hover glow */
box-shadow:
  0 0 20px rgba(0, 212, 255, 0.15),
  0 20px 60px rgba(0, 212, 255, 0.1);
```

### Surface Layering System

```
Level 0 — Page background:   #050505
Level 1 — Section surface:   #0f0f0f
Level 2 — Cards/panels:      #161616
Level 3 — Floating/tooltip:  #1f1f1f
```

---

## Anti-Generic Hard Rules

- **NEVER** use default Tailwind palette (indigo-500, blue-600, etc.)
- **NEVER** use `transition-all` — only animate `transform` and `opacity`
- **NEVER** use the same font for headings and body text
- **NEVER** use purple gradients on white backgrounds
- **NEVER** use flat single-surface layouts — always use the layering system above
- **NEVER** skip hover, focus-visible, and active states on any interactive element
- **NEVER** use `will-change` without a specific intentional reason
- **ALWAYS** add gradient overlays on images: `background: linear-gradient(to top, rgba(0,0,0,0.7), transparent)`
- **ALWAYS** layer multiple radial gradients on backgrounds — never solid flat color
- **ALWAYS** add SVG grain/noise texture on hero section at 3% opacity
- **DO NOT** add sections, features, or content not listed in this file
- **DO NOT** "improve" the design direction — follow the spec exactly

---

## Site Sections (BUILD IN THIS ORDER)

### 1. Navbar

- `position: fixed`, `top: 0`, `z-index: 100`, full width
- Default: fully transparent
- On scroll (>50px): `backdrop-filter: blur(20px)` + `background: rgba(5,5,5,0.85)` + `border-bottom: 1px solid #1a1a1a`
- Left: "SV" monogram — Syne 800, `--color-primary`
- Right: nav links — DM Mono, `--color-muted` → `--color-text` on hover
- Links: `Work / Skills / Videos / Clients / Contact`
- Mobile: hamburger → full-screen overlay menu

### 2. Hero (Full Viewport — 100dvh)

- R3F Canvas: `position: absolute`, full viewport, behind all text, `pointer-events: none`
- Particle system: 500 max desktop / 200 mobile, `#00d4ff`, slow ambient drift
- Page background layered radial gradients:
  ```css
  background:
    radial-gradient(
      ellipse 80% 50% at 20% 40%,
      rgba(0, 212, 255, 0.04) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse 60% 40% at 80% 60%,
      rgba(123, 47, 255, 0.04) 0%,
      transparent 60%
    ),
    #050505;
  ```
- SVG grain texture overlay, opacity 0.03
- Hero text (centered or left-aligned — match solais.ai layout):
  - "SHON VARGHESE" — Syne 800, `clamp(3rem, 8vw, 7rem)`, `--color-text`
  - "AI Automation Developer & AI Creative Strategist" — Syne 400, `--color-muted`
  - Location pill: "📍 Dubai, UAE" — DM Mono, `--color-surface` bg, `1px solid --color-primary`
- Bottom center: scroll arrow, CSS bounce keyframe animation
- Load animation: GSAP stagger, `opacity: 0→1`, `y: 30→0`, stagger `0.15s`

### 3. About (Scroll-Pinned Word Reveal)

- GSAP ScrollTrigger: `pin: true`, `scrub: 1`
- Bio text: _"I build AI systems that work while you sleep — and create video ads that make people stop scrolling."_
- Each word reveals as user scrolls (opacity/clip-path per word span)
- Stat counters animate on scroll enter (GSAP countTo):
  - `100+` Clients Served
  - `2+` Years Building AI
- Stat numbers: Syne bold, large, `--color-primary`

### 4. AI Automation Projects — "What I've Built"

- 2×2 grid desktop / 1 col mobile
- Card background: `--color-surface`, border: `1px solid --color-border`
- Hover: border → `--color-primary`, layered cyan glow shadow
- 3D tilt on hover: CSS `perspective: 1000px` + JS `rotateX/Y` on `mousemove` — NOT WebGL
- Projects:
  1. **WordPress Blog Automation** — OpenAI API + n8n + REST API
     > Auto-publishes SEO-optimised blog content daily without human input
  2. **Multi-Agent SEO Optimizer** — SERP scraping + AI summarization + humanization
     > Generates competitor-beating long-form content at scale
  3. **AI Gmail Manager** — Real-time classification + auto-labeling + AI responses
     > Eliminated repetitive email triage for marketing teams
  4. **Google Maps Lead Gen** — Apify + deduplication + Google Sheets
     > Delivered structured, clean lead lists automatically
- Tool tags: DM Mono pills, `--color-surface` bg, `1px solid --color-primary`
- GSAP stagger reveal: `y: 60→0`, `opacity: 0→1`, stagger `0.15s`

### 5. AI Video Work — "AI Ads I've Created"

- Grid of 16:9 thumbnail cards
- Overlay: `linear-gradient(to top, rgba(0,0,0,0.7), transparent)`
- Centered play icon (Lucide `Play`), `scale: 1→1.1` on hover
- Caption: client industry (Syne) + tools (DM Mono pills, muted)
- Click → opens YouTube/Vimeo link in new tab
- GSAP stagger reveal: slide up, `0.1s` stagger
- Tools across videos: Higgsfield, HeyGen, Grok, InVideo, Google Veo, Google Flow, Leonardo AI, OpenArt AI, Suno AI, CapCut
- **[PLACEHOLDER: YouTube links + thumbnails to be added to public/thumbnails/]**

### 6. Skills — "My Arsenal"

- Two columns: **AI Automation** | **AI Creative**
- Vertical `1px solid --color-primary` divider between columns
- Pills: DM Mono, `--color-surface` bg, `1px solid --color-border` → `--color-primary` border on hover
- AI Automation: n8n, OpenAI API, Multi-Agent Systems, LangChain, Python, FastAPI, Supabase, REST APIs, Prompt Engineering, RAG Pipelines, Apify, Google Sheets API
- AI Creative: Higgsfield, HeyGen, Runway ML, ElevenLabs, Leonardo AI, Google Veo, Google Flow, Suno AI, CapCut, Canva, InVideo, OpenArt AI
- GSAP stagger: `scale: 0.8→1`, `opacity: 0→1`, stagger `0.05s`
- **NO skill bars. NO percentages. Pills only.**

### 7. Clients — "Trusted By"

- CSS marquee/rotating logo strip — NOT WebGL
- Logo cards: `--color-surface` bg, `1px solid --color-border`, grayscale filter → color on hover
- Subtle hover glow: `box-shadow: 0 0 20px rgba(0,212,255,0.1)`
- Companies: Just Search UAE, Al Asala Furniture UAE (+ more pending)
- **[PLACEHOLDER: Logo files to be placed in public/logos/ and brand_assets/]**

### 8. Experience Timeline

- Vertical timeline with left cyan border line
- GSAP: `scaleY: 0→1` on the line as user scrolls (origin top)
- Cyan dot at each entry
- Entries:
  - **Just Search, UAE** — AI Marketing Strategist · `Nov 2025 – Present`
  - **Al Asala Furniture, UAE** — AI Marketing Strategist Internship · `Oct – Nov 2025`
- Company: Syne bold, `--color-text`
- Role: Syne regular, `--color-muted`
- Date: DM Mono, `--color-primary`, small

### 9. Contact — "Let's Build Something"

- Large cinematic heading (Syne): _"Available for freelance & full-time opportunities"_
- Three CTA buttons: Email / LinkedIn / Phone
- Button style: outlined (`1px solid --color-border`) → filled `--color-primary` + black text on hover
- Hover transition: `background`, `color`, `border-color` only — no `transition-all`
- Footer: `© 2025 Shon Varghese` + `"Built with AI"` — DM Mono, `--color-muted`, small
- **NO contact form**

---

## Performance Rules — NON NEGOTIABLE

### WebGL / 3D

- **ONE** R3F Canvas — Hero section only, nowhere else
- Max 500 particles desktop / 200 particles mobile
- `BufferGeometry` only — never legacy `Geometry`
- Dispose all geometries, materials, and textures on unmount
- Wrap canvas in React `Suspense` with static gradient fallback

### Device Detection (`src/hooks/useDeviceDetect.ts`)

```ts
const isLowEnd =
  navigator.hardwareConcurrency <= 4 ||
  window.innerWidth < 768 ||
  /Android|iPhone/i.test(navigator.userAgent);
// isLowEnd → skip WebGL, render CSS gradient hero only
```

### Animation Rules

- Scroll animations: GSAP ScrollTrigger exclusively
- Kill ALL ScrollTrigger instances in `useEffect` return/cleanup
- Lenis → GSAP integration:
  ```ts
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- Respect `prefers-reduced-motion` — skip all GSAP, show final state
- Animate `transform` and `opacity` only — never layout properties

### Asset Rules

- Videos: YouTube unlisted embeds only — never host on Vercel
- Logos: SVG preferred, PNG fallback, max 50KB each
- Thumbnails: WebP format, max 200KB each
- Fonts: Google Fonts with `font-display: swap`

### Targets

- Lighthouse Performance: ≥ 85
- First Contentful Paint: < 1.5s
- 60fps desktop / 30fps mobile

---

## Component Rules

- Max 150 lines per component — split if larger
- 3D components: separate files, comment `// WebGL — runs client-side only` at top
- Zero inline styles — Tailwind classes or CSS variables only
- TypeScript strict — zero `any` types
- Every interactive element: `hover:`, `focus-visible:`, `active:` states required

---

## File Structure

```
SHON-PORTFOLIO/
├── .claude/
│   └── skills/
│       ├── skill-builder/
│       │   ├── reference.md
│       │   └── SKILL.md
│       ├── styling/
│       │   ├── SKILL.md       ← READ before any CSS/Tailwind work
│       │   └── tokens-template.md  ← READ before setting up design tokens
│       └── webgl-3d/
│           ├── SKILL.md       ← READ before any 3D work
│           └── patterns.md    ← READ for reusable 3D code patterns
├── public/
│   ├── logos/           ← client logos (SVG/PNG) — add when available
│   └── thumbnails/      ← video thumbnails (WebP) — add when available
├── brand_assets/        ← CHECK FIRST every session — logos, palette, fonts
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx     ← R3F canvas ONLY here
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Videos.tsx
│   │   ├── Skills.tsx
│   │   ├── Clients.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   └── useDeviceDetect.ts
│   ├── styles/
│   │   └── globals.css  ← ALL @theme tokens here
│   ├── App.tsx          ← Lenis + GSAP ScrollTrigger init here
│   └── main.tsx
├── CLAUDE.md            ← this file
├── vite.config.ts
└── package.json
```

---

## Session Start Protocol

Say this at the start of EVERY session:

> _"Read CLAUDE.md first. Then read `.claude/skills/styling/SKILL.md` and `.claude/skills/styling/tokens-template.md`. Then read `.claude/skills/webgl-3d/SKILL.md` and `.claude/skills/webgl-3d/patterns.md`. Check brand_assets/ for any assets. Then read the current state of [component you're working on]. Only then begin."_

---

## Pending — I Will Provide Separately

- [ ] YouTube/Vimeo links for AI video work section
- [ ] Video thumbnail images → `public/thumbnails/`
- [ ] Client company logos → `public/logos/` + `brand_assets/`
- [ ] Additional project details and measurable outcomes
- [ ] Additional client company names for Clients section

## Skills

Custom skills live in `.claude/skills/`. Invoke them with `/skill-name`.

| Skill         | Command                  | When to use                                                                               |
| ------------- | ------------------------ | ----------------------------------------------------------------------------------------- |
| skill-builder | `/skill-builder`         | Creating, auditing, or optimizing Claude skills                                           |
| webgl-3d      | `/webgl-3d [scene-type]` | Any 3D scene, scroll animation, Three.js/R3F, GSAP scroll, Lenis                          |
| styling       | `/styling [area]`        | Tailwind CSS, CSS variables, design tokens, colors, typography, spacing, animation easing |

## Tech Stack (Portfolio)

- Framework: Vite + React (client-side only)
- 3D: React Three Fiber + @react-three/drei
- Animation: GSAP + ScrollTrigger
- Scroll: Lenis (synced to GSAP ticker)
- Styling: Tailwind v4 + CSS custom properties (`@theme` block, no tailwind.config.js)
- Design tokens: `src/styles/tokens.css` — single source of truth for colors, fonts, spacing, easing

## Conventions

- Platform: Windows 11, shell: bash (use Unix syntax)
- No auto-commits without explicit request
