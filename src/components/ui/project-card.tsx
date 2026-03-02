import { useRef, MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface ProjectCardProps {
  imgSrc: string
  title: string
  stack: string
  description: string
  tags: string[]
  link?: string
  linkText?: string
  className?: string
}

export function ProjectCard({
  imgSrc,
  title,
  stack,
  description,
  tags,
  link = '#',
  linkText = 'View Project',
  className,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
    e.currentTarget.style.borderColor = 'var(--color-border)'
    e.currentTarget.style.boxShadow = 'none'
  }

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-primary)'
    e.currentTarget.style.boxShadow =
      '0 4px 6px -1px rgba(0,212,255,0.05), 0 20px 40px -8px rgba(0,212,255,0.15)'
  }

  return (
    <div
      ref={cardRef}
      className={cn('project-card group relative flex flex-col overflow-hidden rounded-2xl', className)}
      style={{
        background: 'rgba(8,8,8,0.72)',
        border: '1px solid var(--color-border)',
        backdropFilter: 'blur(12px)',
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Image */}
      <div className="relative aspect-[16/7] overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Bottom fade overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.65), transparent 55%)' }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 gap-3">
        <div>
          <p
            className="text-xs mb-1"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
          >
            {stack}
          </p>
          <h3
            className="text-base font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            {title}
          </h3>
        </div>

        <p
          className="text-xs leading-relaxed flex-1"
          style={{ color: 'var(--color-muted)' }}
        >
          {description}
        </p>

        {/* Tool tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium w-fit"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {linkText}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </div>
  )
}
