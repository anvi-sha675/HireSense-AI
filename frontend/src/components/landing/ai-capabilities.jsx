import { motion } from "framer-motion";
import { Brain, Waves, GitCompare, Gauge } from "lucide-react";
import { SectionHeading } from "@/components/landing/features";
import { cn, scoreTone } from "@/utils";

const capabilities = [
  {
    icon: Brain,
    title: "Adaptive questioning",
    text: "Follow-ups are generated from your last answer, not a fixed script.",
  },
  {
    icon: Waves,
    title: "Speech pattern analysis",
    text: "Detects pace, filler words, and pausing to flag clarity issues.",
  },
  {
    icon: GitCompare,
    title: "Resume-to-JD matching",
    text: "Semantic matching goes beyond keywords to compare actual responsibilities.",
  },
  {
    icon: Gauge,
    title: "Hiring probability model",
    text: "Trained on outcome-labeled interview data to estimate your odds.",
  },
];

const skills = [
  { label: "Communication", value: 82 },
  { label: "Technical depth", value: 74 },
  { label: "Structure (STAR)", value: 91 },
  { label: "Confidence", value: 68 },
  { label: "Relevance", value: 87 },
];

export function AiCapabilities() {
  return (
    <section id="ai-capabilities" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Intelligence"
          title="The model behind the mock interview"
          description="Purpose-built evaluation, not a generic chatbot wearing an interviewer costume."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="surface-card p-5"
              >
                <c.icon className="h-5 w-5 text-confidence-500" />
                <h4 className="mt-3 font-display font-semibold">{c.title}</h4>
                <p className="mt-1.5 text-sm text-[rgb(var(--fg-muted))]">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="surface-card p-7"
          >
            <p className="font-display text-sm font-semibold text-[rgb(var(--fg-muted))]">
              Skill breakdown — this session
            </p>
            <div className="mt-6 space-y-5">
              {skills.map((s, i) => {
                const tone = scoreTone(s.value);
                return (
                  <div key={s.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{s.label}</span>
                      <span className="font-stat text-[rgb(var(--fg-muted))]">
                        {s.value}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--surface-2))]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: i * 0.08,
                          ease: "easeOut",
                        }}
                        className={cn(
                          "h-full rounded-full",
                          tone === "confidence" && "bg-confidence-500",
                          tone === "amber" && "bg-amber-500",
                          tone === "rose" && "bg-rose-500",
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
