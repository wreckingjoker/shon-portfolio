# WebGL 3D — Code Patterns

Reusable boilerplate for the `webgl-3d` skill. Load this file when you need a full code reference for a pattern described in SKILL.md.

---

## Lenis + GSAP Setup

Place in your top-level layout component (e.g., `src/App.jsx` or `src/Layout.jsx`).

```jsx
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    // Sync Lenis with GSAP ticker — critical for ScrollTrigger compatibility
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.normalizeScroll(true)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
}
```

Usage in App.jsx:
```jsx
export default function App() {
  useSmoothScroll()
  return <Layout />
}
```

---

## Base Canvas

```jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'
import * as THREE from 'three'

export function Scene({ children }) {
  return (
    <>
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 10] }}
        shadows
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2
        }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}
```

---

## Scroll-Driven Camera Rig

```jsx
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Define path control points in world space
const CURVE_POINTS = [
  new THREE.Vector3(0, 0, 10),   // Hero — start
  new THREE.Vector3(2, 1, 5),    // Work section
  new THREE.Vector3(-2, 0, 0),   // About section
  new THREE.Vector3(0, -1, -5),  // Contact — end
]

const curve = new THREE.CatmullRomCurve3(CURVE_POINTS)
const targetPosition = new THREE.Vector3()
const targetLookAt = new THREE.Vector3()

export function CameraRig() {
  const { camera } = useThree()
  const scrollProgress = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      scrollProgress.current = window.scrollY / max
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(() => {
    const t = THREE.MathUtils.clamp(scrollProgress.current, 0, 1)

    curve.getPointAt(t, targetPosition)
    camera.position.lerp(targetPosition, 0.05)

    // Look slightly ahead on the curve
    const lookT = THREE.MathUtils.clamp(t + 0.01, 0, 1)
    curve.getPointAt(lookT, targetLookAt)
    camera.lookAt(targetLookAt)
  })

  return null
}
```

Usage:
```jsx
<Canvas>
  <CameraRig />
  {/* rest of scene */}
</Canvas>
```

---

## 3D Text — Glass Material

```jsx
import { Text3D, Center, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function GlassText({ text = 'SHON', font = '/fonts/helvetiker_regular.typeface.json' }) {
  const meshRef = useRef()

  // Idle float animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <Center ref={meshRef}>
      <Text3D
        font={font}
        size={1.5}
        height={0.25}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.015}
        bevelSegments={4}
      >
        {text}
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          distortionScale={0.3}
          temporalDistortion={0.1}
        />
      </Text3D>
    </Center>
  )
}
```

---

## Three-Point Lighting Rig

```jsx
export function LightingRig() {
  return (
    <>
      <ambientLight intensity={0.15} />

      {/* Key — main light from upper-right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill — cool-tinted, left side, no shadow */}
      <directionalLight
        position={[-5, 4, -3]}
        intensity={0.5}
        color="#4466ff"
      />

      {/* Rim — warm accent from behind */}
      <pointLight
        position={[0, -3, -6]}
        intensity={1.5}
        color="#ff5520"
        distance={15}
        decay={2}
      />
    </>
  )
}
```

---

## Studio Environment + Reflective Floor

```jsx
import { Environment, MeshReflectorMaterial, ContactShadows } from '@react-three/drei'

export function StudioEnvironment() {
  return (
    <>
      <Environment preset="studio" background={false} />

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={60}
          roughness={0.9}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#080808"
          metalness={0.5}
        />
      </mesh>

      {/* Soft ground shadow */}
      <ContactShadows
        position={[0, -1.49, 0]}
        opacity={0.5}
        scale={25}
        blur={2.5}
        far={5}
        color="#000000"
      />
    </>
  )
}
```

---

## useFrame Performance Pattern

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Allocate vectors OUTSIDE the component or in refs — never inside useFrame
const _vec3 = new THREE.Vector3()
const _quat = new THREE.Quaternion()

export function AnimatedMesh() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Mutate existing objects — don't create new ones here
    meshRef.current.rotation.y += delta * 0.5

    // Use delta for frame-rate independent animation
    _vec3.set(0, Math.sin(state.clock.elapsedTime) * 0.3, 0)
    meshRef.current.position.lerp(_vec3, 0.1)
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}
```

---

## Dispose on Unmount

```jsx
import { useEffect, useRef } from 'react'

export function ManagedMesh() {
  const geoRef = useRef()
  const matRef = useRef()

  useEffect(() => {
    return () => {
      geoRef.current?.dispose()
      matRef.current?.dispose()
    }
  }, [])

  return (
    <mesh>
      <boxGeometry ref={geoRef} />
      <meshStandardMaterial ref={matRef} />
    </mesh>
  )
}
```

---

## Mobile Performance Guard

```jsx
const isMobile = window.innerWidth < 768

<Canvas dpr={isMobile ? [1, 1] : [1, 2]}>
  {!isMobile && (
    <EffectComposer>
      <Bloom intensity={0.3} />
      <DepthOfField focalLength={0.02} bokehScale={2} />
    </EffectComposer>
  )}
</Canvas>
```
