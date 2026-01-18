"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MagneticButton from "./MagneticButton"

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current

    gsap.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" })

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 100) {
          gsap.to(nav, { y: -100, duration: 0.3 })
        } else {
          gsap.to(nav, { y: 0, duration: 0.3 })
        }
      },
    })
  }, [])

  const navLinks = ["About", "Skills", "Experience", "Contact"]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference"
    >
      <MagneticButton>
        <a href="#" className="text-xl font-serif font-semibold tracking-tight text-white">
          RM
        </a>
      </MagneticButton>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <MagneticButton key={link}>
            <button
              onClick={() => scrollToSection(link)}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
            >
              {link}
            </button>
          </MagneticButton>
        ))}
      </div>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex flex-col gap-1.5 z-50">
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, index) => (
          <button
            key={link}
            onClick={() => scrollToSection(link)}
            className="text-4xl font-serif font-semibold py-4 text-white hover:text-zinc-400 transition-colors"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {link}
          </button>
        ))}
      </div>
    </nav>
  )
}
