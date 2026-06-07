import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Target, Zap, Heart } from 'lucide-react'

const highlights = [
  { icon: GraduationCap, title: 'ECE Background', desc: 'Electronics & Communication Engineering fuels my analytical and systems thinking.' },
  { icon: Target, title: 'Data-Focused', desc: 'Passionate about transforming complex datasets into actionable business intelligence.' },
  { icon: Zap, title: 'Fast Learner', desc: 'Quickly adapts to new tools and technologies across the BI and analytics ecosystem.' },
  { icon: Heart, title: 'Impact Driven', desc: 'Every dashboard I build aims to drive real decisions and measurable business outcomes.' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="about" ref={ref} style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{
        position: 'absolute', top: '30%', right: 0,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(225,29,72,0.06) 0%, transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="about-grid">
          {/* Left — text */}
          <motion.div
            variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp} className="section-label">About Me</motion.div>
            <motion.h2 variants={fadeUp} className="section-title" style={{ marginBottom: 24 }}>
              Engineering Mind,<br />
              <span className="gradient-text">Analyst Heart</span>
            </motion.h2>

            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              I'm an Electronics and Communication Engineering student with a deep passion for
              Data Science, Business Intelligence, and Analytics. My engineering background
              gives me a unique edge in understanding complex systems — which I apply to
              dissecting data and building insights that matter.
            </motion.p>

            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              I specialize in Power BI development, combining clean data modeling with
              visually rich, interactive dashboards. I bridge the gap between raw data
              and meaningful business decisions.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="https://github.com/Rohith-the-analyst"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary"
              >
                View GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/rohith-g-4246a8402/"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline"
              >
                Connect on LinkedIn
              </a>
            </motion.div>
          </motion.div>

          {/* Right — highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
            className="highlights-grid"
          >
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                className="glass-card"
                style={{ padding: '24px 20px', transition: 'var(--transition)' }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(225,29,72,0.2)' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(225,29,72,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <Icon size={20} color="var(--red-400)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
                  {title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .highlights-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .highlights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
