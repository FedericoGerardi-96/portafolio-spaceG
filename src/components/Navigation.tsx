"use client"

import { useState, useEffect, useCallback } from "react"

const navLinks = [
  {
    label: "Inicio",
    href: "#hero",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    label: "Sobre mi",
    href: "#about",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    ),
  },
  {
    label: "Proyectos",
    href: "#projects",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    label: "Contacto",
    href: "#contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

// Arc config - center of the arc is at the right edge, items curve to the left
const ARC_RADIUS = 120
// Spread items from -45deg to +45deg (top to bottom)
const ANGLE_START = -42
const ANGLE_END = 42

function getItemAngle(index: number, total: number) {
  if (total === 1) return 0
  return ANGLE_START + (index * (ANGLE_END - ANGLE_START)) / (total - 1)
}

function getArcPosition(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: -ARC_RADIUS * Math.cos(rad),
    y: ARC_RADIUS * Math.sin(rad),
  }
}

// Build SVG arc path for the semicircle behind the items
function buildArcPath(radius: number, startAngle: number, endAngle: number) {
  const toRad = (d: number) => (d * Math.PI) / 180
  const x1 = -radius * Math.cos(toRad(startAngle))
  const y1 = radius * Math.sin(toRad(startAngle))
  const x2 = -radius * Math.cos(toRad(endAngle))
  const y2 = radius * Math.sin(toRad(endAngle))
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("#hero")
  const [isAtTop, setIsAtTop] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY
    setIsAtTop(scrollY < 100)

    const sections = navLinks.map((link) => {
      const id = link.href.replace("#", "")
      const el = document.getElementById(id)
      if (!el) return { href: link.href, top: 0 }
      return { href: link.href, top: el.offsetTop - 200 }
    })

    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollY >= sections[i].top) {
        setActiveSection(sections[i].href)
        return
      }
    }
    setActiveSection("#hero")
  }, [])

  useEffect(() => {
    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    return () => window.removeEventListener("scroll", updateActiveSection)
  }, [updateActiveSection])

  const expanded = isAtTop || isHovered

  // Padding around the arc for the SVG viewBox
  const svgPadding = 60
  const svgSize = ARC_RADIUS + svgPadding

  // Arc path that sits behind the nav items
  const arcPath = buildArcPath(ARC_RADIUS, ANGLE_START - 8, ANGLE_END + 8)

  return (
    <nav
      className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 md:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Navegacion principal"
    >
      {/* Positioned so the arc center sits at the right edge of the screen */}
      <div className="relative" style={{ height: svgSize * 2 }}>
        {/* SVG semicircle arc behind items */}
        <svg
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            width: svgSize * 2,
            height: svgSize * 2,
            opacity: 1,
          }}
          viewBox={`${-svgSize} ${-svgSize} ${svgSize * 2} ${svgSize * 2}`}
        >
          {/* Outer glow arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="hsl(190 95% 55% / 0.06)"
            strokeWidth="48"
            strokeLinecap="round"
          />
          {/* Main arc line */}
          <path
            d={arcPath}
            fill="none"
            stroke="hsl(190 95% 55% / 0.15)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Inner subtle arc */}
          <path
            d={buildArcPath(ARC_RADIUS - 22, ANGLE_START - 4, ANGLE_END + 4)}
            fill="none"
            stroke="hsl(190 95% 55% / 0.05)"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeDasharray="4 8"
          />
          {/* Outer subtle arc */}
          <path
            d={buildArcPath(ARC_RADIUS + 22, ANGLE_START - 4, ANGLE_END + 4)}
            fill="none"
            stroke="hsl(190 95% 55% / 0.05)"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeDasharray="4 8"
          />
        </svg>

        {/* Nav items positioned along the arc */}
        {navLinks.map((link, index) => {
          const isActive = activeSection === link.href
          const angle = getItemAngle(index, navLinks.length)
          const { x, y } = getArcPosition(angle)

          return (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              aria-current={isActive ? "true" : undefined}
              className="absolute transition-all duration-700 ease-out"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
              }}
            >
              <span
                className={`group flex items-center ${expanded ? "gap-2" : ""} transition-all duration-500 ease-out ${
                  expanded
                    ? "rounded-xl border px-3.5 py-2"
                    : "h-10 w-10 justify-center rounded-full border"
                } ${
                  isActive
                    ? "border-primary/40 bg-primary/15 text-primary shadow-[0_0_24px_hsl(190_95%_55%/0.25)]"
                    : "border-border/30 bg-background/30 text-muted-foreground backdrop-blur-md hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                }`}
              >
                <span
                  className={`shrink-0 transition-transform duration-300 ${
                    isActive ? "scale-110 drop-shadow-[0_0_8px_hsl(190_95%_55%/0.6)]" : "group-hover:scale-110"
                  }`}
                >
                  {link.icon}
                </span>
                <span
                  className={`whitespace-nowrap text-xs font-medium transition-all duration-500 ease-out ${
                    expanded ? "w-auto max-w-[80px] opacity-100" : "w-0 max-w-0 overflow-hidden opacity-0"
                  }`}
                >
                  {link.label}
                </span>
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
