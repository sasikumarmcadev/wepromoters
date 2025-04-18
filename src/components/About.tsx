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

    const targets = [1, 26, 30, 100];
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
      target: '1',
      current: Math.round(counters[0]),
      label: 'Years experience',
      description: 'Experienced in social media marketing and help businesses grow their online presence with strategy',
    },
    {
      target: '26',
      current: Math.round(counters[1]),
      label: 'Projects completed',
      description: 'Over 250 successful projects delivered with quality and care',
    },
    // {
    //   target: '30',
    //   current: Math.round(counters[2]),
    //   label: 'Skilled Tradespeople',
    //   description: 'Our team of 30 experts ensures top-quality results',
    // },
    {
      target: '100%',
      current: Math.round(counters[3]) + '%',
      label: 'Client satisfaction',
      description: 'All of our clients are satisfied with our work and service',
    },
  ];

  return (
    <section id="about" className="bg-gray-100 w-full" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Header Section */}
        <div className="mb-6 md:mb-8 overflow-hidden">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}>
            <button className="bg-gray-900 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              About us
            </button>
          </div>
          
          <div className={`transition-all duration-1000 ease-out delay-200 ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 md:mt-4 mb-3 sm:mb-4 md:mb-6">
              Digital Marketing Specialists
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 ease-out delay-400 ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-5xl">
              Welcome to We Promoters, your trusted digital marketing experts, dedicated to transforming brands with strategy and creativity. With the real experience in SEO, social media marketing, content creation, and paid advertising, we take pride in delivering data-driven results and a seamless client experience. Our mission is to bring your brand's vision to life through clear communication, innovative strategies, and expert guidance every step of the way. Let's grow your online presence and drive real results!
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-4 sm:p-6 bg-gray rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-out overflow-hidden ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.current}</div>
                <div className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{stat.label}</div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;