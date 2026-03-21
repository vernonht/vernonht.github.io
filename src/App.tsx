import { useEffect } from 'react';
import { initializeGTM } from './utils/gtm'

import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Masonry from './components/Masonry'
// import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    initializeGTM()
  }, [])

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Masonry />
        <Projects />
        <Experience />
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  )
}

export default App
