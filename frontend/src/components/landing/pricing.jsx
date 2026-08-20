import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/landing/features";
import { cn } from "@/utils";

const plans = [
  {
    name: "Starter",
    tagline: "Try the full loop once",
    monthly: 0,
    yearly: 0,
    features: [
      "3 mock interviews / month",
      "1 resume ATS scan",
      "Basic skill report",
      "Community support",
    ],
  },
  {
    name: "Pro",
    tagline: "For an active job search",
    monthly: 29,
    yearly: 23,
    popular: true,
    features: [
      "Unlimited mock interviews",
      "Unlimited resume & JD scans",
      "Voice + text interview modes",
      "Full analytics & progress history",
      "Priority feedback turnaround",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For bootcamps & career teams",
    monthly: 99,
    yearly: 79,
    features: [
      "Everything in Pro",
      "Team seats & admin dashboard",
      "Cohort-level analytics",
      "SSO & dedicated support",
      "Custom interview question banks",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing, cancel anytime"
          description="Start free. Upgrade when you're actively interviewing."
        />

        <div className="mt-8 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              !yearly && "text-[rgb(var(--fg))]",
              yearly && "text-[rgb(var(--fg-muted))]",
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly((y) => !y)}
            className="relative h-6 w-11 rounded-full bg-signal-500 transition-colors"
            aria-label="Toggle billing period"
          >
            <motion.span
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
              animate={{ left: yearly ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium",
              yearly && "text-[rgb(var(--fg))]",
              !yearly && "text-[rgb(var(--fg-muted))]",
            )}
          >
            Yearly <span className="text-confidence-600">— save 20%</span>
          </span>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "relative flex flex-col rounded-lg border p-7",
                plan.popular
                  ? "border-signal-500 bg-[rgb(var(--surface))] shadow-(--shadow-soft)"
                  : "surface-card",
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most popular
                </Badge>
              )}
              <h3 className="font-display text-lg font-semibold">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
                {plan.tagline}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">
                  ${yearly ? plan.yearly : plan.monthly}
                </span>
                <span className="text-sm text-[rgb(var(--fg-muted))]">
                  /month
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-confidence-500" />
                    <span className="text-[rgb(var(--fg-muted))]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="mt-7">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "secondary"}
                >
                  {plan.monthly === 0 ? "Start free" : "Choose " + plan.name}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
