import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-signal-500/10 text-signal-500",
        confidence:
          "border-transparent bg-confidence-500/10 text-confidence-600",
        amber: "border-transparent bg-amber-500/15 text-amber-500",
        rose: "border-transparent bg-rose-500/10 text-rose-500",
        outline: "border-[rgb(var(--border))] text-[rgb(var(--fg-muted))]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
