import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [counters, setCounters] = useState([0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targets = [2, 26, 100];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const counterInterval = setInterval(() => {
      setCounters(prev =>
        prev.map((c, i) => {
          const target = targets[i];
          if (target === undefined) return c;
          const increment = target / steps;
          const next = c + increment;
          return next >= target ? target : next;
        })
      );
    }, interval);

    return () => clearInterval(counterInterval);
  }, [isVisible]);

  const stats = [
    {
      value: Math.round(counters[0]),
      suffix: '+',
      label: 'Years of Expertise',
      description: 'Strategic social media and digital growth expertise matured over years of evolution.',
    },
    {
      value: Math.round(counters[1]),
      suffix: '+',
      label: 'Projects Delivered',
      description: 'High-impact campaigns and creative solutions delivered with precision and passion.',
    },
    {
      value: Math.round(counters[2]),
      suffix: '%',
      label: 'Client Happiness',
      description: 'Our commitment to excellence reflected in every partnership and result.',
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden min-h-[70vh] md:min-h-[85vh] flex items-center bg-background border-t border-white/[0.05] py-24 md:py-32"
      ref={sectionRef}
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left Content Column */}
          <div className="flex-1 flex flex-col justify-between py-2 sm:py-4 lg:py-6">
            <div className="space-y-8 md:space-y-10">
              <div className={`transition-all duration-1000 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium tracking-tight text-white/40">
                  <span className="size-1.5 rounded-full bg-white animate-pulse" />
                  The Story
                </span>
              </div>

              <div className={`transition-all duration-1000 delay-100 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%" }}
                    animate={isVisible ? { y: 0 } : {}}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter leading-[1.1]"
                  >
                    Kovilpatti's Leading <br />
                    <span className="text-white/10 italic">Marketing Experts.</span>
                  </motion.h2>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light max-w-xl">
                  Welcome to Adora, your dedicated partner in digital transformation based in Kovilpatti. We blend deep strategic insight with fearless creativity to help brands thrive in a complex digital landscape.
                </p>
                <p className="mt-6 text-[13px] sm:text-sm text-white/30 leading-relaxed font-light max-w-xl">
                  From SEO and high-conversion ad campaigns to viral content strategies, we deliver data-driven results that move the needle. Our mission is to amplify your vision through transparent communication and innovative execution.
                </p>
              </div>
            </div>
          </div>

          {/* Right Stats Column */}
          <div className="flex-1 w-full space-y-8 md:space-y-10 lg:space-y-12 py-2 sm:py-4 lg:py-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group relative flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 transition-all duration-700 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white tabular-nums leading-none">
                  {stat.value}{stat.suffix}
                </div>
                
                <div className="flex flex-col gap-1 max-w-sm">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight transition-colors group-hover:text-white/80">{stat.label}</h3>
                    <div className="hidden sm:block h-px w-4 bg-white/10 group-hover:w-8 group-hover:bg-white/30 transition-all duration-700" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/30 font-light leading-relaxed max-w-[240px]">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Background Gradient */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default About;