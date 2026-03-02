
const PLATFORMS = [
  {
    name: 'Gmail',
    description: 'Drop me a message',
    href: 'mailto:shonvarghesevenad@gmail.com',
    shadowColor: 'rgba(234, 67, 53, 0.35)',
    gradientFrom: '#ea4335',
    gradientTo: '#fbbc04',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    description: 'See what I build',
    href: 'https://github.com/shonv',
    shadowColor: 'rgba(240, 246, 252, 0.2)',
    gradientFrom: '#6e7681',
    gradientTo: '#30363d',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    description: 'Chat directly',
    href: 'https://wa.me/971505513554',
    shadowColor: 'rgba(37, 211, 102, 0.35)',
    gradientFrom: '#25d366',
    gradientTo: '#128c7e',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-[100dvh] flex flex-col justify-center items-center px-6 md:px-10 py-24"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="w-full max-w-4xl text-center">
        <p
          className="text-xs tracking-widest uppercase mb-6"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
        >
          Get in Touch
        </p>

        {/* Heading */}
        <div className="mb-16">
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'var(--color-text)',
            }}
          >
            Available for freelance &amp;<br />full-time opportunities
          </h2>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-20">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target={platform.name !== 'Gmail' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl p-7 text-left block
                         focus-visible:outline-none focus-visible:ring-2"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transitionProperty: 'transform, opacity, border-color, box-shadow',
                transitionDuration: 'var(--dur-fast)',
                transitionTimingFunction: 'var(--ease-smooth)',
                outlineColor: 'var(--color-primary)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.border = '1px solid var(--color-primary)'
                el.style.boxShadow = `0 0 20px ${platform.shadowColor}, 0 20px 60px rgba(0,212,255,0.06)`
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.border = '1px solid rgba(255, 255, 255, 0.08)'
                el.style.boxShadow = 'none'
                el.style.transform = 'translateY(0)'
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 40%, ${platform.shadowColor}, transparent 70%)`,
                  transitionProperty: 'opacity',
                  transitionDuration: 'var(--dur-fast)',
                }}
              />

              {/* Shimmer sweep */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.04), transparent)',
                  transitionProperty: 'transform',
                  transitionDuration: 'var(--dur-slow)',
                  transitionTimingFunction: 'var(--ease-smooth)',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="mb-5 inline-flex p-3 rounded-xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${platform.gradientFrom}, ${platform.gradientTo})`,
                    transitionProperty: 'transform',
                    transitionDuration: 'var(--dur-fast)',
                  }}
                >
                  {platform.icon}
                </div>

                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                >
                  {platform.name}
                </h3>
                <p
                  className="text-sm mb-5"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
                >
                  {platform.description}
                </p>

                {/* Arrow row */}
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-dim)' }}
                >
                  <span
                    className="group-hover:text-[var(--color-primary)]"
                    style={{ transitionProperty: 'color', transitionDuration: 'var(--dur-fast)' }}
                  >
                    Connect
                  </span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1"
                    style={{
                      color: 'currentColor',
                      transitionProperty: 'transform',
                      transitionDuration: 'var(--dur-fast)',
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-center gap-4 text-xs"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
        >
          <span>© 2025 Shon Varghese</span>
        </div>
      </div>
    </section>
  )
}
