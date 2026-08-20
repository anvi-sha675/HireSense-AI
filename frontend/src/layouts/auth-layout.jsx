import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { ThemeToggle } from "@/components/common/theme-toggle";

const highlights = [
  {
    icon: Sparkles,
    text: "AI mock interviews that adapt to your target role in real time",
  },
  {
    icon: TrendingUp,
    text: "ATS scoring that mirrors what real applicant systems check for",
  },
  {
    icon: ShieldCheck,
    text: "Your resume and recordings stay private, encrypted end to end",
  },
];

export function AuthLayout() {
  const location = useLocation();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-950 p-10 text-white lg:flex">
        <div className="noise-grid absolute inset-0 opacity-[0.15]" />
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-[0.18] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-signal-500), transparent 70%)",
          }}
        />

        <Link
          to="/"
          className="relative z-10 flex items-center gap-2 font-display text-lg font-bold"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
            <Radar className="h-4 w-4" />
          </span>
          HireSense.ai
        </Link>

        <div className="relative z-10 max-w-md">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-semibold leading-tight"
          >
            The dry run before the real interview.
          </motion.h2>
          <div className="mt-8 space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * i + 0.2 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <item.icon className="h-4 w-4 text-confidence-400" />
                </span>
                <p className="text-sm text-white/70">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          Trusted by candidates prepping for roles at 400+ companies
        </p>
      </div>

      <div className="flex flex-col p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg font-bold lg:hidden"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-500 text-white">
              <Radar className="h-4 w-4" />
            </span>
            HireSense.ai
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
