import React from 'react';
import Hero from './components/Hero';
import About from './components/About'; // Fixed casing to match the actual file name (About.tsx)
import Ourwork from './components/Ourwork';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
const App: React.FC = () => {
  return (
    <SmoothScroll duration={1000} easing="easeInOut" offset={50}>
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <About />
        <Ourwork />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
    </SmoothScroll>
  );
}

export default App;