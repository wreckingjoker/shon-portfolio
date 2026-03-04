import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const ENTRIES = [
  {
    company: 'Just Search UAE',
    initials: 'JS',
    role: 'AI Marketing Strategist',
    period: 'Nov 2025 – Present',
    type: 'Full-Time',
    tags: ['n8n', 'OpenAI API', 'Multi-Agent', 'SEO'],
    current: true,
  },
  {
    company: 'Al Asala Furniture UAE',
    initials: 'AA',
    role: 'AI Marketing Strategist',
    period: 'Oct – Nov 2025',
    type: 'Internship',
    tags: ['HeyGen', 'n8n', 'AI Video', 'Lead Gen'],
    current: false,
  },
]

type Entry = (typeof ENTRIES)[0]

function EntryCard({ entry, side, maxWidth = '320px' }: { entry: Entry; side: 'left' | 'right'; maxWidth?: string }) {
  const r = side === 'right'
  return (
    <div
      className="exp-card relative p-6 rounded-2xl overflow-hidden"
      style={{
        maxWidth,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        borderLeft: r ? '1px solid rgba(255,255,255,0.06)' : '2px solid rgba(0,212,255,0.4)',
        borderRight: r ? '2px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        opacity: 0,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-2xl"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 100%)' }} />
      <div className="absolute top-0 left-8 right-8 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: r
            ? 'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)',
        }} />

      <div className={`flex items-center gap-2 mb-4${r ? ' flex-row-reverse' : ''}`}>
        <span className="text-xs px-2.5 py-0.5 rounded-full" style={{
          fontFamily: 'var(--font-mono)',
          background: entry.current ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${entry.current ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.12)'}`,
          color: entry.current ? 'var(--color-primary)' : 'var(--color-muted)',
        }}>{entry.type}</span>
        {entry.current && (
          <span className="flex items-center gap-1.5 text-xs"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(74,222,128,0.9)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            Active
          </span>
        )}
      </div>

      <h3 className={`text-lg font-bold mb-1${r ? ' text-right' : ''}`}
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>{entry.company}</h3>
      <p className={`text-sm mb-1${r ? ' text-right' : ''}`}
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-muted)' }}>{entry.role}</p>
      <p className={`text-xs${r ? ' text-right' : ''}`}
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{entry.period}</p>

    </div>
  )
}

