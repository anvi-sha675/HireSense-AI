import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn, scoreTone } from "@/utils";

const toneColor = {
  confidence: "var(--color-confidence-500)",
  amber: "var(--color-amber-500)",
  rose: "var(--color-rose-500)",
};

export function ConfidenceRing({
  score,
  size = 96,
  strokeWidth = 8,
  label,
  className,
  animateOnMount = true,
}) {
  const [displayScore, setDisplayScore] = useState(animateOnMount ? 0 : score);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const tone = scoreTone(score);
  const color = toneColor[tone];

  useEffect(() => {
    if (!animateOnMount) return;
    const timeout = setTimeout(() => setDisplayScore(score), 100);
    return () => clearTimeout(timeout);
  }, [score, animateOnMount]);

  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(var(--border))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-display font-bold tabular-nums"
          style={{ fontSize: size * 0.26, color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Math.round(displayScore)}
        </motion.span>
        {label && (
          <span className="text-[0.65rem] text-[rgb(var(--fg-muted))] font-medium">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
