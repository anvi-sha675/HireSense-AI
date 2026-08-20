import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-ink-950 px-8 py-16 text-center text-white sm:px-16"
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, var(--color-signal-600), transparent 70%)",
          }}
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Your next interview is already scheduled.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            Give yourself the unfair advantage of having run through it first.
          </p>
          <Link to="/register" className="mt-8 inline-block">
            <Button
              size="lg"
              className="bg-white text-ink-950 hover:bg-white/90 shadow-none"
            >
              Start free — no card needed <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
