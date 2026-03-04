import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { MeshGradient } from '@paper-design/shaders-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Videos from './components/Videos'
import Skills from './components/Skills'
import Clients from './components/Clients'
import Experience from './components/Experience'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time: number) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      {/* Fixed full-viewport mesh gradient — z-index 0, stays in place as page scrolls */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: '#050505' }}
          colors={['#000000', '#00d4ff', '#0a1a2e', '#050505', '#7b2fff']}
          speed={0.3}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-30"
          colors={['#000000', '#ffffff', '#00d4ff', '#7b2fff']}
          speed={0.2}
        />
      </div>

      {/* Scrollable content above gradient */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Videos />
          <Skills />
          <Clients />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  )
}
