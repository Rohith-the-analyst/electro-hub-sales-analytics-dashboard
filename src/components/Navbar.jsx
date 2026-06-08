import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['hero', 'about', 'skills', 'projects', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 32px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'var(--red-500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'white',
          }}>R</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>
            Rohith G
          </span>
        </a>

        <nav style={{ display: 'flex', gap: 4 }} className="nav-desktop">
          {links.map((link) => {
            const id = link.href.replace('#', '')
            const active = activeSection === id
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? 'var(--red-400)' : 'var(--text-secondary)',
                  background: active ? 'rgba(225,29,72,0.1)' : 'transparent',
                  transition: 'var(--transition)',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <a
          href="/dS_RESUME.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary nav-cta"
          style={{ padding: '8px 20px', fontSize: 13 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Resume
        </a>

        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: 8, padding: 8, color: 'var(--text-primary)',
            display: 'none',
          }}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0,
              background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '16px 24px 24px',
              zIndex: 99, display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                style={{
                  padding: '12px 16px', borderRadius: 8,
                  fontSize: 15, fontWeight: 500,
                  color: activeSection === link.href.replace('#', '') ? 'var(--red-400)' : 'var(--text-primary)',
                  background: activeSection === link.href.replace('#', '') ? 'rgba(225,29,72,0.1)' : 'transparent',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
