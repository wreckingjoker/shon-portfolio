import React, { useId } from 'react'
import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import type { Container, SingleOrMultiple } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import { motion, useAnimation } from 'framer-motion'

type SparklesProps = {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}

export function SparklesCore({
  id,
  className,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
}: SparklesProps) {
  const [init, setInit] = useState(false)
  const controls = useAnimation()
  const generatedId = useId()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({ opacity: 1, transition: { duration: 1 } })
    }
  }

  return (
    <motion.div animate={controls} className={`opacity-0 ${className ?? ''}`}>
      {init && (
        <Particles
          id={id ?? generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background ?? 'transparent' } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            interactivity: {
              events: { onClick: { enable: true, mode: 'push' }, resize: true as never },
              modes: { push: { quantity: 4 } },
            },
            particles: {
              color: {
                value: particleColor ?? '#ffffff',
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: { default: 'out' },
                speed: { min: 0.1, max: speed ?? 1 },
                straight: false,
              },
              number: {
                density: { enable: true, width: 400, height: 400 },
                value: particleDensity ?? 120,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed: speed ?? 4,
                  sync: false,
                  startValue: 'random' as never,
                  destroy: 'none' as never,
                },
              },
              shape: { type: 'circle' },
              size: {
                value: { min: minSize ?? 1, max: maxSize ?? 3 },
              },
              effect: {
                close: true,
                fill: true,
                options: {},
                type: {} as SingleOrMultiple<string> | undefined,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  )
}
