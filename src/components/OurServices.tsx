import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import {
  Code2,
  Megaphone,
  PenTool,
  Video,
  Share2,
  BarChart3,
  Film,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ParticlesBackground } from './ui/particles-background';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services = [
  {
    id: 1,
    title: 'Website & Software Development',
    description: 'We design and develop modern, high-performance websites and software solutions tailored to your business needs. From stunning visuals to seamless functionality, we ensure your digital presence is powerful, user-friendly, and conversion-focused.',
    icon: Code2
  },

  {
    id: 2,
    title: 'Long Form Video Editing',
    description: 'We edit long-form content with storytelling techniques that keep your audience hooked from start to finish, making your content more impactful and professional.',
    icon: Film
  },
  {
    id: 3,
    title: 'Content Writing',
    description: 'Our content is designed to speak directly to your audience, build trust, and drive action — whether it’s for your website, ads, or social media.',
    icon: PenTool
  },
  {
    id: 4,
    title: 'Influencer Marketing',
    description: 'We connect your brand with the right influencers to create authentic promotions that increase visibility, trust, and audience engagement.',
    icon: Megaphone
  },
  {
    id: 5,
    title: 'SEO',
    description: 'Our SEO strategies help your business appear on top of search results, bringing consistent organic traffic and long-term growth.',
    icon: BarChart3
  },
  {
    id: 6,
    title: 'Social Media Management',
    description: 'From content planning to daily posting and engagement, we manage your social media presence to keep your brand active, relevant, and growing.',
    icon: Share2
  },
  {
    id: 7,
    title: 'Video Editing',
    description: 'We transform your raw videos into engaging, high-quality content that captures attention instantly. Every edit is crafted to boost engagement, retention, and brand value.',
    icon: Video
  },
  {
    id: 8,
    title: 'Meta & Google Ads',
    description: 'We create and manage high-performing ad campaigns across Meta (Facebook & Instagram) and Google to help your business reach the right audience at the right time. Our strategies are focused on generating leads, increasing sales, and maximizing your return on investment.',
    icon: BarChart3
  },
];

const ServiceBox = ({ service, index }: { service: Service; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the motion values
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Transform values for 3D rotation
  const rotateXIcon = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateYIcon = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const rotateXContent = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateYContent = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      className={cn(
        "group relative p-10 h-[320px] bg-white/[0.01] overflow-hidden transition-all duration-700",
        "border-b border-white/[0.05] md:border-r",
        (index + 1) % 4 === 0 && "md:border-r-0"
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
      }}
      style={{
        perspective: "1000px"
      }}
      viewport={{ once: true }}
    >
      {/* Premium Glass Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[-20deg]" />

      {/* Icon Area - Top Right with 3D Pop Out */}
      <motion.div
        className="absolute top-8 right-8 text-white/20 group-hover:text-white/60 transition-colors z-20"
        style={{
          rotateX: rotateXIcon,
          rotateY: rotateYIcon,
          z: isHovered ? 80 : 0,
          scale: isHovered ? 1.2 : 1,
          transformStyle: "preserve-3d"
        }}
      >
        <service.icon size={32} strokeWidth={1} />
      </motion.div>

      {/* Background Dots Pattern */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Content Area with 3D Effect */}
      <motion.div
        className="relative z-10 flex flex-col h-full justify-end pb-4"
        style={{
          rotateX: rotateXContent,
          rotateY: rotateYContent,
          z: isHovered ? 40 : 0,
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          style={{
            z: isHovered ? 60 : 0
          }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight leading-tight mb-6">
            {service.title}
          </h3>
        </motion.div>

        <div className="relative border-t border-white/[0.05] pt-6">
          {/* Decorative Accent Element */}
          <div className="absolute -top-px left-0 w-8 h-px bg-white/20 group-hover:w-16 group-hover:bg-white/40 transition-all duration-700" />

          <motion.p
            className="text-[13px] text-white/30 group-hover:text-white/50 leading-relaxed font-light transition-colors max-w-[260px]"
            style={{
              z: isHovered ? 30 : 0
            }}
          >
            {service.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Modern Floating Highlight Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </motion.div>
  );
};

const OurServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
      id="services"
      ref={sectionRef}
      className="relative bg-background overflow-hidden border-t border-white/[0.05] py-24 md:py-32"
    >
      <ParticlesBackground />

      {/* Large Background Text */}
      <div className="absolute top-12 md:top-16 right-0 w-full pointer-events-none select-none overflow-hidden flex justify-end z-0">
        <h2 className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-black uppercase leading-[0.8] text-white/[0.02] tracking-tighter w-full text-right pr-6 md:pr-0 -mr-[2px] md:mr-0">
          Expertise
        </h2>
      </div>

      {/* Top Header Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className={cn(
          "transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-end text-right",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        )}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-4">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            Solutions
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none uppercase">
            Our <span className="text-white/20">Services.</span>
          </h2>
        </div>
      </div>

      {/* Grid Layout Section */}
      <div className="border-t border-b border-white/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
          {services.map((service, index) => (
            <ServiceBox key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;