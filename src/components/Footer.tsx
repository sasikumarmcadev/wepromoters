import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Animation for footer elements
    const footerElements = document.querySelectorAll('.footer-animate');
    if (footerElements.length) {
      footerElements.forEach(element => {
        element.classList.add('animate-fade');
      });
    }
    
    // Add scroll event listener for footer transformation on scroll
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Our work', href: '#work' },
    { name: 'Services', href: '#services' },
    
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { name: 'LinkedIn', href: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
    { name: 'Instagram', href: '#', icon: 'M17.5 6.5a1 1 0 100-2 1 1 0 000 2zm-9-3h7a5 5 0 015 5v7a5 5 0 01-5 5h-7a5 5 0 01-5-5v-7a5 5 0 015-5zm-3 12a3 3 0 003 3h7a3 3 0 003-3v-7a3 3 0 00-3-3h-7a3 3 0 00-3 3v7zm9-8a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 10-4 0 2 2 0 004 0z' },
  ];

  return (
    <footer className="relative bg-black text-white">
      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="footer-animate opacity-0">
            <div className="flex items-center mb-6">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              <h3 className="text-xl font-bold">We Promoters</h3>
            </div>
            <p className="text-gray-300">
              Your trusted partner in digital growth, delivering expert marketing solutions to help your brand thrive in the digital landscape.
            </p>
            <div className="mt-6">
              <button className="bg-gray-800 border border-gray-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-700 transition-colors group relative overflow-hidden">
                <span className="relative z-10 transition-colors duration-500 group-hover:text-gray-800">Get in touch</span>
                <div className="relative z-10 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-colors duration-500 group-hover:text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-animate opacity-0" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors relative nav-link inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-animate opacity-0" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <address className="text-gray-300 not-italic space-y-2">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                GK Nagar, 2nd St, Manthithoppu rd, Kovilpatti, Tamil Nadu 628501
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:wepromoters23@gmail.com">wepromoters23@gmail.com</a>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+6374876357">+91 63748 76357</a>
              </p>
            </address>
          </div>

          {/* Social Links */}
          <div className="footer-animate opacity-0" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-bold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-300 hover:text-white transition-colors p-2 border border-gray-700 rounded-full hover:border-white"
                  aria-label={link.name}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Divider Line - inspired by the navbar design */}
        <div className={`${scrolled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 max-w-5xl mx-auto mt-12 pt-8 border-t border-gray-800`}></div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-12">
          <div className="footer-animate opacity-0" style={{ animationDelay: '0.8s' }}>
            <p>© {currentYear} Developed by <a href="https://www.nextriadsolutions.com/" target='_blank'>NextriadSolutions</a>. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
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