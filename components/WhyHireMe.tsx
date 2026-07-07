"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const reasons = [
  {
    number: "01",
    title: "Pixel-Perfect Execution",
    description:
      "Every design is implemented with meticulous attention to detail, ensuring perfect alignment with your vision.",
  },
  {
    number: "02",
    title: "Performance Obsessed",
    description: "I optimize every line of code for speed and efficiency, delivering blazing-fast user experiences.",
  },
  {
    number: "03",
    title: "Animation Expertise",
    description: "Complex animations and micro-interactions that bring interfaces to life and delight users.",
  },
  {
    number: "04",
    title: "Clean, Maintainable Code",
    description: "Well-structured, documented code that your team can easily understand and build upon.",
  },
]

export default function WhyHireMe() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6 md:px-12 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <span className="text-sm font-medium tracking-[0.3em] text-zinc-400 uppercase mb-4 block">Why Me</span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-16 text-white">Why Hire Me?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.number}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group p-8 border border-zinc-800 rounded-2xl hover:border-zinc-600 transition-all duration-500 hover:bg-zinc-900/50"
              style={{ perspective: "1000px" }}
            >
              <span className="text-6xl font-serif font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors duration-500">
                {reason.number}
              </span>
              <h3 className="text-2xl font-serif font-bold mt-4 text-white">{reason.title}</h3>
              <p className="text-zinc-400 mt-4 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
