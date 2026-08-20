import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-signal-500 text-white shadow-[0_1px_2px_rgb(0_0_0_/_0.06)] hover:bg-signal-600 active:scale-[0.98]",
        spotlight:
          "bg-signal-500 text-white shadow-[var(--shadow-glow)] hover:bg-signal-600 active:scale-[0.98]",
        secondary:
          "bg-[rgb(var(--surface-2))] text-[rgb(var(--fg))] border border-[rgb(var(--border))] hover:bg-[rgb(var(--surface))] active:scale-[0.98]",
        outline:
          "border border-[rgb(var(--border))] bg-transparent hover:bg-[rgb(var(--surface-2))] active:scale-[0.98]",
        ghost: "hover:bg-[rgb(var(--surface-2))]",
        link: "text-signal-500 underline-offset-4 hover:underline",
        destructive:
          "bg-rose-500 text-white hover:bg-rose-500/90 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-[var(--radius-xs)] px-3 text-xs",
        lg: "h-12 rounded-[var(--radius-md)] px-7 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
