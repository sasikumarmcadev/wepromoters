import { useRef, useState, useEffect } from 'react';

const About: React.FC = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
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

    const targets = [2, 26, 30, 100];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const counterInterval = setInterval(() => {
      setCounters(prev =>
        prev.map((c, i) => {
          const target = targets[i];
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
      value: Math.round(counters[3]),
      suffix: '%',
      label: 'Client Happiness',
      description: 'Our commitment to excellence reflected in every partnership and result.',
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden py-24 md:py-32 bg-background border-t border-white/[0.05]"
      ref={sectionRef}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left Content Column */}
          <div className="flex-1 space-y-10">
            <div className={`transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                The Story
              </span>
            </div>

            <div className={`transition-all duration-1000 delay-100 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter leading-[0.9] uppercase">
                Digital Marketing <br />
                <span className="text-white/20">Specialists.</span>
              </h2>
            </div>

            <div className={`transition-all duration-1000 delay-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg sm:text-xl text-white/50 leading-relaxed font-light max-w-2xl">
                Welcome to Adora, your dedicated partner in digital transformation. We blend deep strategic insight with fearless creativity to help brands thrive in a complex digital landscape.
              </p>
              <p className="mt-6 text-base text-white/30 leading-relaxed font-light max-w-2xl">
                From SEO and high-conversion ad campaigns to viral content strategies, we deliver data-driven results that move the needle. Our mission is to amplify your vision through transparent communication and innovative execution.
              </p>
            </div>
          </div>

          {/* Right Stats Column */}
          <div className="flex-1 w-full space-y-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] rounded-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white tabular-nums">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="mt-2 p-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{stat.label}</h3>
                <p className="text-sm sm:text-base text-white/30 font-light leading-relaxed max-w-xs">{stat.description}</p>

                {/* Decorative Line on Hover */}
                <div className="absolute bottom-6 right-8 left-8 h-px bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
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