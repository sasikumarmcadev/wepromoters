import React, { useEffect, useRef } from 'react';
import { MessageSquare, Globe, MousePointer, Share2, FileText } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Share2,
      title: 'Social Media Marketing',
      description: 'This service transformation brought engaging content and enhanced visibility to our client\'s brand. We implemented custom strategies, high-quality visuals, and state-of-the-art analytics, creating a stylish yet practical approach perfect for audience engagement and growth. With attention to every detail, we delivered social media presence that balances aesthetics and performance.',
      category: 'Marketing',
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      icon: FileText,
      title: 'Content Marketing',
      description: 'Our content marketing service delivers compelling storytelling and enhanced searchability to our client\'s digital presence. We crafted custom articles, high-quality visuals, and state-of-the-art SEO strategies, creating valuable content perfect for audience education and conversion. With meticulous research and creative development, we established a content library that balances information and engagement.',
      category: 'Content',
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      icon: MessageSquare,
      title: 'Influencer Marketing',
      description: 'This influencer campaign brought authentic advocacy and enhanced credibility to our client\'s products. We partnered with custom-selected creators, high-quality production support, and state-of-the-art tracking systems, creating genuine promotions perfect for reaching targeted audiences. With careful vetting and relationship management, we delivered partnerships that balance promotional goals and creator authenticity.',
      category: 'Influencer',
      image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      icon: Globe,
      title: 'Online Public Relations',
      description: 'Our PR transformation established positive narratives and enhanced reputation for our client\'s brand. We developed custom media relationships, high-quality press materials, and state-of-the-art monitoring tools, creating a strategic approach perfect for crisis prevention and opportunity maximization. With comprehensive planning and proactive outreach, we delivered PR solutions that balance protection and promotion.',
      category: 'PR',
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      icon: MousePointer,
      title: 'Pay-Per-Click Advertising',
      description: 'This PPC campaign brought targeted visibility and enhanced conversion rates to our client\'s offerings. We implemented custom audience targeting, high-quality ad creative, and state-of-the-art bid management, creating efficient campaigns perfect for immediate traffic and sales generation. With continuous optimization and performance analysis, we delivered advertising that balances cost efficiency and revenue growth.',
      category: 'PPC',
      image: "https://images.unsplash.com/photo-1607703703674-df96af81dffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
  ];

  // Reference for the services container
  const servicesContainerRef = useRef(null);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in-view');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, options);

    // Get all elements with animation-hidden class
    const elements = document.querySelectorAll('.animation-hidden');
    elements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      if (elements.length > 0) {
        elements.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  // New effect for service box animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const serviceBoxObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get index from data attribute for sequential animation
          const indexAttr = entry.target.getAttribute('data-index');
          const index = indexAttr ? parseInt(indexAttr, 10) : 0;
          
          // Delay animation based on index position
          setTimeout(() => {
            entry.target.classList.add('service-box-visible');
          }, index * 200); // 200ms staggered delay
          
          serviceBoxObserver.unobserve(entry.target);
        }
      });
    }, options);

    // Get all service boxes
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach((box, index) => {
      // Add index as a data attribute
      box.setAttribute('data-index', index.toString());
      serviceBoxObserver.observe(box);
    });

    return () => {
      if (serviceBoxes.length > 0) {
        serviceBoxes.forEach(box => {
          serviceBoxObserver.unobserve(box);
        });
      }
    };
  }, []);

  // New effect for services container animation
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05
    };

    const containerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('services-container-visible');
          containerObserver.unobserve(entry.target);
        }
      });
    }, options);

    // Store the current value of the ref in a variable inside the effect
    const currentRef = servicesContainerRef.current;

    if (currentRef) {
      containerObserver.observe(currentRef);
    }

    return () => {
      // Use the captured variable in the cleanup function
      if (currentRef) {
        containerObserver.unobserve(currentRef);
      }
    };
  }, []);

  // Error handling for images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to placeholder if image fails to load
    const target = e.target as HTMLImageElement;
    target.src = `/api/placeholder/600/400?text=${target.alt}`;
  };

  return (
    <div id="services" className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animation-hidden">
          <h2 className="text-4xl font-bold text-gray-900">What We Do</h2>
          <p className="mt-4 text-xl text-gray-600">
            Find out which one of our services fit the needs of your project
          </p>
        </div>
        <div ref={servicesContainerRef} className="space-y-8 services-container">
          {services.map((service, index) => {
            const isLightGray = index % 2 === 0;
            
            return (
              <div 
                key={index} 
                className={`${isLightGray ? 'bg-gray-200' : 'bg-black'} rounded-2xl overflow-hidden shadow-lg border ${isLightGray ? 'border-gray-300' : 'border-gray-900'} animation-hidden service-box`}
                data-index={index.toString()}
              >
                <div className={`md:flex ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="md:w-3/5 p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 ${isLightGray ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-lg mr-3`}>
                        <service.icon size={20} />
                      </div>
                      <h3 className={`text-2xl font-bold ${isLightGray ? 'text-gray-800' : 'text-white'}`}>{service.title}</h3>
                    </div>
                    <p className={`${isLightGray ? 'text-gray-600' : 'text-gray-300'} mb-6 text-sm`}>{service.description}</p>
                    <div className="flex flex-wrap">
                      <span className={`${isLightGray ? 'bg-black text-white' : 'bg-gray-200 text-black'} px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2`}>
                        {service.category}
                      </span>
                      <span className={`${isLightGray ? 'bg-gray-400 text-gray-800' : 'bg-gray-800 text-gray-200'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                        {service.duration}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-2/5">
                    <div className="h-full w-full relative">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        onError={handleImageError}
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 ${isLightGray ? 'bg-gray-300' : 'bg-black'} bg-opacity-20`}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Initially hide animated elements */
        .animation-hidden {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* When in view, animate them */
        .animate-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* Enhanced service box animation styles with sequential effect */
        .service-box {
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), 
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        
        .service-box-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Services container animation */
        .services-container {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .services-container-visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Hover animation for service boxes */
        .service-box {
          transition: all 0.3s ease-out;
        }
        
        .service-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 640px) {
          .rounded-2xl {
            border-radius: 1rem;
          }
          
          .p-6 {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;