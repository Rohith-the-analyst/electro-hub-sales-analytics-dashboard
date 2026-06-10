import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Pre-seeded deterministic constants ─────────────────────────────────────
const RING_R = 44
const RING_C = +(2 * Math.PI * RING_R).toFixed(2) // 276.46

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 13) % 88) + 6,
  y: ((i * 53 + 7) % 86) + 7,
  size: (i % 3) * 1.3 + 1.4,
  dur: 3 + (i % 6) * 0.55,
  delay: (i * 0.21) % 2.6,
  opacity: 0.25 + (i % 4) * 0.12,
}))

const KPI_CARDS = [
  { label: 'Revenue',    value: '$2.4M', trend: '+12.5%', x: '5%',  y: '16%', delay: 0.15 },
  { label: 'Sessions',   value: '84.2K', trend: '+8.3%',  x: '74%', y: '12%', delay: 0.3  },
  { label: 'Conversion', value: '3.68%', trend: '+2.1%',  x: '78%', y: '66%', delay: 0.45 },
  { label: 'Growth',     value: '127%',  trend: '+15%',   x: '3%',  y: '70%', delay: 0.6  },
]

// Last coordinate pair extracted so dot position is data-driven
const CHART_SEGS = [
  { id: 0, points: '0,62 25,48 50,56 75,33 100,44 125,20 150,36 175,16 200,28', endX: 200, endY: 28, y: '22%', x: '55%', w: 200, delay: 0.1  },
  { id: 1, points: '0,52 30,66 60,40 90,55 120,28 150,46 180,24 200,38',         endX: 200, endY: 38, y: '62%', x: '2%',  w: 200, delay: 0.25 },
  { id: 2, points: '0,70 35,52 70,64 105,35 140,52 175,30 210,20',               endX: 210, endY: 20, y: '42%', x: '60%', w: 210, delay: 0.4  },
]

const MESSAGES = [
  'Loading Portfolio...',
  'Preparing Dashboards...',
  'Analyzing Data...',
  'Building Insights...',
]

const NAME_CHARS = 'Rohith G'.split('')

// ─── Ring ────────────────────────────────────────────────────────────────────
function Ring() {
  return (
    <svg
      width="108" height="108"
      viewBox="0 0 100 100"
      style={{ position: 'absolute', inset: -14, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#e11d48" stopOpacity="0.3" />
          <stop offset="60%"  stopColor="#e11d48" stopOpacity="1" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Faint track */}
      <circle cx="50" cy="50" r={RING_R} fill="none"
        stroke="rgba(225,29,72,0.12)" strokeWidth="1.5" />

      {/* Drawing arc — starts at top (rotate -90) */}
      <motion.circle
        cx="50" cy="50" r={RING_R}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        initial={{ strokeDasharray: RING_C, strokeDashoffset: RING_C }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        style={{ filter: 'drop-shadow(0 0 6px rgba(225,29,72,0.85))' }}
      />

      {/* Orbiting spark — uses a wrapper motion.g so SVG transform stays separate */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 1.1 }}
        style={{ transformOrigin: '50px 50px' }}
      >
        <circle cx="50" cy={50 - RING_R} r="2.5"
          fill="#fb7185"
          style={{ filter: 'drop-shadow(0 0 5px rgba(251,113,133,1))' }} />
      </motion.g>
    </svg>
  )
}

// ─── Chart sparkline ─────────────────────────────────────────────────────────
function ChartLine({ seg, phase }) {
  const areaId = `areaFill-${seg.id}`
  // Convert polyline points to SVG path for pathLength support
  const linePath = 'M' + seg.points.replace(/(\d+,\d+)/g, (_, p) => p).split(' ').join(' L').replace('L', '')
  const areaPath = `M0,80 L${seg.points.split(' ').join(' L')} L${seg.w},80 Z`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={phase >= 1 ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: seg.delay + 0.15 }}
      style={{ position: 'absolute', left: seg.x, top: seg.y, pointerEvents: 'none' }}
    >
      <svg width={seg.w} height="80" viewBox={`0 0 ${seg.w} 80`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(225,29,72,0.14)" />
            <stop offset="100%" stopColor="rgba(225,29,72,0)" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#${areaId})`}
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 1.3, delay: seg.delay + 0.4 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="rgba(225,29,72,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: seg.delay + 0.15 }}
        />

        {/* End dot */}
        <motion.circle
          cx={seg.endX} cy={seg.endY} r="3.5"
          fill="#e11d48"
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: seg.delay + 1.6, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: 'drop-shadow(0 0 5px rgba(225,29,72,1))' }}
        />
      </svg>
    </motion.div>
  )
}

// ─── KPI card ────────────────────────────────────────────────────────────────
function KpiCard({ card, phase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.9 }}
      animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', left: card.x, top: card.y,
        padding: '10px 14px',
        background: 'rgba(8,8,8,0.8)',
        border: '1px solid rgba(225,29,72,0.2)',
        borderRadius: 10,
        backdropFilter: 'blur(10px)',
        minWidth: 108,
        pointerEvents: 'none',
      }}
    >
      <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>
        {card.label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#f8f8f8', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
        {card.value}
      </div>
      <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, marginTop: 4 }}>
        {card.trend}
      </div>
    </motion.div>
  )
}

