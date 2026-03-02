import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavTabProps {
  item: NavItem
  isActive: boolean
  onClick: () => void
}

function NavTab({ item, isActive, onClick }: NavTabProps) {
  const Icon = item.icon

  return (
    <a
      href={item.url}
      onClick={onClick}
      className="relative cursor-pointer text-sm font-semibold px-6 py-2.5 rounded-full select-none"
      style={{
        fontFamily: 'var(--font-mono)',
        color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
        transitionProperty: 'color',
        transitionDuration: 'var(--dur-fast)',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.color = 'var(--color-text)'
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.color = 'var(--color-muted)'
      }}
    >
      {/* Desktop: text label */}
      <span className="hidden md:inline relative z-10">{item.name}</span>
      {/* Mobile: icon */}
      <span className="md:hidden relative z-10">
        <Icon size={16} strokeWidth={2.5} />
      </span>

      {isActive && (
        <motion.div
          layoutId="tubelight-lamp"
          className="absolute inset-0 w-full rounded-full -z-10"
          style={{ background: 'rgba(0,212,255,0.06)' }}
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Tube lamp glow bar at top */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-t-full"
            style={{ width: '2rem', height: '3px', background: 'var(--color-primary)' }}
          >
            <div
              className="absolute rounded-full blur-md"
              style={{ width: '3rem', height: '1.5rem', background: 'rgba(0,212,255,0.2)', top: '-0.5rem', left: '-0.5rem' }}
            />
            <div
              className="absolute rounded-full blur-md"
              style={{ width: '2rem', height: '1.5rem', background: 'rgba(0,212,255,0.25)', top: '-0.25rem' }}
            />
            <div
              className="absolute rounded-full blur-sm"
              style={{ width: '1rem', height: '1rem', background: 'rgba(0,212,255,0.3)', top: '0', left: '0.5rem' }}
            />
          </div>
        </motion.div>
      )}
    </a>
  )
}

interface TubelightNavProps {
  items: NavItem[]
  className?: string
}

export function TubelightNav({ items, className }: TubelightNavProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  useEffect(() => {
    const homeItem = items.find((item) => item.url === '#')
    const sectionItems = items.filter((item) => item.url.startsWith('#') && item.url !== '#')

    // Activate Home when near top of page
    const onScroll = () => {
      if (homeItem && window.scrollY < 120) setActiveTab(homeItem.name)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Activate each section when it crosses the viewport mid-band
    const observers: IntersectionObserver[] = []
    sectionItems.forEach(({ url, name }) => {
      const el = document.getElementById(url.replace('#', ''))
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(name) },
        { rootMargin: '-45% 0px -54% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach((o) => o.disconnect())
    }
  }, [items])

  return (
    <div className={cn('flex items-center', className)}>
      <div
        className="flex items-center gap-1 py-1.5 px-2 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--color-border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {items.map((item) => (
          <NavTab
            key={item.name}
            item={item}
            isActive={activeTab === item.name}
            onClick={() => setActiveTab(item.name)}
          />
        ))}
      </div>
    </div>
  )
}
