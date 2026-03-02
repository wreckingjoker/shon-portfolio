import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Tune these to adjust the feel
const CARD        = 78
const GAP         = 20
const SCROLL_SPEED = 55   // px / second
const WAVE_AMP    = 62    // px — half-amplitude (up + down from centre)
const WAVE_CYCLES = 2     // full sine crests visible across the strip
const WAVE_PERIOD = 4.5   // seconds per temporal cycle (how fast wave travels)
const TILT_MAX    = 10    // max tilt degrees (follows slope via cos)

function LogoCard({ src, name }: { src: string; name: string }) {
  return (
    <div style={{ width: CARD, height: CARD, perspective: '900px' }} className="cursor-pointer">
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 220, damping: 24 }}
      >
        {/* Front — logo */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'rgba(8,8,8,0.88)',
            border: '1px solid rgba(0,212,255,0.12)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}
        >
          <img src={src} alt={name} className="w-full h-full object-contain p-3" />
        </div>

        {/* Back — company name */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center p-2"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(0,212,255,0.07)',
            border: '1px solid rgba(0,212,255,0.4)',
          }}
        >
          <p
            className="text-center text-[9px] font-medium leading-tight"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
          >
            {name}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

interface LogoMorphProps {
  logos: { src: string; name: string }[]
}

export function LogoMorph({ logos }: LogoMorphProps) {
  const TOTAL    = logos.length
  const cardStep = CARD + GAP
  const trackWidth = TOTAL * cardStep        // width of one full set

  // Duplicate logos so the strip loops seamlessly
  const doubled = [...logos, ...logos]

  const cardEls  = useRef<(HTMLDivElement | null)[]>([])
  const pausedRef = useRef(false)
  const timeRef  = useRef(0)                 // accumulated un-paused seconds
  const lastRef  = useRef<number>()
  const rafRef   = useRef<number>()

  useEffect(() => {
    const TWO_PI    = Math.PI * 2
    const waveOmega = TWO_PI / WAVE_PERIOD   // rad / s

    const tick = (now: number) => {
      // Advance internal clock only when not paused
      if (lastRef.current !== undefined && !pausedRef.current) {
        timeRef.current += (now - lastRef.current) / 1000
      }
      lastRef.current = now

      const t      = timeRef.current
      const scrollX = -(t * SCROLL_SPEED) % trackWidth  // wraps at track boundary

      for (let i = 0; i < cardEls.current.length; i++) {
        const el = cardEls.current[i]
        if (!el) continue

        const baseX = i * cardStep

        // Spatial phase spreads WAVE_CYCLES full cycles across one track width
        // Temporal phase makes the wave travel left (same direction as scroll)
        const phase = (baseX / trackWidth) * WAVE_CYCLES * TWO_PI - t * waveOmega

        const y    = Math.sin(phase) * WAVE_AMP
        const tilt = Math.cos(phase) * TILT_MAX  // cos = derivative of sin → lean into slope

        el.style.transform =
          `translateX(${baseX + scrollX}px) translateY(${y}px) rotateZ(${tilt}deg)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const containerHeight = CARD + WAVE_AMP * 2 + 32

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', height: containerHeight, position: 'relative' }}
      onMouseEnter={() => { pausedRef.current = true  }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      {doubled.map((logo, i) => (
        <div
          key={i}
          ref={el => { cardEls.current[i] = el }}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            marginTop: -CARD / 2,
            willChange: 'transform',
          }}
        >
          <LogoCard src={logo.src} name={logo.name} />
        </div>
      ))}
    </div>
  )
}
