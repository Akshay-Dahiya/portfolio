import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export type TestimonialItem = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: TestimonialItem[];
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const hasTestimonials = testimonials.length > 0;

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay || !hasTestimonials) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, hasTestimonials, handleNext]);

  const rotations = useMemo(
    () => testimonials.map((_, index) => ((index * 7) % 21) - 10),
    [testimonials]
  );

  if (!hasTestimonials) {
    return null;
  }

  return (
    <div className={cn("mx-auto max-w-sm px-4 py-16 md:max-w-5xl md:px-8 lg:px-12", className)}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <div className="relative h-[24rem] w-full md:h-[28rem]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rotations[index] }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index],
                    zIndex: isActive(index) ? 50 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -12, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: rotations[index] }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-[28px] object-cover object-[70%_center] shadow-2xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-2">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {testimonials[active].name}
            </h3>
            <p className="mt-2 text-sm font-medium text-neutral-400">
              {testimonials[active].designation}
            </p>

            <motion.p className="mt-8 text-base leading-8 text-neutral-300 md:text-lg">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.018 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 pt-10">
            <LiquidButton type="button" onClick={handlePrev} variant="subtle" size="icon" className="h-10 w-10">
              <IconArrowLeft className="h-5 w-5 text-neutral-800" />
            </LiquidButton>
            <LiquidButton type="button" onClick={handleNext} variant="subtle" size="icon" className="h-10 w-10">
              <IconArrowRight className="h-5 w-5 text-neutral-800" />
            </LiquidButton>
          </div>
        </div>
      </div>
    </div>
  );
}
