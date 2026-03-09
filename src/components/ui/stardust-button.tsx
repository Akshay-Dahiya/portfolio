import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stardustButtonVariants = cva(
  "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-[#e8bed3] bg-gradient-to-b from-[#fff9fc] to-[#ffeef6] text-[#571a3b] transition-[transform,filter,box-shadow,color,border-color] duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#d77aa8]/45 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "shadow-[inset_0_0.32rem_0.95rem_rgba(255,255,255,0.85),inset_0_-0.16rem_0.5rem_rgba(191,95,143,0.2),0_0.75rem_1.5rem_rgba(118,45,82,0.18)] hover:-translate-y-0.5 hover:border-[#d98ab2] hover:brightness-105 active:translate-y-[2px]",
        solid:
          "border-[#9b2f62] bg-gradient-to-b from-[#cf5f96] to-[#a43d71] text-white shadow-[inset_0_0.3rem_0.7rem_rgba(255,255,255,0.32),inset_0_-0.2rem_0.55rem_rgba(110,33,69,0.45),0_0.95rem_1.9rem_rgba(110,33,69,0.35)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-[2px]",
        subtle:
          "border-[#ebc4d8] bg-white/90 text-[#6b2348] shadow-[inset_0_0.2rem_0.5rem_rgba(255,255,255,0.9),0_0.55rem_1.15rem_rgba(118,45,82,0.12)] hover:-translate-y-0.5 hover:border-[#d98ab2] hover:bg-[#fff6fa] active:translate-y-[2px]",
        ghost:
          "border-[#f0d5e3] bg-white/60 text-[#7a2b52] shadow-[0_0.45rem_0.95rem_rgba(118,45,82,0.09)] hover:-translate-y-0.5 hover:border-[#d98ab2] hover:bg-white active:translate-y-[2px]",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-xs",
        default: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-sm",
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

type StardustButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof stardustButtonVariants> & {
    asChild?: boolean;
  };

export function StardustButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: StardustButtonProps) {
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string;
      style?: React.CSSProperties;
    }>;

    return React.cloneElement(child, {
      ...props,
      className: cn(stardustButtonVariants({ variant, size, className }), child.props.className),
      style: { ...(props.style ?? {}), ...(child.props.style ?? {}) },
    });
  }

  return (
    <button className={cn(stardustButtonVariants({ variant, size, className }))} {...props}>
      <span className="pointer-events-none absolute inset-x-[10%] top-[10%] h-[44%] rounded-t-full bg-gradient-to-b from-white/85 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      <span className="pointer-events-none absolute inset-x-[-12%] -top-[95%] bottom-[20%] rounded-full bg-[#e08bb4]/16 transition-transform duration-300 group-hover:-translate-y-1" />
      <span className="relative z-10 inline-flex items-center gap-2">
        <span className="text-[0.95em] group-hover:hidden">✧</span>
        <span className="hidden text-[0.95em] group-hover:inline">✦</span>
        <span>{children}</span>
      </span>
    </button>
  );
}

export { stardustButtonVariants };
