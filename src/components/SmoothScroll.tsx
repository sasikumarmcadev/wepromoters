import { useEffect, ReactNode } from 'react';

/**
 * SmoothScroll component for React applications
 * @param {Object} props
 * @param {number} props.duration - Animation duration in ms (default: 800)
 * @param {string} props.easing - Easing type: "linear", "easeIn", "easeOut", "easeInOut" (default)
 * @param {number} props.offset - Offset from the top in pixels (default: 0)
 * @param {React.ReactNode} props.children - Child components
 */
interface SmoothScrollProps {
  duration?: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  offset?: number;
  children: ReactNode;
}

const SmoothScroll = ({ 
  duration = 800, 
  easing = 'easeInOut', 
  offset = 0,
  children 
}: SmoothScrollProps) => {
  useEffect(() => {
    // Easing functions
    const easingFunctions = {
      linear: (t: number): number => t,
      easeIn: (t: number): number => t * t,
      easeOut: (t: number): number => t * (2 - t),
      easeInOut: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    };

    // Function to handle smooth scrolling
    const smoothScroll = (targetPosition: number, duration: number, easingFn: (t: number) => number): void => {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      function animation(currentTime: number): void {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easingFn(progress);
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      
      requestAnimationFrame(animation);
    };

    // Click event handler for anchor links
    const handleLinkClick = (e: MouseEvent): void => {
      const target = (e.target as Element).closest('a');
      
      if (!target) return;
      
      // Check if the link is an anchor link
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const targetId = href === '#' ? '' : href.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : document.body;
      
      if (!targetElement) return;
      
      e.preventDefault();
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      
      // Fix for the error related to indexing with a string
      const easingFunction = easing in easingFunctions 
        ? easingFunctions[easing as keyof typeof easingFunctions] 
        : easingFunctions.easeInOut;
        
      smoothScroll(targetPosition, duration, easingFunction);
    };

    // Add click event listener to the document
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [duration, easing, offset]);

  return children;
};

export default SmoothScroll;