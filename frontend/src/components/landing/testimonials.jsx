import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/landing/features";

const testimonials = [
  {
    quote:
      "I ran through six mock interviews before my final round at a fintech startup. The feedback on my STAR structure was more specific than anything my career coach gave me.",
    name: "Priya Nathan",
    role: "Product Manager, hired at a Series C startup",
  },
  {
    quote:
      "My resume was getting filtered before a human ever saw it. The ATS score flagged exactly which sections were the problem — fixed it in a night.",
    name: "Marcus Webb",
    role: "Backend Engineer",
  },
  {
    quote:
      "The job description matching saved me hours. It told me which three skills to lead with for each application instead of sending the same resume everywhere.",
    name: "Elena Ferro",
    role: "Data Analyst",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[rgb(var(--surface))] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Proof"
          title="Candidates who over-prepared, on purpose"
          description="Real prep, not motivational filler."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="surface-card flex flex-col p-6"
            >
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[rgb(var(--fg))]">
                "{t.quote}"
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-[rgb(var(--border))] pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal-500/10 text-xs font-semibold text-signal-500">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-[rgb(var(--fg-muted))]">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
