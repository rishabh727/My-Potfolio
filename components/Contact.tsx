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

  const [loading, setLoading] = useState(false)

  const socials = [
    { name: "GitHub", url: "https://github.com/rishabh727" },
    { name: "LinkedIn", url: "https://linkedin.com/in/rishabh-maurya-1158aa29a/" },
    { name: "Twitter", url: "https://twitter.com/Rishabhm7275" },
    { name: "Instagram", url: "https://instagram.com/rishabhmaurya____" },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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
        },
      }
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
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // 🔥 REAL SMTP SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      const data = await res.json()

      if (!data.success) throw new Error("Email failed")

      alert("Message sent successfully 🚀")

      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      alert("Something went wrong 😢")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const headingText = "Let's Work Together"

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 md:px-12 flex items-center bg-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-sm tracking-[0.3em] text-zinc-400 uppercase mb-4 block">
              Get In Touch
            </span>

            <h2
              ref={headingRef}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white"
            >
              {headingText.split("").map((char, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </span>
              ))}
            </h2>

            <div className="mt-12 space-y-6">
              <div>
                <span className="text-sm text-zinc-400 uppercase">Email</span>
                <p className="text-xl text-white">
                  rishabh7275m@gmail.com
                </p>
              </div>

              <div>
                <span className="text-sm text-zinc-400 uppercase">Location</span>
                <p className="text-xl text-white">Delhi, India</p>
              </div>

              <div className="flex gap-4 flex-wrap">
                {socials.map((s) => (
                  <MagneticButton key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      className="px-4 py-2 border border-zinc-800 rounded-full text-sm text-white hover:bg-white hover:text-black transition"
                    >
                      {s.name}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none"
            />

            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none"
            />

            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell me about your project..."
              required
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none resize-none"
            />

            <MagneticButton strength={0.2}>
              <button
                type="submit"
                disabled={loading}
                className="mt-8 px-8 py-4 bg-white text-black rounded-full text-lg hover:scale-105 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  )
}
