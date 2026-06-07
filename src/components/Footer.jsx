import { Github, Linkedin, Mail, BarChart2 } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 0 32px',
      position: 'relative', zIndex: 1,
      background: 'rgba(8,8,8,0.8)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--red-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: 'white',
            }}>R</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>
              Rohith G
            </span>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Power BI Developer · Data Analyst · ECE Student
          </p>

          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { icon: Github, href: 'https://github.com/Rohith-the-analyst' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/rohith-g-4246a8402/' },
              { icon: Mail, href: 'mailto:rohithg0605@gmail.com' },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(225,29,72,0.4)'
                  e.currentTarget.style.color = 'var(--red-400)'
                  e.currentTarget.style.background = 'rgba(225,29,72,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 24, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          textAlign: 'center',
          fontSize: 12, color: 'var(--text-muted)',
        }}>
          © {year} Rohith G. Designed & developed with precision.
        </div>
      </div>
    </footer>
  )
}
