import { LogoMorph } from './ui/logo-morph'

const LOGOS = [
  { src: '/logos/abn-logo.png',           name: 'ABN' },
  { src: '/logos/agriventure-logo.png',   name: 'Agriventure' },
  { src: '/logos/apollo-logo.png',        name: 'Apollo' },
  { src: '/logos/aqsa-logo.png',          name: 'Aqsa' },
  { src: '/logos/citypower-logo.png',     name: 'City Power' },
  { src: '/logos/cle-logo.png',           name: 'CLE' },
  { src: '/logos/coolcart-logo.png',      name: 'Cool Cart' },
  { src: '/logos/goldenglobe-logo.png',   name: 'Golden Globe' },
  { src: '/logos/goldenlegacy logo.png',  name: 'Golden Legacy' },
  { src: '/logos/greenpest logo.png',     name: 'Green Pest' },
  { src: '/logos/gulab-logo.png',         name: 'Gulab' },
  { src: '/logos/hamza logo.png',         name: 'Hamza' },
  { src: '/logos/mistygreens-logo.png',   name: 'Misty Greens' },
  { src: '/logos/nuralnahar-logo.png',    name: 'Nural Nahar' },
  { src: '/logos/partyhat-logo.png',      name: 'Party Hat' },
  { src: '/logos/pebbles-logo.png',       name: 'Pebbles' },
  { src: '/logos/pestora-logo.png',       name: 'Pestora' },
  { src: '/logos/pinewood-logo.png',      name: 'Pinewood' },
  { src: '/logos/queenslaundry-logo.png', name: 'Queens Laundry' },
  { src: '/logos/quickaccess-logo.png',   name: 'Quick Access' },
  { src: '/logos/rastilaril-logo.png',    name: 'Rastilaril' },
  { src: '/logos/redmax-logo.png',        name: 'Red Max' },
  { src: '/logos/rico-logo.png',          name: 'Rico' },
  { src: '/logos/royaheavy-logo.png',     name: 'Roya Heavy' },
  { src: '/logos/williamkanda-logo.png',  name: 'William Kanda' },
]

export default function Clients() {
  return (
    <section
      id="clients"
      className="min-h-[100dvh] flex flex-col py-24 overflow-hidden"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      {/* Section header */}
      <div className="px-6 mb-8 text-center">
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
        >
          Clients
        </p>
        <h2
          className="text-3xl md:text-5xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          Companies I've Worked With
        </h2>
        <p
          className="text-sm"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-muted)' }}
        >
          Hover any logo to see the company name
        </p>
      </div>

      {/* Wave flow — full width */}
      <div className="flex-1 flex items-center">
        <LogoMorph logos={LOGOS} />
      </div>
    </section>
  )
}
