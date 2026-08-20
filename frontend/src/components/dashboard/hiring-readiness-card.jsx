import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ConfidenceRing } from "@/components/common/confidence-ring";
import { scoreTone } from "@/utils";

const readinessCopy = {
  confidence:
    "You're in strong shape — keep momentum with another mock session.",
  amber:
    "You're close. A couple of focused sessions could meaningfully move this number.",
  rose: "There's real room to improve here before you start applying widely.",
};

export function HiringReadinessCard({ score, weakestMetric, loading }) {
  if (loading || score === undefined) {
    return <Card className="h-full min-h-50 animate-pulse" />;
  }

  const tone = scoreTone(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-7">
        <div className="flex items-center gap-5">
          <ConfidenceRing score={score} size={104} strokeWidth={8} />
          <div>
            <p className="text-eyebrow">Hiring readiness</p>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-[rgb(var(--fg-muted))]">
              {readinessCopy[tone]}
            </p>
          </div>
        </div>

        {weakestMetric && (
          <div className="flex items-center gap-3 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-4 py-3 sm:min-w-60">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-500/10 text-signal-500">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.7rem] font-medium text-[rgb(var(--fg-muted))]">
                Focus next
              </p>
              <p className="truncate text-sm font-semibold">
                {weakestMetric.label}
              </p>
            </div>
            <Link
              to="/dashboard/interview"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[rgb(var(--fg-muted))] transition-colors hover:bg-[rgb(var(--surface))] hover:text-signal-500"
              aria-label="Improve this metric"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
