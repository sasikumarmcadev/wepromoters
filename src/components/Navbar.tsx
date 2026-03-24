import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLenis } from '@studio-freight/react-lenis';

const Navbar = () => {
  const [pastHero, setPastHero] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Works', href: '#work' },
    { name: 'Contact us', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, {
        offset: 0,
        duration: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo out
      });
    }
  };

  return (
    <nav className="fixed top-4 sm:top-8 left-0 right-0 z-[100] px-3 sm:px-12 pointer-events-none">
      <div
        className={cn(
          "mx-auto flex items-center justify-between pointer-events-auto transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] relative h-14 sm:h-16",
          pastHero ? "max-w-[260px] sm:max-w-[580px] px-4 sm:px-6" : "max-w-[92%] sm:max-w-7xl px-2 sm:px-0"
        )}
      >
        {/* Background Layer: Morphing Glass Body */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-2xl sm:rounded-[2rem] -z-1 border border-white/0",
            pastHero
              ? "bg-black/40 backdrop-blur-2xl border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-100"
              : "bg-transparent backdrop-blur-none opacity-0"
          )}
        >
          {/* Internal Shimmer/Liquid Reflection */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] overflow-hidden opacity-50">
            <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-[1500ms]" />
          </div>
        </div>

        {/* Left: Logo Section */}
        <div className="relative z-10 flex-shrink-0 flex items-center">
          <a
            href="#"
            className="flex items-center space-x-2 sm:space-x-3 transition-transform hover:scale-105 active:scale-95 duration-500"
            onClick={(e) => handleNavClick(e, '#')}
          >
            <img
              src="https://res.cloudinary.com/dhw6yweku/image/upload/v1756276288/l3kbqtpkrsz2lqshmmmj.png"
              alt="Logo"
              className={cn(
                "w-auto transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
                pastHero ? "h-5 sm:h-6 brightness-110" : "h-7 sm:h-9 brightness-0 invert opacity-90"
              )}
            />
          </a>
        </div>

        {/* Right Nav Section */}
        <div className="flex items-center gap-1 sm:gap-2 relative z-10">
          <div
            className={cn(
              "flex items-center rounded-xl sm:rounded-2xl transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] p-0.5 sm:p-1",
              pastHero
                ? "bg-white/[0.03] backdrop-blur-md border border-white/[0.05]"
                : "bg-white/[0.05] backdrop-blur-xl border border-white/10"
            )}
          >
            {navLinks.map((link) => {
              const isAction = link.name === 'Contact us';
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-[11px] font-bold tracking-wider transition-all duration-500 hover:transition-none",
                    isAction
                      ? "bg-white text-black hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
                      : "text-white/40 hover:text-white"
                  )}
                >
                  <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
