---
name: webgl-3d
description: Use when building 3D scenes, WebGL effects, scroll-driven camera animation, 3D typography, environment lighting, or particle systems with React Three Fiber, GSAP ScrollTrigger, and Lenis. Also use when the user mentions Three.js, R3F, canvas animation, or immersive portfolio sections.
argument-hint: "scene-type: scroll-camera | text-3d | environment | particles"
---

## What This Skill Does

Acts as an embedded 3D/WebGL expert for this portfolio project. When invoked, apply the guidance in this skill to everything Claude builds involving 3D, canvas, or scroll-driven animation.

If `$ARGUMENTS` is provided, focus guidance on that specific scene type. Otherwise, give a full overview and ask which section the user is working on.

For reusable code snippets and boilerplate, see [patterns.md](patterns.md).

---

## Project Tech Stack

| Layer           | Package                        | Role                                              |
| --------------- | ------------------------------ | ------------------------------------------------- |
| 3D renderer     | `@react-three/fiber`           | React bindings for Three.js                       |
| 3D helpers      | `@react-three/drei`            | Controls, loaders, materials, Text3D, Environment |
| Post-processing | `@react-three/postprocessing`  | Bloom, depth of field, vignette                   |
| Scroll          | `lenis`                        | Smooth scroll with momentum                       |
| Animation       | `gsap` + `@gsap/scrolltrigger` | Timeline scrubbing, scroll-driven animation       |
| Framework       | Vite + React                   | Client-side only, no SSR                          |

---

## Step 1: Dependency Setup

Before any 3D work, verify these are installed:

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install gsap lenis
npm install @types/three --save-dev
```

---

## Step 2: Lenis + GSAP Sync (Foundation — always set up first)

Every scroll-driven scene depends on this. Set it up once at the app root before building any 3D scene.

**What it does:** Lenis intercepts native scroll and produces smooth momentum. The GSAP ticker drives Lenis each frame so ScrollTrigger and Lenis stay in sync.

See [patterns.md → Lenis + GSAP Setup](patterns.md) for the full code snippet.

Key rules:

- Initialize Lenis in a `useEffect` at the top-level layout component
- Add Lenis to `gsap.ticker` — do NOT use `requestAnimationFrame` separately
- Destroy Lenis on unmount to prevent memory leaks
- Set `ScrollTrigger.normalizeScroll(true)` to prevent scroll conflicts

---

## Step 3: Base Canvas Setup

The R3F `<Canvas>` is the entry point. Configure it once per scene:

```jsx
<Canvas
  gl={{ antialias: true, alpha: false }}
  dpr={[1, 2]}
  camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 5] }}
  shadows
  tone-mapping={THREE.ACESFilmicToneMapping}
  tone-mapping-exposure={1}
>
  <Suspense fallback={<Loader />}>{/* scene content */}</Suspense>
</Canvas>
```

Rules:

- Always clamp `dpr` to `[1, 2]` — never allow device pixel ratio above 2
- Wrap async assets (fonts, textures, HDR) in `<Suspense>`
- Use `<Loader />` from drei for built-in progress indicator
- Set `alpha: false` unless you need a transparent canvas background

---

## Scene Type A: Scroll-Driven Camera

The camera moves along a path as the user scrolls through sections of the portfolio.

### Approach

1. **Define the path** using `THREE.CatmullRomCurve3` with 4–8 control points covering the full scroll distance
2. **Read scroll progress** (0 → 1) from either:
   - `useScroll()` from drei (if using drei's `<ScrollControls>`)
   - Manual Lenis scroll listener (recommended for this project since Lenis is already handling scroll)
3. **Sample the path** each frame: `curve.getPointAt(progress)` → set `camera.position`
4. **Smooth rotation** with quaternion lerp (`camera.quaternion.slerp(targetQuat, 0.05)`)

### Step-by-step

1. Create a `CameraRig` component that holds the curve ref and subscribes to scroll
2. Inside `useFrame`, compute `progress` from current scroll Y divided by total scrollable height
3. Call `curve.getPointAt(clamp(progress, 0, 1))` to get the world position
4. Use `camera.lookAt()` or a target quaternion for smooth facing direction
5. Feed `progress` to a GSAP timeline as `timeline.seek(progress * timeline.duration())`

See [patterns.md → Scroll Camera](patterns.md) for the full CameraRig snippet.

### Rules

- Never set `camera.position` directly to the curve point — always lerp: `camera.position.lerp(target, 0.05)`
- Define keyframe markers on the timeline for each portfolio section (Hero, Work, About, Contact)
- Test on mobile: clamp scroll speed to prevent camera from jumping

---

## Scene Type B: 3D Typography

Extruded 3D text for the hero section or section headings.

### Approach

Use drei's `<Text3D>` component which wraps Three.js `TextGeometry` with automatic font loading.

### Step-by-step

1. Download a typeface.json font from [Facetype.js](https://gero3.github.io/facetype.js/) or use a drei preset
2. Wrap in `<Center>` from drei to auto-center the geometry
3. Choose material based on look:
   - **Glass/crystal**: `<MeshTransmissionMaterial>` (expensive — limit to hero only)
   - **Matte/dark**: `<meshStandardMaterial>` with low roughness
   - **Metallic**: `<meshStandardMaterial metalness={1} roughness={0.1}>`
4. Animate on scroll using GSAP:
   - Reveal: `gsap.from(meshRef.current.position, { y: -2, opacity: 0, scrollTrigger: {...} })`
   - Floating idle: `useFrame` sine wave on Y position

```jsx
<Center>
  <Text3D
    font="/fonts/helvetiker_regular.typeface.json"
    size={1.2}
    height={0.2}
    curveSegments={12}
    bevelEnabled
    bevelThickness={0.02}
    bevelSize={0.01}
  >
    SHON
    <MeshTransmissionMaterial
      backside
      samples={4}
      thickness={0.5}
      roughness={0}
      clearcoat={1}
      clearcoatRoughness={0}
      transmission={1}
      chromaticAberration={0.05}
    />
  </Text3D>
