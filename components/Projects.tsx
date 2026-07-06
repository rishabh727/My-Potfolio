"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "/modern-e-commerce-platform-dark-theme.jpg",
    tech: ["React.js", "Tailwind", "Motion"],
  },
  {
    title: "Portfolio Website",
    category: "Design & Development",
    image: "/creative-portfolio-website-minimal-dark.jpg",
    tech: ["React", "GSAP", "Three.js"],
  },
  {
    title: "Mini Jira Application",
    category: "Web Application",
    image: "/saas-dashboard-analytics-dark-theme.jpg",
    tech: ["TypeScript", "React", "D3.js"],
  },
  // {
  //   title: "Mobile Banking App",
  //   category: "UI/UX Design",
  //   image: "/mobile-banking-app-interface-dark.jpg",
  //   tech: ["Figma", "React Native"],
  // },
  // {
  //   title: "AI Content Platform",
  //   category: "Full Stack",
  //   image: "/ai-content-platform-futuristic-dark.jpg",
  //   tech: ["Next.js", "OpenAI", "PostgreSQL"],
  // },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current

    if (!section || !container) return

    const scrollWidth = container.scrollWidth - window.innerWidth + 100

    gsap.to(container, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    gsap.to(titleRef.current, {
      x: -200,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute top-12 left-6 md:left-12 z-10">
        <span className="text-sm font-medium tracking-[0.3em] text-zinc-400 uppercase mb-4 block">Selected Work</span>
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-serif font-bold text-white">
          Projects
        </h2>
      </div>

      <div ref={containerRef} className="flex items-center gap-8 pl-6 md:pl-12 pt-32 pb-12 h-screen">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: {
    title: string
    category: string
    image: string
    tech: string[]
  }
  index: number
}

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    })

    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.2,
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    })
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.5,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] h-[70vh] relative group cursor-pointer"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      data-cursor-hover
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-800">
        <img
          ref={imageRef}
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-80" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="text-sm text-zinc-400 uppercase tracking-wider">{project.category}</span>
          <h3 className="text-3xl md:text-4xl font-serif font-bold mt-2 text-white">{project.title}</h3>
          <div className="flex gap-2 mt-4">
            {project.tech.map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-6 h-6 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  )
}
