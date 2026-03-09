import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidbuttonVariants = cva(
  "group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-medium outline-none transition-[transform,color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)]/45 disabled:pointer-events-none disabled:opacity-50 before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:border before:content-[''] after:pointer-events-none after:absolute after:inset-[1px] after:rounded-full after:content-['']",
  {
    variants: {
      variant: {
        default:
          "text-[var(--portfolio-text)] hover:-translate-y-0.5 before:border-[var(--portfolio-border)] before:bg-white/72 before:shadow-[0_8px_20px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] group-hover:before:bg-white/86 after:bg-gradient-to-b after:from-white/60 after:to-transparent",
        solid:
          "text-white hover:-translate-y-0.5 before:border-[var(--portfolio-text)]/35 before:bg-[var(--portfolio-text)] before:shadow-[0_10px_24px_rgba(31,41,55,0.28),inset_0_1px_0_rgba(255,255,255,0.25)] group-hover:before:bg-[var(--portfolio-text)]/92 after:bg-gradient-to-b after:from-white/22 after:to-transparent",
        subtle:
          "text-[var(--portfolio-muted)] hover:-translate-y-0.5 hover:text-[var(--portfolio-text)] before:border-[var(--portfolio-border)] before:bg-[var(--portfolio-surface)]/80 before:shadow-[0_6px_16px_rgba(0,0,0,0.06)] group-hover:before:bg-white after:bg-gradient-to-b after:from-white/50 after:to-transparent",
        ghost:
          "text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)] before:border-transparent before:bg-transparent before:shadow-none after:hidden",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-xs",
        default: "h-10 px-5",
        lg: "h-12 px-6",
        xl: "h-14 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type LiquidButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean;
  };

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: LiquidButtonProps) {
  const Comp = asChild ? Slot : "button";
  const content = asChild ? children : <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

  return (
    <>
      <Comp
        data-slot="liquid-button"
        className={cn(liquidbuttonVariants({ variant, size, className }))}
        style={{ backdropFilter: 'url("#container-glass")' }}
        {...props}
      >
        {content}
      </Comp>
      <GlassFilter />
    </>
  );
}

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export { LiquidButton, liquidbuttonVariants };
