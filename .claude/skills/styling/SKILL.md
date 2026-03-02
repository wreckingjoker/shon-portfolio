---
name: styling
description: Use when setting up Tailwind CSS, defining design tokens, working with CSS variables, theming, choosing colors, configuring typography, managing spacing, setting animation easing or duration values, or styling any component in this portfolio project.
argument-hint: [setup | colors | typography | spacing | animation | component-name]
---

## What This Skill Does

Acts as the styling authority for this portfolio. When invoked, apply all conventions below to any CSS, JSX className, or animation timing in the project.

This project uses **Tailwind v4** (CSS-native config) with **CSS custom properties as the single source of truth**. Every design token is a CSS variable defined in `src/styles/tokens.css`. Tailwind reads those variables from an `@theme` block and auto-generates utility classes from them.

If `$ARGUMENTS` is provided, focus on that specific area. Otherwise, give an overview and ask what the user is working on.

For the full token sheet template (copy into `src/styles/tokens.css`), see [tokens-template.md](tokens-template.md).

---

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| Tailwind CSS | v4 | Utility classes — generated from CSS vars in `@theme` |
| `@tailwindcss/vite` | v4 | Vite plugin — replaces PostCSS setup |
| CSS Custom Properties | Native | Design tokens — single source of truth |

**No `tailwind.config.js`.** All configuration is done in CSS.

---

## Step 1: Installation

```bash
npm install tailwindcss @tailwindcss/vite
```

**`vite.config.ts`** — add the Tailwind plugin:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})
```

---

## Step 2: CSS File Structure

```
src/styles/
  tokens.css    ← design tokens (@theme block)
  global.css    ← imports + base resets + font-face declarations
```

**`src/styles/global.css`:**

```css
@import "tailwindcss";
@import "./tokens.css";

/* Base resets */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  color-scheme: dark;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-sans);
}
```

**`src/main.tsx`:**

```tsx
import './styles/global.css'
```

---

## Step 3: Token Architecture

All tokens live in `src/styles/tokens.css` inside an `@theme {}` block. Tailwind v4 reads `@theme` and generates utility classes for every variable inside it.

**Naming convention:**

| Category | Prefix | Example utility |
|---|---|---|
| Colors | `--color-*` | `bg-surface`, `text-brand`, `border-border` |
| Fonts | `--font-*` | `font-sans`, `font-display`, `font-mono` |
| Spacing | `--spacing-*` | `pt-section`, `px-gutter` |
| Easing | `--ease-*` | `ease-out-expo` (on `transition`) |
| Duration | `--duration-*` | `duration-slow` (on `transition`) |

See [tokens-template.md](tokens-template.md) for the full ready-to-use token file.

---

## Token Reference

### Colors (Dark-First Palette)

| Token | Value | Tailwind utility | Use for |
|---|---|---|---|
| `--color-surface` | `#08080f` | `bg-surface` | Page background |
| `--color-surface-alt` | `#111118` | `bg-surface-alt` | Cards, panels, nav |
| `--color-surface-raised` | `#1a1a24` | `bg-surface-raised` | Tooltips, modals |
| `--color-border` | `#ffffff0d` | `border-border` | Dividers, card edges |
| `--color-brand` | `#7c3aed` | `text-brand`, `bg-brand` | Primary accent — violet |
| `--color-brand-glow` | `#7c3aed66` | `bg-brand-glow` | Glow/blur effects behind brand elements |
| `--color-accent` | `#f59e0b` | `text-accent`, `bg-accent` | Secondary accent — amber |
| `--color-text` | `#f0f0f5` | `text-text` | Body text, headings |
| `--color-text-muted` | `#8888a0` | `text-text-muted` | Labels, captions, helpers |
| `--color-text-inverse` | `#0a0a0f` | `text-text-inverse` | Text on light/brand backgrounds |

### Typography

| Token | Value | Utility |
|---|---|---|
| `--font-sans` | `'Inter Variable', system-ui, sans-serif` | `font-sans` |
| `--font-display` | `'Syne', 'Inter Variable', sans-serif` | `font-display` |
| `--font-mono` | `'JetBrains Mono', monospace` | `font-mono` |

