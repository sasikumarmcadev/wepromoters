import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Magnetic state for sticking to buttons
  const [magneticTarget, setMagneticTarget] = useState<{ x: number, y: number } | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Velocity calculation for jelly/stretching effect
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const skewX = useMotionValue(0);
  const skewY = useMotionValue(0);

  // High-end bouncy spring physics
  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const quickSpringConfig = { damping: 30, stiffness: 800, mass: 0.1 };

  const dotX = useSpring(mouseX, quickSpringConfig);
  const dotY = useSpring(mouseY, quickSpringConfig);
  
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const moveMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Calculate velocity for jelly effect
      const vx = clientX - lastMouseX.current;
      const vy = clientY - lastMouseY.current;
      
      // Distort based on speed
      skewX.set(vx * 0.1);
      skewY.set(vy * 0.1);
      
      lastMouseX.current = clientX;
      lastMouseY.current = clientY;

      mouseX.set(clientX);
      mouseY.set(clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [role="button"], .group\\/logoloop');
      
      if (interactiveEl) {
        setIsHovering(true);
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Lock the ring to the center of the button (Magnetic Snap)
        setMagneticTarget({ x: centerX, y: centerY });
      } else {
        setIsHovering(false);
        setMagneticTarget(null);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setMagneticTarget(null);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnterWindow = () => setIsVisible(true);
    const handleMouseLeaveWindow = () => setIsVisible(false);

    window.addEventListener('mousemove', moveMouse, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, isVisible]);

  // Update ring position when magnetic
  useEffect(() => {
    if (magneticTarget) {
      ringX.set(magneticTarget.x);
      ringY.set(magneticTarget.y);
    } else {
      ringX.set(mouseX.get());
      ringY.set(mouseY.get());
    }
  }, [magneticTarget, mouseX, mouseY, ringX, ringY]);

  if (isMobile) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
      
      {/* Jelly Magnetic Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/60 pointer-events-none mix-blend-difference z-[9998] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          skewX: isHovering ? 0 : skewX,
          skewY: isHovering ? 0 : skewY,
          width: isHovering ? 50 : 35,
          height: isHovering ? 50 : 35,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0)',
          borderRadius: isHovering ? '12px' : '9999px', // Becomes a rounded square on hover
        }}
        transition={{
          borderRadius: { duration: 0.3 },
          width: { type: 'spring', stiffness: 200, damping: 20 },
          height: { type: 'spring', stiffness: 200, damping: 20 }
        }}
      />
      
      {/* Precision Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none mix-blend-difference z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
    </>
  );
};

export default CustomCursor;
