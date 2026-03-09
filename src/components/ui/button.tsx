import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full text-sm font-medium transition-[transform,filter,box-shadow,color,border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d77aa8]/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[#9b2f62] bg-gradient-to-b from-[#cf5f96] to-[#a43d71] text-white shadow-[inset_0_0.24rem_0.65rem_rgba(255,255,255,0.3),inset_0_-0.16rem_0.45rem_rgba(110,33,69,0.45),0_0.7rem_1.5rem_rgba(118,45,82,0.3)] hover:-translate-y-0.5 hover:brightness-105",
        outline:
          "border border-[#ebc4d8] bg-white/95 text-[#6b2348] shadow-[inset_0_0.2rem_0.5rem_rgba(255,255,255,0.9),0_0.5rem_1.1rem_rgba(118,45,82,0.12)] hover:-translate-y-0.5 hover:border-[#d98ab2] hover:bg-[#fff6fa]",
        secondary:
          "border border-[#f1d7e5] bg-[#fff6fa] text-[#762c52] shadow-[inset_0_0.15rem_0.4rem_rgba(255,255,255,0.8),0_0.45rem_0.95rem_rgba(118,45,82,0.1)] hover:-translate-y-0.5 hover:border-[#d98ab2] hover:bg-white",
        ghost: "text-[#7a2b52] hover:bg-[#fff1f7] hover:text-[#5d1c3d]",
        link: "text-[#a43d71] underline-offset-4 hover:underline",
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