</Center>
```

### Rules

- Only use `MeshTransmissionMaterial` on 1–2 objects max — it renders an extra pass
- Store fonts in `public/fonts/` so Vite serves them statically
- Preload fonts with `useLoader(FontLoader, path)` inside Suspense

---

## Scene Type C: Environment & Lighting

Professional studio-quality lighting using HDR environments.

### Approach

Drei's `<Environment>` component loads an HDR and applies it as scene background + IBL (image-based lighting). Combine with manual lights for artistic control.

### Step-by-step

1. Add `<Environment>` with a preset or custom HDR file:

   ```jsx
   <Environment preset="studio" background blur={0.5} />
   ```

   Available presets: `apartment`, `city`, `dawn`, `forest`, `lobby`, `night`, `park`, `studio`, `sunset`, `warehouse`

2. Add a three-point light rig for precise control:

   ```jsx
   {
     /* Key light — main illumination */
   }
   <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />;
   {
     /* Fill light — soften shadows */
   }
   <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#4060ff" />;
   {
     /* Rim/back light — depth separation */
   }
   <pointLight position={[0, -5, -5]} intensity={0.8} color="#ff6030" />;
   ```

3. Add floor reflection with `<MeshReflectorMaterial>`:

   ```jsx
   <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
     <planeGeometry args={[20, 20]} />
     <MeshReflectorMaterial
       blur={[400, 100]}
       resolution={1024}
       mixBlur={1}
       mixStrength={80}
       roughness={1}
       depthScale={1.2}
       minDepthThreshold={0.4}
       maxDepthThreshold={1.4}
       color="#050505"
       metalness={0.6}
     />
   </mesh>
   ```

4. Add `<ContactShadows>` for soft ground shadows:
   ```jsx
   <ContactShadows
     position={[0, -0.8, 0]}
     opacity={0.4}
     scale={20}
     blur={2}
     far={4}
   />
   ```

### Rules

- Use `resolution={1024}` on `MeshReflectorMaterial` — never higher on mobile
- `ContactShadows` is cheaper than `castShadow` for static scenes
- Add `<ambientLight intensity={0.2} />` as a floor to prevent pure-black areas
- Animate light colors/intensity on scroll for cinematic mood shifts

---

## Post-Processing

Add after the scene is stable. Wrap scene in `<EffectComposer>`:

```jsx
import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";

<EffectComposer>
  <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.3} />
  <Vignette eskil={false} offset={0.1} darkness={0.8} />
  <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
</EffectComposer>;
```

Rules:

- Enable effects one at a time and profile with browser devtools
- Disable `DepthOfField` on mobile (expensive)
- `Bloom` luminanceThreshold prevents over-glowing dark objects

---

## Performance Rules (Non-Negotiable)

1. **Dispose on unmount** — geometries, materials, textures must be disposed in `useEffect` cleanup
2. **Never create objects inside `useFrame`** — allocate refs outside, mutate inside
3. **Use `instancedMesh`** for any repeated geometry (particles, grid of objects)
4. **Clamp dpr to [1, 2]** — always
5. **Lazy load scenes** — use `React.lazy` + `Suspense` for heavy components
6. **Limit draw calls** — aim for < 100 draw calls on the main scene
7. **Mobile check** — test at 360px width; disable post-processing if `window.innerWidth < 768`

---

## Notes

- This project uses **Lenis for scroll**, not native scroll or drei's `<ScrollControls>`. Do not mix them.
- GSAP timelines should use `invalidateOnRefresh: true` on ScrollTrigger for resize correctness.
- All 3D components should be wrapped in an `ErrorBoundary` — WebGL context loss is recoverable.
- When the user describes a new portfolio section, ask which scene type (A/B/C) applies before building.