Use Tailwind's built-in size scale (`text-sm`, `text-xl`, `text-4xl`, etc.). Only add custom sizes if the design calls for something not in the default scale.

**Font loading** — add to `global.css` using `@font-face` or import from Google Fonts/Fontsource:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Syne:wght@400..800&display=swap');
```

Or via npm (preferred for Vite):

```bash
npm install @fontsource-variable/inter @fontsource/syne
```

```ts
// main.tsx
import '@fontsource-variable/inter'
import '@fontsource/syne/400.css'
import '@fontsource/syne/700.css'
```

### Spacing

Tailwind's built-in scale covers most needs. Add custom tokens only for layout-level values:

| Token | Value | Utility | Use for |
|---|---|---|---|
| `--spacing-section` | `7.5rem` | `py-section` | Vertical padding between sections |
| `--spacing-gutter` | `clamp(1.5rem, 5vw, 4rem)` | `px-gutter` | Horizontal page margins |

### Animation

| Token | Value | Utility | Use for |
|---|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | `ease-out-expo` | Elements entering the view |
| `--ease-in-expo` | `cubic-bezier(0.7, 0, 0.84, 0)` | `ease-in-expo` | Elements leaving the view |
| `--ease-in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)` | `ease-in-out-expo` | Looping / continuous motion |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `ease-spring` | Bouncy UI interactions |
| `--duration-fast` | `150ms` | `duration-fast` | Micro-interactions (hover, focus) |
| `--duration-base` | `300ms` | `duration-base` | Standard transitions |
| `--duration-slow` | `600ms` | `duration-slow` | Section reveals |
| `--duration-xslow` | `1200ms` | `duration-xslow` | Cinematic / hero animations |

---

## Usage in JSX

Always use Tailwind utilities. Never hardcode hex values or easing strings in className strings or inline styles.

```tsx
// Page background
<main className="min-h-screen bg-surface text-text font-sans">

// Card / panel
<div className="bg-surface-alt border border-border rounded-xl p-6">

// Heading
<h1 className="font-display text-4xl font-bold text-text">

// Brand element
<span className="text-brand">

// Muted caption
<p className="text-sm text-text-muted font-mono">

// Hover transition using tokens
<button className="transition-colors duration-base ease-out-expo hover:text-brand">

// Full-width section with token spacing
<section className="py-section px-gutter">
```

For one-off values not in the token system, use Tailwind's arbitrary value syntax: `bg-[#somecolor]` — but treat this as a red flag. If you're reaching for it often, add a token.

---

## GSAP Bridge

Read animation tokens at runtime so GSAP uses the same easing and duration values as CSS transitions.

```ts
function token(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name).trim()
}

// Usage
gsap.to(el, {
  y: 0,
  opacity: 1,
  duration: parseFloat(token('--duration-slow')) / 1000, // ms → seconds
  ease: token('--ease-out-expo'),
})
```

**Rule:** Never hardcode `cubic-bezier(...)` strings in GSAP calls. Always read from the token.

---

## R3F Color Bridge

Pull brand colors into Three.js materials to keep 3D and 2D visually consistent.

```ts
import * as THREE from 'three'

function cssColor(name: string): THREE.Color {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name).trim()
  return new THREE.Color(raw)
}

// In a component
const brandColor = cssColor('--color-brand')
// <meshStandardMaterial color={brandColor} />
```

**Call `cssColor` outside of `useFrame`** — it's expensive. Store the result in a ref or module-level variable.

---

## Rules & Conventions

1. **Single source of truth** — all values live in `tokens.css`. Never duplicate a value in component CSS or an inline style.
2. **No hardcoded hex in JSX** — use a Tailwind utility. If none exists, add a token first.
3. **No hardcoded easing strings in GSAP** — always read from the CSS variable.
4. **Surface hierarchy** — `surface` (page) → `surface-alt` (cards) → `surface-raised` (overlays). Don't skip levels.
5. **Border** — always `border border-border`. Never set a custom border color per-component.
6. **Typography** — `font-sans` for all body text, `font-display` for hero/headings, `font-mono` for code/labels.
7. **Spacing** — use Tailwind's built-in scale for component-level spacing; `py-section` / `px-gutter` for page-level layout only.
