import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BarChart2, Database, LineChart, Layers } from 'lucide-react'

const stats = [
  { icon: BarChart2, value: '6+', label: 'Dashboards Built' },
  { icon: Database, value: '3+', label: 'Databases Worked' },
  { icon: LineChart, value: '50K+', label: 'Rows Analyzed' },
  { icon: Layers, value: '100%', label: 'Data Driven' },
]

const dataItems = [
  'SALES GROWTH +24%',
  'PROFIT MARGIN 18.4%',
  'TOP PRODUCT: UPI ANALYTICS',
  'REGIONS: 12 ACTIVE',
  'ORDERS: 15,420',
  'AVG DISCOUNT: 8.3%',
]

function TickerLine({ items, direction = 1, speed = 30 }) {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <motion.div
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 32, whiteSpace: 'nowrap' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.15em',
            color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ color: 'var(--red-500)', fontWeight: 800 }}>●</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function VideoIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      ref={ref}
      style={{
        padding: '100px 0',
        position: 'relative', zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(225,29,72,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(225,29,72,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.div variants={item} className="section-label" style={{ justifyContent: 'center' }}>
            Introduction
          </motion.div>
          <motion.h2 variants={item} className="section-title" style={{ marginBottom: 16 }}>
            Data <span className="gradient-text">Meets Design</span>
          </motion.h2>
          <motion.p variants={item} style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', fontSize: 16, lineHeight: 1.75 }}>
            I craft interactive dashboards and analytical solutions that transform complex datasets
            into clear, compelling visual narratives.
          </motion.p>
        </motion.div>

        {/* Dashboard showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'linear-gradient(135deg, rgba(17,17,17,0.9), rgba(13,13,13,0.95))',
            border: '1px solid var(--border)',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
            marginBottom: 64,
          }}
        >
          {/* Window chrome */}
          <div style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ff5f57', '#ffbd2e', '#28c940'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, height: 24,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', paddingLeft: 12,
              fontSize: 11, color: 'var(--text-muted)',
            }}>
              Electro Hub — Sales Analytics Dashboard
            </div>
            <div style={{
              padding: '3px 10px', borderRadius: 4,
              background: 'rgba(225,29,72,0.12)',
              border: '1px solid rgba(225,29,72,0.2)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
              color: 'var(--red-400)',
            }}>
              LIVE
            </div>
          </div>

          {/* Dashboard interior */}
          <div style={{ padding: 24 }}>
            {/* KPI row */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16, marginBottom: 20,
            }} className="kpi-grid">
              {[
                { label: 'Total Sales', value: '$2.4M', delta: '+12.4%' },
                { label: 'Net Profit', value: '$432K', delta: '+8.1%' },
                { label: 'Units Sold', value: '18,940', delta: '+5.6%' },
                { label: 'Avg Discount', value: '8.3%', delta: '-0.4%' },
              ].map((kpi) => (
                <div key={kpi.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12, padding: '16px',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.05em' }}>
                    {kpi.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                    {kpi.value}
                  </div>
                  <div style={{ fontSize: 11, color: kpi.delta.startsWith('+') ? '#22c55e' : '#ef4444', marginTop: 4, fontWeight: 600 }}>
                    {kpi.delta} vs last period
                  </div>
                </div>
              ))}
            </div>

            {/* Chart rows */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }} className="chart-grid">
              <BarChartViz />
              <DonutViz />
            </div>
          </div>

          {/* Ticker */}
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: '12px 0',
            background: 'rgba(225,29,72,0.03)',
          }}>
            <TickerLine items={dataItems} />
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}
          className="stats-grid"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={item}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
                borderRadius: 16, padding: '28px 24px',
                textAlign: 'center',
                transition: 'var(--transition)',
              }}
              whileHover={{ borderColor: 'rgba(225,29,72,0.3)', background: 'rgba(225,29,72,0.04)', y: -4 }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(225,29,72,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <Icon size={20} color="var(--red-400)" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--red-400)', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .chart-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .kpi-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function BarChartViz() {
  const bars = [
    { month: 'Jan', value: 62 }, { month: 'Feb', value: 75 },
    { month: 'Mar', value: 55 }, { month: 'Apr', value: 88 },
    { month: 'May', value: 70 }, { month: 'Jun', value: 95 },
    { month: 'Jul', value: 80 }, { month: 'Aug', value: 72 },
  ]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} style={{
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12, padding: 16,
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16, letterSpacing: '0.05em' }}>
        MONTHLY SALES TREND
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 100 }}>
        {bars.map((b, i) => (
          <div key={b.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: b.value } : { height: 0 }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
              style={{
                width: '100%', maxWidth: 28,
                background: i === 5 ? 'var(--red-500)' : 'rgba(225,29,72,0.3)',
                borderRadius: '4px 4px 0 0',
                boxShadow: i === 5 ? '0 0 12px rgba(225,29,72,0.4)' : 'none',
              }}
            />
            <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{b.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutViz() {
  const segments = [
    { label: 'Electronics', value: 42, color: 'var(--red-500)' },
    { label: 'Accessories', value: 28, color: 'rgba(225,29,72,0.5)' },
    { label: 'Appliances', value: 20, color: 'rgba(225,29,72,0.25)' },
    { label: 'Others', value: 10, color: 'rgba(225,29,72,0.1)' },
  ]
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12, padding: 16,
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, letterSpacing: '0.05em' }}>
        CATEGORY SPLIT
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {segments.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', flex: 1 }}>{s.label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}%</span>
            <div style={{ width: 60, height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${s.value}%` }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                style={{ height: '100%', background: s.color, borderRadius: 2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
