import { useState, useEffect, useRef, useCallback } from 'react';

const OurWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState(''); // 'left' or 'right'
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const incomingVideoRef = useRef<HTMLVideoElement | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const resetAnimationTimeoutRef = useRef<number | null>(null);
  const playbackTimeoutRef = useRef<number | null>(null);
  // Use incomingIndex in the incoming video element below
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);

  const videos = [
    {
      src: "https://res.cloudinary.com/dhw6yweku/video/upload/v1744802701/catering1_weltav.mp4",
      title: "Social Media Strategy",
      description: ""
    },
    {
      src: "https://res.cloudinary.com/dhw6yweku/video/upload/v1744799345/Maris_shoe_fqgb45.mp4",
      title: "Creative Process",
      description: ""
    },
    {
      src: "https://res.cloudinary.com/dhw6yweku/video/upload/v1744806710/Jockey1_vjkptn.mp4",
      title: "Data Analytics",
      description: ""
    },
    {
      src: "https://res.cloudinary.com/dhw6yweku/video/upload/v1744803027/Rubpeshwar1_vf8swa.mp4",
      title: "Brand Development",
      description: ""
    },
    {
      src: "https://res.cloudinary.com/dhw6yweku/video/upload/v1744802943/classicpolo1_w0iyh2.mp4",
      title: "Content Production",
      description: ""
    },
    {
      src: "https://res.cloudinary.com/dhw6yweku/video/upload/v1744806724/Hay1_mmxird.mp4",
      title: "Digital Marketing",
      description: ""
    },
    {
      src: "https://res.cloudinary.com/dhw6yweku/video/upload/v1744892465/Matchbox_lm6oqk.mp4",
      title: "E-commerce Solutions",
      description: ""
    }
  ];

  // Enhanced safe play method with mobile-specific handling - wrapped in useCallback
  const safePlayVideo = useCallback((videoElement: HTMLVideoElement | null) => {
    if (!videoElement || !hasUserInteracted) return;

    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
    }

    playbackTimeoutRef.current = setTimeout(() => {
      if (videoElement.paused) {
        videoElement.muted = true;
        videoElement.setAttribute('playsinline', 'true');
        videoElement.setAttribute('webkit-playsinline', 'true'); // Additional iOS compatibility
        videoElement.preload = 'auto';

        if (videoElement.readyState >= 2) {
          videoElement.play().catch((error) => {
            console.error("Video play failed:", error);
            // Fallback: Reload source and retry
            videoElement.load();
            videoElement.play().catch(() => {
              console.warn("Retry play failed, likely low-power mode or restrictions");
            });
          });
        } else {
          const handleCanPlay = () => {
            videoElement.play().catch((error) => {
              console.error("Video play failed on canplay:", error);
            });
            videoElement.removeEventListener('canplay', handleCanPlay);
          };
          videoElement.addEventListener('canplay', handleCanPlay);
          videoElement.load(); // Ensure source is loaded
        }
      }
    }, 50);
  }, [hasUserInteracted]);

  // Enhanced safe pause method - wrapped in useCallback
  const safePauseVideo = useCallback((videoElement: HTMLVideoElement | null) => {
    if (!videoElement) return;

    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
    }

    if (!videoElement.paused) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    videoRefs.current = Array(videos.length).fill(null);
  }, [videos.length]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (resetAnimationTimeoutRef.current) {
        clearTimeout(resetAnimationTimeoutRef.current);
      }
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
      }
    };
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

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasUserInteracted || isAnimating) return;

    videoRefs.current.forEach((videoRef) => {
      if (videoRef && videoRef !== videoRefs.current[currentIndex]) {
        safePauseVideo(videoRef);
      }
    });

    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && isVisible && !isAnimating) {
      setTimeout(() => {
        safePlayVideo(currentVideo);
      }, 100);
    }
  }, [currentIndex, hasUserInteracted, isVisible, isAnimating, safePlayVideo, safePauseVideo]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [hasUserInteracted]);

  useEffect(() => {
    if (!isAnimating && hasUserInteracted && isVisible) {
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo) {
        setTimeout(() => {
          safePlayVideo(currentVideo);
        }, 300);
      }
    }
  }, [isAnimating, currentIndex, hasUserInteracted, isVisible, safePlayVideo]);

  const getOrderedVideos = () => {
    const numVideos = videos.length;
    // In mobile view (when screen width < 640px), show only two videos
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    
    if (isMobile) {
      return [
        currentIndex,
        (currentIndex + 1) % numVideos,
      ];
    } else {
      return [
        (currentIndex - 1 + numVideos) % numVideos,
        currentIndex,
        (currentIndex + 1) % numVideos,
      ];
    }
  };

  const prevVideo = () => {
    if (isAnimating) return;

    safePauseVideo(videoRefs.current[currentIndex]);

    setIsAnimating(true);
    setSlideDirection('right');
    const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    setIncomingIndex(newIndex);

    if (incomingVideoRef.current) {
      incomingVideoRef.current.src = videos[newIndex].src;
      incomingVideoRef.current.load();
    }

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(newIndex);
      setIncomingIndex(null);

      if (resetAnimationTimeoutRef.current) {
        clearTimeout(resetAnimationTimeoutRef.current);
      }

      resetAnimationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection('');
      }, 300);
    }, 50);
  };

  const nextVideo = () => {
    if (isAnimating) return;

    safePauseVideo(videoRefs.current[currentIndex]);

    setIsAnimating(true);
    setSlideDirection('left');
    const newIndex = (currentIndex + 1) % videos.length;
    setIncomingIndex(newIndex);

    if (incomingVideoRef.current) {
      incomingVideoRef.current.src = videos[newIndex].src;
      incomingVideoRef.current.load();
    }

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(newIndex);
      setIncomingIndex(null);

      if (resetAnimationTimeoutRef.current) {
        clearTimeout(resetAnimationTimeoutRef.current);
      }

      resetAnimationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection('');
      }, 300);
    }, 50);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    safePauseVideo(videoRefs.current[currentIndex]);

    setIsAnimating(true);
    setSlideDirection(index > currentIndex ? 'left' : 'right');
    setIncomingIndex(index);

    if (incomingVideoRef.current) {
      incomingVideoRef.current.src = videos[index].src;
      incomingVideoRef.current.load();
    }

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(index);
      setIncomingIndex(null);

      if (resetAnimationTimeoutRef.current) {
        clearTimeout(resetAnimationTimeoutRef.current);
      }

      resetAnimationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection('');
      }, 300);
    }, 50);
  };

  const handleVideoTap = () => {
    setHasUserInteracted(true);
    const currentVideo = videoRefs.current[currentIndex];

    if (currentVideo) {
      if (currentVideo.paused) {
        safePlayVideo(currentVideo);
      } else {
        safePauseVideo(currentVideo);
      }
    }
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const isSwipingRef = useRef(false);
  const swipeDeltaRef = useRef(0);
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentX.current = e.touches[0].clientX;
    isSwipingRef.current = true;
    swipeDeltaRef.current = 0;
    
    // Apply initial styles for smooth transition
    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.transition = 'none';
      requestAnimationFrame(() => updateSwipePosition());
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipingRef.current || isAnimating) return;
    
    touchEndX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    
    // Calculate delta between start and current position
    swipeDeltaRef.current = touchCurrentX.current - touchStartX.current;
    
    // If we have a valid swipe, prevent default to avoid page scrolling
    if (Math.abs(swipeDeltaRef.current) > 10) {
      e.preventDefault();
    }
    
    // Let the animation frame handle the actual movement
  };

  const updateSwipePosition = () => {
    if (!isSwipingRef.current) return;
    
    if (carouselContainerRef.current) {
      // Apply transform with damping effect (80% of the actual movement)
      const dampedDelta = swipeDeltaRef.current * 0.8;
      carouselContainerRef.current.style.transform = `translateX(${dampedDelta}px)`;
    }
    
    // Continue animation loop
    requestAnimationFrame(() => updateSwipePosition());
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current || isAnimating) return;
    isSwipingRef.current = false;
    
    const difference = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum distance to trigger swipe
    
    // Reset the transform with smooth transition
    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.transition = 'transform 300ms ease-out';
      carouselContainerRef.current.style.transform = 'translateX(0)';
    }
    
    // Check if the swipe was significant enough to change slides
    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        nextVideo();
      } else {
        prevVideo();
      }
    } else {
      // If swipe wasn't significant, treat as a tap
      handleVideoTap();
    }
  };

  const setVideoRef = (el: HTMLVideoElement | null, index: number) => {
    if (el) {
      el.playsInline = true;
      el.muted = true;
      el.loop = true;
      el.preload = "auto";

      if (videoRefs.current[index] !== el) {
        videoRefs.current[index] = el;
        el.setAttribute('playsinline', 'true');
        el.setAttribute('webkit-playsinline', 'true');
        el.setAttribute('muted', 'true');
        el.muted = true;
      }
    }
  };

  // Use this function to set the incoming video reference
  const setIncomingVideoRef = (el: HTMLVideoElement | null) => {
    if (el) {
      el.playsInline = true;
      el.muted = true;
      el.loop = true;
      el.preload = "auto";
      el.setAttribute('playsinline', 'true');
      el.setAttribute('webkit-playsinline', 'true');
      el.setAttribute('muted', 'true');
      el.muted = true;
      incomingVideoRef.current = el;
    }
  };

  const orderedIndices = getOrderedVideos();

  return (
    <section id="work" className="bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div 
          className={`transition-all duration-1000 ease-out ${isVisible ? 'transform-none opacity-100' : 'transform translate-y-16 opacity-0'}`}
          style={{ transitionDelay: '1200ms' }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Our Works</h3>
          
          <div className="flex justify-center items-center relative mx-auto overflow-hidden" ref={carouselRef}>
            <div 
              className="flex justify-center items-center gap-2 xs:gap-4 sm:gap-6 relative overflow-hidden w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={carouselContainerRef}
            >
              {orderedIndices.map((videoIndex, displayIndex) => {
                const isCenterVideo = typeof window !== 'undefined' && window.innerWidth >= 640 ? displayIndex === 1 : displayIndex === 0;
                
                return (
                  <div 
                    key={videoIndex} 
                    className={`overflow-hidden rounded-xl shadow-lg transition-transform duration-500 ease-out relative
                      ${isCenterVideo ? 
                        'z-10 w-[160px] xs:w-[200px] sm:w-56 md:w-72 lg:w-80 cursor-pointer' : 
                        'w-[96px] xs:w-[120px] sm:w-32 md:w-40 lg:w-48 opacity-70 cursor-pointer hover:opacity-80'}`}
                    onClick={() => !isCenterVideo ? goToSlide(videoIndex) : handleVideoTap()}
                  >
                    <div className="relative aspect-[10/16] w-full">
                      <video 
                        ref={el => setVideoRef(el, videoIndex)}
                        playsInline
                        muted 
                        loop
                        preload="auto"
                        className="w-full h-full object-cover rounded-xl"
                      >
                        <source src={videos[videoIndex].src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
                      <div className="absolute bottom-0 left-0 right-0 h-12 xs:h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
                      
                      {!isCenterVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                          <svg className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Single line title inside the video */}
                      <div className="absolute bottom-2 left-0 right-0 px-2 text-center">
                        <h5 className="text-white text-xs xs:text-sm truncate font-medium drop-shadow-lg text-shadow">{videos[videoIndex].title}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {isAnimating && incomingIndex !== null && (
                <div 
                  className="absolute inset-0 flex justify-center items-center gap-2 xs:gap-4 sm:gap-6"
                  style={{
                    transform: slideDirection === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
                    animation: `slideIn${slideDirection === 'left' ? 'Right' : 'Left'} 300ms forwards`,
                    zIndex: 20
                  }}
                >
                  {getOrderedVideos()
                    .map((_, displayIndex) => {
                      const nextIndex = slideDirection === 'left' 
                        ? (currentIndex + 1) % videos.length
                        : (currentIndex - 1 + videos.length) % videos.length;
                      
                      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                      let orderedIndicesForNextSlide;
                      
                      if (isMobile) {
                        orderedIndicesForNextSlide = [
                          nextIndex,
                          (nextIndex + 1) % videos.length
                        ];
                      } else {
                        orderedIndicesForNextSlide = [
                          (nextIndex - 1 + videos.length) % videos.length,
                          nextIndex,
                          (nextIndex + 1) % videos.length
                        ];
                      }
                      
                      const correctVideoIndex = orderedIndicesForNextSlide[displayIndex];
                      const isCenterVideo = isMobile ? displayIndex === 0 : displayIndex === 1;
                      
                      return (
                        <div 
                          key={`incoming-${correctVideoIndex}`} 
                          className={`overflow-hidden rounded-xl shadow-lg transition-transform duration-500 ease-out
                            ${isCenterVideo ? 
                              'z-10 w-[160px] xs:w-[200px] sm:w-56 md:w-72 lg:w-80' : 
                              'w-[96px] xs:w-[120px] sm:w-32 md:w-40 lg:w-48 opacity-70'}`}
                        >
                          <div className="relative aspect-[10/16] w-full">
                            <video 
                              ref={displayIndex === (isMobile ? 0 : 1) ? setIncomingVideoRef : null}
                              playsInline
                              muted 
                              loop
                              preload="auto"
                              className="w-full h-full object-cover rounded-xl"
                            >
                              <source src={videos[correctVideoIndex].src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            
                            <div className="absolute bottom-0 left-0 right-0 h-12 xs:h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
                            
                            {!isCenterVideo && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                                <svg className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                            
                            {/* Single line title for the incoming slides */}
                            <div className="absolute bottom-2 left-0 right-0 px-2 text-center">
                              <h5 className="text-white text-xs xs:text-sm truncate font-medium drop-shadow-lg text-shadow">{videos[correctVideoIndex].title}</h5>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
              
              <style>{`
                @keyframes slideInRight {
                  from { transform: translateX(100%); }
                  to { transform: translateX(0); }
                }
                
                @keyframes slideInLeft {
                  from { transform: translateX(-100%); }
                  to { transform: translateX(0); }
                }
                
                video::-webkit-media-controls {
                  display: none !important;
                }
                
                video {
                  -webkit-tap-highlight-color: transparent;
                  object-fit: cover;
                  width: 100%;
                  height: 100%;
                }
                
                .carousel-container {
                  touch-action: pan-y;
                  will-change: transform;
                  user-select: none;
                  -webkit-user-select: none;
                }
                
                @media (max-width: 639px) {
                  .carousel-container {
                    max-height: 85vh;
                    padding: 8px;
                  }
                  video {
                    border-radius: 12px;
                  }
                }
                
                @media (min-width: 640px) {
                  .carousel-container {
                    padding: 16px 0;
                  }
                }
                
                /* Smooth swipe animation styles */
                .swipe-container {
                  transition: transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
                }
                
                .swipe-item {
                  transition: transform 300ms ease, opacity 300ms ease;
                }
                
                .swipe-active {
                  transform: scale(1.02);
                  transition: transform 300ms ease;
                }
                
                /* Text shadow effect for better readability */
                .text-shadow {
                  text-shadow: 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.7);
                }
              `}</style>
            </div>
          </div>
          
          <div className="flex justify-center items-center mt-6">
            <button 
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                prevVideo();
              }}
              className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-600 transition-colors mr-4 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Previous video"
              disabled={isAnimating}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-3">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToSlide(index);
                  }}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-gray-800' : 'w-3 bg-gray-300 hover:bg-gray-400'
                  } ${isAnimating ? 'pointer-events-none' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                  disabled={isAnimating}
                />
              ))}
            </div>
            
            <button 
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                nextVideo();
              }}
              className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-600 transition-colors ml-4 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Next video"
              disabled={isAnimating}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="text-center mt-4 text-gray-500 text-sm">
            <p>← Swipe or use arrows to navigate →</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;