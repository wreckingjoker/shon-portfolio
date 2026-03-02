import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { SplineScene } from './ui/spline-scene'
import { Spotlight } from './ui/spotlight'

const BIO =
  "I build AI systems that work while you sleep — and create video ads that make people stop scrolling."

const STATS = [
  { value: 100, suffix: '+', label: 'Clients Served' },
  { value: 2, suffix: '+', label: 'Years Building AI' },
]

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (triggered.current) return
        triggered.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.floor(obj.val)),
        })
      },
    })

    return () => trigger.kill()
  }, [value])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="text-5xl md:text-6xl font-black tabular-nums"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-sm tracking-widest uppercase"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen"
    >
      {/* Mouse-tracking spotlight */}
      <Spotlight size={500} />

      <div className="flex min-h-screen">
        {/* Left: bio + stats */}
        <div className="flex-1 flex flex-col justify-center px-10 md:px-14 lg:px-20 py-24 relative z-10">
          <p
            className="text-xs tracking-widest uppercase mb-8"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
          >
            About
          </p>

          <p
            className="leading-snug mb-16"
            style={{
              fontSize: 'clamp(1.25rem, 1.8vw, 2rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--color-text)',
            }}
          >
            {BIO}
          </p>

          <div className="flex gap-16">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Right: interactive Spline 3D scene */}
        <div className="flex-1 hidden md:flex items-center justify-center py-12 pr-10 pl-4">
          <div className="w-full h-[520px] relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
