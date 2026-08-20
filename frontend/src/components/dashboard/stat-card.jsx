import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, scoreTone } from "@/utils";

const toneBar = {
  confidence: "bg-confidence-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

export function StatCard({ label, score, trend, hint, delay = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const positive = (trend ?? 0) >= 0;
  const tone = scoreTone(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card
        className="relative overflow-hidden p-4 transition-colors hover:border-[rgb(var(--fg-muted))]/30"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        tabIndex={hint ? 0 : undefined}
      >
        <span
          className={cn("absolute inset-x-0 top-0 h-0.5", toneBar[tone])}
          aria-hidden="true"
        />
        <p className="text-eyebrow">{label}</p>
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <p className="font-stat text-[1.75rem] font-bold leading-none">
            {score}
          </p>
          {trend !== undefined && (
            <div
              className={cn(
                "flex shrink-0 items-center gap-0.5 text-xs font-semibold",
                positive ? "text-confidence-600" : "text-rose-500",
              )}
            >
              {positive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(trend)}
            </div>
          )}
        </div>
        <AnimatePresence>
          {expanded && hint && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.18 }}
              className="text-xs leading-relaxed text-[rgb(var(--fg-muted))]"
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
