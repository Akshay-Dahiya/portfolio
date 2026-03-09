import { useState } from "react";
import { cn } from "@/lib/utils";

export type MinimalTestimonialItem = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

type TestimonialsMinimalProps = {
  testimonials: MinimalTestimonialItem[];
  className?: string;
};

export function TestimonialsMinimal({ testimonials, className }: TestimonialsMinimalProps) {
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) {
    return null;
  }

  const activeIndex = active % testimonials.length;

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-3xl rounded-[30px] border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] px-6 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.07)] md:px-8 md:py-12",
        className
      )}
    >
      <div className="relative mb-10 min-h-[118px] md:min-h-[100px]">
        {testimonials.map((testimonial, index) => (
          <p
            key={testimonial.name}
            className={cn(
              "absolute inset-0 text-lg leading-relaxed text-neutral-700 transition-all duration-500 ease-out md:text-2xl",
              "text-[var(--portfolio-muted)]",
              activeIndex === index
                ? "translate-y-0 opacity-100 blur-0"
                : "pointer-events-none translate-y-4 opacity-0 blur-sm"
            )}
          >
            "{testimonial.quote}"
          </p>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <div className="flex -space-x-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative h-11 w-11 overflow-hidden rounded-full border border-white/60 bg-white/60 ring-2 ring-white shadow-[0_8px_16px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 ease-out",
                activeIndex === index
                  ? "z-10 scale-110 shadow-md"
                  : "grayscale hover:scale-105 hover:grayscale-0"
              )}
              aria-label={`Show testimonial by ${testimonial.name}`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-[var(--portfolio-border)]" />

        <div className="relative min-h-[44px] flex-1">
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-meta`}
              className={cn(
                "absolute inset-0 flex flex-col justify-center transition-all duration-400 ease-out",
                activeIndex === index
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none -translate-x-2 opacity-0"
              )}
            >
              <span className="text-sm font-semibold text-[var(--portfolio-text)]">{testimonial.name}</span>
              <span className="text-xs text-[var(--portfolio-muted)]">{testimonial.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
