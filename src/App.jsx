import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Contact from './components/Contact';

function App() {
  return (
    <main className="bg-[var(--color-bg)] min-h-screen text-[var(--color-text)]">
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Contact />
    </main>
  );
}

export default App;
