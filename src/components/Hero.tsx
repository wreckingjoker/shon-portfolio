import { PulsingBorder } from '@paper-design/shaders-react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { GradientButton } from './ui/gradient-button'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
})

function ProfilePhoto({ width, height }: { width: number; height: number }) {
  return (
    <div
      style={{
        padding: '2px',
        borderRadius: '1.25rem',
        background: 'linear-gradient(135deg, rgba(0,212,255,0.5) 0%, rgba(123,47,255,0.4) 50%, rgba(0,212,255,0.15) 100%)',
        boxShadow: '0 0 50px rgba(0,212,255,0.12), 0 24px 64px rgba(0,0,0,0.7)',
      }}
    >
      <div className="overflow-hidden relative" style={{ borderRadius: 'calc(1.25rem - 2px)', width, height }}>
        <img
          src="/thumbnails/profile.jpeg"
          alt="Shon Varghese"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 100%)' }}
        />
      </div>
    </div>
  )
}

function AvailableBadge() {
  return (
    <motion.div
      className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 relative"
      {...fadeUp(0.2)}
    >
      <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rounded-full" />
      <span className="text-white/90 text-sm font-medium relative z-10 tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
        ✦ Available for Freelance &amp; Full-Time
      </span>
    </motion.div>
  )
}

function HeroText({ align = 'left' }: { align?: 'left' | 'center' }) {
  const textAlign = align === 'center' ? 'text-center items-center' : 'items-start'
  return (
    <div className={`flex flex-col ${textAlign}`}>
      <div className="mb-5">
        <AvailableBadge />
      </div>

      <motion.h1
        className={`font-bold text-white mb-5 leading-none tracking-tight ${align === 'center' ? 'text-center' : ''}`}
        style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', fontFamily: 'var(--font-display)' }}
        {...fadeUp(0.4)}
      >
        <span
          className="block font-light mb-1 tracking-wider"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 5rem)',
            background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 35%, #7b2fff 70%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Shon
        </span>
        <span className="block font-black text-white drop-shadow-2xl">Varghese</span>
        <span className="block font-light text-white/70 italic" style={{ fontSize: 'clamp(1.3rem, 4vw, 4rem)' }}>
          AI Developer
        </span>
      </motion.h1>

      <motion.p
        className={`text-base font-light text-white/70 mb-7 leading-relaxed max-w-lg ${align === 'center' ? 'text-center' : ''}`}
        style={{ fontFamily: 'var(--font-display)' }}
        {...fadeUp(0.8)}
      >
        Building AI systems that work while you sleep — and creating video ads that make people stop scrolling.
      </motion.p>

      <motion.div className={`flex items-center gap-4 flex-wrap ${align === 'center' ? 'justify-center' : ''}`} {...fadeUp(1.0)}>
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'rgba(0, 212, 255, 0.06)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            color: 'rgba(0, 212, 255, 0.9)',
            backdropFilter: 'blur(12px)',
          }}
        >
          📍 Dubai, UAE
        </span>
        <GradientButton asChild variant="variant" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          <a href="#projects">View Work</a>
        </GradientButton>
        <GradientButton asChild style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          <a href="#contact">Let&apos;s Talk</a>
        </GradientButton>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] relative overflow-hidden">

      {/* ── MOBILE layout (< lg) ── */}
      <div className="lg:hidden flex flex-col items-center justify-start pt-28 pb-24 px-6 z-20 relative min-h-[100dvh]">
        <motion.div className="mb-8" {...fadeUp(0.1)}>
          <ProfilePhoto width={200} height={260} />
        </motion.div>
        <HeroText align="center" />
      </div>

      {/* ── DESKTOP layout (lg+) ── */}
      {/* Text — bottom left */}
      <div
        className="hidden lg:block absolute bottom-8 left-8 z-20"
        style={{ width: 'min(42rem, calc(100% - 420px))' }}
      >
        <HeroText align="left" />
      </div>

      {/* Profile photo — right, vertically centered */}
      <motion.div
        className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <div className="relative">
          <ProfilePhoto width={320} height={420} />
          {/* Orbit badge */}
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
                  <textPath href="#sv-orbit" startOffset="0%">Shon Varghese • Dubai UAE • AI Dev •&nbsp;&nbsp;</textPath>
                </text>
              </motion.svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.8 },
          y: { delay: 1.4, duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <ChevronDown size={28} style={{ color: 'var(--color-muted)' }} />
      </motion.div>

    </section>
  )
}
