import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  {
    category: 'BI & Visualization',
    items: [
      { name: 'Power BI', level: 92, icon: '📊' },
      { name: 'Data Visualization', level: 88, icon: '📈' },
      { name: 'DAX', level: 85, icon: '⚡' },
      { name: 'Power Query', level: 87, icon: '🔄' },
    ],
  },
  {
    category: 'Data & Analytics',
    items: [
      { name: 'SQL', level: 85, icon: '🗃️' },
      { name: 'Python', level: 75, icon: '🐍' },
      { name: 'Excel Analytics', level: 90, icon: '📋' },
      { name: 'Data Modeling', level: 82, icon: '🏗️' },
    ],
  },
]

const badges = [
  'Power BI', 'SQL', 'Python', 'DAX', 'Excel',
  'Power Query', 'Data Modeling', 'Star Schema',
  'ETL', 'KPI Design', 'Dashboard Design', 'Business Intelligence',
]

function SkillBar({ name, level, icon, inView, delay }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          {name}
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--red-400)' }}>{level}%</span>
      </div>
      <div style={{
        height: 4, background: 'rgba(255,255,255,0.06)',
        borderRadius: 'var(--radius-full)', overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--red-600), var(--red-400))',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 0 8px rgba(225,29,72,0.5)',
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="skills" ref={ref} style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent, rgba(225,29,72,0.03) 50%, transparent)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <motion.div
          variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.div variants={fadeUp} className="section-label" style={{ justifyContent: 'center' }}>
            Technical Skills
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-title">
            Tools I Work <span className="gradient-text">With</span>
          </motion.h2>
        </motion.div>

        {/* Skill bars */}
        <div className="skills-grid">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card"
              style={{ padding: '32px 28px' }}
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 13, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--red-400)', marginBottom: 24,
              }}>
                {group.category}
              </h3>
              {group.items.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  inView={inView}
                  delay={gi * 0.15 + si * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{ marginTop: 48, textAlign: 'center' }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Technologies & Tools
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(225,29,72,0.4)', background: 'rgba(225,29,72,0.08)' }}
                style={{
                  padding: '7px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 13, fontWeight: 500,
                  color: 'var(--text-secondary)',
                  cursor: 'default',
                  transition: 'var(--transition)',
                }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
