import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Play } from 'lucide-react'

interface VideoCard {
  id: string
  title: string
  industry: string
  tools: string[]
  url: string | null
  thumbnail: string | null
}

// Placeholder data — real URLs and thumbnails to be added to public/thumbnails/
const VIDEOS: VideoCard[] = [
  { id: '1', title: 'Brand Launch Ad', industry: 'Real Estate', tools: ['Higgsfield', 'ElevenLabs', 'CapCut'], url: null, thumbnail: null },
  { id: '2', title: 'Product Demo', industry: 'E-commerce', tools: ['HeyGen', 'InVideo', 'Canva'], url: null, thumbnail: null },
  { id: '3', title: 'AI Spokesperson', industry: 'SaaS', tools: ['HeyGen', 'ElevenLabs', 'Runway ML'], url: null, thumbnail: null },
  { id: '4', title: 'Social Ad Creative', industry: 'Retail', tools: ['Higgsfield', 'Suno AI', 'CapCut'], url: null, thumbnail: null },
  { id: '5', title: 'Explainer Video', industry: 'Finance', tools: ['InVideo', 'Google Veo', 'Canva'], url: null, thumbnail: null },
  { id: '6', title: 'Motion Brand Film', industry: 'Fashion', tools: ['Google Flow', 'Leonardo AI', 'OpenArt AI'], url: null, thumbnail: null },
]

function VideoCard({ card }: { card: VideoCard }) {
  const handleClick = () => {
    if (card.url) window.open(card.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="video-card glass relative rounded-xl overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: '16 / 9',
        background: 'rgba(8,8,8,0.72)',
        border: '1px solid var(--color-border)',
      }}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      tabIndex={0}
      role="button"
      aria-label={`Play ${card.title}`}
    >
      {/* Thumbnail or placeholder */}
      {card.thumbnail ? (
        <img
          src={card.thumbnail}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, var(--color-surface) 0%, var(--color-elevated) 100%)`,
          }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-dim)' }}
          >
            Thumbnail Coming Soon
          </span>
        </div>
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }}
      />

      {/* Play icon */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform"
        style={{ transitionDuration: 'var(--dur-fast)', transitionProperty: 'transform' }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
          style={{
            background: 'rgba(0,212,255,0.15)',
            border: '1px solid rgba(0,212,255,0.4)',
            transitionDuration: 'var(--dur-fast)',
            transitionProperty: 'transform',
          }}
        >
          <Play size={18} style={{ color: 'var(--color-primary)' }} fill="currentColor" />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="font-semibold text-sm mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          {card.industry}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {card.tools.map((tool) => (
            <span
              key={tool}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(5,5,5,0.7)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-muted)',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Videos() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = gridRef.current?.querySelectorAll('.video-card')
    if (!cards?.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="py-32 px-6 md:px-10 flex flex-col items-center"
    >
      <div className="w-full max-w-5xl">
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
        >
          AI Creative
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-16"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          AI Ads I've Created
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {VIDEOS.map((card) => (
            <VideoCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
