import { useRef } from "react";
import { useScroll, useTransform, MotionValue, UseScrollOptions } from "framer-motion";

interface UseScrollScaleOptions {
  /**
   * Scale range for the animation
   * @default [0.96, 1] - Creates a subtle "zoom in" effect as you scroll
   */
  scaleRange?: [number, number];
  
  /**
   * Scroll offset range for when the animation should occur
   * @default undefined - Uses default framer-motion behavior
   * @example ["start 85%", "end 55%"] - Custom offset for specific timing
   */
  offset?: UseScrollOptions["offset"];
}

interface UseScrollScaleReturn {
  /**
   * Ref to attach to the element you want to animate
   */
  ref: React.RefObject<HTMLDivElement>;
  
  /**
   * Scale motion value to apply to motion.div style prop
   */
  scale: MotionValue<number>;
  
  /**
   * Raw scroll progress value (0 to 1) if you need additional transforms
   */
  scrollYProgress: MotionValue<number>;
}

/**
 * Custom hook for scroll-based scale animations
 * 
 * Creates a premium "zoom in" effect as the user scrolls, making content
 * feel more dynamic and engaging. The element scales from 0.96 to 1.0 by default.
 * 
 * The animation completes when the element is fully visible in the viewport,
 * creating a smooth and natural feeling effect.
 * 
 * @example
 * ```tsx
 * const { ref, scale } = useScrollScale();
 * 
 * return (
 *   <motion.div ref={ref} style={{ scale }}>
 *     Your content here
 *   </motion.div>
 * );
 * ```
 * 
 * @example With custom scale range
 * ```tsx
 * const { ref, scale } = useScrollScale({ scaleRange: [0.9, 1] });
 * ```
 * 
 * @example With custom offset
 * ```tsx
 * const { ref, scale } = useScrollScale({ 
 *   offset: ["start end", "end start"] 
 * });
 * ```
 */
export const useScrollScale = (
  options: UseScrollScaleOptions = {}
): UseScrollScaleReturn => {
  const { scaleRange = [0.96, 1], offset = ["start end", "end end"] } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  
  return { ref, scale, scrollYProgress };
};
