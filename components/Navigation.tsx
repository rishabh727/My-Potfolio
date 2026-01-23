"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MagneticButton from "./MagneticButton"

gsap.registerPlugin(ScrollTrigger)

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // initial animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    )

    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 100) {
          gsap.to(nav, { y: -100, duration: 0.3, ease: "power2.out" })
        } else {
          gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" })
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  const navLinks = ["About", "Skills", "Experience", "Contact"]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between bg-transparent"
      >
        <MagneticButton>
          <a href="#" className="text-xl font-serif font-semibold text-white">
            RM
          </a>
        </MagneticButton>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <MagneticButton key={link}>
              <button
                onClick={() => scrollToSection(link)}
                className="text-sm font-medium text-zinc-400 hover:text-white transition"
              >
                {link}
              </button>
            </MagneticButton>
          ))}
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50 relative"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#0a0a0a] z-40 flex flex-col items-center justify-center transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <button
            key={link}
            onClick={() => scrollToSection(link)}
            className="text-4xl font-serif font-semibold py-4 text-white hover:text-zinc-400 transition"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {link}
          </button>
        ))}
      </div>
    </>
  )
}
