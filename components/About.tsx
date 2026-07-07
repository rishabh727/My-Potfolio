"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const textEl = textRef.current
    if (!section || !textEl) return

    const words = textEl.querySelectorAll(".word")

    gsap.fromTo(
      words,
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const aboutText =
    "I'm Rishabh a frontend developer passionate about creating beautiful, performant, and accessible web experiences. With expertise in JavaScript, React, and modern animation libraries, I transform designs into seamless interactive journeys."

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-32 px-6 md:px-12 bg-[#0a0a0a] sm:overflow-hidden"
    >
      <div className="max-w-5xl">
        <span className="text-sm font-medium tracking-[0.3em] text-zinc-400 uppercase mb-8 block">About Me</span>
        <p ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight text-white">
          {aboutText.split(" ").map((word, index) => (
            <span key={index} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "2+", label: "Years Experience" },
            { number: "5+", label: "Projects Completed" },
            { number: "2", label: "Internship" },
            { number: "1", label: "Certification"},
          ].map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <span className="text-4xl md:text-5xl font-serif font-bold text-white">{stat.number}</span>
              <p className="text-sm text-zinc-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
