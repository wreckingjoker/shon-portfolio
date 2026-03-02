# Tokens Template

Copy this into `src/styles/tokens.css`. This is the complete starting token sheet for the portfolio design system.

When scaffolding the project, write this file verbatim then adjust values to match the final design direction.

---

```css
/* ============================================================
   src/styles/tokens.css
   Design tokens — single source of truth for all visual values.
   Tailwind v4 reads @theme and generates utility classes from
   every variable defined here.
   ============================================================ */

@theme {

  /* ----------------------------------------------------------
     COLORS — Dark-first palette
     All surfaces, text, and accents.
     ---------------------------------------------------------- */

  /* Surfaces — layered from darkest (page) to lightest (overlay) */
  --color-surface:        #08080f;   /* page background */
  --color-surface-alt:    #111118;   /* cards, panels, nav */
  --color-surface-raised: #1a1a24;   /* tooltips, dropdowns, modals */

  /* Borders — low-opacity white for dark backgrounds */
  --color-border:         #ffffff0d; /* 5% white — default dividers */
  --color-border-subtle:  #ffffff08; /* 3% white — hairline rules */
  --color-border-strong:  #ffffff1a; /* 10% white — emphasized edges */

  /* Brand — violet primary */
  --color-brand:          #7c3aed;
  --color-brand-light:    #a855f7;   /* hover / lighter variant */
  --color-brand-glow:     #7c3aed66; /* 40% opacity — glow effects */

  /* Accent — amber secondary */
  --color-accent:         #f59e0b;
  --color-accent-light:   #fbbf24;   /* hover variant */

  /* Text */
  --color-text:           #f0f0f5;   /* primary — headings, body */
  --color-text-muted:     #8888a0;   /* secondary — labels, captions */
  --color-text-faint:     #55556a;   /* tertiary — placeholders, disabled */
  --color-text-inverse:   #0a0a0f;   /* text on light/brand backgrounds */

  /* Semantic — status colors */
  --color-success:        #22c55e;
  --color-warning:        #f59e0b;
  --color-error:          #ef4444;


  /* ----------------------------------------------------------
     TYPOGRAPHY — Font families
     Use Tailwind's built-in size/weight scale for everything else.
     ---------------------------------------------------------- */

  --font-sans:    'Inter Variable', system-ui, -apple-system, sans-serif;
  --font-display: 'Syne', 'Inter Variable', sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;


  /* ----------------------------------------------------------
     SPACING — Layout-level only
     Component spacing uses Tailwind's built-in scale (p-4, gap-6, etc.)
     These tokens are for page-level structure only.
     ---------------------------------------------------------- */

  --spacing-section: 7.5rem;                    /* py-section — vertical section gaps */
  --spacing-gutter:  clamp(1.5rem, 5vw, 4rem);  /* px-gutter — horizontal page margins */


  /* ----------------------------------------------------------
     ANIMATION — Easing curves and durations
     Used by both CSS transitions and GSAP animations.
     Read from JS with: getComputedStyle(document.documentElement).getPropertyValue('--ease-out-expo')
     ---------------------------------------------------------- */

  /* Easing curves */
  --ease-linear:       linear;
  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);     /* enter: fast start, slow settle */
  --ease-in-expo:      cubic-bezier(0.7, 0, 0.84, 0);     /* exit: slow start, fast leave */
  --ease-in-out-expo:  cubic-bezier(0.87, 0, 0.13, 1);    /* continuous / looping motion */
  --ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1); /* bouncy — UI interactions */
  --ease-smooth:       cubic-bezier(0.4, 0, 0.2, 1);      /* Material-style — general purpose */

  /* Durations */
  --duration-instant: 75ms;    /* state changes that should feel immediate */
  --duration-fast:    150ms;   /* micro-interactions: hover, focus ring, toggle */
  --duration-base:    300ms;   /* standard transitions */
  --duration-slow:    600ms;   /* section reveals, page transitions */
  --duration-xslow:   1200ms;  /* cinematic / hero entrance animations */
  --duration-crawl:   2400ms;  /* ambient / background animations */

}
```

---

## Generated Utility Classes

After adding this file, the following Tailwind utilities are available without any additional config:

### Color utilities
```
bg-surface          text-surface          border-surface
bg-surface-alt      text-surface-alt      border-surface-alt
bg-surface-raised   text-surface-raised   border-surface-raised
bg-border           text-border           border-border
bg-border-subtle    text-border-subtle    border-border-subtle
bg-brand            text-brand            border-brand
bg-brand-light      text-brand-light      border-brand-light
bg-brand-glow       text-brand-glow
bg-accent           text-accent           border-accent
bg-text             text-text
bg-text-muted       text-text-muted
bg-text-faint       text-text-faint
bg-text-inverse     text-text-inverse
```

### Font utilities
```
font-sans
font-display
font-mono
```

### Spacing utilities
```
p-section   pt-section   pb-section   py-section
p-gutter    pl-gutter    pr-gutter    px-gutter
```

### Animation utilities (used on `transition-*` or `animate-*`)
```
ease-out-expo       ease-in-expo      ease-in-out-expo
ease-spring         ease-smooth

duration-instant    duration-fast     duration-base
duration-slow       duration-xslow    duration-crawl
```

---

## Common Patterns

```tsx
/* Page root */
<body className="bg-surface text-text font-sans antialiased">

/* Section wrapper */
<section className="py-section px-gutter">

/* Card */
<div className="bg-surface-alt border border-border rounded-2xl p-6">

/* Elevated card (modal, tooltip) */
<div className="bg-surface-raised border border-border-strong rounded-xl p-4 shadow-xl">

/* Primary CTA */
<button className="bg-brand text-text-inverse px-6 py-3 rounded-lg
                   transition-colors duration-fast ease-out-expo
                   hover:bg-brand-light">

/* Glow behind brand element */
<div className="relative">
  <div className="absolute inset-0 bg-brand-glow blur-2xl rounded-full" />
  <span className="relative text-brand font-display">SHON</span>
</div>

/* Muted label */
<span className="text-xs text-text-muted font-mono uppercase tracking-widest">

/* Section heading */
<h2 className="font-display text-3xl font-bold text-text">

/* Divider */
<hr className="border-border">
```

---

## GSAP Token Reader (add to `src/lib/tokens.ts`)

```ts
/**
 * Read a CSS custom property value from :root at runtime.
 * Use for GSAP animations to stay in sync with CSS tokens.
 */
export function token(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
}

/**
 * Read a duration token and convert from ms string to seconds number.
 * GSAP expects duration in seconds.
 */
export function durationSec(name: string): number {
  const ms = parseFloat(token(name))
  return ms / 1000
}

// Usage:
// gsap.to(el, {
//   y: 0,
//   opacity: 1,
//   duration: durationSec('--duration-slow'),   // → 0.6
//   ease: token('--ease-out-expo'),              // → 'cubic-bezier(0.16, 1, 0.3, 1)'
// })
```
