"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
// import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import WhyHireMe from "@/components/WhyHireMe"
import Contact from "@/components/Contact"
import Navigation from "@/components/Navigation"
import CustomCursor from "@/components/CustomCursor"

gsap.registerPlugin(ScrollTrigger)

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="relative bg-[#0a0a0a] text-[#fafafa]">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        {/* <Projects /> */}
        <Experience />
        <WhyHireMe />
        <Contact />
      </main>
    </div>
  )
}
