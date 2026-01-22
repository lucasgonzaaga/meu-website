import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Feedback from './components/Feedback';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';

function App() {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLoadingComplete = () => {
    setLoading(false);
    setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }, 100);
  };

  return (
    <SmoothScroll>
      <div className="grain" />
      {loading && <Preloader onComplete={handleLoadingComplete} />}

      <main
        className={`bg-[var(--color-bg)] min-h-screen text-[var(--color-text)] transition-colors duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ transition: 'opacity 1s ease-in-out' }}
      >
        <CustomCursor theme={theme} />
        <Navbar theme={theme} toggleTheme={toggleTheme} loading={loading} />
        <Hero theme={theme} loading={loading} />
        <About />
        <Works />
        <Feedback />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
