"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  headquarters?: { lat: number; lng: number; label?: string };
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
}

export function WorldMap({ 
  dots = [], 
  headquarters,
  lineColor = "#0885e3",
  showLabels = true,
  labelClassName = "text-sm",
  animationDuration = 2,
  loop = true
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 400 });
  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );

  // Track container size for responsive label positioning
  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        // Account for device pixel ratio and ensure we get actual rendered size
        const actualWidth = rect.width;
        const actualHeight = rect.height;
        setContainerSize({ width: actualWidth, height: actualHeight });
      }
    };

    // Initial size update with a small delay to ensure proper rendering
    setTimeout(updateSize, 100);
    
    // Update on resize and orientation change (important for mobile)
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateSize, 300); // Delay after orientation change
    });
    
    // Update when component becomes visible (for lazy loading)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(updateSize, 100);
        }
      });
    });
    
    if (svgRef.current) {
      observer.observe(svgRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
      observer.disconnect();
    };
  }, []);

  const svgMap = useMemo(
    () => map.getSVG({
      radius: 0.22,
      color: "#94a3b8", // Medium gray (slate-400) - balanced visibility on light background
      shape: "circle",
      backgroundColor: "transparent",
    }),
    [map]
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (containerSize.width / 360);
    const y = (90 - lat) * (containerSize.height / 180);
    return { x, y };
  };

  // Smart label positioning that avoids screen edges with auto-fit content
  const getOptimalLabelPosition = (point: { x: number; y: number }, labelText: string, isHQ: boolean = false) => {
    const { width, height } = containerSize;
    
    // More aggressive mobile detection - check multiple factors
    const isMobile = width < 768 || window.innerWidth < 768 || 
                     (typeof window !== 'undefined' && 'ontouchstart' in window) ||
                     (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent));
    
    // Calculate approximate text width based on content
    const fontSize = isMobile ? 9 : 12;
    const padding = isMobile ? 8 : 16; // px-1 = 4px each side for mobile, px-2 = 8px each side for desktop
    const charWidth = fontSize * 0.6; // Approximate character width
    const estimatedTextWidth = labelText.length * charWidth;
    const responsiveLabelWidth = Math.max(estimatedTextWidth + padding, isMobile ? 30 : 40); // Minimum width
    const responsiveLabelHeight = isMobile ? 18 : 24;
    
    // Add extra width for headquarters emoji
    const finalLabelWidth = isHQ ? responsiveLabelWidth + (isMobile ? 12 : 16) : responsiveLabelWidth;
    
    // Larger margins for real mobile devices
    const margin = isMobile ? 8 : 4;
    
    let x = point.x - finalLabelWidth / 2; // Center by default
    let y = point.y - responsiveLabelHeight - 8; // Above point by default
    
    // More conservative positioning for mobile
    if (isMobile) {
      // Ensure label stays well within bounds
      const leftBound = margin;
      const rightBound = width - finalLabelWidth - margin;
      const topBound = margin;
      const bottomBound = height - responsiveLabelHeight - margin;
      
      // Clamp to safe bounds
      x = Math.max(leftBound, Math.min(x, rightBound));
      y = Math.max(topBound, Math.min(y, bottomBound));
      
      // If label would overlap with point, move it further away
      if (Math.abs(y + responsiveLabelHeight/2 - point.y) < 15) {
        if (y < point.y) {
          y = Math.max(topBound, point.y - responsiveLabelHeight - 15);
        } else {
          y = Math.min(bottomBound, point.y + 15);
        }
      }
    } else {
      // Desktop positioning (original logic)
      if (x < margin) {
        x = margin;
      } else if (x + finalLabelWidth > width - margin) {
        x = width - finalLabelWidth - margin;
      }
      
      if (y < margin) {
        y = point.y + 8;
      }
      
      if (y + responsiveLabelHeight > height - margin) {
        y = point.y - responsiveLabelHeight - 8;
      }
    }
    
    return { 
      x: Math.max(margin, Math.min(x, width - finalLabelWidth - margin)), 
      y: Math.max(margin, Math.min(y, height - responsiveLabelHeight - margin)),
      width: finalLabelWidth,
      height: responsiveLabelHeight,
      isMobile
    };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Calculate animation timing
  const staggerDelay = 0.3;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 2; // Pause for 2 seconds when all paths are drawn
  const fullCycleDuration = totalAnimationTime + pauseTime;

  return (
    <div className="w-full aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[2/1] relative font-sans overflow-hidden">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-cover"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Path definitions for animateMotion */}
          {dots.map((dot, i) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);
            return (
              <path
                key={`motion-path-${i}`}
                id={`path-${i}`}
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="none"
              />
            );
          })}
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          
          // Calculate keyframe times for this specific path
          const startTime = (i * staggerDelay) / fullCycleDuration;
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;
          
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={loop ? {
                  pathLength: [0, 0, 1, 1, 0],
                } : {
                  pathLength: 1
                }}
                transition={loop ? {
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, resetTime, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0,
                } : {
                  duration: animationDuration,
                  delay: i * staggerDelay,
                  ease: "easeInOut",
                }}
              />
              
              {loop && (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                >
                  <animateMotion
                    dur={`${fullCycleDuration}s`}
                    repeatCount="indefinite"
                    begin={`${startTime * fullCycleDuration}s`}
                  >
                    <mpath href={`#path-${i}`} />
                  </animateMotion>
                </motion.circle>
              )}
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          
          // Check if start or end point is the headquarters location
          const isStartHQ = headquarters && 
            Math.abs(dot.start.lat - headquarters.lat) < 0.01 && 
            Math.abs(dot.start.lng - headquarters.lng) < 0.01;
          const isEndHQ = headquarters && 
            Math.abs(dot.end.lat - headquarters.lat) < 0.01 && 
            Math.abs(dot.end.lng - headquarters.lng) < 0.01;
          
          return (
            <g key={`points-group-${i}`}>
              {/* Start Point - only render if not headquarters */}
              {!isStartHQ && (
                <g key={`start-${i}`}>
                  <motion.g
                    onHoverStart={() => setHoveredLocation(dot.start.label || `Location ${i}`)}
                    onHoverEnd={() => setHoveredLocation(null)}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <circle
                      cx={startPoint.x}
                      cy={startPoint.y}
                      r="3"
                      fill={lineColor}
                      filter="url(#glow)"
                      className="drop-shadow-lg"
                    />
                    <circle
                      cx={startPoint.x}
                      cy={startPoint.y}
                      r="3"
                      fill={lineColor}
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="3"
                        to="12"
                        dur="2s"
                        begin="0s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        begin="0s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </motion.g>
                  
                  {showLabels && dot.start.label && (() => {
                    const labelPos = getOptimalLabelPosition(startPoint, dot.start.label, false);
                    return (
                      <motion.g
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 * i + 0.3, duration: 0.5 }}
                        className="pointer-events-none"
                      >
                        <foreignObject
                          x={labelPos.x}
                          y={labelPos.y}
                          width={labelPos.width}
                          height={labelPos.height}
                          className="block"
                        >
                          <div className="flex items-center justify-center h-full">
                            <span className={`${labelPos.isMobile ? 'text-[9px] px-1 py-0.5' : 'text-xs px-2 py-0.5'} font-medium rounded bg-white/95 text-black border border-gray-200 shadow-md backdrop-blur-sm whitespace-nowrap`}>
                              {dot.start.label}
                            </span>
                          </div>
                        </foreignObject>
                      </motion.g>
                    );
                  })()}
                </g>
              )}
              
              {/* End Point - only render if not headquarters */}
              {!isEndHQ && (
                <g key={`end-${i}`}>
                  <motion.g
                    onHoverStart={() => setHoveredLocation(dot.end.label || `Destination ${i}`)}
                    onHoverEnd={() => setHoveredLocation(null)}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <circle
                      cx={endPoint.x}
                      cy={endPoint.y}
                      r="3"
                      fill={lineColor}
                      filter="url(#glow)"
                      className="drop-shadow-lg"
                    />
                    <circle
                      cx={endPoint.x}
                      cy={endPoint.y}
                      r="3"
                      fill={lineColor}
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="3"
                        to="12"
                        dur="2s"
                        begin="0.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        begin="0.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </motion.g>
                  
                  {showLabels && dot.end.label && (() => {
                    const labelPos = getOptimalLabelPosition(endPoint, dot.end.label, false);
                    return (
                      <motion.g
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 * i + 0.5, duration: 0.5 }}
                        className="pointer-events-none"
                      >
                        <foreignObject
                          x={labelPos.x}
                          y={labelPos.y}
                          width={labelPos.width}
                          height={labelPos.height}
                          className="block"
                        >
                          <div className="flex items-center justify-center h-full">
                            <span className={`${labelPos.isMobile ? 'text-[9px] px-1 py-0.5' : 'text-xs px-2 py-0.5'} font-medium rounded bg-white/95 text-black border border-gray-200 shadow-md backdrop-blur-sm whitespace-nowrap`}>
                              {dot.end.label}
                            </span>
                          </div>
                        </foreignObject>
                      </motion.g>
                    );
                  })()}
                </g>
              )}
            </g>
          );
        })}

        {/* Headquarters Pin */}
        {headquarters && (
          <g key="headquarters">
            {(() => {
              const hqPoint = projectPoint(headquarters.lat, headquarters.lng);
              return (
                <motion.g
                  onHoverStart={() => setHoveredLocation(headquarters.label || "Headquarters")}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Red headquarters pin */}
                  <circle
                    cx={hqPoint.x}
                    cy={hqPoint.y}
                    r="5"
                    fill="#ef4444"
                    filter="url(#glow)"
                    className="drop-shadow-lg"
                  />
                  {/* Pulsing red ring */}
                  <circle
                    cx={hqPoint.x}
                    cy={hqPoint.y}
                    r="5"
                    fill="#ef4444"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="5"
                      to="15"
                      dur="2s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.8"
                      to="0"
                      dur="2s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Headquarters label */}
                  {showLabels && headquarters.label && (() => {
                    const labelPos = getOptimalLabelPosition(hqPoint, `📍 ${headquarters.label}`, true);
                    return (
                      <motion.g
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="pointer-events-none"
                      >
                        <foreignObject
                          x={labelPos.x}
                          y={labelPos.y}
                          width={labelPos.width}
                          height={labelPos.height}
                          className="block"
                        >
                          <div className="flex items-center justify-center h-full">
                            <span className={`${labelPos.isMobile ? 'text-[9px] px-1 py-0.5' : 'text-xs px-2 py-0.5'} font-bold rounded bg-red-500/95 text-white border border-red-400 shadow-md whitespace-nowrap`}>
                              📍 {headquarters.label}
                            </span>
                          </div>
                        </foreignObject>
                      </motion.g>
                    );
                  })()}
                </motion.g>
              );
            })()}
          </g>
        )}
      </svg>
      
      {/* Mobile Tooltip */}
      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 text-black dark:text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm sm:hidden border border-gray-200 dark:border-gray-700"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}