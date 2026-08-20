import { motion } from "framer-motion";
import {
  FileSearch,
  Mic2,
  Target,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "ATS-accurate resume scoring",
    description:
      "We parse your resume the way applicant tracking systems do — keyword weighting, formatting penalties, and all — so nothing gets silently filtered out.",
  },
  {
    icon: Mic2,
    title: "Voice & text mock interviews",
    description:
      "Practice out loud or type it out. Either way, the interviewer adapts follow-up questions based on what you actually said.",
  },
  {
    icon: Target,
    title: "Job description matching",
    description:
      "Paste any JD and get a skill-gap breakdown — what to highlight, what to learn, and which keywords are missing.",
  },
  {
    icon: LineChart,
    title: "Progress you can graph",
    description:
      "Every session feeds your analytics — track interview score, communication clarity, and hiring probability over weeks.",
  },
  {
    icon: Sparkles,
    title: "Actionable, not generic, feedback",
    description:
      'No "be more confident." You get line-level resume edits and timestamped interview moments to fix.',
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "Recordings and documents are encrypted and never used to train external models without your consent.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product"
          title="Everything between you and an offer"
          description="One workspace for resume, interview, and hiring signal — instead of three disconnected tools."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="surface-card group p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-signal-500/10 text-signal-500 transition-colors group-hover:bg-signal-500 group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--fg-muted))]">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-signal-500">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-[rgb(var(--fg-muted))]">{description}</p>
    </motion.div>
  );
}
