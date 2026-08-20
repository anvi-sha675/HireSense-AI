import { motion } from "framer-motion";
import { cn } from "@/utils";

export function AuroraBackground({ className }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -left-1/4 -top-1/3 h-150 w-150 rounded-full opacity-[0.12] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-signal-500), transparent 65%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="noise-grid absolute inset-0 opacity-[0.12] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
    </div>
  );
}
