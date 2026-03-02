import { useState, useEffect } from 'react'
import { Menu, X, Home, Briefcase, Zap, Play, Users, Mail } from 'lucide-react'
import { TubelightNav } from './ui/tubelight-navbar'

const NAV_ITEMS = [
  { name: 'Home',    url: '#',         icon: Home },
  { name: 'Work',    url: '#projects', icon: Briefcase },
  { name: 'Skills',  url: '#skills',   icon: Zap },
  { name: 'Videos',  url: '#videos',   icon: Play },
  { name: 'Clients', url: '#clients',  icon: Users },
  { name: 'Contact', url: '#contact',  icon: Mail },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all"
        style={{
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          transitionDuration: 'var(--dur-fast)',
          transitionTimingFunction: 'var(--ease-out)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          {/* Monogram */}
          <a
            href="#"
            className="text-xl font-black tracking-tight select-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            SV
          </a>

          {/* Desktop — tubelight pill */}
          <div className="hidden md:flex">
            <TubelightNav items={NAV_ITEMS} />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 rounded"
            style={{ color: 'var(--color-text)', outlineColor: 'var(--color-primary)' }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className="fixed inset-0 z-[99] flex flex-col items-center justify-center md:hidden transition-all glass"
        style={{
          background: 'rgba(5,5,5,0.9)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transitionDuration: 'var(--dur-fast)',
          transitionTimingFunction: 'var(--ease-smooth)',
        }}
      >
        <ul className="flex flex-col items-center gap-10">
          {NAV_ITEMS.map(({ name, url }) => (
            <li key={name}>
              <a
                href={url}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-bold tracking-tight transition-colors"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
