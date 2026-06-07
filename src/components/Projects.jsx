import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, BarChart2, Database, Layers, TrendingUp, Package, Truck } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Electro Hub Sales Analytics',
    desc: 'Comprehensive Power BI dashboard analyzing sales performance, profit trends, customer behavior, and promotional impact across multiple product categories.',
    tags: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
    icon: BarChart2,
    color: 'rgba(225,29,72,0.12)',
    borderColor: 'rgba(225,29,72,0.3)',
    github: 'https://github.com/Rohith-the-analyst',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
  },
  {
    id: 2,
    title: 'UPI Transactions Analytics',
    desc: 'End-to-end analytics dashboard tracking UPI payment flows, transaction volumes, merchant trends, and anomaly detection patterns.',
    tags: ['Power BI', 'SQL', 'Excel', 'DAX'],
    icon: TrendingUp,
    color: 'rgba(59,130,246,0.08)',
    borderColor: 'rgba(59,130,246,0.2)',
    github: 'https://github.com/Rohith-the-analyst',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'Insurance Analytics Dashboard',
    desc: 'Multi-dimensional analysis of insurance claims, risk scores, policy performance, and customer segmentation for a leading insurer.',
    tags: ['Power BI', 'Python', 'Data Modeling', 'Star Schema'],
    icon: Layers,
    color: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
    github: 'https://github.com/Rohith-the-analyst',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    title: 'UIDAI Data Hackathon Analytics',
    desc: 'Hackathon project analyzing UIDAI demographic data to uncover regional enrollment patterns and service utilization insights.',
    tags: ['Python', 'Power BI', 'SQL', 'EDA'],
    icon: Database,
    color: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.2)',
    github: 'https://github.com/Rohith-the-analyst',
    image: 'https://images.pexels.com/photos/7947958/pexels-photo-7947958.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    title: 'Delayed Delivery Root Cause Analyzer',
    desc: 'Supply chain analytics tool identifying root causes of delivery delays across logistics networks using advanced drill-through analysis.',
    tags: ['Power BI', 'DAX', 'SQL', 'Power Query'],
    icon: Truck,
    color: 'rgba(139,92,246,0.08)',
    borderColor: 'rgba(139,92,246,0.2)',
    github: 'https://github.com/Rohith-the-analyst',
    image: 'https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    title: 'Demand Forecasting & Inventory Optimization',
    desc: 'Predictive analytics solution combining historical sales data with seasonal patterns to optimize inventory levels and reduce stockouts.',
    tags: ['Python', 'Power BI', 'Forecasting', 'Data Modeling'],
    icon: Package,
    color: 'rgba(236,72,153,0.08)',
    borderColor: 'rgba(236,72,153,0.2)',
    github: 'https://github.com/Rohith-the-analyst',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const { icon: Icon } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(17,17,17,0.95)' : 'rgba(13,13,13,0.8)',
        border: `1px solid ${hovered ? project.borderColor : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 20, overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5)` : '0 4px 20px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            filter: 'brightness(0.55)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, ${project.color}, rgba(8,8,8,0.9))`,
        }} />
        <div style={{
          position: 'absolute', top: 16, left: 16,
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(8,8,8,0.7)', backdropFilter: 'blur(8px)',
          border: `1px solid ${project.borderColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={20} color="var(--red-400)" />
        </div>
        {project.featured && (
          <div style={{
            position: 'absolute', top: 16, right: 16,
            padding: '4px 10px', borderRadius: 'var(--radius-full)',
            background: 'rgba(225,29,72,0.9)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            color: 'white',
          }}>
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 17, fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: 10, lineHeight: 1.3,
        }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 18, flex: 1 }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: '3px 10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 'var(--radius-full)',
              fontSize: 11, fontWeight: 500,
              color: 'var(--text-muted)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <a
            href={project.github}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', fontSize: 13 }}
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href={project.github}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline"
            style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', fontSize: 13 }}
          >
            <ExternalLink size={14} />
            View Project
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="projects" ref={ref} style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{
        position: 'absolute', top: '20%', left: '0',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(225,29,72,0.06) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Projects</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', fontSize: 16, lineHeight: 1.75 }}>
            Real-world analytics projects built with a focus on business impact, clean design, and insightful reporting.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <a
            href="https://github.com/Rohith-the-analyst"
            target="_blank" rel="noopener noreferrer"
            className="btn-outline"
            style={{ padding: '14px 32px' }}
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1100px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
