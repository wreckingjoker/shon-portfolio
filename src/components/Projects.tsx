import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import 'gsap/ScrollTrigger'
import { ProjectCard } from './ui/project-card'

interface Project {
  title: string
  stack: string
  description: string
  tags: string[]
  imgSrc: string
  link: string
}

const PROJECTS: Project[] = [
  {
    title: 'WordPress Blog Automation',
    stack: 'OpenAI API · n8n · REST API',
    description: 'Auto-publishes SEO-optimised blog content daily without human input',
    tags: ['OpenAI API', 'n8n', 'REST API', 'WordPress'],
    imgSrc: '/thumbnails/project-blog.webp.png',
    link: '#contact',
  },
  {
    title: 'Multi-Agent SEO Optimizer',
    stack: 'SERP Scraping · AI Summarization · Humanization',
    description: 'Generates competitor-beating long-form content at scale',
    tags: ['LangChain', 'OpenAI', 'Apify', 'Python'],
    imgSrc: '/thumbnails/project-seo.webp.png',
    link: '#contact',
  },
  {
    title: 'AI Gmail Manager',
    stack: 'Real-time Classification · Auto-labeling · AI Responses',
    description: 'Eliminated repetitive email triage for marketing teams',
    tags: ['OpenAI API', 'n8n', 'Gmail API', 'FastAPI'],
    imgSrc: '/thumbnails/project-gmail.webp.png',
    link: '#contact',
  },
  {
    title: 'Google Maps Lead Gen',
    stack: 'Apify · Deduplication · Google Sheets',
    description: 'Delivered structured, clean lead lists automatically',
    tags: ['Apify', 'Google Sheets API', 'Python', 'n8n'],
    imgSrc: '/thumbnails/project-leadgen.webp.png',
    link: '#contact',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = gridRef.current?.querySelectorAll('.project-card')
    if (!cards?.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="projects"
      className="py-32 px-6 md:px-10 flex flex-col items-center"
    >
      <div className="w-full max-w-5xl">
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
        >
          Selected Work
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-16"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          What I've Built
        </h2>

        <div
          ref={gridRef}
          className="flex flex-wrap justify-center gap-4"
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              className="w-full md:w-[calc(50%-0.5rem)]"
              imgSrc={project.imgSrc}
              title={project.title}
              stack={project.stack}
              description={project.description}
              tags={project.tags}
              link={project.link}
              linkText="View Details"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
