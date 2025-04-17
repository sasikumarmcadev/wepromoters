import React, { useRef, useState, useEffect } from 'react';

// About Component
const About: React.FC = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for animation triggers
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

    // Store the current value in a variable to use in cleanup
    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const targets = [8, 26, 30, 100];
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const incrementCounters = () => {
      setCounters(prevCounters => 
        prevCounters.map((counter, idx) => {
          const target = targets[idx];
          const increment = target / steps;
          const newValue = counter + increment;
          return newValue >= target ? target : newValue;
        })
      );
    };

    const counterInterval = setInterval(() => {
      incrementCounters();
      
      // Check if all counters have reached their targets
      if (counters.every((counter, idx) => counter >= targets[idx] * 0.99)) {
        setCounters(targets);
        clearInterval(counterInterval);
      }
    }, interval);

    return () => clearInterval(counterInterval);
  }, [isVisible, counters]);

  const stats = [
    {
      target: '8',
      current: Math.round(counters[0]),
      label: 'Years experience',
      description: 'Improving homes with expert craftsmanship for years',
    },
    {
      target: '26',
      current: Math.round(counters[1]),
      label: 'Projects completed',
      description: 'Over 250 successful projects delivered with quality and care',
    },
    {
      target: '30',
      current: Math.round(counters[2]),
      label: 'Skilled Tradespeople',
      description: 'Our team of 30 experts ensures top-quality results',
    },
    {
      target: '100%',
      current: Math.round(counters[3]) + '%',
      label: 'Client satisfaction',
      description: 'All of our clients are satisfied with our work and service',
    },
  ];

  return (
    <section id="about" className="bg-gray-100"  ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8 overflow-hidden">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}>
            <button className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full">
              About us
            </button>
          </div>
          
          <div className={`transition-all duration-1000 ease-out delay-200 ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4 sm:mb-6">
            Digital Marketing Specialists
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 ease-out delay-400 ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}>
            <p className="text-base sm:text-lg text-gray-700 max-w-5xl">
            Welcome to We Promoters, your trusted digital marketing experts, dedicated to transforming brands with strategy and creativity. With the real experience in SEO, social media marketing, content creation, and paid advertising, we take pride in delivering data-driven results and a seamless client experience. Our mission is to bring your brand's vision to life through clear communication, innovative strategies, and expert guidance every step of the way. Let's grow your online presence and drive real results!
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-1000 ease-out overflow-hidden ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{stat.current}</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-sm sm:text-base text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;