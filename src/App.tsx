import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import DottedHero from './components/DottedHero';
import About from './components/About';
import OurClients from './components/OurClients';
import Ourwork from './components/Ourwork';
import OurServices from './components/OurServices';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Artificial delay to ensure fonts/images are ready for the grand reveal
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sectionVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1]
      }
    })
  };

  return (
    <>
      <CustomCursor />
      <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="min-h-screen bg-background text-white relative">
            <Navbar />
            <AnimatePresence>
              {isReady && (
                <main className="relative z-10">
                  <motion.div custom={0} initial="hidden" animate="visible" variants={sectionVariants}>
                    <DottedHero />
                  </motion.div>
                  <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
                    <About />
                  </motion.div>
                  <motion.div custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
                    <OurClients />
                  </motion.div>
                  <motion.div custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
                    <OurServices />
                  </motion.div>
                  
                  <motion.div custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
                    <Ourwork />
                  </motion.div>
                  <motion.div custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
                    <Contact />
                  </motion.div>
                </main>
              )}
            </AnimatePresence>
            <Footer />
          </div>
        </ThemeProvider>
      </ReactLenis>
    </>
  );
};

export default App;