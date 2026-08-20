import * as React from "react";
import { cn } from "@/utils";

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-sm border bg-[rgb(var(--surface))] px-3.5 py-2 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg-muted))] transition-colors duration-150 outline-none",
        "border-[rgb(var(--border))] hover:border-[rgb(var(--fg-muted))]/40 focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20",
        error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
