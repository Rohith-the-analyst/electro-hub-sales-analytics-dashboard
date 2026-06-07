import { useState } from 'react'
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

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
      {!loading && (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
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
        </div>
      )}
    </>
  )
}
