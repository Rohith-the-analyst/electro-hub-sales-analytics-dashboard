import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)
  // phase 0: count up, phase 1: text reveal, phase 2: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1400)
    const t2 = setTimeout(() => setPhase(2), 2800)
    const t3 = setTimeout(() => onComplete(), 3600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0,
            background: '#080808',
            zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(225,29,72,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(225,29,72,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }} />

          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '35%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(225,29,72,0.1) 0%, transparent 65%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }} />

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 40, position: 'relative' }}
          >
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: -10,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 40%, rgba(225,29,72,0.9) 65%, transparent 100%)',
                opacity: 0.7,
              }}
            />
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
              border: '1px solid rgba(225,29,72,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 1,
            }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 34, fontWeight: 800,
                color: 'var(--red-500)',
                lineHeight: 1,
              }}>R</span>
            </div>
          </motion.div>

          {/* Name */}
          <div style={{ overflow: 'hidden', marginBottom: 10 }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#f8f8f8',
                lineHeight: 1,
              }}
            >
              Rohith G
            </motion.h1>
          </div>

          {/* Title */}
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 14, fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--red-400)',
              }}
            >
              Data Analyst &amp; Power BI Developer
            </motion.p>
          </div>

          {/* Progress bar */}
          <div style={{ width: 200, position: 'relative' }}>
            <div style={{
              height: 1,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: phase >= 1 ? '100%' : '55%' }}
                transition={{ duration: phase >= 1 ? 1.0 : 1.2, ease: phase >= 1 ? [0.22, 1, 0.36, 1] : 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--red-600), var(--red-400))',
                  borderRadius: 4,
                  boxShadow: '0 0 8px rgba(225,29,72,0.6)',
                }}
              />
            </div>
            <PercentCounter active={phase >= 1} />
          </div>

          {/* Corner accents */}
          {[
            { top: 24, left: 24 },
            { top: 24, right: 24 },
            { bottom: 24, left: 24 },
            { bottom: 24, right: 24 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              style={{
                position: 'absolute', ...pos,
                width: 20, height: 20,
                borderTop: i < 2 ? '1px solid rgba(225,29,72,0.3)' : 'none',
                borderBottom: i >= 2 ? '1px solid rgba(225,29,72,0.3)' : 'none',
                borderLeft: (i === 0 || i === 2) ? '1px solid rgba(225,29,72,0.3)' : 'none',
                borderRight: (i === 1 || i === 3) ? '1px solid rgba(225,29,72,0.3)' : 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PercentCounter({ active }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) {
      let n = 0
      const id = setInterval(() => {
        n += Math.floor(Math.random() * 6) + 2
        if (n >= 55) { setCount(55); clearInterval(id) }
        else setCount(n)
      }, 60)
      return () => clearInterval(id)
    } else {
      let n = 55
      const id = setInterval(() => {
        n += Math.floor(Math.random() * 4) + 2
        if (n >= 100) { setCount(100); clearInterval(id) }
        else setCount(n)
      }, 30)
      return () => clearInterval(id)
    }
  }, [active])

  return (
    <div style={{
      marginTop: 10, textAlign: 'center',
      fontSize: 11, fontWeight: 700,
      letterSpacing: '0.1em',
      color: 'var(--text-muted)',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {count}%
    </div>
  )
}
