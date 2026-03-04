import { PulsingBorder } from '@paper-design/shaders-react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { GradientButton } from './ui/gradient-button'

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] relative overflow-hidden">

      {/* SVG filter / gradient defs */}
      <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02  0 1 0 0 0.02  0 0 1 0 0.05  0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Hero content — bottom-left layout.
           Explicit width required: absolute elements are shrink-to-fit by default,
           collapsing the container to badge width (~350px) and crushing the bio text. */}
      <div
        className="absolute bottom-8 left-8 z-20"
        style={{ width: 'min(42rem, calc(100% - 4rem))' }}
      >

        {/* Availability badge */}
        <motion.div
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 relative border border-white/10"
          style={{ filter: 'url(#glass-effect)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rounded-full" />
          <span
            className="text-white/90 text-sm font-medium relative z-10 tracking-wide"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ✦ Available for Freelance &amp; Full-Time
          </span>
        </motion.div>

        {/* Name / title */}
        <motion.h1
          className="font-bold text-white mb-6 leading-none tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span
            className="block font-light mb-2 tracking-wider"
            style={{
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 35%, #7b2fff 70%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'url(#text-glow)',
            }}
          >
            Shon
          </span>
          <span className="block font-black text-white drop-shadow-2xl">Varghese</span>
          <span
            className="block font-light text-white/70 italic"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
          >
            AI Developer
          </span>
        </motion.h1>

        {/* Bio line */}
        <motion.p
          className="text-lg font-light text-white/70 mb-8 leading-relaxed"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Building AI systems that work while you sleep — and creating video ads that
          make people stop scrolling.
        </motion.p>

        {/* Location + CTAs */}
        <motion.div
          className="flex items-center gap-5 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {/* Location pill — glassy with map pin glyph */}
          <span
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              background: 'rgba(0, 212, 255, 0.06)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              color: 'rgba(0, 212, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 18px rgba(0,212,255,0.08), inset 0 1px 0 rgba(0,212,255,0.1)',
            }}
          >
            <svg width="14" height="17" viewBox="0 0 14 17" fill="none" aria-hidden="true">
              <path d="M7 0C3.686 0 1 2.686 1 6c0 4.5 6 11 6 11s6-6.5 6-11c0-3.314-2.686-6-6-6z" fill="rgba(0,212,255,0.6)" />
              <circle cx="7" cy="6" r="2" fill="#050505" />
            </svg>
            Dubai, UAE
          </span>

          <GradientButton
            asChild
            variant="variant"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.04em', padding: '0.85rem 2rem' }}
          >
            <a href="#projects">View Work</a>
          </GradientButton>

          <GradientButton
            asChild
            style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.04em', padding: '0.85rem 2rem' }}
          >
            <a href="#contact">Let&apos;s Talk</a>
          </GradientButton>
        </motion.div>
      </div>

      {/* Scroll indicator — bottom center */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.8 },
          y: { delay: 1.4, duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <ChevronDown size={28} style={{ color: 'var(--color-muted)' }} />
      </motion.div>

      {/* Profile photo — right side, lg+ only */}
      <motion.div
        className="absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <div className="relative">
          {/* Gradient border frame */}
          <div
            style={{
              padding: '2px',
              borderRadius: '1.25rem',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.5) 0%, rgba(123,47,255,0.4) 50%, rgba(0,212,255,0.15) 100%)',
              boxShadow: '0 0 50px rgba(0,212,255,0.12), 0 24px 64px rgba(0,0,0,0.7)',
            }}
          >
            <div
              className="overflow-hidden relative"
              style={{ borderRadius: 'calc(1.25rem - 2px)', width: '320px', height: '420px' }}
            >
              <img
                src="/thumbnails/profile.jpeg"
                alt="Shon Varghese"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
              {/* Cinematic bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 100%)' }}
              />
            </div>
          </div>

          {/* Orbit badge — bottom-right corner of photo */}
          <div className="absolute -bottom-10 -right-10 z-30">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <PulsingBorder
                colors={['#00d4ff', '#0891b2', '#7b2fff', '#00FF88', '#ffffff', '#00d4ff']}
                colorBack="#00000000"
                speed={1.5}
                roundness={1}
                thickness={0.1}
                softness={0.2}
                intensity={5}
                spots={5}
                spotSize={0.1}
                pulse={0.1}
                smoke={0.5}
                smokeSize={4}
                scale={0.65}
                rotation={0}
                frame={9161408.251009725}
                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
              />
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ transform: 'scale(1.6)' }}
              >
                <defs>
                  <path id="sv-orbit" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-white/80" fontSize="7" fontFamily="var(--font-mono)">
                  <textPath href="#sv-orbit" startOffset="0%">
                    Shon Varghese • Dubai UAE • AI Dev •&nbsp;&nbsp;
                  </textPath>
                </text>
              </motion.svg>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  )
}
