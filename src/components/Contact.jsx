import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github, Send, MapPin, Clock, Copy, Check } from 'lucide-react'

const EMAIL = 'rohithg0605@gmail.com'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    desc: 'Best way to reach me',
    copyable: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/rohith-g-4246a8402',
    href: 'https://www.linkedin.com/in/rohith-g-4246a8402/',
    desc: 'Connect professionally',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Rohith-the-analyst',
    href: 'https://github.com/Rohith-the-analyst',
    desc: 'Check my repositories',
  },
]

function ContactCard({ icon: Icon, label, value, href, desc, copyable, index, inView }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '20px 24px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        textDecoration: 'none', color: 'inherit',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
      }}
      whileHover={{
        borderColor: 'rgba(225,29,72,0.3)',
        background: 'rgba(225,29,72,0.04)',
        x: 4,
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
        background: 'rgba(225,29,72,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={20} color="var(--red-400)" />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
      </div>

      {copyable && (
        <button
          onClick={handleCopy}
          title="Copy email"
          style={{
            flexShrink: 0,
            width: 34, height: 34,
            borderRadius: 8,
            border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.1)'}`,
            background: copied ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: copied ? '#22c55e' : 'var(--text-muted)',
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      )}
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormState({ name: '', email: '', message: '' })
  }

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="contact" ref={ref} style={{ padding: '100px 0 80px', position: 'relative', zIndex: 1 }}>
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(225,29,72,0.07) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.div variants={fadeUp} className="section-label" style={{ justifyContent: 'center' }}>
            Contact
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-title" style={{ marginBottom: 16 }}>
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', fontSize: 16, lineHeight: 1.75 }}>
            Open to internships, freelance analytics projects, and full-time Data Analyst roles.
            Let's build something impactful together.
          </motion.p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <MapPin size={14} color="var(--red-400)" />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={14} color="var(--red-400)" />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>IST (UTC+5:30) — Available Mon–Sat</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactLinks.map((link, i) => (
                <ContactCard key={link.label} {...link} index={i} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card"
            style={{ padding: '36px 32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>
              Send a Message
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '32px',
                  textAlign: 'center',
                  background: 'rgba(34,197,94,0.05)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <p style={{ fontSize: 15, color: '#22c55e', fontWeight: 600 }}>Message sent!</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>I'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { label: 'Your Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                  { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@example.com' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formState[field.key]}
                      onChange={e => setFormState(s => ({ ...s, [field.key]: e.target.value }))}
                      required
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 10, color: 'var(--text-primary)',
                        fontSize: 14, outline: 'none',
                        transition: 'border-color 0.2s',
                        fontFamily: 'var(--font-sans)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(225,29,72,0.4)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    required
                    style={{
                      width: '100%', padding: '12px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10, color: 'var(--text-primary)',
                      fontSize: 14, outline: 'none', resize: 'vertical',
                      fontFamily: 'var(--font-sans)', lineHeight: 1.6,
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(225,29,72,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

