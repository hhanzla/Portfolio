# Hanzla Masood — Digital Architect Portfolio (Astro.js)

A modern, high-performance personal portfolio website built with **Astro.js**, featuring a dark ember aesthetic, hardware-accelerated GSAP animations, fluid responsive design, Lenis 60 FPS smooth scroll, and Chrome Auto-Dark Mode protection.

---

## ✨ Features

- **🚀 Built with Astro.js** — Zero JS by default, ultra-fast static HTML rendering, and modular component architecture.
- **⚡ Hardware-Accelerated GSAP Animations** — 1-to-1 continuous frame-by-frame Hero Morphing background transition on scroll, section reveals, magnetic button physics, and cursor glow follower.
- **🌊 Lenis Smooth Scroll Engine** — 60 FPS inertia momentum scrolling and smooth section navigation.
- **🎴 Alternating 2-Column Work Cards** — Sleek dark glassmorphic placeholders with vector icons, project title badges, and `VIEW CASE STUDY +` links.
- **🎨 Curated 2-Font Design System** — Montserrat (headings) + Inter (body text) + Space Mono (code/numbers).
- **🛡️ Chrome Auto-Dark Mode Immunity** — Native `<meta name="color-scheme">` directives and solid white layer workarounds for header navbar and logo badge.
- **📱 Fluid Mobile Responsive** — Bottom floating navbar pill, adaptive font clamping, and zero overflow.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Astro.js (v5)** | Modern static site generator & framework |
| **Tailwind CSS (v3)** | Utility styling & layout primitives |
| **Vanilla CSS3** | Custom animations, glassmorphic styling, and scrollbars |
| **GSAP 3** | High-performance 60 FPS timelines & scroll reveals |
| **Lenis** | Smooth 60 FPS momentum scroll engine |
| **Lucide Icons** | Vector icon set |

---

## 📁 Project Architecture

```text
My Portfolio/
├── public/                     # Static assets
│   ├── favicon.png
│   └── logo.png
├── src/
│   ├── components/             # Modular Astro UI Components
│   │   ├── Navbar.astro        # Header & Floating Draggable Navigation
│   │   ├── Hero.astro          # Hero section + Morphing scroll script
│   │   ├── WorkSection.astro   # Selected Works container
│   │   ├── WorkCard.astro      # Alternating 2-column project card
│   │   ├── AboutSection.astro  # Biography, services, 6px skill tags
│   │   └── ContactSection.astro# Email box, social cards, footer
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML layout, fonts, Lenis & GSAP CDN scripts
│   ├── pages/
│   │   └── index.astro         # Main page composing all section components
│   └── styles/
│       └── global.css          # Design system, glassmorphism, responsive rules
├── astro.config.mjs            # Astro configuration
└── package.json                # Project dependencies
```

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:4321` in your browser.

3. **Build for production**
   ```bash
   npm run build
   ```
   Production bundle will be output to the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages!

---

## 📬 Contact & Links

- **Location:** Based in Pakistan 🇵🇰
- **Email:** [hanzlamasood@gmail.com](mailto:hanzlamasood@gmail.com)
- **GitHub:** [codewithhazzi](https://github.com/codewithhazzi)

---

> Built with ❤️ by **Hanzla Masood** — Est. 2026
