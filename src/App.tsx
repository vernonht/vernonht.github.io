import { useEffect, useRef } from 'react';
import AOS from 'aos';
import { initializeGTM } from './utils/gtm'

// import aos styles
import 'aos/dist/aos.css';

import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Masonry from './components/Masonry'
// import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initialized.current) return;
    initialized.current = true;

    // Initialize AOS with options
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 50,
      disable: false,
    });
  }, []);


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
