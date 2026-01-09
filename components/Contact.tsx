"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MagneticButton from "./MagneticButton"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const heading = headingRef.current
    const form = formRef.current

    if (!heading || !form) return

    gsap.fromTo(
      heading.querySelectorAll(".char"),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      form,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const headingText = "Let's Work Together"

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-32 px-6 md:px-12 flex items-center bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-sm font-medium tracking-[0.3em] text-zinc-400 uppercase mb-4 block">
              Get In Touch
            </span>
            <h2
              ref={headingRef}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-white"
            >
              {headingText.split("").map((char, index) => (
                <span key={index} className="char inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
                  {char}
                </span>
              ))}
            </h2>

            <div className="mt-12 space-y-6">
              <div>
                <span className="text-sm text-zinc-400 uppercase tracking-wider">Email</span>
                <p className="text-xl mt-1 text-white">hello@johndoe.dev</p>
              </div>
              <div>
                <span className="text-sm text-zinc-400 uppercase tracking-wider">Location</span>
                <p className="text-xl mt-1 text-white">San Francisco, CA</p>
              </div>
              <div className="flex gap-4 mt-8">
                {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                  <MagneticButton key={social}>
                    <a
                      href="#"
                      className="px-4 py-2 border border-zinc-800 rounded-full text-sm text-white hover:bg-white hover:text-[#0a0a0a] transition-colors duration-300"
                    >
                      {social}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm text-zinc-400 uppercase tracking-wider block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-lg text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-600"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-zinc-400 uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-lg text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-600"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-zinc-400 uppercase tracking-wider block mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-lg text-white focus:outline-none focus:border-white transition-colors duration-300 resize-none placeholder:text-zinc-600"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <MagneticButton strength={0.2}>
              <button
                type="submit"
                className="mt-8 px-8 py-4 bg-white text-[#0a0a0a] rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300"
              >
                Send Message
              </button>
            </MagneticButton>
          </form>
        </div>

        <div className="mt-32 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">© 2026 John Doe. All rights reserved.</p>
          <p className="text-zinc-400 text-sm">Built with React, GSAP & Tailwind CSS</p>
        </div>
      </div>
    </section>
  )
}
