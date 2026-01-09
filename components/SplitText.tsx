"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface SplitTextProps {
  text: string
  className?: string
}

export default function SplitText({ text, className = "" }: SplitTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const parent = textRef.current
    if (!parent) return

    const chars = parent.querySelectorAll(".char")

    const handleMouseEnter = () => {
      gsap.to(chars, {
        y: -5,
        stagger: 0.02,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(chars, {
        y: 0,
        stagger: 0.02,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    parent.addEventListener("mouseenter", handleMouseEnter)
    parent.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter)
      parent.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <span ref={textRef} className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char inline-block transition-colors hover:text-zinc-300"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
