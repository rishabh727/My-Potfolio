"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const skills = [
  { name: "React", icon: "⚛️", level: 95 },
  { name: "Next.js", icon: "▲", level: 90 },
  { name: "TypeScript", icon: "TS", level: 88 },
  { name: "GSAP", icon: "🟢", level: 85 },
  { name: "Tailwind CSS", icon: "🎨", level: 95 },
  { name: "Framer Motion", icon: "🔮", level: 80 },
  { name: "Three.js", icon: "🧊", level: 70 },
  { name: "Node.js", icon: "🟩", level: 75 },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    skillsRef.current.forEach((skill, index) => {
      if (!skill) return

      gsap.fromTo(
        skill,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skill,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const progressBar = skill.querySelector(".progress-bar") as HTMLElement
      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { width: 0 },
          {
            width: progressBar.dataset.width,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skill,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-32 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <span className="text-sm font-medium tracking-[0.3em] text-zinc-400 uppercase mb-4 block">Expertise</span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-16 text-white">Skills & Technologies</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => {
                skillsRef.current[index] = el
              }}
              className="group p-6 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-xl font-medium text-white">{skill.name}</span>
                </div>
                <span className="text-zinc-400">{skill.level}%</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-white rounded-full" data-width={`${skill.level}%`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
