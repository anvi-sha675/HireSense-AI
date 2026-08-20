import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, TrendingUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfidenceRing } from "@/components/common/confidence-ring";
import { AuroraBackground } from "@/components/common/aurora-background";
import { Magnetic } from "@/components/common/magnetic";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { TypingText } from "@/components/common/typing-text";

const bars = [12, 28, 18, 40, 24, 52, 30, 44, 20, 36, 16, 48, 26, 38, 14];

const roles = [
  "Senior Product Designer.",
  "Backend Engineer.",
  "Data Analyst.",
  "Product Manager.",
];

const floatingCards = [
  {
    label: "ATS Score",
    value: "92",
    tone: "text-confidence-500",
    top: "8%",
    left: "2%",
    delay: 0,
  },
  {
    label: "Hiring odds",
    value: "+14%",
    tone: "text-signal-500",
    top: "58%",
    left: "-4%",
    delay: 0.15,
  },
  {
    label: "Skill match",
    value: "87%",
    tone: "text-amber-500",
    top: "72%",
    left: "86%",
    delay: 0.3,
  },
];

function useParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 70, damping: 24 });
  const springY = useSpring(y, { stiffness: 70, damping: 24 });

  const onMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    x.set(((e.clientX - innerWidth / 2) / innerWidth) * strength);
    y.set(((e.clientY - innerHeight / 2) / innerHeight) * strength);
  };

  return { x: springX, y: springY, onMouseMove };
}

export function Hero() {
  const containerRef = useRef(null);
  const { x, y, onMouseMove } = useParallax(12);
  const cardX = useTransform(x, (v) => v * 1.15);
  const cardY = useTransform(y, (v) => v * 1.15);

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden pb-24 pt-40 sm:pt-48"
    >
      <AuroraBackground />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/70 px-3.5 py-1.5 text-xs font-medium text-[rgb(var(--fg-muted))] backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-confidence-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-confidence-500" />
          </span>
          Now scoring interviews in real time
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Walk into the real interview
          <br />
          having already <span className="gradient-text">done it once.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-1.5 text-lg text-[rgb(var(--fg-muted))]"
        >
          <span>
            HireSense AI runs mock interviews and scores your resume for a
          </span>
          <span className="inline-flex min-w-[13ch] justify-start font-semibold text-signal-500">
            <TypingText words={roles} />
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.2}>
            <Link to="/register">
              <Button size="lg" variant="spotlight">
                Start practicing free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Magnetic>
          <Magnetic strength={0.15}>
            <Button size="lg" variant="outline">
              <Play className="h-4 w-4" /> Watch a 90s demo
            </Button>
          </Magnetic>
        </motion.div>

        <div className="relative mt-16">
          {floatingCards.map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + card.delay }}
              style={{
                position: "absolute",
                top: card.top,
                left: card.left,
                x: cardX,
                y: cardY,
              }}
              className="glass z-10 hidden w-32 rounded-md px-3.5 py-3 text-left shadow-(--shadow-soft) md:block"
            >
              <p className="text-eyebrow">{card.label}</p>
              <p className={`font-stat text-lg font-bold ${card.tone}`}>
                {card.value}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ x, y }}
            className="surface-card relative mx-auto max-w-3xl overflow-hidden text-left"
          >
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
              <ConfidenceRing score={87} size={120} label="Hiring odds" />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm font-medium text-confidence-600">
                  <TrendingUp className="h-4 w-4" /> Live session — Senior
                  Product Designer
                </div>
                <p className="mt-2 font-display text-lg font-semibold">
                  "Tell me about a time you shipped under pressure."
                </p>
                <div className="mt-4 flex h-12 items-end gap-1">
                  {bars.map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-full rounded-full bg-linear-to-t from-signal-500 to-confidence-400"
                      initial={{ height: 4 }}
                      animate={{ height: [4, h, h * 0.6, h] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-[rgb(var(--fg-muted))]">
                  Analyzing pacing, filler words, and structure — feedback lands
                  in 4 seconds.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-[rgb(var(--border))] pt-10"
        >
          {[
            { value: 42000, suffix: "+", label: "Mock interviews run" },
            { value: 91, suffix: "%", label: "Feel more prepared" },
            {
              value: 3.2,
              suffix: "x",
              label: "Faster offer turnaround",
              decimals: 1,
            },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-stat text-2xl font-bold sm:text-3xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </p>
              <p className="mt-1 text-xs text-[rgb(var(--fg-muted))] sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mx-auto mt-14 flex w-fit flex-col items-center gap-1 text-[rgb(var(--fg-muted))]"
        >
          <span className="text-[0.65rem] uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>
    </section>
  );
}
