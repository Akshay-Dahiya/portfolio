import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full text-sm font-medium transition-[transform,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)]/45 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--portfolio-text)] text-white shadow-[0_10px_24px_rgba(31,41,55,0.28),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5 hover:bg-[var(--portfolio-text)]/92",
        outline:
          "border border-[var(--portfolio-border)] bg-white/78 text-[var(--portfolio-text)] shadow-[0_8px_20px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] hover:-translate-y-0.5 hover:bg-white",
        secondary:
          "border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] text-[var(--portfolio-text)] shadow-[0_6px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:bg-white",
        ghost: "text-[var(--portfolio-muted)] hover:bg-white/60 hover:text-[var(--portfolio-text)]",
        link: "text-[var(--portfolio-text)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
