import React from 'react';
import Hero from './components/Hero';
import About from './components/About'; // Fixed casing to match the actual file name (About.tsx)
import Ourwork from './components/Ourwork';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
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
  );
}

export default App;