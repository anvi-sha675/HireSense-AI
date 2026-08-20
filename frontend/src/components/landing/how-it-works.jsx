import { motion } from "framer-motion";
import { Upload, Radar, MessageSquareText, TrophyIcon } from "lucide-react";
import { SectionHeading } from "@/components/landing/features";

const steps = [
  {
    icon: Upload,
    title: "Upload your resume & target role",
    description:
      "Drop in your resume and the job description you're aiming for. We read both in seconds.",
  },
  {
    icon: Radar,
    title: "Get your signal report",
    description:
      "ATS score, keyword gaps, and a hiring-probability estimate, broken down section by section.",
  },
  {
    icon: MessageSquareText,
    title: "Run a mock interview",
    description:
      "Answer role-specific questions by voice or text. Follow-ups adapt to what you say.",
  },
  {
    icon: TrophyIcon,
    title: "Fix what's holding you back",
    description:
      "Walk away with a ranked list of edits and practice reps, then track improvement over time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[rgb(var(--surface))] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title="From upload to offer, in four steps"
          description="No settings to configure. Start with what you already have."
        />

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-[rgb(var(--border))] lg:block" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-start"
            >
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-signal-500 shadow-(--shadow-soft)">
                <step.icon className="h-6 w-6" />
              </span>
              <span className="mt-4 font-mono text-xs text-[rgb(var(--fg-muted))]">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--fg-muted))]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
