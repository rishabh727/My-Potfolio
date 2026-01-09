"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitText from "./SplitText"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const container = containerRef.current
    const content = contentRef.current
    const overlay = overlayRef.current

    if (!hero || !container || !content || !overlay) return

    const tl = gsap.timeline({ delay: 0.8 })

    tl.fromTo(
      content.querySelectorAll(".hero-line"),
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" },
    )

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    scrollTl
      .to(container, {
        scale: 3,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        content,
        {
          opacity: 0,
          y: -100,
          duration: 0.5,
        },
        0,
      )
      .to(
        overlay,
        {
          opacity: 1,
          duration: 0.5,
        },
        0.5,
      )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={heroRef} className="h-screen w-full relative overflow-hidden bg-[#0a0a0a]">
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformOrigin: "center center" }}
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-radial from-zinc-900/50 via-[#0a0a0a] to-[#0a0a0a]" />

        <div ref={contentRef} className="relative z-10 text-center px-6 max-w-6xl">
          <div className="hero-line overflow-hidden mb-4">
            <span className="inline-block text-sm md:text-base font-medium tracking-[0.3em] text-zinc-400 uppercase">
              Frontend Developer
            </span>
          </div>

          <div className="hero-line overflow-hidden mb-2">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-white">
              <SplitText text="Creative" />
            </h1>
          </div>

          <div className="hero-line overflow-hidden mb-2">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-zinc-400">
              <SplitText text="Developer" />
            </h1>
          </div>

          <div className="hero-line overflow-hidden mt-8">
            <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Crafting immersive digital experiences through code, motion, and meticulous attention to detail.
            </p>
          </div>

          <div className="hero-line mt-12">
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-400 animate-bounce">
              <span>Scroll to explore</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div ref={overlayRef} className="absolute inset-0 bg-[#0a0a0a] opacity-0 pointer-events-none" />
    </section>
  )
}
