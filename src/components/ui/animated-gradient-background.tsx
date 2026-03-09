import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  startingGap?: number;
  breathing?: boolean;
  gradientColors?: string[];
  gradientStops?: number[];
  animationSpeed?: number;
  breathingRange?: number;
  topOffset?: number;
  containerClassName?: string;
};

export default function AnimatedGradientBackground({
  startingGap = 125,
  breathing = true,
  gradientColors = [
    "#020617",
    "#1e1b4b",
    "#6d28d9",
    "#db2777",
    "#fb7185",
    "#fde68a",
    "#ffffff",
  ],
  gradientStops = [18, 34, 50, 66, 80, 92, 100],
  animationSpeed = 0.03,
  breathingRange = 6,
  topOffset = 0,
  containerClassName = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let width = startingGap;
    let direction = 1;

    const animate = () => {
      if (width >= startingGap + breathingRange) direction = -1;
      if (width <= startingGap - breathingRange) direction = 1;
      if (!breathing) direction = 0;

      width += direction * animationSpeed;

      const stops = gradientStops
        .map((stop, i) => `${gradientColors[i]} ${stop}%`)
        .join(", ");

      const gradient = `radial-gradient(${width}% ${width + topOffset}% at 50% 20%, ${stops})`;

      if (containerRef.current) containerRef.current.style.background = gradient;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [startingGap, breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] } }}
      className={`absolute inset-0 overflow-hidden ${containerClassName}`}
    >
      <div ref={containerRef} className="absolute inset-0" />
    </motion.div>
  );
}
