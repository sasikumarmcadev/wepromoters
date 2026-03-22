import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    // Use springs for smooth movement
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        // Add hover listeners for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", move);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* inner cursor - follows exactly */}
            <motion.div
                className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-gray-900 dark:bg-white rounded-full pointer-events-none z-[9999]"
                style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
            />

            {/* outer lagging cursor */}
            <motion.div
                className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full pointer-events-none z-[9998]"
                style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: isHovered ? 2.5 : 1,
                    opacity: isHovered ? 0.5 : 1,
                    borderWidth: isHovered ? '1px' : '1px',
                    borderColor: isHovered ? 'rgba(63, 63, 63, 0.5)' : 'currentColor'
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />
        </>
    );
}