// ─── Rotating message ────────────────────────────────────────────────────────
function MessageCycler({ active }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setIdx(i => (i + 1) % MESSAGES.length), 720)
    return () => clearInterval(id)
  }, [active])

  return (
    <div style={{ height: 18, overflow: 'hidden', marginBottom: 14 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'block', textAlign: 'center',
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(225,29,72,0.8)',
          }}
        >
          {MESSAGES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// ─── Progress bar with count-up ──────────────────────────────────────────────
function ProgressBar({ active }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    if (!active) return
    let n = 0
    const tick = () => {
      n += Math.random() * 3 + 1.5
      if (n >= 100) { setPct(100); return }
      setPct(Math.round(n))
      setTimeout(tick, 20 + Math.random() * 16)
    }
    const id = setTimeout(tick, 80)
    return () => clearTimeout(id)
  }, [active])

  return (
    <div style={{ width: 220 }}>
      <div style={{ height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #be123c, #e11d48, #fb7185)',
            borderRadius: 4,
            boxShadow: '0 0 10px rgba(225,29,72,0.7), 0 0 20px rgba(225,29,72,0.3)',
            transition: 'width 0.04s linear',
          }}
        />
        {/* Shimmer sweep */}
        <motion.div
          animate={{ x: ['-100%', '500%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '25%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
          }}
        />
      </div>
      <div style={{
        marginTop: 8, textAlign: 'center',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.35)',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {pct}%
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const onCompleteRef = useRef(onComplete)
  const hasRunRef = useRef(false)
  const glowRef = useRef(null)

  useEffect(() => { onCompleteRef.current = onComplete })

  useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true
    const t1 = setTimeout(() => setPhase(1), 1000)   // text + bg elements
    const t2 = setTimeout(() => setPhase(2), 2500)   // progress + messages
    const t3 = setTimeout(() => setPhase(3), 4100)   // exit
    const t4 = setTimeout(() => onCompleteRef.current(), 4800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  // Mouse-reactive glow — updates DOM directly, zero React re-renders
  useEffect(() => {
    const onMove = (e) => {
      if (!glowRef.current) return
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      glowRef.current.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(225,29,72,0.13) 0%, transparent 58%)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.022 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0,
            background: '#060606',
            zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Grid */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `
                linear-gradient(rgba(225,29,72,0.033) 1px, transparent 1px),
                linear-gradient(90deg, rgba(225,29,72,0.033) 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px',
              pointerEvents: 'none',
            }}
          />

          {/* Mouse glow */}
          <div
            ref={glowRef}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(225,29,72,0.1) 0%, transparent 58%)',
              pointerEvents: 'none',
            }}
          />

          {/* Ambient center glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'absolute', top: '40%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 640, height: 640, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(225,29,72,0.09) 0%, transparent 65%)',
              filter: 'blur(60px)', pointerEvents: 'none',
            }}
          />

          {/* Pulse rings */}
          {[0, 1].map(i => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.7], opacity: [0.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 116, height: 116, borderRadius: '50%',
                border: '1px solid rgba(225,29,72,0.45)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Floating particles */}
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, p.opacity, p.opacity, 0], y: [0, -20, -12, -28] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
              style={{
                position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size, borderRadius: '50%',
                background: 'rgba(225,29,72,0.9)',
                boxShadow: `0 0 ${p.size * 2.5}px rgba(225,29,72,0.6)`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Background chart lines */}
          {CHART_SEGS.map(seg => <ChartLine key={seg.id} seg={seg} phase={phase} />)}

          {/* KPI ghost cards */}
          {KPI_CARDS.map((card, i) => <KpiCard key={i} card={card} phase={phase} />)}

          {/* ── Center content ─────────────────────────────────── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', position: 'relative', zIndex: 10,
          }}>
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.35, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: 44, position: 'relative', width: 80, height: 80 }}
            >
              <Ring />
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 18px rgba(225,29,72,0.25)',
                    '0 0 40px rgba(225,29,72,0.55)',
                    '0 0 18px rgba(225,29,72,0.25)',
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1c1c1c, #0c0c0c)',
                  border: '1px solid rgba(225,29,72,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 2,
                }}
              >
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 36, fontWeight: 800,
                    color: '#e11d48', lineHeight: 1,
                    textShadow: '0 0 22px rgba(225,29,72,0.65)',
                  }}
                >
                  R
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Name — letter by letter */}
            <div style={{ display: 'flex', gap: 1, marginBottom: 12 }}>
              {NAME_CHARS.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 36, opacity: 0 }}
                  animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.065, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.8rem, 5vw, 2.75rem)',
                    fontWeight: 800,
                    letterSpacing: char === ' ' ? '0.12em' : '-0.02em',
                    color: '#f8f8f8', lineHeight: 1,
                    display: 'inline-block',
                    textShadow: '0 0 30px rgba(255,255,255,0.08)',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(225,29,72,0.85)', marginBottom: 46,
                textShadow: '0 0 18px rgba(225,29,72,0.4)',
              }}
            >
              Data Analyst &amp; Power BI Developer
            </motion.p>

            {/* Progress block */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <MessageCycler active={phase >= 2} />
              <ProgressBar active={phase >= 2} />
            </motion.div>
          </div>

          {/* Corner accents */}
          {[
            { top: 20, left: 20,  bt: true,  bb: false, bl: true,  br: false },
            { top: 20, right: 20, bt: true,  bb: false, bl: false, br: true  },
            { bottom: 20, left: 20,  bt: false, bb: true, bl: true,  br: false },
            { bottom: 20, right: 20, bt: false, bb: true, bl: false, br: true  },
          ].map(({ bt, bb, bl, br, ...pos }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 + i * 0.07, duration: 0.55 }}
              style={{
                position: 'absolute', ...pos,
                width: 20, height: 20,
                borderTop:    bt ? '1px solid rgba(225,29,72,0.35)' : 'none',
                borderBottom: bb ? '1px solid rgba(225,29,72,0.35)' : 'none',
                borderLeft:   bl ? '1px solid rgba(225,29,72,0.35)' : 'none',
                borderRight:  br ? '1px solid rgba(225,29,72,0.35)' : 'none',
                pointerEvents: 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
