import { useRef, useState, useEffect } from 'react';
import { LogoLoop } from './LogoLoop';

const OurClients = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({
    height: 90,
    gap: 100
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setDimensions({ height: 45, gap: 35 });
      } else if (width < 1024) { // Tablet
        setDimensions({ height: 70, gap: 60 });
      } else { // Desktop
        setDimensions({ height: 90, gap: 100 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 md:py-32 bg-background border-t border-white/[0.05]"
    >
      {/* Large Background Text */}
      <div className="absolute top-12 md:top-16 left-0 w-full pointer-events-none select-none overflow-hidden flex justify-start z-0">
        <h2 className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-black uppercase leading-[0.8] text-white/[0.02] tracking-tighter w-full text-left pl-6 md:pl-0 -ml-[2px] md:ml-0">
          Clients
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`transition-all duration-1000 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}>
          <div className="flex flex-col items-start text-left mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-4">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              Trusted By
            </span>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none uppercase">
              Our <span className="text-white/20">Clients</span>
            </h3>
          </div>

          <div className="relative py-8">
            <LogoLoop
              logos={clientLogos}
              speed={30}
              direction="left"
              logoHeight={dimensions.height}
              gap={dimensions.gap}
              scaleOnHover
              fadeOut
              fadeOutColor="#000000"
            />
          </div>
        </div>
      </div>

    </section>
  );
};

const clientLogos = [
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998552/rrtgh5trhg_t1azus.png", alt: "Partner 1" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998552/hgjyukil.PNG_n3v0q0.png", alt: "Partner 2" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998552/IMG_9376ytjhfytcj.PNG_c9vixv.png", alt: "Partner 3" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998552/yukjm_fndibv.png", alt: "Partner 4" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998551/yukjjm-removebg-preview_zlloj1.png", alt: "Partner 5" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998551/iol.PNG_xfh8fu.png", alt: "Partner 6" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998551/IMG_1476.JPGju7u-removebg-preview_zvif1b.png", alt: "Partner 7" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998551/refgeg_mizyz2.png", alt: "Partner 8" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998551/yujkyukj-removebg-preview_uf3wsl.png", alt: "Partner 9" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998551/IMG_5298ghjjk.PNG_knmioz.png", alt: "Partner 10" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998551/IMG_3560uilkuukjui-removebg-preview_j6dsvb.png", alt: "Partner 11" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998550/hjk.PNG_n6nfwt.png", alt: "Partner 12" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998550/IMG_6671yujkyukmu.PNG_vbsunl.png", alt: "Partner 13" },
  { src: "https://res.cloudinary.com/ds7p19kkt/image/upload/v1773998550/jklhijkl_i.PNG_xbovm2.png", alt: "Partner 14" },
];

export default OurClients;
