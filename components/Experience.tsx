"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const experiences = [
  {
    year: "2023 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Innovation Co.",
    description:
      "Leading frontend architecture and mentoring junior developers. Building scalable web applications with React and Next.js.",
  },
  {
    year: "2021 - 2023",
    title: "Frontend Developer",
    company: "Digital Agency Pro",
    description:
      "Developed award-winning websites and web applications. Specialized in animations and interactive experiences.",
  },
  {
    year: "2019 - 2021",
    title: "Junior Developer",
    company: "StartUp Labs",
    description:
      "Started my journey in web development. Built responsive websites and learned modern frontend frameworks.",
  },
  {
    year: "2015 - 2019",
    title: "Computer Science Degree",
    company: "University of Technology",
    description: "Bachelor's degree in Computer Science with focus on software engineering and web technologies.",
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const timeline = timelineRef.current

    if (!section || !timeline) return

    gsap.fromTo(
      timeline,
      { height: 0 },
      {
        height: "100%",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        },
      },
    )

    itemsRef.current.forEach((item, index) => {
      if (!item) return
      gsap.fromTo(
        item,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="min-h-screen py-32 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <span className="text-sm font-medium tracking-[0.3em] text-zinc-400 uppercase mb-4 block">Journey</span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-16 text-white">Experience & Education</h2>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 transform -translate-x-1/2">
            <div ref={timelineRef} className="w-full bg-white origin-top" style={{ height: 0 }} />
          </div>

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemsRef.current[index] = el
                }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/2" />
                <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <span className="text-sm text-zinc-400">{exp.year}</span>
                  <h3 className="text-2xl font-serif font-bold mt-2 text-white">{exp.title}</h3>
                  <p className="text-zinc-300 mt-1">{exp.company}</p>
                  <p className="text-zinc-400 mt-4 leading-relaxed">{exp.description}</p>
                </div>

                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 border-4 border-[#0a0a0a]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
