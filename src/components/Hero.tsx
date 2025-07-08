import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Animation for the text content will be handled by CSS classes
    const title = document.getElementById('animated-title');
    if (title) {
      title.classList.add('animate-writing');
    }
    
    const description = document.getElementById('fade-description');
    if (description) {
      description.classList.add('animate-fade');
    }
    
    // Add scroll event listener for navbar transformation
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <section className="relative h-screen">
      {/* Background Image with Padding */}
      <div className="absolute inset-0 p-4">
        <div className="w-full h-full bg-black bg-opacity-30 rounded-lg"> {/* New div with light black background */}
          <div className="w-full h-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Digital marketing workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-80"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Navigation */}
      <div className="relative z-50">
        <div className="max-w-7xl mx-auto">
          {/* Floating Navbar with dynamic styling based on scroll and screen size - Updated to match footer color */}
          <div className={`${scrolled ? 'bg-black' : 'bg-transparent'} transition-all duration-300 text-white fixed top-5 left-0 right-0 w-11/12 max-w-7xl mx-auto rounded-full z-50`}>
            <div className="flex justify-between items-center px-6 sm:px-8 py-4 mx-auto">
              <div className="flex items-center">
                <a href="#" className="flex items-center">
                  <img 
                    src="https://res.cloudinary.com/dhw6yweku/image/upload/v1751985095/We_Promoterswstr_epmdgn.png" 
                    alt="We Promoters Logo" 
                    className="h-8 w-auto sm:h-8 md:h-10 object-contain transition-all duration-300"
                  />
                </a>
              </div>
              
              {/* Desktop Navigation - Enhanced with hover effects */}
              <nav className="hidden lg:block">
                <ul className="flex space-x-8">
                  <li><a href="#about" className="text-white text-sm hover:text-gray-300 transition-colors relative nav-link">About</a></li>
                  <li><a href="#work" className="text-white text-sm hover:text-gray-300 transition-colors relative nav-link">Our work</a></li>
                  <li><a href="#services" className="text-white text-sm hover:text-gray-300 transition-colors relative nav-link">Services</a></li>
                  <li><a href="#contact" className="text-white text-sm hover:text-gray-300 transition-colors relative nav-link">Contact</a></li>
                </ul>
              </nav>
              
              {/* Tablet Navigation - Medium screens only */}
              <nav className="hidden md:block lg:hidden">
                <ul className="flex space-x-6">
                  <li><a href="#about" className="text-white hover:text-gray-300 text-xs">About</a></li>
                  <li><a href="#work" className="text-white hover:text-gray-300 text-xs">Our work</a></li>
                  <li><a href="#services" className="text-white hover:text-gray-300 text-xs">Services</a></li>
                  <li><a href="#contact" className="text-white hover:text-gray-300 text-xs">Contact</a></li>
                </ul>
              </nav>
              
              {/* Mobile Navigation Toggle - Enhanced animation */}
              <div className="md:hidden">
                <button 
                  onClick={toggleMobileMenu}
                  className="text-white focus:outline-none w-8 h-6 relative"
                  aria-label="Toggle mobile menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <span className={`hamburger-line top-0 ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`hamburger-line top-2.5 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`hamburger-line top-5 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation Menu - Fixed positioning issue */}
          <div 
            className={`md:hidden fixed inset-0 z-40 backdrop-blur-md bg-black bg-opacity-90 transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}
            style={{ top: '0', height: '100%' }}
          >
            <div className="px-6 py-20 space-y-4 flex flex-col h-full mt-6">
              <a href="#about" className="text-white block py-3 text-base font-medium border-b border-gray-800 hover:pl-2 transition-all duration-200" onClick={toggleMobileMenu}>About</a>
              <a href="#work" className="text-white block py-3 text-base font-medium border-b border-gray-800 hover:pl-2 transition-all duration-200" onClick={toggleMobileMenu}>Our work</a>
              <a href="#services" className="text-white block py-3 text-base font-medium border-b border-gray-800 hover:pl-2 transition-all duration-200" onClick={toggleMobileMenu}>Services</a>
              <a href="#contact" className="text-white block py-3 text-base font-medium hover:pl-2 transition-all duration-200" onClick={toggleMobileMenu}>Contact</a>
              
              {/* Mobile menu additional content */}
              {/* <div className="mt-auto pt-8 border-t border-gray-800">
                <p className="text-gray-400 text-xs mb-4">Need immediate assistance?</p>
                <button className="bg-white text-black font-medium rounded-full py-3 px-6 w-full hover:bg-gray-200 transition-colors text-sm">
                  Contact Us Now
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Content - Full Screen with Vertical Center Alignment */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              <p className="text-white text-xs sm:text-sm">Available for work</p>
            </div>
            <h2 id="animated-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-8 overflow-visible">
              <span className="inline-block">We Promoters – Powering Your Digital Growth</span>
            </h2>
            <p id="fade-description" className="text-base sm:text-lg text-gray-200 mb-8 sm:mb-12 opacity-0 max-w-full">
              We help brands stand out with smart, scalable and digital marketing strategies. From Startups to Top performers - We promote what matters.
            </p>
            <a href="#work">
            <div className="flex justify-center">
              {/* New styled button replacing the previous one */}
              <StyledWrapper>
                <button className="flex items-center space-x-2" id="#work">
                  <span>View our works</span>
                  <span className="relative transition-all duration-300 group-hover:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </StyledWrapper>
            </div>
            </a>
          </div>
        </div>
      </div>

      {/* CSS for animations and responsive design */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .shine-effect {
          transform: translateX(-100%);
          animation: shine 3s infinite;
        }
        
        .animate-writing span {
          display: inline-block;
          overflow: visible;
          white-space: normal;
          animation: fadeIn 2s ease-out forwards;
        }
        
        .animate-fade {
          animation: fadeIn 2s ease-out forwards;
          animation-delay: 1s;
        }
        
        /* Hamburger menu styling - enhanced */
        .hamburger-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: white;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        
        /* Desktop nav link hover effect */
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
        
        /* Responsive adjustments for mobile typography */
        @media (max-width: 640px) {
          .animate-writing span {
            white-space: normal;
            border-right: none;
            animation: fadeIn 2s ease-out forwards;
          }
        }
        
        /* Fix for iOS Safari mobile menu issue */
        @supports (-webkit-touch-callout: none) {
          .backdrop-blur-md {
            -webkit-backdrop-filter: blur(8px);
          }
        }
      `}} />
    </section>
  );
};

// Styled component for the new button style
const StyledWrapper = styled.div`
  button {
    border: none;
    outline: none;
    background-color: #000000;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    border-radius: 25px;
    transition: all ease 0.1s;
    box-shadow: 0px 5px 0px 0px #3b3c36;
  }
  button:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #3b3c36;
  }
  
  /* Responsive adjustments for the button */
  @media (min-width: 640px) {
    button {
      padding: 12px 24px;
      font-size: 14px;
    }
  }
`;

export default Hero;