import { useEffect, useRef } from 'react'

/** Returns a ref whose .current is scroll progress 0→1 (updated each scroll event). */
export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      progress.current = max > 0 ? window.scrollY / max : 0
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}
