import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import VideoIntro from './components/VideoIntro.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ParticleField from './components/ParticleField.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleLoadingComplete = useCallback(() => setLoading(false), [])

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', minHeight: '100vh' }}
          >
            <ParticleField />
            <Navbar />
            <main>
              <Hero />
              <VideoIntro />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