function NodeCircle({ entry }: { entry: Entry }) {
  return (
    <div className="exp-node hidden md:flex items-center justify-center relative" style={{ opacity: 0 }}>
      <div className="absolute w-28 h-28 rounded-full"
        style={{ border: '1px dashed rgba(0,212,255,0.2)', animation: 'spin 20s linear infinite' }} />
      {entry.current && (
        <div className="absolute w-24 h-24 rounded-full animate-ping"
          style={{ background: 'rgba(0,212,255,0.04)' }} />
      )}
      <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 0 30px rgba(0,212,255,0.2), 0 0 60px rgba(0,212,255,0.06), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)',
        }}>
        <span className="text-xl font-black tracking-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
          {entry.initials}
        </span>
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathGroupRef = useRef<SVGGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeWrapRefs = useRef<(HTMLDivElement | null)[]>([])
  const gsapCtxRef = useRef<{ revert: () => void } | null>(null)

  useEffect(() => {
    const computePath = () => {
      if (!containerRef.current || window.innerWidth < 768) return
      const box = containerRef.current.getBoundingClientRect()
      if (box.height === 0) return

      const ys = nodeWrapRefs.current.map(el => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        return ((r.top + r.height / 2 - box.top) / box.height) * 100
      })

      const [y1, y2] = ys
      if (y1 == null || y2 == null) return

      const d = `M 50 ${y1.toFixed(2)} C 75 ${(y1 + (y2 - y1) * 0.35).toFixed(2)}, 25 ${(y1 + (y2 - y1) * 0.65).toFixed(2)}, 50 ${y2.toFixed(2)}`
      document.querySelectorAll<SVGPathElement>('.exp-path').forEach(el => el.setAttribute('d', d))
    }

    // Double-RAF: first pass lets React commit, second lets browser finish layout geometry
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        computePath()

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        gsapCtxRef.current = gsap.context(() => {
          // Fade the whole path group in — full path always visible, never partially drawn
          if (pathGroupRef.current) {
            gsap.fromTo(pathGroupRef.current, { opacity: 0 }, {
              opacity: 1, duration: 1.5, ease: 'power2.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
            })
          }

          gsap.utils.toArray<HTMLElement>('.exp-card').forEach((el, i) => {
            gsap.fromTo(el, { opacity: 0, x: i % 2 === 0 ? 60 : -60 }, {
              opacity: 1, x: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 82%' },
            })
          })

          gsap.utils.toArray<HTMLElement>('.exp-node').forEach((el, i) => {
            gsap.fromTo(el, { scale: 0, opacity: 0 }, {
              scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)',
              delay: i * 0.1,
              scrollTrigger: { trigger: el, start: 'top 80%' },
            })
          })
        }, sectionRef)
      })
    })

    window.addEventListener('resize', computePath)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', computePath)
      gsapCtxRef.current?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-[100dvh] flex flex-col justify-center items-center px-6 md:px-10 py-24 relative"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.012) 0%, transparent 70%)' }} />

      <div className="w-full max-w-6xl relative rounded-3xl px-12 md:px-24 py-20"
        style={{
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(32px) saturate(160%)',
          WebkitBackdropFilter: 'blur(32px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 0 0 1px rgba(0,212,255,0.04), 0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Decorative overlays — clipped independently so content is never hidden */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-16 right-16 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3), rgba(123,47,255,0.3), transparent)' }} />
          <div className="absolute inset-0 rounded-3xl"
            style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 60%)' }} />
        </div>
        <p className="text-xs tracking-widest uppercase mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>History</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-24"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>Experience</h2>

        {/* ── MOBILE timeline (< md) ── */}
        <div className="md:hidden relative">
          {/* Vertical connecting line */}
          <div
            className="absolute top-5 bottom-5 w-px"
            style={{
              left: '19px',
              background: 'linear-gradient(to bottom, #00d4ff 0%, #7b2fff 50%, #00d4ff 100%)',
              opacity: 0.5,
            }}
          />
          <div className="flex flex-col gap-8">
            {ENTRIES.map((entry) => (
              <div key={entry.company} className="flex items-start gap-4">
                {/* Dot */}
                <div
                  className="exp-card relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.4)',
                    boxShadow: '0 0 16px rgba(0,212,255,0.25)',
                    opacity: 0,
                  }}
                >
                  <span className="text-xs font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    {entry.initials}
                  </span>
                </div>
                {/* Card */}
                <div className="flex-1 min-w-0">
                  <EntryCard entry={entry} side="left" maxWidth="100%" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP layout (md+) ── */}
        <div className="hidden md:block relative" ref={containerRef}>

          {/* SVG S-curve connector — endpoints set dynamically to match node positions */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="exp-path-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#7b2fff" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
              <linearGradient id="exp-path-core" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="50%" stopColor="rgba(180,100,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
              </linearGradient>
              <filter id="exp-path-glow" x="-50%" y="-10%" width="200%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="12" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* All layers grouped so opacity fade animates them together */}
            <g ref={pathGroupRef} style={{ opacity: 0 }}>
              <path className="exp-path" d="" fill="none"
                stroke="url(#exp-path-grad)" strokeWidth="16"
                vectorEffect="non-scaling-stroke" opacity="0.35" />
              <path className="exp-path" d="" fill="none"
                stroke="url(#exp-path-grad)" strokeWidth="6"
                vectorEffect="non-scaling-stroke" opacity="0.8" />
              <path className="exp-path" d="" fill="none"
                stroke="url(#exp-path-core)" strokeWidth="2.5"
                vectorEffect="non-scaling-stroke" filter="url(#exp-path-glow)" />
            </g>
          </svg>

          {/* Entries */}
          <div className="flex flex-col gap-32 relative" style={{ zIndex: 1 }}>
            {ENTRIES.map((entry, i) => (
              <div key={entry.company}
                className="grid grid-cols-[1fr_140px_1fr] items-center">

                <div className="flex justify-end pr-10">
                  {i % 2 === 1 ? <EntryCard entry={entry} side="right" /> : <div />}
                </div>

                {/* Center node — ref used to measure Y for path endpoints */}
                <div ref={el => { nodeWrapRefs.current[i] = el }} className="flex justify-center">
                  <NodeCircle entry={entry} />
                </div>

                <div className="pl-10">
                  {i % 2 === 0 ? <EntryCard entry={entry} side="left" /> : <div />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </section>
  )
}
