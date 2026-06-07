import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Download, ArrowDown, BarChart2, Database, TrendingUp } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: (i || 0) * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

const floatBadges = [
  { Icon: BarChart2, label: 'Power BI', style: { top: '8%', left: '-10%' }, delay: 0.8 },
  { Icon: Database, label: 'SQL & Python', style: { top: '58%', right: '-12%' }, delay: 1.0 },
  { Icon: TrendingUp, label: 'Data Analytics', style: { bottom: '8%', left: '-6%' }, delay: 1.2 },
]

function TypewriterEffect() {
  const titles = ['Power BI Developer', 'Data Analyst', 'Data Analyst & Power BI Developer', 'ECE Student']
  const [idx, setIdx] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = titles[idx]
    let timeout

    if (!deleting && display === target) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && display === '') {
      setDeleting(false)
      setIdx((i) => (i + 1) % titles.length)
    } else if (!deleting) {
      timeout = setTimeout(() => setDisplay(target.slice(0, display.length + 1)), 80)
    } else {
      timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 45)
    }

    return () => clearTimeout(timeout)
  }, [display, deleting, idx])

  return (
    <span>
      {display}
      <span style={{
        display: 'inline-block', width: 2, height: '1.1em',
        background: 'var(--red-500)', marginLeft: 3,
        verticalAlign: 'text-bottom',
        animation: 'blink 1s infinite',
      }} />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(225,29,72,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(225,29,72,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-grid">
          {/* Text content */}
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 20 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px',
                background: 'rgba(225,29,72,0.08)',
                border: '1px solid rgba(225,29,72,0.2)',
                borderRadius: 'var(--radius-full)',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--red-400)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--red-500)', animation: 'hpulse 2s infinite',
                }} />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 800, lineHeight: 1.1,
                letterSpacing: '-0.03em', marginBottom: 16,
              }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Rohith G</span>
            </motion.h1>

            <motion.h2
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)',
                fontWeight: 500, color: 'var(--text-secondary)',
                marginBottom: 24, letterSpacing: '-0.01em',
              }}
            >
              <TypewriterEffect />
            </motion.h2>

            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontSize: 16, lineHeight: 1.75,
                color: 'var(--text-secondary)',
                maxWidth: 500, marginBottom: 40,
              }}
            >
              Transforming Data Into Actionable Business Insights — turning raw numbers
              into compelling visual stories that drive strategic decisions.
            </motion.p>

            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}
            >
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BarChart2 size={15} />
                View Projects
              </button>
              <a href="#" className="btn-outline">
                <Download size={15} />
                Resume
              </a>
              <a href="https://github.com/Rohith-the-analyst" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Github size={15} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/rohith-g-4246a8402/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Linkedin size={15} />
                LinkedIn
              </a>
            </motion.div>

            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', gap: 36 }}
              className="hero-stats"
            >
              {[
                { value: '6+', label: 'Projects Built' },
                { value: '5+', label: 'Tools Mastered' },
                { value: '100%', label: 'Passion Driven' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28, fontWeight: 800,
                    color: 'var(--red-400)', lineHeight: 1,
                  }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            {floatBadges.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: b.delay, duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  ...b.style,
                  background: 'rgba(13,13,13,0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(225,29,72,0.25)',
                  borderRadius: 12,
                  padding: '10px 16px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 12, fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  zIndex: 3,
                }}
              >
                <b.Icon size={14} color="var(--red-400)" />
                {b.label}
              </motion.div>
            ))}

            <div style={{ position: 'relative', width: 320, height: 320 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -6, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 50%, rgba(225,29,72,0.8) 75%, transparent 100%)',
                  opacity: 0.5,
                }}
              />
              <div style={{
                position: 'absolute', inset: 2, borderRadius: '50%',
                background: 'var(--bg-primary)',
              }} />
              <img
                src="/WhatsApp_Image_2026-06-07_at_15.57.56.jpeg"
                alt="Rohith G — Data Analyst & Power BI Developer"
                style={{
                  position: 'absolute', inset: 8,
                  width: 'calc(100% - 16px)', height: 'calc(100% - 16px)',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  border: '2px solid rgba(225,29,72,0.4)',
                }}
              />
              <div style={{
                position: 'absolute', inset: -32, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(225,29,72,0.18) 0%, transparent 65%)',
                pointerEvents: 'none',
              }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 6, marginTop: 60,
            color: 'var(--text-muted)', fontSize: 11, letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes hpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child > div { justify-content: center; }
          .hero-stats { justify-content: center !important; }
          .hero-grid > div:last-child { order: -1; }
        }
      `}</style>
    </section>
  )
}
