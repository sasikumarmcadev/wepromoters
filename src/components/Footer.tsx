import { useState, useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lenis = useLenis();

  useEffect(() => {
    // Animation for footer elements
    const footerElements = document.querySelectorAll('.footer-animate');
    if (footerElements.length) {
      footerElements.forEach(element => {
        element.classList.add('animate-fade');
      });
    }

  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, {
          offset: 0,
          duration: 2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo out
        });
      }
    }
  };

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Our work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];


  return (
    <footer className="relative bg-background text-white">
      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-8">
          {/* Company Info */}
          <div className="footer-animate opacity-0 flex flex-col items-start text-left">
            <div className="flex items-center mb-6">
              <a href="#" onClick={(e) => handleNavClick(e, '#')}> 
                <img src="https://res.cloudinary.com/dhw6yweku/image/upload/v1756276288/l3kbqtpkrsz2lqshmmmj.png" alt="" className='h-12' />
              </a>
            </div>
            <p className="text-gray-300 max-w-sm">
              Your trusted partner in digital growth, delivering expert marketing solutions to help your brand thrive in the digital landscape.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-animate opacity-0 flex flex-col items-start text-left" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-300 hover:text-white transition-colors relative nav-link inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-animate opacity-0 flex flex-col items-start text-left" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <address className="text-gray-300 not-italic space-y-4">
              <p className="flex items-start justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>GK Nagar, 2nd St, Manthithoppu rd, Kovilpatti, TN 628501</span>
              </p>
              <p className="flex items-center justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:wepromoters23@gmail.com" className="hover:text-white transition-colors">wepromoters23@gmail.com</a>
              </p>
              <p className="flex items-center justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+916374876357" className="hover:text-white transition-colors">+91 63748 76357</a>
              </p>
            </address>
          </div>
        </div>

       
        {/* Copyright Area */}
        <div className="text-center text-gray-500 mt-12 py-8 border-t border-white/[0.03] relative z-20">
          <div className="footer-animate opacity-0" style={{ animationDelay: '0.8s' }}>
            <p className="text-xs uppercase tracking-[0.2em] font-medium">
              © {currentYear} ALL RIGHTS RESERVED. <span className="text-gray-700">DEVELOPED BY <a href="https://sasikumarmca.vercel.app/" target='_blank' className="hover:text-white transition-colors">SASIKUMAR</a>.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Massive Background Branding */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
        <h1 className="text-[25vw] font-black uppercase tracking-tighter leading-none mb-[-5vw] text-white/[0.04] select-none text-center">
          ADORA
        </h1>
      </div>

      {/* CSS for animations and responsive design - matching the navbar styling */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade {
          animation: fadeIn 1.5s ease-out forwards;
        }
        
        /* Nav link hover effect - matching the navbar */
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: white;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .footer-animate {
            animation-delay: 0.2s !important;
          }
        }
        
        /* Laptop/Desktop View Justification */
        @media (min-width: 1024px) {
          .grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2rem;
          }
          .grid-cols-3 > div {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            text-align: left;
            width: 100%;
          }
          .grid-cols-3 h3 {
            text-align: left;
          }
        }
        
        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          .backdrop-blur-md {
            -webkit-backdrop-filter: blur(8px);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;