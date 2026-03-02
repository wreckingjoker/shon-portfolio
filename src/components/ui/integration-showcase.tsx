import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface Integration {
  name: string
  description: string
  iconSrc?: string
  iconText?: string
}

/* ─── Individual Skill Card ─────────────────────────────────────────────── */
export function SkillItem({ item }: { item: Integration }) {
  return (
    <div
      className="flex items-center gap-4 px-4 py-4 rounded-2xl cursor-default"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(0,212,255,0.06)',
        transition:
          'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.22)'
        const box = e.currentTarget.querySelector<HTMLElement>('.icon-box')
        if (box) box.style.borderColor = 'rgba(0,212,255,0.55)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.06)'
        const box = e.currentTarget.querySelector<HTMLElement>('.icon-box')
        if (box) box.style.borderColor = 'rgba(0,212,255,0.15)'
      }}
    >
      {/* Icon */}
      <div
        className="icon-box flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: 'rgba(0,212,255,0.07)',
          border: '1px solid rgba(0,212,255,0.15)',
          transition: 'border-color var(--dur-fast) var(--ease-out)',
        }}
      >
        {item.iconSrc ? (
          <>
            <img
              src={item.iconSrc}
              alt={item.name}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback =
                  e.currentTarget.parentElement?.querySelector<HTMLElement>('.icon-fallback')
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <span
              className="icon-fallback text-[9px] font-bold"
              style={{
                display: 'none',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-primary)',
              }}
            >
              {item.iconText ?? item.name.replace(/\s+/g, '').slice(0, 2).toUpperCase()}
            </span>
          </>
        ) : (
          <span
            className="text-[9px] font-bold"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
          >
            {item.iconText ?? item.name.replace(/\s+/g, '').slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Name + description */}
      <div className="min-w-0 flex-1">
        <p
          className="text-sm font-semibold leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          {item.name}
        </p>
        <p
          className="text-[11px] mt-1 leading-snug truncate"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
        >
          {item.description}
        </p>
      </div>
    </div>
  )
}

/* ─── Grid with Expand / Collapse ───────────────────────────────────────── */
interface IntegrationGridProps {
  integrations: Integration[]
  /** How many items to show before the "View more" button. Default: 6 */
  initialCount?: number
  className?: string
}

export function IntegrationGrid({
  integrations,
  initialCount = 6,
  className,
}: IntegrationGridProps) {
  const [expanded, setExpanded] = useState(false)

  const visible = integrations.slice(0, initialCount)
  const hidden = integrations.slice(initialCount)

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {/* Always-visible items — stagger in on scroll */}
      {visible.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: [0, 0, 0.2, 1] }}
        >
          <SkillItem item={item} />
        </motion.div>
      ))}

      {/* Expandable extra items */}
      <AnimatePresence initial={false}>
        {expanded &&
          hidden.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -14, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: -14, height: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04, ease: [0, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pt-2.5">
                <SkillItem item={item} />
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Toggle button */}
      {hidden.length > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 flex items-center gap-1.5 self-start px-3 py-2 rounded-xl"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-primary)',
            background: 'rgba(0,212,255,0.05)',
            border: '1px solid rgba(0,212,255,0.15)',
            transition:
              'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,212,255,0.12)'
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,212,255,0.05)'
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'
          }}
        >
          {expanded ? 'View less' : `+${hidden.length} more skills`}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            style={{ display: 'flex' }}
          >
            <ChevronDown size={13} />
          </motion.span>
        </button>
      )}
    </div>
  )
}
