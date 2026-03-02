// WebGL — runs client-side only
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const geo = useRef<THREE.BufferGeometry>(null)

  // Generate random positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10  // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10  // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6   // z
    }
    return arr
  }, [count])

  // Seed phase offsets for varied drift
  const phases = useMemo(() => {
    return new Float32Array(count).map(() => Math.random() * Math.PI * 2)
  }, [count])

  // Dispose on unmount
  useEffect(() => {
    return () => {
      geo.current?.dispose()
      ;(meshRef.current?.material as THREE.Material)?.dispose()
    }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const phase = phases[i]
      // Subtle ambient drift on Y and X
      posAttr.array[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * 0.3 + phase) * 0.08
      posAttr.array[i * 3 + 0] = positions[i * 3 + 0] + Math.cos(t * 0.2 + phase) * 0.04
    }
    posAttr.needsUpdate = true
    meshRef.current.rotation.y = t * 0.015
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geo}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.018}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function HeroCanvas() {
  const { isLowEnd, particleCount } = useDeviceDetect()

  // Low-end devices skip WebGL entirely
  if (isLowEnd) return null

  return (
    <Canvas
      className="!absolute inset-0"
      style={{ pointerEvents: 'none' }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      camera={{ fov: 60, near: 0.1, far: 50, position: [0, 0, 5] }}
    >
      <Particles count={particleCount} />
    </Canvas>
  )
}
