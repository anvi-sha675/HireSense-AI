import { cn } from "@/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-[rgb(var(--surface-2))]",
        className,
      )}
      {...props}
    />
  );
}
